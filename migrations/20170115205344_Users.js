exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users').createTable('users', function(table) {
      table.string('first', 35)
      table.string('last', 35)
      table.string('email', 254).primary()
      table.string('password')
      table.integer('role_id').unique().references('roles.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
