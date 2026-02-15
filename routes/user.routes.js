import { Router } from "express";
import userCtrl from "../controllers/user.controller.js";


const routes = Router();
/**
 * GET /api/users/
 * Retrieve all users
 */
routes.get("/",userCtrl.list);


export default routes;