import { ConnectionPool, config } from 'mssql';


const dbConfig: config = {
  server: process.env.DATABASE_SERVER || 'localhost',
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  pool: {
    max: 5,
    min: 2, 
    idleTimeoutMillis: 30000, 
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const dbConnectionPool = new ConnectionPool(dbConfig);

dbConnectionPool.connect()
  .then(() => {
    console.log('Connected to the Members, Rewards database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default dbConnectionPool;
