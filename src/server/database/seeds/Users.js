exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          first: 'Admin',
          last: 'Knights',
          role_id: 3,
          email: 'admin@knights.com',
          password: '$2a$12$4ARyigZlQmiLlluQOImMNed.OiF6AsYtPb8NiYZ.u7RjKmBLVCrM6'
        }),
        knex('users').insert({
          first: 'Scout',
          last: 'Knights',
          role_id: 2,
          email: 'scout@knights.com',
          password: '$2a$12$4ARyigZlQmiLlluQOImMNed.OiF6AsYtPb8NiYZ.u7RjKmBLVCrM6'
        }),
        knex('users').insert({
          first: 'Data Entry',
          last: 'Knights',
          role_id: 1,
          email: 'de@knights.com',
          password: '$2a$12$4ARyigZlQmiLlluQOImMNed.OiF6AsYtPb8NiYZ.u7RjKmBLVCrM6'
        })
      ]);
    });
};
