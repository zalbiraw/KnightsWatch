exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('invites').createTable('invites', function(table) {
      table.string('id').primary().unique().notNullable()
      table.string('email', 254).unique().notNullable()
      table.integer('role_id').references('roles.id').notNullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invites')
  ])
}
