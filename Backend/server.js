import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import StudentsRoutes from "./routes/StudentsRoutes.js";
import SubjectsRoutes from "./routes/Subjects.js";
import Check from "./routes/Check.js";
import authRoute from "./routes/authRoute.js";
import promoteRoutes from "./routes/promoteRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/api", StudentsRoutes);
app.use("/api", authRoute);
app.use("/api/subjects", SubjectsRoutes);
app.use("/api/student", Check);
app.use("/api", promoteRoutes);



