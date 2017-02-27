const Tables = (knex) => {

  const Users = () => {
    return knex('users')
  }

  const Roles = () => {
    return knex('roles')
  }

  const Invites = () => {
    return knex('invites')
  }

  const Players = () => {
    return knex('players')
  }

  return { Users, Roles, Invites, Players }
}

export default Tables
