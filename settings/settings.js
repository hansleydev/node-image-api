module.exports = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV,
  origin: process.env.ORIGIN,
  DB_HOST: process.env.DB_HOST,
  DB_DBNAME: process.env.DB_DBNAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  STORAGE_URI: process.env.STORAGE_URI,
  STORAGE_NAME: process.env.STORAGE_NAME,
  STORAGE_KEY: process.env.STORAGE_KEY,
  CONTAINER_NAME: process.env.CONTAINER_NAME,
};
