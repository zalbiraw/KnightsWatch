import express from 'express'

import auth   from './api/auth'
import secure from './api/secure'

const api = (tables, configs, authenticate) => {

  const router = express.Router(),
        { Users, Invites } = tables

  auth(router, tables, configs.jwt.secret)
  secure(router, tables, configs, authenticate)

  return router

}

export default api
