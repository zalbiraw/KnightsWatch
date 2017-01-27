import express from 'express'
import crypto  from 'crypto'

const invites = (router, Users, Invites) => {

  const getInvites = async res => res.status(200).json(await Invites()
                                    .join('roles', 'invites.role_id', 'roles.id')
                                    .select('email', 'role'))

  router.route('/invites')

    .get((req, res) => getInvites(res))

    .post(async (req, res) => {
      const body    = req.body,
            email   = body.email,
            role_id = body.role_id

      if (email && role_id) {

        const user = await Users().where({ email }).first()

        if (!user) {

          const invite = await Invites().where({ email }).first()

          if (!invite) {

            await Invites().insert({
              id: crypto.randomBytes(32).toString('hex'),
              email,
              role_id
            })

            res.statusMessage = `Invite sent to ${email}`
            getInvites(res)

          } else {

            res.statusMessage = `${email} already has an active invite`
            res.sendStatus(409)

          }


        } else {

          res.statusMessage = `${email} is associated with the user ${user.first} ${user.last}`
          res.sendStatus(409)

        }

      } else res.sendStatus(400)

    })

    .delete(async (req, res) => {
      const email = req.body.email

      if (email) {

        await Invites().where({ email }).del()

        res.statusMessage = `The invite to ${email} has been rescinded`
        getInvites(res)

      } else res.sendStatus(400)

    })

}

export default invites
