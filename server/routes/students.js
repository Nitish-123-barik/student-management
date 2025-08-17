const router = require("express").Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Create
router.post("/", auth, async (req, res) => {
  try {
    const body = { ...req.body, createdBy: req.user.id };
    const student = await Student.create(body);
    res.status(201).json(student);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// List (with search & simple pagination)
router.get("/", auth, async (req, res) => {
  const { q = "", page = 1, limit = 20 } = req.query;
  const filter = q ? { $text: { $search: q } } : {};
  try {
    const students = await Student.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Student.countDocuments(filter);
    res.json({ data: students, total });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const total = await Student.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student count", error });
  }
});

// Read one
router.get("/:id", auth, async (req, res) => {
  const s = await Student.findById(req.params.id);
  if (!s) return res.status(404).json({ message: "Not found" });
  res.json(s);
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



module.exports = router;
