import gulp         from 'gulp'
import plugins      from 'gulp-load-plugins'
import { argv }     from 'yargs'
import browserify   from 'browserify'
import source       from 'vinyl-source-stream'
import wiredep      from 'wiredep'
import BrowserSync  from 'browser-sync'
import history      from 'connect-history-api-fallback'

import { configs, Logger } from './helpers'

const g                       = plugins(),
      { src, dest }           = configs,
      { info, error, debug }  = Logger(argv, g.util),
      browserSync             = BrowserSync.create()

let isProduction = false
process.env.NODE_ENV = 'development'
process.env.PORT = 8080

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

gulp.task('bundle', gulp.series(
  gulp.parallel(
    'scripts',
    'styles',
    'images'
  ),
  'html'
))

gulp.task('browser', (done) => {
  browserSync.init({
    proxy: {
      target: 'wall:' + process.env.PORT
    },
    open: false
  })

  done()
})

gulp.task('watch', (done) => {

  gulp.watch(src.path + src.html.entry, gulp.series('html'))
  gulp.watch(src.path + src.scripts.path, gulp.series('scripts'))
  gulp.watch(src.path + src.styles.path, gulp.series('styles'))
  gulp.watch(src.path + src.images.path, gulp.series('images'))

  const options = {
    script: 'gulpfile.babel.js',
    watch: [ 'gulpfile.babel.js' ],
    tasks: [ 'default' ],
    exec: 'babel-node'
  }

  return g.nodemon(options)

})

gulp.task('default', gulp.series(
  'bundle',
  gulp.parallel(
    'browser',
    'watch'
  )
))

gulp.task('production', gulp.series(
  done => {

    isProduction = true
    process.env.NODE_ENV = 'production'
    done()

  },
  'bundle'
))
