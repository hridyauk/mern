import { Router } from "express";
import {
  createJob,
  deleteJobById,
  getAllJobs,
  getJobById,
  updateJobById,
} from "../controllers/jobController.js";

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJobById).patch(updateJobById).delete(deleteJobById);

export default router;
