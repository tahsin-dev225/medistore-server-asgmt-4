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

const app : Application = express();

app.use(cors({
  origin : process.env.APP_URL || "http://localhost:4000",
  credentials : true
}))

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use(checkBannedUser);

app.use("/medicine", medicineRoute)
app.use("/category", categoryRoute)
app.use("/order", orderRoute)
// app.use("/reviews", )


app.get('/', (req,res)=>{
  res.send("Medicine store server")
})

app.use(notFound)

app.use(errorHandler)

export default app;