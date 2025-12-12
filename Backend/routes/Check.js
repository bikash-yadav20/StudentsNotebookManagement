import express from "express";
import {
  saveNotebookChecks,
  getNotebookChecks,
} from "../Controllers/CheckController.js";
import Student from "../models/Students.js";
import Archive from "../models/Archive.js";

const router = express.Router();

router.put("/:id/notebookChecks", saveNotebookChecks);
router.get("/:id/notebookChecks", getNotebookChecks);

// New route for full report
router.get("/:id/report", async (req, res) => {
  try {
    const { session, source } = req.query;

    // Decide which model to use
    let Model = Student;
    if (source === "archive") {
      Model = Archive;
    }

    const student = await Model.findOne({
      _id: req.params.id,
      session: session,
    });

    if (!student) {
      return res
        .status(404)
        .json({ error: "Report not found for this session" });
    }

    res.json(student);
  } catch (err) {
    console.error("Error fetching report:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
