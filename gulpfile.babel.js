import gulp         from 'gulp'
import plugins      from 'gulp-load-plugins'
import { argv }     from 'yargs'
import browserify   from 'browserify'
import source       from 'vinyl-source-stream'
import express      from 'express'

import { configs, Logger } from './helpers/helpers'

const g                       = plugins(),
      app                     = express(),
      { port, src, dest }     = configs.app,
      { info, error, debug }  = Logger(argv, g.util)

let isProduction = true
process.env.NODE_ENV = 'production'
app.use('/', express.static('public'))

gulp.task('bundle', (done) => {
  debug('bundling...')

  browserify({
    entries: src.path + src.entry,
    transform: [
      [
        'babelify',
        {
          presets: [
            'latest',
            'react'
          ]
        }
      ]
    ]
  })
  .bundle()
  .on('error', error)
  .pipe(source(dest.js.entry))
  .pipe(g.if(isProduction, g.streamify(g.uglify())))
  .pipe(gulp.dest(dest.path + dest.js.path))

  debug('bundled')
  done()
})

gulp.task('serve', (done) => {
  app.listen(port)
  done()
})

gulp.task('watch', (done) => {
  done()
})

gulp.task('dev', (done) => {
  isProduction = false
  process.env.NODE_ENV = 'development'
  done()
})

gulp.task('default', gulp.series(
  'dev',
  'bundle',
  gulp.parallel(
    'serve',
    'watch'
  )
))
