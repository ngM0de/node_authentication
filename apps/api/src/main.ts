import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { basicMiddleware } from './basic/auth';
import dotenv from 'dotenv';
import { client } from './db';
import * as process from 'process';

dotenv.config();
client.connect().then(() => console.log(`db connected`)).catch(console.log);
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/basic-auth', basicMiddleware, (req, res) => {
  const {id, name} = res.locals.user;
  res.json(`Your id is ${id},name is ${name}`)
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at port:${port}`);
});

server.on('error', console.error);
