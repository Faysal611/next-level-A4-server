import { toNodeHandler } from "better-auth/node";
import express from "express"
import { auth } from "../utils/auth";
import { customerRouter } from "./modules/customer/customer.router";
import { providerRouter } from "./modules/provider/provider.router";
import { publicRouter } from "./modules/public/public.router";
import { verify } from "./middlewares/verify";
import { roles } from "../generated/prisma/enums";
import { getUser } from "../utils/getUser";
import { adminRouter } from "./modules/admin/admin.router";
export const app = express();

app.get("/api/auth/me", verify(roles.admin, roles.customer, roles.provider), getUser)
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use("/public", publicRouter);
app.use("/customer", customerRouter);
app.use("/provider", providerRouter);
app.use("/admin", adminRouter);

app.get('/', (req, res) => {
    res.send('Welcome to FoodHub!')
})