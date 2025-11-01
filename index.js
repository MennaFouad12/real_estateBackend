import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route

app.get("/", (req, res) => {
  res.send("Hello from Node.js Server 🚀");
});
app.use(cors({ origin: "*" }));
connectDB()


  app.use("/api/user",userRouter);
// Start the server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


app.get('/', (req, res) => res.send('Hello from Vercel!'));

export default app;