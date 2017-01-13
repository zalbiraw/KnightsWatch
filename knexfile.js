module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './citadel.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    debug: false,
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     'localhost',
      database: 'citadel',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
