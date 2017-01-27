import express  from 'express'

import roles    from './admin/roles'
import users    from './admin/users'
import invites  from './admin/invites'

const admin = (auth_router, { Invites, Users, Roles }) => {

  const router = express.Router()

  router.use((req, res, next) =>{

    if (req.user.role_id != '1') {

      res.statusMessage = 'Insufficient Access Privileges'
      res.sendStatus(401)

    } else next()

  })

  users(router, Users, Invites)
  invites(router, Users, Invites)
  roles(router, Roles)

  auth_router.use('/admin', router)
}

export default admin
