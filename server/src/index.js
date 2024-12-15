import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
dotenv.config({});

const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//apis
app.use("/api/v1/user", authRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server listening at http://localhost:${PORT}/`);
    })
}).catch((err)=>{
    console.log(err);
});