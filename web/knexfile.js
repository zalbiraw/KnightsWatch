module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './citadel.sqlite'
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/database/seeds'
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
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }

};
