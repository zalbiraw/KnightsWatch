import express from 'express'

import register from './api/register'
import login    from './api/login'
import auth     from './api/auth'

const api = (tables, authentication) => {
  const router = express.Router(),
        { Users, Invites } = tables,
        { secret, authenticate } = authentication

  register(router, { Users, Invites }, secret)
  login(router, { Users }, secret)
  auth(router, tables, authenticate)

  return router
}

export default api
