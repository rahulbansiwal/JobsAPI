const express = require('express');
const jobsControllers = require('../controllers/jobs');

const router = express.Router();

router.route('/').post(jobsControllers.createJob).get(jobsControllers.getAllJobs);
router.route('/:id')
.patch(jobsControllers.updateJob)
.get(jobsControllers.getJob)
.delete(jobsControllers.deleteJob);

module.exports = router;