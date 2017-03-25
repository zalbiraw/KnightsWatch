exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('players').createTable('players', function(table) {
      table.string('first').notNullable()
      table.string('last').notNullable()
      table.string('position').notNullable()
      table.string('team').notNullable()
      table.string('weight').notNullable()
      table.string('height').notNullable()
      table.increments().primary().unique().notNullable()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('players')
  ])
}
