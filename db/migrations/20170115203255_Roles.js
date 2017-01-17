exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('roles').createTable('roles', function(table) {
      table.increments().primary().unique().notNullable()
      table.string('role').notNullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('roles')
  ])
}
