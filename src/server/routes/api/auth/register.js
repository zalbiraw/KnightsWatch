import express  from 'express'
import bcrypt   from 'bcrypt'

import { createToken } from '../helpers/token'

const hashPassword = async(password) => {
  return await bcrypt.hashSync(password, 12)
}

const register = (router, { Users, Invites }, secret) => {

  router.route('/register')

    .post(async (req, res, next) => {

      const body      = req.body,
            id        = body.id,
            first     = body.first,
            last      = body.last,
            password  = body.password

      if (id && first && last && password) {

        const invite = await Invites().where({ id }).first()

        if (invite) {
          const email   = invite.email,
                role_id = invite.role_id

          await Users().insert({
            first,
            last,
            email,
            password: await hashPassword(password),
            role_id
          })

          await Invites().where({ id }).del()

          res.statusMessage = `${first} ${last} successfully registered`
          res.status(200).json(createToken(secret, email, role_id))

        } else {
          res.statusMessage = 'Invalid registration invite'
          res.sendStatus(404)
        }

      } else res.sendStatus(400)

    })
}

export default register
