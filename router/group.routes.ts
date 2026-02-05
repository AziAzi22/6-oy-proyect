import { Router, type RequestHandler } from "express";
import {
  addGroup,
  deleteGroup,
  getAllGroups,
  updateGroup,
} from "../controller/group.ctr.js";

const groupRouter: Router = Router();

groupRouter.get("/get_all_groups", getAllGroups as RequestHandler);
groupRouter.post("/add_new_group", addGroup as RequestHandler);
groupRouter.patch("/update_group/:id", updateGroup as RequestHandler);
groupRouter.delete("/delete_group/:id", deleteGroup as RequestHandler);

export default groupRouter;
