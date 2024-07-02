import { nanoid } from "nanoid";
import Job from "../models/JobModel";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

// fetches all job detail
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// create job
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};

// get single job based on ID
export const getJobById = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with ${id}` });
    return;
  }
  res.status(200).json({ job });
};

// edit job
export const updateJobById = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "Please provide company and position" });
    return;
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with ${id}` });
    return;
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "job modified", job });
};

// delete single job
export const deleteJobById = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with ${id}` });
    return;
  }

  const newJobs = jobs.filter((job) => job.id !== id);

  res.status(200).json({ msg: "job deleted" });
};
