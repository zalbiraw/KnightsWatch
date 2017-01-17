import express  from 'express'
import crypto   from 'crypto'

import knex from '../db/knex'

const router = express.Router()

function Roles() {
  return knex('roles')
}

function Users() {
  return knex('users')
}

function Invites() {
  return knex('invites')
}

function get(res, query) {
  query.then((data) => {
    res.status(200).json(data)
  })
}

router
  .get('/roles', (req, res) => {
    get(res, Roles().select())
  })

router
  .get('/users', (req, res) => {
    const query = Users().join('roles', 'users.role_id', 'roles.id')
                    .select('first', 'last', 'role', 'email')
    get(res, query)
  })

router
  .get('/invites', (req, res) => {
    get(res, Invites().select('email', 'role_id'))
  })
  .post('/invites', (req, res) => {
    Users().select('*').where({
      email: req.body.email
    }).then((data) => {
      if (data.length) {
        res.status(500).json({
          msg: 'already in the db'
        })
      } else {
        Invites().insert({
          id: crypto.randomBytes(32).toString('hex'),
          email: req.body.email,
          role_id: req.body.role_id
        }).then(() => {
          get(res, Invites().select('email', 'role_id'))
        }).catch((err) => {
          res.status(500).json(err)
        })
      }
    })
  })

router
  .post('/register', (req, res) => {
    Invites().select().where({
      id: req.body.id
    }).then((data) => {
      if (!data.length) {
        res.status(500).json({
          msg: 'not invited'
        })
      } else {
        console.log(req.body.first, req.body.last, req.body.password, data)
        Users().insert({
          first: req.body.first,
          last: req.body.last,
          password: req.body.password,
          email: data[0].email,
          role_id: data[0].role_id
        }).then(() => {
          Invites().where({
            id: req.body.id
          }).del().then(() => {
            res.status(200).json({
              msg: 'great success'
            })
          })
        })
      }
    })
  })

export default router
