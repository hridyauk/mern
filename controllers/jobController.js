import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// fetches all job detail
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// create job
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// get single job based on ID
export const getJobById = async (req, res) => {
  const {id} = req.params
  const job = await Job.findById(id);
  console.log("get");
  
  if(!job){
    // return res.status(404).json({msg: `no job with id ${id}`})
    throw new NotFoundError(`no job with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

// edit job
export const updateJobById = async (req, res) => {
   const { id } = req.params;
   console.log("update, ", id);
   
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: "job modified", updatedJob });
};

// delete single job
export const deleteJobById = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: job });
};
