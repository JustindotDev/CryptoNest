import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import cors from "cors";
import orderRoutes from './routes/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/userLogin.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json(), cors());

app.use("/api/orders/", orderRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/login/", loginRoutes);

app.listen(PORT, () =>  {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
