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

const allowedOrigins = [
    process.env.POSTMAN_URL || "http://localhost:4000",
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., server-to-server, same-origin or Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy: Origin not allowed"), false);
    },
    credentials: true, // Required for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "X-Requested-With"
    ],
    exposedHeaders: ["Set-Cookie"]
}));

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