import express from 'express'

import admin from './secure/admin'
import scout from './secure/scout'

const secure = (api_router, tables, authenticate) => {

  const router      = express.Router(),
        { Players } = tables

  admin(router, tables)
  scout(router, tables)

  router.route('/player')

    .post(async (req, res, next) => {

      const body      = req.body,
            first     = body.first,
            last      = body.last,
            position  = body.position,
            team      = body.team,
            weight    = body.weight,
            height    = body.height

      if (first && last && position && team && weight && height) {

        const id = (await Players().insert({
          first,
          last,
          position,
          team,
          weight,
          height
        }))[0]

        res.statusMessage = `${first} ${last} was successfully added`
        res.status(200).json({ id })

      } else res.sendStatus(400)

    })

  api_router.use('/secure', authenticate(), router)
}

export default secure
