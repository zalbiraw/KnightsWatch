import express from 'express'

import auth   from './api/auth'
import secure from './api/secure'

const api = (tables, authentication) => {

  const router = express.Router(),
        { Users, Invites } = tables,
        { secret, authenticate } = authentication

  auth(router, tables, secret)
  secure(router, tables, authenticate)

  return router

}

export default api
