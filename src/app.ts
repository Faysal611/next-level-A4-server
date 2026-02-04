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
import cors from "cors";
export const app = express();

app.use(cors({
    origin: [
        "http://localhost:4000"
    ],
    credentials: true,                  // MUST be true for cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],     // if needed for debugging
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.get("/api/auth/me", verify(roles.admin, roles.customer, roles.provider), getUser)
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use("/public", publicRouter);
app.use("/customer", customerRouter);
app.use("/provider", providerRouter);
app.use("/admin", adminRouter);

app.get('/', (req, res) => {
    res.send('Welcome to FoodHub server!')
})