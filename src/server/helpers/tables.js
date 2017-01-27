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

  return { Users, Roles, Invites }
}

export default Tables
