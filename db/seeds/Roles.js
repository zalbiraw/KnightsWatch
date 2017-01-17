exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        knex('roles').insert({role: 'Admin'}),
        knex('roles').insert({role: 'Scout'}),
        knex('roles').insert({role: 'Data Entry'})
      ]);
    });
};
