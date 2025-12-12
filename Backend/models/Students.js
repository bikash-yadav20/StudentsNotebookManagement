import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  roll: { type: Number, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  session: { type: String, required: true },
  source: { type: String, enum: ["active", "archive"], default: "active" },
  notebookChecks: [
    {
      subject: { type: String, required: true },
      checks: { type: [Boolean], required: true }, 
      remarks: [
        {
          text: { type: String }, 
          date: { type: Date, default: Date.now }
        }
      ],
      session: { type: String,}
    }
  ],
  promotionHistory: [
    {
      fromClass: { type: String },
      toClass: { type: String },
      fromSession: { type: String },
      toSession: { type: String },
      promotedAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Student", studentSchema);
