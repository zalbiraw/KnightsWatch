import passport from 'passport'
import jwt      from 'passport-jwt'

const strategy = (configs, Users) => {
  return new jwt.Strategy({
      secretOrKey: configs.jwt.secret,
      jwtFromRequest: jwt.ExtractJwt.fromAuthHeader()
    }, async (payload, done) => {

      const email = payload.email,
            user  = await Users().where({ email }).first()

      if (user) {
        done(null, { email, role_id: user.role_id })
      } else {
        done(new Error('User not found!'), null)
      }
    }
  )
}

export default strategy
