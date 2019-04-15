import express  from 'express'
import google   from 'googleapis'

import admin from './secure/admin'
import scout from './secure/scout'

const secure = (api_router, tables, configs, authenticate) => {

  const router      = express.Router(),
        { youtube } = configs,
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

  router.route('/google-auth')

    .get(async (req, res, next) => {

      const jwt = new google.auth.JWT(
        youtube.client_email,
        null,
        youtube.private_key,
        youtube.scopes,
        null
      )

      jwt.authorize((err, token) => {
        if (err) {
          res.statusMessage = 'Unable to authorize google service.'
          res.status(503).json({ err })
        }

        res.status(200).json({ token })
      })

    })

  api_router.use('/secure', authenticate(), router)
}

export default secure
