import jwt from 'jsonwebtoken'

const createToken = (secret, email, role_id) => {

  const token = { coin: jwt.sign({ email }, secret, { expiresIn: '1h' }) }

  if (role_id == 1) {
    token.isAdmin = true
  }

  return token

}

export { createToken }
