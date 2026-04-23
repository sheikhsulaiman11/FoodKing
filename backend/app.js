import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import cookieParser from "cookie-parser";
import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import errorHandler from "./middleware/errorMiddleware.js";
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const app = express();


app.set('trust proxy', 1);


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongoDB connected successfully'))
  .catch((err) => console.log(err));

app.use(cors({
    origin: 'http://localhost:5173', // your React app URL
    credentials: true,               // needed if you use cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use("/api/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});