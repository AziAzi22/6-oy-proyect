import { Router, type RequestHandler } from "express";
import {
  addStudnet,
  deleteStudnet,
  getAllStudnets,
  updateStudnet,
} from "../controller/student.ctr.js";

const studentRouter: Router = Router();

studentRouter.get("/get_all_students", getAllStudnets as RequestHandler);
studentRouter.post("/add_new_student", addStudnet as RequestHandler);
studentRouter.patch("/update_student/:id", updateStudnet as RequestHandler);
studentRouter.delete("/delete_student/:id", deleteStudnet as RequestHandler);


export default studentRouter;