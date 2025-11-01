

import express from "express";
import { register, login, adminRegister } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/admin/register", authenticate, authorizeRoles("admin"), adminRegister);
export default userRouter;