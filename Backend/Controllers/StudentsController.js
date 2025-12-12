import Student from "../models/Students.js";
import Archive from "../models/Archive.js";

// Get all unique classes for a given session
export const getClasses = async (req, res) => {
  try {
    const { session, source } = req.query; // source=active or archive
    const Model = source === "archive" ? Archive : Student;

    const classes = await Model.distinct("class", { session });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sections for a given class + session
export const getSections = async (req, res) => {
  try {
    const { session, source } = req.query;
    const Model = source === "archive" ? Archive : Student;

    const sections = await Model.distinct("section", {
      class: req.params.className,
      session
    });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get students by class + section + session
export const getStudents = async (req, res) => {
  try {
    const { session, source } = req.query;
    const Model = source === "archive" ? Archive : Student;

    const students = await Model.find({
      class: req.params.className,
      section: req.params.sectionName,
      session
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get sessions
export const getSessions = async (req, res) => {
  try {
    const activeSessions = await Student.distinct("session");
    const archivedSessions = await Archive.distinct("session");

    const allSessions = [...new Set([...activeSessions, ...archivedSessions])];
    res.json(allSessions.sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};