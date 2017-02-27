exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        knex('roles').insert({
          id: 3,
          role: 'Admin'
        }),
        knex('roles').insert({
          id: 2,
          role: 'Scout'
        }),
        knex('roles').insert({
          id: 1,
          role: 'Data Entry'
        })
      ]);
    });
};
