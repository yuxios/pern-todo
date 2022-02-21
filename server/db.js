const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: '#lakshya007#', // todo .env file
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
})

module.exports = pool;

// how to hide and this authentication