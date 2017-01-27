import express  from 'express'
import bcrypt   from 'bcrypt'

import { createToken } from './helpers/token'

const login = (router, { Users }, secret) => {

  router.route('/login')

    .post(async (req, res) => {
      const body      = req.body,
            email     = body.email,
            password  = body.password

      if (email && password) {
        const user = await Users().where({ email }).first()

        if (user) {

          if (await bcrypt.compareSync(password, user.password)) {

            res.statusMessage = `Welcome back, ${user.first}`
            res.status(200).json(createToken(secret, email, user.role_id))

          } else {

            res.statusMessage = 'Invalid credentials'
            res.sendStatus(404)

          }

        } else {

          res.statusMessage = 'Invalid credentials'
          res.sendStatus(404)

        }

      } else res.sendStatus(400)

    })
}

export default login
