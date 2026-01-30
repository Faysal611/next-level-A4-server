import { Router } from "express";
import { verify } from "../../middlewares/verify";
import { roles } from "../../../generated/prisma/enums";
import { customerController } from "./customer.controller";

const router = Router();

router.post("/order", verify(roles.customer), customerController.createOrder)
router.get("/order", verify(roles.customer), customerController.getOrders)
router.get("/order/:orderId", verify(roles.customer), customerController.orderDetails)

export const customerRouter = router;