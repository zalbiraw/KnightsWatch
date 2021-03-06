exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users').createTable('users', function(table) {
      table.string('first', 35).notNullable()
      table.string('last', 35).notNullable()
      table.string('email', 254).primary().unique()
      table.string('password').notNullable()
      table.integer('role_id').references('roles.id').notNullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
