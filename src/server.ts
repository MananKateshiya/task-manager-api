import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import env from 'dotenv';
import AuthRouter from "@/routes/auth.routes";

env.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.1.69:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://manankateshiya:${process.env.MONGODB_PW}@cluster0.iti6i.mongodb.net/task-manager`)
    .then(() => {
        app.listen(process.env.PORT!, () => console.log(`Server is running on PORT: ${process.env.PORT!}`))
    })
    .catch((error: any) => {
        console.log("Connection Error: ", error)
    });

app.use("/api/auth", AuthRouter);