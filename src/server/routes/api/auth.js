import express  from 'express'

import admin from './auth/admin'

const auth = (api_router, tables, authenticate) => {

  const router = express.Router()

  admin(router, tables)

  api_router.use('/auth', authenticate(), router)
}

export default auth
