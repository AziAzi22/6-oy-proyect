import { Router, type RequestHandler } from "express";
import {
  addStaff,
  deleteStaff,
  getAllStaffs,
  updateStaff,
} from "../controller/staff.ctr.js";

const staffRouter: Router = Router();

staffRouter.get("/get_all_staffs", getAllStaffs as RequestHandler);
staffRouter.post("/add_new_staff", addStaff as RequestHandler);
staffRouter.patch("/update_staff/:id", updateStaff as RequestHandler);
staffRouter.delete("/delete_staff/:id", deleteStaff as RequestHandler);

export default staffRouter;
