exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('roles').createTable('roles', function(table) {
      table.increments();
      table.string('role')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('roles')
  ])
}
