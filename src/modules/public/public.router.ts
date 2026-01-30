import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();

router.get("/get-providers", publicController.getProviders)
router.get("/get-provider-menu/:providerId", publicController.providerWithMenu)
router.get("/get-meals", publicController.getMeals)

export const publicRouter = router;