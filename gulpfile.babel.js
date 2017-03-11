import gulp         from 'gulp'
import plugins      from 'gulp-load-plugins'
import { argv }     from 'yargs'
import browserify   from 'browserify'
import source       from 'vinyl-source-stream'
import wiredep      from 'wiredep'
import BrowserSync  from 'browser-sync'
import history      from 'connect-history-api-fallback'

import { configs, Logger } from './helpers/helpers'

const g                       = plugins(),
      { server, client }      = configs,
      { src, dest }           = client,
      { info, error, debug }  = Logger(argv, g.util),
      browserSync             = BrowserSync.create()

let isProduction  = true
process.env.PORT = 3000
process.env.NODE_ENV = 'production'

gulp.task('html', () => {
  const sources = gulp.src(
    [
      dest.path + dest.scripts.path + dest.scripts.entry,
      dest.path + dest.styles.path + dest.styles.entry
    ],
    {
      read: false
    }
  )

  return gulp.src(src.path + src.html.entry)
    .on('error', error)
    .pipe(wiredep.stream({ ignorePath: '../public' }))
    .pipe(g.inject(sources, { ignorePath: '/public/' }))
    .pipe(gulp.dest(dest.path))
})

gulp.task('scripts', () => {
  return browserify({
    entries: src.path + src.scripts.path + src.scripts.entry,
    transform: [[ 'babelify' ]]
  })
  .bundle()
  .on('error', error)
  .pipe(source(dest.scripts.entry))
  .pipe(g.if(isProduction, g.streamify(g.uglify())))
  .pipe(gulp.dest(dest.path + dest.scripts.path))
  .pipe(g.if(!isProduction, browserSync.stream()))
})

gulp.task('styles', () => {
  return gulp.src(src.path + src.styles.path + src.styles.entry)
    .on('error', error)
    .pipe(g.postcss([
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-cssnext'),
      require('cssnano')({ autoprefixer: false })
    ]))
    .pipe(gulp.dest(dest.path + dest.styles.path))
    .pipe(g.if(!isProduction, browserSync.stream()))
})

gulp.task('images', () => {
  return gulp.src(src.path + src.images.path + src.images.entry)
    .on('error', error)
    .pipe(gulp.dest(dest.path + dest.images.path))
})

gulp.task('dev', (done) => {
  isProduction = false
  process.env.PORT = 80
  process.env.NODE_ENV = 'development'

  done()
})

gulp.task('browser', (done) => {
  browserSync.init({
    proxy: {
      target: 'localhost:' + process.env.PORT
    }
  })

  done()
})

gulp.task('bundle', gulp.series(
  gulp.parallel(
    'scripts',
    'styles',
    'images'
  ),
  'html'
))

gulp.task('watch', (done) => {

  gulp.watch(src.path + src.html.entry, gulp.series('html'))
  gulp.watch(src.path + src.scripts.path, gulp.series('scripts'))
  gulp.watch(src.path + src.styles.path, gulp.series('styles'))
  gulp.watch(src.path + src.images.path, gulp.series('images'))

  done()
})

gulp.task('serve', (done) => {
  const options = {
    script: server.path + server.entry,
    env: {
      'NODE_ENV': process.env.NODE_ENV
    },
    watch: [ 'server/*' ],
    exec: 'babel-node'
  }

  return g.nodemon(options)
})

gulp.task('default', gulp.series(
  gulp.parallel(
    'dev',
    'bundle'
  ),
  'watch',
  gulp.parallel(
    'serve',
    'browser'
  )
))
