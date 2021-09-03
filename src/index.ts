import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_ENDPOINT || "mongodb://localhost/project2";

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

import {userRouter} from './modules/user/user.routes';
app.use('/user', userRouter);

connect(MONGODB_URL, (err)=>{
  if (err) {
    console.log('unable to connect mongodb. error: ' + err);
  } else {
    console.log('connected mongodb successfully');
  }
})

app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`);
})