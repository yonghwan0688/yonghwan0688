import { Router } from 'express';
import SchedulerController from '../controllers/schedulerController';

const router = Router();
const schedulerController = new SchedulerController();

router.post('/schedules', schedulerController.createSchedule);
router.get('/schedules', schedulerController.getSchedules);
router.put('/schedules/:id', schedulerController.updateSchedule);
router.delete('/schedules/:id', schedulerController.deleteSchedule);

export default router;