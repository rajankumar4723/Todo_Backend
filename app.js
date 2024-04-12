import express from 'express';
import { config } from "dotenv";
import userRouter from './routes/user.js'//User Router
import taskRouter from './routes/task.js'//Task Router
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();
//using Middlewares
app.use(express.json()); //json data view for use express.json()
app.use(cookieParser({
    origin: [process.env.FORNTED_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,

}));
app.use(cors());        //Backend and Frontend Connection used cors 
//Using routes
app.use("/api/v1/users", userRouter);//Router used and standard URL like 3000/api/v1/users Every URL in Used
app.use("/api/v1/task", taskRouter);//Task Router i tell for app.js file 
config({
    path: "./data/config.env",
});

app.use(errorMiddleware);