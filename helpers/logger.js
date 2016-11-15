export default function(args, gutil) {
  const { log, colors } = gutil,
        ERROR_LEVEL = 1 | 1 << 1,
        WARN_LEVEL  = ERROR_LEVEL | 1 << 2,
        INFO_LEVEL  = WARN_LEVEL | 1 << 2,
        DEBUG_LEVEL = INFO_LEVEL | 1 << 3,
        ERROR   = 1,
        WARN    = 1 << 1,
        INFO    = 1 << 2,
        DEBUG   = 1 << 3

  let log_level

  if (args.error) {
    log_level = ERROR_LEVEL
    info('Log Level: Up to errors')
  } else if (args.warning) {
    log_level = WARN_LEVEL
    info('Log Level: Up to warnings')
  } else if (args.info) {
    log_level = INFO_LEVEL
    info('Log Level: Up to info')
  } else if (args.debug) {
    log_level = DEBUG_LEVEL
    info('Log Level: Up to debug')
  } else if (args.level) {
    log_level = parse(args.level)
    info('Log Level: custom(' + args.level + ')')
  } else {
    log_level = INFO_LEVEL
    info('Log Level: default(INFO_LEVEL)')
  }

  function parse(levels) {
    let mask = 0
    levels.split('|').forEach(function(level) {
      switch(level) {
        case 'ERROR':
          mask |= ERROR
          break
        case 'WARN':
          mask |= WARN
          break
        case 'INFO':
          mask |= INFO
          break
        case 'DEBUG':
          mask |= DEBUG
      }
    })
    return mask
  }

  function error(msg) {
    log_helper(ERROR, msg)
  }

  function warning(msg) {
    log_helper(WARN, msg)
  }

  function info(msg) {
    log_helper(INFO, msg)
  }

  function debug(msg) {
    log_helper(DEBUG, msg)
  }

  function log_helper(level, msg) {
    if ((log_level & level) != 0) {
      msg = ' ' + msg + ' '
      switch(level) {
        case ERROR:
          log(colors.bgRed(' ERROR ') + ' ' + colors.red(msg))
          break

        case WARN:
          log(colors.bgYellow.black(' WARN ') + ' ' + colors.yellow(msg))
          break

        case INFO:
          log(colors.bgBlue(' INFO ') + ' ' + msg)
          break

        case DEBUG:
          log(colors.bgYellow.black(' DEBUG ') + colors.bgBlue(msg))
          break

        default:
          log(msg)
      }
    }
  }

  return { error, warning, info, debug }
}