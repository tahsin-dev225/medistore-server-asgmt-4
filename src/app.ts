import express, { Application } from 'express';
// import { toNodeHandler } from "better-auth/node";
import cors from 'cors';
import { notFound } from './middlewere/notFound';
import errorHandler from './middlewere/globalErrorHandler';
import { medicineRoute } from './modules/medicine/medicine.route';
import { categoryRoute } from './modules/category/category.route';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { orderRoute } from './modules/order/order.route';
import { checkBannedUser } from './middlewere/checkBannedUser';
import { userRoute } from './modules/users/user.route';
import { reviewRoute } from './modules/review/review.route';
import { cartRouter } from './modules/carts/cart.route';

const app : Application = express();
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());


app.use("/api/medicine", medicineRoute)
app.use("/api/category", categoryRoute)
app.use("/api/order", orderRoute)
app.use("/api/user", userRoute)
app.use("/api/review", reviewRoute)
app.use("/api/cart", cartRouter)


app.get('/',  (req,res)=>{
  res.send("Medicine store server")
})

app.use(notFound)

app.use(errorHandler)

export default app;