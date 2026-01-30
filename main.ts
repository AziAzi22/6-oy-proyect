import express from "express";
import cors  from "cors";
import dotenv from "dotenv";
import studentRouter from "./router/student.routes.js";
dotenv.config();    


const app = express();

app.use(cors());
app.use(express.json()); 

/// routers

app.use(studentRouter)

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Server is running at: ${PORT}`);
});