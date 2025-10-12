import {Task} from '../model/tasks.model.js'
import {User} from '../model/user.model.js'

export const createTask = async (req,res)=>{
    // const taskBody
    try {
    const user = req.user;
    console.log("USER",user);
    if(!user?._id) return res.status(500).json({message:"Not Authorized!."})
    const task = req?.body;
    if(!task) return res.status(500).json({message:"There is no task body!."})
    task.userID = user?._id;
    console.log("TASKS2",task);
    let {title,subTitle,description,
        completed,lifeCycleStatus,userID} = task
    const createTask = await Task.create({
        title,subTitle,description,
        completed,lifeCycleStatus,userID
    })
    if(createTask){
        console.log("createTask",createTask)
        res.status(201).json({
            message:"Successfully created",
            data:{
                title:createTask.title,
                subTitle:createTask.subTitle,
                description:createTask.description,
                completed:createTask.completed,
                lifeCycleStatus:createTask.lifeCycleStatus
            }
        })
    }else{
        res.status(500).json({
            message:"Task creation failed",
        })        
    }        
    } catch (error) {
        res.status(500).json({
            message:`Task creation failed!.`,
            error:`${error}`
        })
    }
}
export const getAllTasks = async (req,res)=>{
    try {
    const user = req.user;
    console.log("USER",user);
    if(!user?._id) return res.status(500).json({message:"Not Authorized!."})
    let userID = user._id
    const tasksList = await Task.find({userID})
    console.log("TASK LIST",tasksList)
    if(tasksList && tasksList.length>0) {
        res.status(200).json({
            data: [...tasksList]
        })  
    }else{
        res.status(200).json({
            message : 'No tasks',
            data:[]
        })   
    }
    } catch (error) {
        res.status(500).json({
            message:`Fetch of task failed!.`,
            error:`${error}`
        })        
    }
}
export const getTaskById = async (req,res)=>{
    try {
    const _id = req.params._id
    console.log("_ID",_id);
    const taskList = await Task.find({_id})
    console.log("taskList ID",taskList)
    if(taskList) {
        res.status(200).json({
            data: taskList
        })  
    }else{
        res.status(200).json({
            message : 'No tasks',
            data:[]
        })   
    }
    } catch (error) {
        res.status(500).json({
            message:`Fetch of task failed!.`,
            error:`${error}`
        })         
    }
}
export const updateTaskById = async (req,res)=>{
    try {
        const _id = req.params
        console.log("ID",_id)
        const updateData = req.body
        console.log("updateData",updateData)
        const updateTask = await Task.findByIdAndUpdate(_id,
            {
                $set:{
                    ...updateData
                }
            }
            ,{
            new : true
        }).select("-password,refreshToken")
        console.log("updateTask",updateTask)
        if(updateTask){
        res.status(200).json({
            data: updateTask
        })             
        }else{
        res.status(500).json({
            message:"Update failed"
        })             
        }

    } catch (error) {
        res.status(500).json({
            message:`Update of task failed!.`,
            error:`${error}`
        })   
    }
}
export const deleteTaskById = async (req,res)=>{
    try {
    const user = req.user;
    console.log("USER",user);
    if(!user?._id) return res.status(500).json({message:"Not Authorized!."})
    const _id = req?.params?._id
    if(!_id) return res.status(500).json({message:"Task Id not found."})
    const deleteTask = await Task.deleteOne({_id}) 
    console.log("deleteTask",deleteTask)
    if(deleteTask) {
    res.status(200).json({
        message:"Successfully deleted"
    })  
    }else{
        res.status(200).json({
            message : 'Problem with deletion',
        })   
    }            
    } catch (error) {
        res.status(500).json({
            message:`Deletion of task failed!.`,
            error:`${error}`
        })           
    }
}
