import express from "express";
import { getClasses, getSections, getStudents, getSessions } from "../Controllers/StudentsController.js";

const router = express.Router();

router.get("/sessions", getSessions);
router.get("/classes", getClasses);
router.get("/sections/:className", getSections);
router.get("/students/:className/:sectionName", getStudents);

export default router;
