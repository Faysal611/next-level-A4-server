// src/app.ts
import { toNodeHandler } from "better-auth/node";
import express from "express";

// utils/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id              String           @id @default(cuid())\n  providerProfile ProviderProfile?\n  role            roles            @default(customer)\n  name            String\n  email           String\n  emailVerified   Boolean          @default(false)\n  image           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  sessions        Session[]\n  accounts        Account[]\n  orders          order[]\n  reviews         review[]\n  status          userStatus?      @default(active)\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel ProviderProfile {\n  id         String  @id @default(cuid())\n  user       User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  userId     String  @unique\n  about      String? @db.VarChar(250)\n  restaurant String  @db.VarChar(50)\n  meals      meal[]\n  orders     order[]\n}\n\nmodel meal {\n  id              String          @id @default(cuid())\n  name            String          @db.VarChar(100)\n  providerProfile ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  providerId      String\n  ingredients     String[]\n  tags            String[]\n  description     String\n  review          review[]\n  orderId         order[]\n  cuisine         category?       @relation(fields: [cuisineId], references: [id], onDelete: Cascade)\n  cuisineId       String\n  price           Int\n  image           String?\n}\n\nmodel review {\n  id      String @id @default(cuid())\n  rating  Float\n  comment String @db.VarChar(250)\n  meal    meal   @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  mealId  String\n  user    User   @relation(fields: [userId], references: [id])\n  userId  String\n}\n\nmodel order {\n  id         String          @id @default(cuid())\n  meal       meal            @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  mealId     String\n  status     status          @default(placed)\n  user       User            @relation(fields: [userId], references: [id], onDelete: Cascade)\n  userId     String\n  quantity   Int\n  provider   ProviderProfile @relation(fields: [providerId], references: [id])\n  providerId String\n}\n\nmodel category {\n  id      String @id @default(cuid())\n  cuisine String @unique @db.VarChar(20)\n  meal    meal[]\n}\n\nenum status {\n  placed\n  preparing\n  ready\n  delivered\n  cancelled\n}\n\nenum userStatus {\n  suspended\n  active\n}\n\nenum roles {\n  admin\n  provider\n  customer\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"role","kind":"enum","type":"roles"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"orders","kind":"object","type":"order","relationName":"UserToorder"},{"name":"reviews","kind":"object","type":"review","relationName":"UserToreview"},{"name":"status","kind":"enum","type":"userStatus"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"about","kind":"scalar","type":"String"},{"name":"restaurant","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"meal","relationName":"ProviderProfileTomeal"},{"name":"orders","kind":"object","type":"order","relationName":"ProviderProfileToorder"}],"dbName":null},"meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileTomeal"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"ingredients","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"review","kind":"object","type":"review","relationName":"mealToreview"},{"name":"orderId","kind":"object","type":"order","relationName":"mealToorder"},{"name":"cuisine","kind":"object","type":"category","relationName":"categoryTomeal"},{"name":"cuisineId","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"}],"dbName":null},"review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"meal","relationName":"mealToreview"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToreview"},{"name":"userId","kind":"scalar","type":"String"}],"dbName":null},"order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"meal","relationName":"mealToorder"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"status"},{"name":"user","kind":"object","type":"User","relationName":"UserToorder"},{"name":"userId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToorder"},{"name":"providerId","kind":"scalar","type":"String"}],"dbName":null},"category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cuisine","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"meal","relationName":"categoryTomeal"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var userStatus = {
  suspended: "suspended",
  active: "active"
};
var roles = {
  admin: "admin",
  provider: "provider",
  customer: "customer"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// utils/auth.ts
var auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: roles.customer
      },
      status: {
        type: "string",
        defaultValue: "active"
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  trustedOrigins: [
    "http://localhost:4000",
    "http://localhost:3000",
    process.env.POSTMAN_URL || "https://client-sigma-ten-42.vercel.app"
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      // ← critical change
      secure: true,
      // ← must be true (HTTPS required)
      httpOnly: true,
      path: "/"
    },
    // optional but helpful
    useSecureCookies: true
  }
});

// src/modules/customer/customer.router.ts
import { Router } from "express";

// src/middlewares/verify.ts
var verify = (...arr) => {
  return async (req, res, next) => {
    const sesssion = await auth.api.getSession({
      headers: new Headers(req.headers)
    });
    if (sesssion == null) {
      return res.status(401).send({ message: "Please log in", success: false });
    }
    if (sesssion.user.status == userStatus.suspended) {
      return res.status(401).send({ message: "Your account is suspended" });
    }
    if (!arr.includes(sesssion.user.role)) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.session = sesssion.session;
    req.user = sesssion.user;
    next();
  };
};

// src/modules/customer/customer.service.ts
var createOrder = async (data) => {
  return await prisma.$transaction(async (tx) => {
    const providerId = await tx.providerProfile.findFirst({
      where: {
        meals: {
          some: {
            id: data.mealId
          }
        }
      },
      select: {
        id: true
      }
    });
    return await tx.order.create({
      data: {
        ...data,
        providerId: providerId?.id
      }
    });
  });
};
var getOrders = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      meal: true
    }
  });
};
var orderDetails = async (orderId) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      meal: true
    }
  });
};
var addReview = async (review) => {
  return await prisma.review.create({
    data: review
  });
};
var getCuisine = async () => {
  return await prisma.category.findMany();
};
var customerService = {
  createOrder,
  getOrders,
  orderDetails,
  addReview,
  getCuisine
};

// src/modules/customer/customer.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const data = await customerService.createOrder({ ...req.body, userId: req.user?.id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var getOrders2 = async (req, res) => {
  try {
    const data = await customerService.getOrders(req.user?.id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var orderDetails2 = async (req, res) => {
  try {
    const data = await customerService.orderDetails(req.params.orderId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var addReview2 = async (req, res) => {
  try {
    const review = req.body;
    const data = await customerService.addReview({ ...review, userId: req.user?.id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var getCuisine2 = async (req, res) => {
  try {
    const data = await customerService.getCuisine();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var customerController = {
  createOrder: createOrder2,
  getOrders: getOrders2,
  orderDetails: orderDetails2,
  addReview: addReview2,
  getCuisine: getCuisine2
};

// src/modules/customer/customer.router.ts
var router = Router();
router.post("/order", verify(roles.customer), customerController.createOrder);
router.get("/order", verify(roles.customer, roles.admin), customerController.getOrders);
router.get("/order/:orderId", verify(roles.customer), customerController.orderDetails);
router.post("/add-review", verify(roles.customer), customerController.addReview);
router.get("/get-cuisine", customerController.getCuisine);
var customerRouter = router;

// src/modules/provider/provider.router.ts
import { Router as Router2 } from "express";

// src/modules/provider/provider.service.ts
var createProvider = async (data) => {
  return await prisma.$transaction(
    async (tx) => {
      await tx.user.update({
        where: { id: data.userId },
        data: { role: roles.provider }
      });
      return await tx.providerProfile.create({ data });
    },
    {
      maxWait: 2e4,
      timeout: 3e4
    }
  );
};
var createMeal = async (meal) => {
  const { cuisine, userId, ...mealWithoutCuisine } = meal;
  return await prisma.$transaction(
    async (tx) => {
      const provider = await tx.providerProfile.findUnique({
        where: {
          userId
        }
      });
      const data = await tx.category.upsert({
        where: { cuisine },
        update: {},
        create: {
          cuisine
        }
      });
      return await tx.meal.create({
        data: {
          ...mealWithoutCuisine,
          cuisineId: data.id,
          providerId: provider?.id
        }
      });
    },
    {
      maxWait: 2e4,
      timeout: 3e4
    }
  );
};
var updateMeal = async (mealData, mealId) => {
  const { cuisine, ...restData } = mealData;
  if (!cuisine) {
    return await prisma.meal.update({
      where: { id: mealId },
      data: { ...restData }
    });
  }
  return await prisma.$transaction(async (tx) => {
    const data = await tx.category.upsert({
      where: { cuisine },
      update: {},
      create: {
        cuisine
      }
    });
    return await tx.meal.update({
      where: { id: mealId },
      data: {
        ...restData,
        cuisineId: data.id
      }
    });
  }, {
    maxWait: 2e4,
    timeout: 3e4
  });
};
var deleteMeal = async (mealId) => {
  return await prisma.meal.delete({
    where: { id: mealId }
  });
};
var updateOrder = async (orderId, status2) => {
  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: status2
    }
  });
};
var getProviderOrders = async (providerId) => {
  return await prisma.providerProfile.findUnique({
    where: {
      userId: providerId
    },
    include: {
      orders: true
    }
  });
};
var providerService = {
  createProvider,
  createMeal,
  updateMeal,
  deleteMeal,
  updateOrder,
  getProviderOrders
};

// src/modules/provider/provider.controller.ts
var createProvider2 = async (req, res) => {
  try {
    const data = await providerService.createProvider(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
var createMeal2 = async (req, res) => {
  try {
    const data = await providerService.createMeal(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const data = await providerService.updateMeal(req.body, mealId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const data = await providerService.deleteMeal(mealId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var updateOrder2 = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status: status2 } = req.body;
    const data = await providerService.updateOrder(orderId, status2);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var getProviderOrders2 = async (req, res) => {
  try {
    const { providerId } = req.params;
    const data = await providerService.getProviderOrders(providerId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var providerController = {
  createProvider: createProvider2,
  createMeal: createMeal2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2,
  updateOrder: updateOrder2,
  getProviderOrders: getProviderOrders2
};

// src/modules/provider/provider.router.ts
var router2 = Router2();
router2.post("/create-provider", providerController.createProvider);
router2.post("/create-meal", verify(roles.provider), providerController.createMeal);
router2.post("/update-meal/:mealId", verify(roles.provider), providerController.updateMeal);
router2.delete("/delete-meal/:mealId", verify(roles.provider), providerController.deleteMeal);
router2.patch("/order/:orderId", verify(roles.provider), providerController.updateOrder);
router2.get("/order/:providerId", verify(roles.provider), providerController.getProviderOrders);
var providerRouter = router2;

// src/modules/public/public.router.ts
import { Router as Router3 } from "express";

// src/modules/public/public.service.ts
var getProviders = async () => {
  return await prisma.providerProfile.findMany({
    include: {
      user: true
    }
  });
};
var getMeals = async (cuisine, lowestPrice, highestPrice, page, limit, search) => {
  let andConditions = [];
  if (cuisine.length != 0) {
    andConditions.push({
      cuisine: {
        cuisine: {
          in: cuisine
        }
      }
    });
  }
  if (lowestPrice != void 0) {
    andConditions.push({
      price: {
        gte: lowestPrice
      }
    });
  }
  if (highestPrice != void 0) {
    andConditions.push({
      price: {
        lte: highestPrice
      }
    });
  }
  if (search != void 0) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  return await prisma.$transaction(
    async (tx) => {
      const count = await tx.meal.count();
      const meals = await tx.meal.findMany({
        where: {
          AND: andConditions
        },
        skip: (page - 1) * limit,
        take: limit
      });
      return {
        allMealData: {
          meals,
          pagination: {
            totalMealCount: count,
            pageCount: Math.ceil(count / limit),
            currentPage: page,
            limit,
            currentPageMealCount: meals.length
          }
        }
      };
    },
    {
      maxWait: 2e4,
      timeout: 3e4
    }
  );
};
var providerWithMenu = async (userId) => {
  return await prisma.providerProfile.findUnique({
    where: {
      userId
    },
    include: {
      meals: true
    }
  });
};
var getMeal = async (mealId) => {
  return await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      cuisine: true,
      providerProfile: true
    }
  });
};
var publicService = {
  getProviders,
  getMeals,
  providerWithMenu,
  getMeal
};

// src/modules/public/public.controller.ts
var getProviders2 = async (req, res) => {
  try {
    const data = await publicService.getProviders();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var getMeals2 = async (req, res) => {
  try {
    console.log(req.query);
    const cuisine = typeof req.query.cuisine == "string" ? req.query.cuisine.split(",") : [];
    const lowest = req.query.lowest == void 0 ? void 0 : parseInt(req.query.lowest);
    const highest = req.query.highest == void 0 ? void 0 : parseInt(req.query.highest);
    const page = req.query.page == void 0 ? 1 : parseInt(req.query.page);
    const limit = req.query.limit == void 0 ? 10 : parseInt(req.query.limit);
    const search = req.query.search == void 0 ? void 0 : req.query.search;
    const data = await publicService.getMeals(cuisine, lowest, highest, page, limit, search);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var providerWithMenu2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await publicService.providerWithMenu(userId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var getMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const data = await publicService.getMeal(mealId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var publicController = {
  getProviders: getProviders2,
  getMeals: getMeals2,
  providerWithMenu: providerWithMenu2,
  getMeal: getMeal2
};

// src/modules/public/public.router.ts
var router3 = Router3();
router3.get("/get-providers", publicController.getProviders);
router3.get("/get-provider-menu/:userId", publicController.providerWithMenu);
router3.get("/get-meals", publicController.getMeals);
router3.get("/get-meal/:mealId", publicController.getMeal);
var publicRouter = router3;

// utils/getUser.ts
var getUser = async (req, res) => {
  return res.status(200).json({ ...req.user, ...req.session });
};

// src/modules/admin/admin.router.ts
import { Router as Router4 } from "express";

// src/modules/admin/admin.service.ts
var getUsers = async () => {
  return await prisma.user.findMany();
};
var updateStatus = async (userId) => {
  return await prisma.$transaction(
    async (tx) => {
      const userStatusDB = await tx.user.findUnique({
        where: {
          id: userId
        },
        select: {
          status: true
        }
      });
      if (userStatusDB?.status == userStatus.active) {
        return await tx.user.update({
          where: {
            id: userId
          },
          data: {
            status: userStatus.suspended
          }
        });
      }
      return await tx.user.update({
        where: {
          id: userId
        },
        data: {
          status: userStatus.active
        }
      });
    },
    {
      maxWait: 2e4,
      timeout: 3e4
    }
  );
};
var deleteCuisine = async (cuisineId) => {
  return await prisma.category.delete({
    where: {
      id: cuisineId
    }
  });
};
var adminService = {
  getUsers,
  updateStatus,
  deleteCuisine
};

// src/modules/admin/admin.controller.ts
var getUsers2 = async (req, res) => {
  try {
    const data = await adminService.getUsers();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var updateStatus2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await adminService.updateStatus(userId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var deleteCuisine2 = async (req, res) => {
  try {
    const { cuisineId } = req.params;
    const data = await adminService.deleteCuisine(cuisineId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
var adminController = {
  getUsers: getUsers2,
  updateStatus: updateStatus2,
  deleteCuisine: deleteCuisine2
};

// src/modules/admin/admin.router.ts
var adminRouter = Router4();
adminRouter.get("/users", verify(roles.admin), adminController.getUsers);
adminRouter.patch("/user/:userId", verify(roles.admin), adminController.updateStatus);
adminRouter.delete("/delete-cuisine/:cuisineId", verify(roles.admin), adminController.deleteCuisine);

// src/app.ts
import cors from "cors";
var app = express();
app.use(express.json());
var allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:3000",
  process.env.POSTMAN_URL || "https://client-sigma-ten-42.vercel.app"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  credentials: true,
  // Required for cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With"
  ],
  exposedHeaders: ["Set-Cookie"]
}));
app.get("/api/auth/me", verify(roles.admin, roles.customer, roles.provider), getUser);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/public", publicRouter);
app.use("/customer", customerRouter);
app.use("/provider", providerRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("Welcome to FoodHub server!");
});

// src/index.ts
var index_default = app;
export {
  index_default as default
};
