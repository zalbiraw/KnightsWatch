import express    from 'express'
import jws        from 'jws'
import fetch      from 'node-fetch'

import admin from './secure/admin'
import scout from './secure/scout'

const googleapi = 'https://www.googleapis.com/oauth2/v4/token'

const secure = (api_router, tables, configs, authenticate) => {

  const router      = express.Router(),
        { youtube } = configs,
        { Players } = tables

  const header  = { alg: 'RS256', typ: 'JWT' },
        payload = {
          iss: youtube.client_email,
          scope: 'https://www.googleapis.com/auth/youtube.upload',
          aud: 'https://www.googleapis.com/oauth2/v4/token'
        }

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

    .post(async (req, res, next) => {

      const { iat } = req.body

      if (iat) {

        payload.exp = (iat + 60 * 30)
        payload.iat = iat

        const jwt   = jws.sign({ header, payload, privateKey: youtube.private_key }),
              gres  = await getToken(jwt)

        res.status(gres.status).json({ token: await gres.json() })

      } else res.sendStatus(400)

    })

  api_router.use('/secure', authenticate(), router)
}

const getToken = async jwt => {
  const grant_type  = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer',
        res         = await fetch(googleapi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } ,
          body: `grant_type=${grant_type}&assertion=${jwt}`
        })

  return res

}

export default secure
