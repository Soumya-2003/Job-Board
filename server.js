// package imports
import  express  from "express";
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from "morgan";


// file imports
import connectDB from "./config/db.js";


// routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";


//Dot env config
dotenv.config();


// mongodb connection
connectDB();

// rest object
const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);


// validation middleware
app.use(errorMiddleware);


// port
const PORT = process.env.PORT || 8080
// listen
app.listen(PORT, () => {
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});