import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cors from 'cors';

import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/order', orderRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`MongoDB Error: ${err}`));

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Server is up and runnig on : ${PORT} 🚀🚀🚀`);
});
