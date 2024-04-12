import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;//In body take

        //const task = new Task({title});
        // await task.save()
    
        await Task.create({
            title,
            description,
            user: req.user,
        });
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        });
        
    } catch (error) {
        next(error);
    }
   

}
export const getAllTask = async (req, res, next) => {

    try {
        const userid = req.user._id;//Only one user all task display

    const tasks = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        tasks,
    });
    } catch (error) {
        next(error);
    }
}
export const updatetask = async (req, res, next) => {
try {
      // const { id } = req.params;

      const task = await Task.findById(req.params.id);
      if(!task) return next(new ErrorHandler("Invaild Id",404));
  
      task.isComplete = !task.isComplete;  //Task is Complete ✔
      await task.save();
  
  
      res.status(200).json({
          success: true,
          message: 'Task Updated successfully'
      });
} catch (error) {
    next(error);
}
  
}
export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Invaild Id",404));
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Task Deleted Successfully'

    });
    } catch (error) {
        next(error);
    }
}