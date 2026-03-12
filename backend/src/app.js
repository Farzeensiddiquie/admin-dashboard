import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import indexRouter from "./routes/index.routes.js";
import userRouter from "./routes/auth.routes.js";


app.use("/api", indexRouter);
app.use("/api/users", userRouter);


export default app;