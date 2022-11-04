const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  section: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  email: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  province: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  municipality: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  number: {
    type: String,
    unique: true,
    required: [true, "Please fill up this field"],
  },
  classification: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  year: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  subjects: {
    type: [{ type: [{ type: String }] }],
  },
});

module.exports =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
