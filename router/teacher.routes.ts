import { Router, type RequestHandler } from "express";
import {
  addStaff,
  deleteStaff,
  getAllStaffs,
  updateStaff,
} from "../controller/staff.ctr.js";

const teacherRouter: Router = Router();

teacherRouter.get("/get_all_staffs", getAllStaffs as RequestHandler);
teacherRouter.post("/add_new_staff", addStaff as RequestHandler);
teacherRouter.patch("/update_staff/:id", updateStaff as RequestHandler);
teacherRouter.delete("/delete_staff/:id", deleteStaff as RequestHandler);

export default teacherRouter;
