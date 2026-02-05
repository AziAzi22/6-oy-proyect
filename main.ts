import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRouter from "./router/student.routes.js";
import botRouter from "./router/bot.routes.js";
import staffRouter from "./router/staff.routes.js";
import groupRouter from "./router/group.routes.js";
import teacherRouter from "./router/teacher.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/// routers

app.use(staffRouter);
app.use(teacherRouter)
app.use(groupRouter);
app.use(studentRouter);

app.use(botRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
