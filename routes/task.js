import express from 'express';
import { deleteTask, getAllTask, newTask, updatetask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new", isAuthenticated, newTask);//Add task

router.get("/mytask", isAuthenticated, getAllTask); // Get All Task

router.route("/:id").put(isAuthenticated, updatetask).delete(deleteTask);


export default router;