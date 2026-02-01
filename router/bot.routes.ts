import { Router, type RequestHandler } from "express";
import { getMessageFromToday } from "../controller/bot.ctr.js";

const botRouter: Router = Router();

botRouter.get("/get_message_from_today", getMessageFromToday as RequestHandler);

export default botRouter;
