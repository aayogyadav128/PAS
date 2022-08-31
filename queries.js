const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.251',
  database: 'pes',
  password: 'aqitumantu1',
  port: 5432,
})