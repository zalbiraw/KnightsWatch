const Requests = (coin) => {

  let auth = {}
  if (coin !== undefined) {
    auth = { Authorization: 'JWT ' + coin }
  }

  const type    = { 'Content-Type': 'application/json' },
        GET     = { method: 'GET',    headers: { ...auth } },
        POST    = { method: 'POST',   headers: { ...auth, ...type } },
        PUT     = { method: 'PUT',    headers: { ...auth, ...type } },
        DELETE  = { method: 'DELETE', headers: { ...auth, ...type } }

  const post = async (path, body, callbacks) => {

    methodsHelper(await fetch(path, {
      ...POST,
      body: JSON.stringify(body)
    }), callbacks)

  }

  const get = async (path, callbacks) => {
    methodsHelper(await fetch(path, { ...GET }), callbacks)
  }

  const put = async (path, body, callbacks) => {

    methodsHelper(await fetch(path, {
      ...PUT,
      body: JSON.stringify(body)
    }), callbacks)

  }

  const del = async (path, body, callbacks) => {

    methodsHelper(await fetch(path, {
      ...DELETE,
      body: JSON.stringify(body)
    }), callbacks)

  }

  const methodsHelper = async (res, { success, failure }) => {

    const options = {
            onSuccess: {},
            onFailure: {}
          }

    if (success && typeof success !== 'function') {

      if (success.preventNotification) {
        options.onSuccess.prevent = true
      }

      if (success.message) {
        options.onSuccess.message = success.message
      }

      if (success.duration) {
        options.onSuccess = success.duration
      }

      success = success.callback

    }

    if (failure && typeof failure !== 'function') {

      if (failure.preventNotification) {
        options.onSuccess.prevent = true
      }

      if (failure.message) {
        options.onSuccess.message = failure.message
      }

      if (failure.duration) {
        options.onFailure = failure.duration
      }

      failure = failure.callback

    }

    if (Math.floor(res.status / 100) == 2) {

      if (!options.onSuccess.prevent) {
        notify(options.onSuccess.message ||
          res.statusText,
          options.onSuccess.duration)
      }

      if (success) {
        success(await res.json(), res)
      }

    } else {

      if (!options.onFailure.prevent) {
        notify(options.onFailure.message ||
          res.statusText,
          options.onFailure.duration)
      }

      if (failure) {
        failure(res)
      }

    }
  }

  const notify = (msg, duration) => Materialize.toast(msg, duration || 4000)

  return { post, get, put, del, methodsHelper, notify }
}

export default Requests
