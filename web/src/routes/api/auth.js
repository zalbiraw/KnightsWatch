import express from 'express'

import register from './auth/register'
import login    from './auth/login'

const auth = (api_router, { Users, Invites }, secret) => {

  const router = express.Router()

  register(router, { Users, Invites }, secret)
  login(router, { Users }, secret)

  api_router.use('/auth', router)

}

export default auth
