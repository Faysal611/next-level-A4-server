import { Router } from "express";
import { providerController } from "./provider.controller";
import { verify } from "../../middlewares/verify";
import { roles } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create-provider", providerController.createProvider)
router.post("/create-meal", verify(roles.provider), providerController.createMeal)
router.post("/update-meal/:mealId", verify(roles.provider), providerController.updateMeal)
router.delete("/delete-meal/:mealId", verify(roles.provider), providerController.deleteMeal)
router.patch("/order/:orderId", verify(roles.provider), providerController.updateOrder)
router.get("/order/:providerId", verify(roles.provider), providerController.getProviderOrders)
export const providerRouter = router;