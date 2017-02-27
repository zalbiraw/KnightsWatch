import jwt from 'jsonwebtoken'

const createToken = (secret, email, role_id) => {

  const token = { coin: jwt.sign({ email }, secret, { expiresIn: '1h' }) }

  switch(role_id) {

    case 3:
      token.isAdmin = true
      break

    case 2:
      token.isScout = true
      break

    case 1:
      token.isDataEntry = true

  }


  return token

}

export { createToken }
