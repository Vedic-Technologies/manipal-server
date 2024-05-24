const Shoulder = require("../models/shoulder");

// Create a new shoulder document
const registerShoulderProblems = async (req, res) => {
  const body = req.body;
  if (!body || !body.patientId) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }
  try {
    const shoulder = new Shoulder(body);
    await shoulder.save();
    res.status(201).send(shoulder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all shoulder documents
const getAllShoulderProblems = async (req, res) => {
  try {
    const shoulders = await Shoulder.find({});
    res.status(200).send(shoulders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single shoulder document by ID
const getShoulderProblemById = async (req, res) => {
  const _id = req.params.id;
  try {
    const shoulder = await Shoulder.findById(_id);
    if (!shoulder) {
      return res.status(404).json({ msg: "id not found" });
    }
    res.status(200).send(shoulder);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a shoulder document by ID
const updateShoulderProblemById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "painAndStiffness",
    "Hopi",
    "pastHistory",
    "onExamination",
    "physiotherapyManagement",
    "exercisesPlan",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const shoulder = await Shoulder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shoulder) {
      return res.status(404).send();
    }

    res.status(200).send(shoulder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a shoulder document by ID
const deleteshoulderProblemById = async (req, res) => {
  try {
    const shoulder = await Shoulder.findByIdAndDelete(req.params.id);

    if (!shoulder) {
      return res.status(404).json({ msg: "id not found" });
    }

   res.status(200).json({ status: "deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerShoulderProblems,
  getAllShoulderProblems,
  getShoulderProblemById,
  updateShoulderProblemById,
  deleteshoulderProblemById,
};
