import { Router } from "express";
import {createTask, updateTaskById, deleteTaskById,getAllTasks,getTaskById} from "../controllers/task.controller.js"
import authValidation from "../middlewares/authMiddleware.js";
import { uploadFile } from "../middlewares/multerMiddleware.js"; 
const taskRouter = Router();
taskRouter.route("/create").post(authValidation,uploadFile.array('supportingDocuments',5),createTask)
taskRouter.route("/getAll").get(authValidation,getAllTasks)
taskRouter.route("/getById/:_id").get(authValidation,getTaskById)
taskRouter.route("/updateById/:_id").patch(authValidation,updateTaskById)
taskRouter.route("/deleteById/:_id").delete(authValidation,deleteTaskById)
export default taskRouter