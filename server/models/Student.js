const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true },
    year: { type: Number, required: true, min: 1, max: 5 },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.index({
  name: "text",
  rollNo: "text",
  department: "text",
  email: "text",
});

module.exports = mongoose.model("Student", studentSchema);
