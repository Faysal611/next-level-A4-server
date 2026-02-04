import { Router } from "express";
import { adminController } from "./admin.controller";
import { verify } from "../../middlewares/verify";
import { roles } from "../../../generated/prisma/enums";

export const adminRouter = Router();

adminRouter.get("/users", verify(roles.admin), adminController.getUsers);
adminRouter.patch("/user/:userId", verify(roles.admin), adminController.updateStatus)
adminRouter.delete("/delete-cuisine/:cuisineId", verify(roles.admin), adminController.deleteCuisine)