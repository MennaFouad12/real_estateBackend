// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import {connectDB} from './config/db.js';
// import userRouter from './routes/userRoute.js';
// import 'dotenv/config.js'
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Example route

// app.get("/", (req, res) => {
//   res.send("Hello from Node.js Server 🚀");
// });
// app.use(cors({ origin: "*" }));
// connectDB()


//   app.use("/api/user",userRouter);
// // Start the server
// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });


// app.get('/', (req, res) => res.send('Hello from Vercel!'));

// export default app;








import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import PropertRouter from "./routes/propertyRoute.js";
import Bookingrouter from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

// ✅ Middlewares first
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Connect to database (wrap safely)
try {
  await connectDB();
  console.log("✅ Database connected");
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

// ✅ Base test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js Server 🚀");
});

// ✅ Use your API routes
app.use("/api/user", userRouter);
app.use("/api/property",PropertRouter);
app.use("/api/booking",Bookingrouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// })
export default app;
