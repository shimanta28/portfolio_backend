import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import responseRoutes from "./Routes/responseRoutes.js";

const app = express();

//configurations
const corsOptions = {
  origin: [
    "https://portfolio-e2oxrvxgx-shimanta28s-projects.vercel.app",
    "http://localhost:5173",
  ],
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: "GET,POST,PUT,DELETE", // Restrict allowed HTTP methods
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
dotenv.config();

app.use(bodyParser.json());

//api setup
app.use("/api", responseRoutes);

//connection to mongodb
mongoose
  .connect(process.env.MongoDb, {})
  .then(() => {
    console.log("Connected to the portfolio database!");

    // Start the server only after a successful database connection
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);

    // Exit the process if the database connection fails
    process.exit(1);
  });
