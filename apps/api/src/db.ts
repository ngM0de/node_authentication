import { Client } from 'pg';


export const client = new Client({
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: true,
  keepAlive: true
});



export const getUserCredentials =  (username: string) =>  client.query(`select * from users where name='${username}'`)
