import express from 'express'

const users = (router, Users, Invites) => {

  const getUsers = async res => res.status(200).json(await Users()
                                  .join('roles', 'users.role_id', 'roles.id')
                                  .select('first', 'last', 'role', 'email'))

  router.route('/users')

    .get((req, res) => getUsers(res))

    .put(async (req, res) => {
      const body    = req.body,
            old     = body.old,
            update  = body.new

      if (old && old.email && Object.keys(update).length) {

        await Users().where(old).update(update)

        res.statusMessage = `${update.first} ${update.last} was updated successfully`
        getUsers(res)

      } else res.sendStatus(400)

    })

    .delete(async (req, res) => {
      const email = req.body.email

      if (email) {

        await Users().where({ email }).del()

        res.statusMessage = `The user, ${email}, was deleted successfully`
        getUsers(res)

      } else sendStatus(400)

    })

}

export default users
