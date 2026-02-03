var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express7 from "express";
import cors from "cors";

// src/middlewere/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

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
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Medicine {\n  id    String @id @default(uuid())\n  title String @db.VarChar(225)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  image     String\n  stock     Int\n  price     Int\n  sellerId  String\n  seller    User       @relation(fields: [sellerId], references: [id])\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  review    Review[]\n  order     Order[]\n  cartItems CartItem[]\n\n  @@index([sellerId])\n  @@map("medicines")\n}\n\nmodel Review {\n  id      String @id @default(ulid())\n  content String @db.Text\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([medicineId])\n  @@index([customerId])\n  @@map("review")\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  customerId String\n  customer   User   @relation("CustomerOrders", fields: [customerId], references: [id])\n\n  sellerId String\n  seller   User   @relation("SellerOrders", fields: [sellerId], references: [id])\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  quantity   Int\n  unitPrice  Int\n  totalPrice Int\n  status     OrderStatus @default(PENDING)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([customerId])\n  @@index([sellerId])\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel Cart {\n  id String @id @default(uuid())\n\n  customerId String @unique\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  items CartItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("carts")\n}\n\nmodel CartItem {\n  id String @id @default(uuid())\n\n  cartId String\n  cart   Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  quantity Int\n  price    Int\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([cartId, medicineId])\n  @@map("cart_items")\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique\n  image     String\n  createdAt DateTime   @default(now())\n  medicines Medicine[]\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(true)\n  isBanned      Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role           String?    @default("CUSTOMER")\n  status         String?    @default("ACTIVE")\n  medicines      Medicine[]\n  customerOrders Order[]    @relation("CustomerOrders")\n  sellerOrders   Order[]    @relation("SellerOrders")\n  reviews        Review[]\n  cart           Cart?\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"image","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"review","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"order","kind":"object","type":"Order","relationName":"MedicineToOrder"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMedicine"}],"dbName":"medicines"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"review"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"CustomerOrders"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"SellerOrders"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrder"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"CartItemToMedicine"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart_items"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"customerOrders","kind":"object","type":"Order","relationName":"CustomerOrders"},{"name":"sellerOrders","kind":"object","type":"Order","relationName":"SellerOrders"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
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
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Medicine: "Medicine",
  Review: "Review",
  Order: "Order",
  Cart: "Cart",
  CartItem: "CartItem",
  Category: "Category",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var MedicineScalarFieldEnum = {
  id: "id",
  title: "title",
  categoryId: "categoryId",
  image: "image",
  stock: "stock",
  price: "price",
  sellerId: "sellerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  content: "content",
  customerId: "customerId",
  medicineId: "medicineId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  sellerId: "sellerId",
  medicineId: "medicineId",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartItemScalarFieldEnum = {
  id: "id",
  cartId: "cartId",
  medicineId: "medicineId",
  quantity: "quantity",
  price: "price",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  image: "image",
  createdAt: "createdAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  isBanned: "isBanned",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/middlewere/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error.";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect feild type or missing feilds.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "p2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}";
    } else if (err.code === "p2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "p2003") {
      statusCode = 400;
      errorMessage = "Forein key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = " Underlying Prisma engine crashed";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "p1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. please check your credentials.";
    } else if (err.errorCode === "p1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server.";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/medicine/medicine.route.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/medicine/medicine.service.ts
var createMedicine = async ({
  content,
  customerId,
  medicineId
}) => {
  const deliveredOrder = await prisma.order.findFirst({
    where: {
      customerId,
      medicineId,
      status: "DELIVERED"
    }
  });
  if (!deliveredOrder) {
    throw new Error(
      "You can only review medicines that you have received"
    );
  }
  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      customerId,
      medicineId
    }
  });
  if (alreadyReviewed) {
    throw new Error("You already reviewed this product");
  }
  const review = await prisma.review.create({
    data: {
      content,
      customerId,
      medicineId
    }
  });
  return review;
};
var getSellerMedicines = async (sellerId) => {
  const andConditions = [];
  if (sellerId) {
    andConditions.push({
      sellerId
    });
  }
  const allPost = await prisma.medicine.findMany({
    where: {
      sellerId
    }
  });
  return {
    data: allPost
  };
};
var getAllMedicines = async ({
  search,
  sellerId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (sellerId) {
    andConditions.push({
      sellerId
    });
  }
  const allPost = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      _count: {
        select: { review: true }
      }
    }
  });
  const total = await prisma.medicine.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: allPost,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var getManageAllMedicines = async () => {
  const allPost = await prisma.medicine.findMany({
    include: {
      _count: {
        select: { review: true }
      }
    }
  });
  return allPost;
};
var getMedicineById = async (id) => {
  return prisma.medicine.findUnique({
    where: { id },
    include: {
      category: true,
      review: true
    }
  });
};
var updateMedicine = async (id, data) => {
  return prisma.medicine.update({
    where: { id },
    data
  });
};
var deleteMedicine = async (id) => {
  return prisma.medicine.delete({
    where: { id }
  });
};
var MedicineService = {
  createMedicine,
  getSellerMedicines,
  getAllMedicines,
  getManageAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page ?? 1);
  const limit = Number(options.limit ?? 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unothorized!, No user"
      });
    }
    const result = await MedicineService.createMedicine(req.body, user.id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
var getSellerMedicines2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "SELLER") {
      return res.status(401).json({
        error: "Unothorized!, You are not seller."
      });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await MedicineService.getSellerMedicines(
      // { page, limit, skip,sortBy,sortOrder },
      user?.id
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getManageAllMedicines2 = async (req, res) => {
  try {
    const result = await MedicineService.getManageAllMedicines();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getAllMedicines2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const sellerId = req.query.authorId;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await MedicineService.getAllMedicines({ search: searchString, sellerId, page, limit, skip, sortBy, sortOrder });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getMedicineId = async (req, res, next) => {
  try {
    const result = await MedicineService.getMedicineById(
      req.params.medicineId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
var updateMedicine2 = async (req, res, next) => {
  try {
    const result = await MedicineService.updateMedicine(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
var deleteMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MedicineService.deleteMedicine(id);
    return res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
var MedicineControlle = {
  createMedicine: createMedicine2,
  getSellerMedicines: getSellerMedicines2,
  getAllMedicines: getAllMedicines2,
  getManageAllMedicines: getManageAllMedicines2,
  getMedicineId,
  deleteMedicine: deleteMedicine2,
  updateMedicine: updateMedicine2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/middlewere/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have access"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/medicine/medicine.route.ts
var router = express.Router();
router.get(
  "/",
  MedicineControlle.getAllMedicines
);
router.get(
  "/all",
  MedicineControlle.getManageAllMedicines
);
router.get(
  "/:medicineId",
  MedicineControlle.getMedicineId
);
router.get(
  "/seller/all",
  auth_default("SELLER" /* SELLLER */),
  MedicineControlle.getSellerMedicines
);
router.patch(
  "/:id",
  auth_default("SELLER" /* SELLLER */, "ADMIN" /* ADMIN */),
  MedicineControlle.updateMedicine
);
router.delete(
  "/:id",
  auth_default("SELLER" /* SELLLER */, "ADMIN" /* ADMIN */),
  MedicineControlle.deleteMedicine
);
router.post(
  "/",
  auth_default("SELLER" /* SELLLER */),
  MedicineControlle.createMedicine
);
var medicineRoute = router;

// src/modules/category/category.route.ts
import express2 from "express";

// src/modules/category/category.service.ts
var creatCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategory = async () => {
  return await prisma.category.findMany();
};
var deleteCategory = async (categoryId) => {
  const categoryData = await prisma.category.findFirst({
    where: {
      id: categoryId
    },
    select: {
      id: true
    }
  });
  if (!categoryData) {
    throw new Error("There are no category with this id.");
  }
  return await prisma.category.delete({
    where: {
      id: categoryData.id
    }
  });
};
var CategoryService = {
  creatCategory,
  getAllCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unothorized!, No user"
      });
    }
    const result = await CategoryService.creatCategory(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
var getAllCategory2 = async (req, res) => {
  try {
    const result = await CategoryService.getAllCategory();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Couldn't get category data.",
      details: error
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await CategoryService.deleteCategory(categoryId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Category delete failed",
      details: error
    });
  }
};
var categoryController = {
  createCategory,
  getAllCategory: getAllCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var router2 = express2.Router();
router2.get(
  "/",
  categoryController.getAllCategory
);
router2.delete(
  "/:categoryId",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.deleteCategory
);
router2.post(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.createCategory
);
var categoryRoute = router2;

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/modules/order/order.route.ts
import express3 from "express";

// src/modules/order/order.service.ts
var createOrder = async (customerId) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  const orders = [];
  for (const item of cart.items) {
    const totalPrice = item.quantity * item.medicine.price;
    const order = await prisma.order.create({
      data: {
        medicineId: item.medicineId,
        customerId,
        sellerId: item.medicine.sellerId,
        quantity: item.quantity,
        unitPrice: item.medicine.price,
        totalPrice
      }
    });
    orders.push(order);
  }
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
  return orders;
};
var getCustomerOrder = async (customerId) => {
  const andConditions = [];
  if (customerId) {
    andConditions.push({
      customerId
    });
  }
  const sellerAllOrder = await prisma.order.findMany({
    where: {
      customerId
    }
  });
  return {
    data: sellerAllOrder
  };
};
var getSellerOrder = async (sellerId) => {
  const andConditions = [];
  if (sellerId) {
    andConditions.push({
      sellerId
    });
  }
  const sellerAllOrder = await prisma.order.findMany({
    where: {
      sellerId
    }
  });
  return {
    data: sellerAllOrder
  };
};
var getAllOrder = async ({
  sortBy,
  sortOrder
}) => {
  const allOrder = await prisma.order.findMany({
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  return allOrder;
};
var getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id }
  });
};
var updateOrder = async (id, data) => {
  return prisma.order.update({
    where: { id },
    data
  });
};
var deleteOrder = async (id) => {
  return prisma.order.delete({
    where: { id }
  });
};
var orderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  getSellerOrder,
  getCustomerOrder,
  updateOrder,
  deleteOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) {
      return res.status(401).json({
        error: "Unothorized!"
      });
    }
    const result = await orderService.createOrder(customerId);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
var getCustomerOrder2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "CUSTOMER") {
      return res.status(401).json({
        error: "Unothorized!, You are not Customer."
      });
    }
    const result = await orderService.getCustomerOrder(
      user.id
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getSellerOrder2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "SELLER") {
      return res.status(401).json({
        error: "Unothorized!, You are not seller."
      });
    }
    const result = await orderService.getSellerOrder(
      // { page, limit, skip,sortBy,sortOrder },
      user.id
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getAllOrder2 = async (req, res) => {
  try {
    const sellerId = req.query.authorId;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await orderService.getAllOrder({ sellerId, sortBy, sortOrder });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get medicine data.",
      details: e
    });
  }
};
var getOrderById2 = async (req, res, next) => {
  try {
    const result = await orderService.getOrderById(
      req.params.orderId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
var updateOrder2 = async (req, res, next) => {
  try {
    const result = await orderService.updateOrder(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Order updated successtully.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteOrder2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unothorized!, You are not admin or currect seller."
      });
    }
    if (user.role === "ADMIN" /* ADMIN */) {
      await orderService.deleteOrder(id);
      return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
      });
    }
  } catch (error) {
    next(error);
  }
};
var orderControlle = {
  createOrder: createOrder2,
  getSellerOrder: getSellerOrder2,
  getCustomerOrder: getCustomerOrder2,
  getAllOrder: getAllOrder2,
  getOrderById: getOrderById2,
  deleteOrder: deleteOrder2,
  updateOrder: updateOrder2
};

// src/modules/order/order.route.ts
var router3 = express3.Router();
router3.get(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  orderControlle.getAllOrder
);
router3.get(
  "/customer/all",
  auth_default("CUSTOMER" /* CUSTOMER */),
  orderControlle.getCustomerOrder
);
router3.get(
  "/:orderId",
  orderControlle.getOrderById
);
router3.get(
  "/seller/all",
  auth_default("SELLER" /* SELLLER */),
  orderControlle.getSellerOrder
);
router3.patch(
  "/:id",
  auth_default("SELLER" /* SELLLER */, "ADMIN" /* ADMIN */),
  orderControlle.updateOrder
);
router3.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  orderControlle.deleteOrder
);
router3.post(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */),
  orderControlle.createOrder
);
var orderRoute = router3;

// src/modules/users/user.route.ts
import express4 from "express";

// src/modules/users/user.service.ts
var getAllUsers = async () => {
  const andConditions = [];
  const allUser = await prisma.user.findMany();
  return allUser;
};
var getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  });
};
var updateProfile = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data
  });
};
var adminUpdateUserStatus = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data
  });
};
var deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id }
  });
};
var userService = {
  getAllUsers,
  getUserById,
  updateProfile,
  adminUpdateUserStatus,
  deleteUser
};

// src/modules/users/user.controller.ts
var getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get Users data.",
      details: e
    });
  }
};
var getUserById2 = async (req, res, next) => {
  try {
    const result = await userService.getUserById(
      req.params.userId
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Couldn't get User data.",
      details: e
    });
  }
};
var updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId !== req.params.userId) {
      return res.status(400).json({
        message: "Unauthorized!"
      });
    }
    const { name, image } = req.body;
    const result = await userService.updateProfile(userId, {
      name,
      image
    });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "Couldn't update Users data.",
      details: e
    });
  }
};
var adminUpdateUser = async (req, res, next) => {
  try {
    const { status, isBanned } = req.body;
    const result = await userService.adminUpdateUserStatus(req.params.userId, { status, isBanned });
    res.status(200).json({
      success: true,
      message: "User status updated",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "Couldn't update Users status.",
      details: e
    });
  }
};
var deleteUser2 = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unothorized!"
      });
    }
    if (user.role === "ADMIN" /* ADMIN */) {
      await userService.deleteUser(userId);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    }
  } catch (e) {
    res.status(400).json({
      error: "Couldn't delete User.",
      details: e
    });
  }
};
var UserController = {
  getAllUser,
  getUserById: getUserById2,
  updateMyProfile,
  adminUpdateUser,
  deleteUser: deleteUser2
};

// src/modules/users/user.route.ts
var router4 = express4.Router();
router4.get(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  UserController.getAllUser
);
router4.get(
  "/:userId",
  auth_default(
    "ADMIN" /* ADMIN */,
    "CUSTOMER" /* CUSTOMER */,
    "SELLER" /* SELLLER */
  ),
  UserController.getUserById
);
router4.patch(
  "/admin-status/:userId",
  auth_default("ADMIN" /* ADMIN */),
  UserController.adminUpdateUser
);
router4.patch(
  "/profile/:userId",
  auth_default("CUSTOMER" /* CUSTOMER */),
  UserController.updateMyProfile
);
router4.delete(
  "/:userId",
  auth_default("ADMIN" /* ADMIN */),
  UserController.deleteUser
);
var userRoute = router4;

// src/modules/review/review.route.ts
import express5 from "express";

// src/modules/review/reviewservice.ts
var createReview = async (data) => {
  const result = await prisma.review.create({
    data
  });
  return result;
};
var getAllReview = async () => {
  return await prisma.review.findMany();
};
var deleteReview = async (reviewId) => {
  const reviewData = await prisma.review.findFirst({
    where: {
      id: reviewId
    },
    select: {
      id: true
    }
  });
  if (!reviewData) {
    throw new Error("There are no review with this id.");
  }
  return await prisma.review.delete({
    where: {
      id: reviewData.id
    }
  });
};
var reviewService = {
  createReview,
  getAllReview,
  deleteReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res, next) => {
  try {
    const { medicineId, customerId, content } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unothorized!, No user"
      });
    }
    const result = await reviewService.createReview({ content, customerId, medicineId });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
var getAllReview2 = async (req, res) => {
  try {
    const result = await reviewService.getAllReview();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Couldn't get Review data.",
      details: error
    });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const result = await reviewService.deleteReview(reviewId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Review delete failed",
      details: error
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getAllReview: getAllReview2,
  deleteReview: deleteReview2
};

// src/modules/review/review.route.ts
var router5 = express5.Router();
router5.get(
  "/",
  reviewController.getAllReview
);
router5.delete(
  "/:reviewId",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */),
  reviewController.deleteReview
);
router5.post(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */),
  reviewController.createReview
);
var reviewRoute = router5;

// src/modules/carts/cart.route.ts
import express6 from "express";

// src/modules/carts/cart.service.ts
var addToCart = async (customerId, medicineId, quantity) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId }
  });
  if (!medicine) {
    throw new Error("Medicine not found");
  }
  const cart = await prisma.cart.upsert({
    where: { customerId },
    update: {},
    create: { customerId }
  });
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_medicineId: {
        cartId: cart.id,
        medicineId
      }
    }
  });
  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: cartItem.quantity + quantity
      }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        medicineId,
        quantity,
        price: medicine.price
      }
    });
  }
  return await prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      items: {
        include: { medicine: true }
      }
    }
  });
};
var getOrCreateCart = async (customerId) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
      include: {
        items: {
          include: {
            medicine: true
          }
        }
      }
    });
  }
  return cart;
};
var updateQuantity = async (customerId, itemId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const cart = await getOrCreateCart(customerId);
  return prisma.cartItem.updateMany({
    where: {
      id: itemId,
      cartId: cart.id
    },
    data: { quantity }
  });
};
var removeFromCart = async (customerId, itemId) => {
  const cart = await getOrCreateCart(customerId);
  await prisma.cartItem.deleteMany({
    where: {
      id: itemId,
      cartId: cart.id
    }
  });
};
var cartService = {
  getOrCreateCart,
  addToCart,
  updateQuantity,
  removeFromCart
};

// src/modules/carts/cart.controller.ts
var addToCart2 = async (req, res, next) => {
  try {
    const customerId = req.user?.id;
    const { medicineId, quantity } = req.body;
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!medicineId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const cart = await cartService.addToCart(
      customerId,
      medicineId,
      quantity
    );
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
var getMyCart = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await cartService.getOrCreateCart(user.id);
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
var updateQuantity2 = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    const { quantity } = req.body;
    const result = await cartService.updateQuantity(
      user.id,
      itemId,
      quantity
    );
    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var removeFromCart2 = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    await cartService.removeFromCart(user.id, itemId);
    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });
  } catch (error) {
    next(error);
  }
};
var cartController = {
  getMyCart,
  addToCart: addToCart2,
  updateQuantity: updateQuantity2,
  removeFromCart: removeFromCart2
};

// src/modules/carts/cart.route.ts
var router6 = express6.Router();
router6.get(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.getMyCart
);
router6.post(
  "/items",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.addToCart
);
router6.patch(
  "/items/:itemId",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.updateQuantity
);
router6.delete(
  "/items/:itemId",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.removeFromCart
);
var cartRouter = router6;

// src/app.ts
var app = express7();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express7.json());
app.use("/api/medicine", medicineRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("Medicine store server");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 3e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error occured", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
