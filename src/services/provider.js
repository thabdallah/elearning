const Pool=require('pg').Pool;

const pool=new Pool({
user: 'postgres',
password: 'abdoul&2.0',
database: 'iat',
host: 'localhost',
port: 5432
});
pool.connect();

module.exports=pool;
