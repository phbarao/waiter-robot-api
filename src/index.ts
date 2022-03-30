import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import Order from './models/Order';

dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('save_order', async (data) => {
    try {
      await Order.create(data);
      socket.broadcast.emit('confirmation', data);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('load_orders', async () => {
    try {
      const orders = await Order.find();
      socket.emit('orders_list', orders);
    } catch (error) {
      console.log(error);
    }
  });
});

mongoose.connect(`${process.env.MONGO_URL}`);

mongoose.connection.once('open', () => {
  console.log(`>>> MongoDB connection: OK`);
});

server.listen(PORT, () => {
  console.log(`>>> Listening on PORT: ${PORT}`);
});
