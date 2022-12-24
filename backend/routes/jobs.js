const express = require("express");

const Job = require("../models/job")
const checkAuth = require("../middleware/check-auth")

const router = express.Router();

// Create a Job
router.post("", checkAuth, (req, res, next) => {
  const job = new Job({
    date: req.body.date,
    customer: req.body.customer,
    hours: req.body.hours,
    notes: req.body.notes,
    parts: req.body.parts,
  });
  job.save().then((createdJob) => {
    res.status(201).json({
      message: "Job added successfully!",
      jobId: createdJob._id,
    });
  });
});

// Get all jobs
router.get("", (req, res, next) => {
  Job.find().then((documents) => {
    res.status(200).json({
      message: "Jobs fetched successfully!",
      jobs: documents,
    });
  });
});

// Delete job by id
router.delete("/:id", checkAuth, (req, res, next) => {
  Job.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Job deleted!" });
  });
});

module.exports = router;
