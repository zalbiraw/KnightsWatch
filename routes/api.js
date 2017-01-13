import express from 'express'

import knex from '../db/knex'

const router = express.Router()

function Roles() {
  return knex('roles')
}

function Users() {
  return knex('users')
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

export default router
