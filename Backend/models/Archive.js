import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema({
  roll: Number,
  name: String,
  class: String,
  section: String,
  session: String,
  notebookChecks: Array,
  promotedTo: String,
  archivedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Archive", archiveSchema);
