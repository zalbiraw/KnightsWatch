exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          first: 'Zaid',
          last: 'Albirawi',
          role_id: 1,
          email: 'zalbiraw@gmail.com',
          password: 'topsecret'
        })
      ]);
    });
};
