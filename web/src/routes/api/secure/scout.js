import express  from 'express'

const scout = (auth_router, { Players }) => {

  const router = express.Router()

  router.use((req, res, next) =>{

    if (parseInt(req.user.role_id) < 2) {

      res.statusMessage = 'Insufficient Access Privileges'
      res.sendStatus(401)

    } else next()

  })

  router.route('/player/:id')

    .get(async (req, res) => {
      const id      = req.params.id,
            player  = (await Players().select().where({ id }))[0]

      if (player) {

        res.status(200).json(player)

      } else {

        res.statusMessage = 'Unable to find player'
        res.sendStatus(404)

      }

    })

  router.route('/search')

    .post(async (req, res) => {

      const { term }  = req.body

      if (term && term.length > 1) {

        const players = await Players().select()
              .where('first', 'like', `%${term}%`)
              .orWhere('last', 'like', `%${term}%`)
              .orWhere('position', 'like', `%${term}%`)
              .orWhere('team', 'like', `%${term}%`)

        res.status(200).json(players)

      } else {

        res.statusMessage = 'The search term is too short'
        res.sendStatus(500)
      }

    })


  auth_router.use('/scout', router)
}

export default scout
