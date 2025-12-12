import express from "express";
import { promoteSession } from "../Services/promoteSession.js";

const router = express.Router();

router.post("/promote", async (req, res) => {
  try {
    const { oldSession, newSession } = req.body;
    if (!oldSession || !newSession) {
      return res.status(400).json({ error: "oldSession and newSession required" });
    }
    console.log("Promoting from", oldSession, "to", newSession, "students:",);

    const result = await promoteSession(oldSession, newSession);
    res.json({ message: "Promotion completed Succesfully✅", result });
  } catch (err) {
    res.status(500).json({ error: "Promotion failed", details: err.message });
  }
  
});

export default router;
