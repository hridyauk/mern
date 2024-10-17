import { Router } from "express";
import {
  createJob,
  deleteJobById,
  getAllJobs,
  getJobById,
  updateJobById,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(validateJobInput, validateIdParam, updateJobById)
  .delete(deleteJobById);

export default router;
