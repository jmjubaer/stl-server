import dotenv from 'dotenv';
// dotenv.config({ path: path.join(process.cwd(), '/.env') });
dotenv.config();
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
