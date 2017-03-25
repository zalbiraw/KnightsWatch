exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('roles').createTable('roles', function(table) {
      table.integer('id').primary().unique()
      table.string('role').primary().unique()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('roles')
  ])
}
