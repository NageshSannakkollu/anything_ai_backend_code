// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken");
const Tasks = require("../models/taskModel");

const createTask = async(req,res) => {
    const taskDetails = req.body;
    const {title, description, createdBy} = taskDetails
    // console.log("taskDetails:",taskDetails)
    Tasks.createTask(title, description, createdBy,(err,newTask) => {
        if(err){
            console.log("Error:",err.message)
            return res.status(200).json({message:err.message,success:false})
        }
        return res.status(201).json({message:"New Task Created Successfully!",Task:newTask,success:true})
    })
};

const getAllTasks = (req,res) => {
    // console.log("All users Request")    
    Tasks.getAllTasks((err,tasks) => {
        if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        res.status(200).json(tasks)
    })
}

const getTaskBySpecificId = (req,res) => {
    const {id} = req.params;
    // console.log(id)
    Tasks.getTaskById(id,(err,task)=> {
        // console.log("task:",task)
        if(task === undefined){
            return res.status(200).json({message:`Invalid Task Id:${id}`,success:false})
        }
        try {
            return res.status(200).json(task)
        } catch (error) {
            if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        }
    })
}

const updateTask = async(req,res) => {
    const {id} = req.params;
    // const updateDetails = req.body;
    // console.log("updateDetails:",updateDetails)
    const {title, description, createdBy} = req.body
    Tasks.updateTaskById(id,title,description,createdBy,(err,newTask) => {
        if(err){
            // console.log("Error:",err.message)
            return res.status(200).json({message:err.message,success:false})
        }
        return res.status(200).json({message:"Task Updated Successfully!",Task:newTask  ,success:true})
    })
}

const deleteTask = (req,res) => {
    const {id} = req.params;
    console.log(id)
    Tasks.deleteById(id,(err,task)=> {
        try {
            return res.status(200).json({success:true})
        } catch (error) {
            if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        if(task === undefined){
            return res.status(200).json({message:`Invalid Task Id:${id}`,success:false})
        }
        }
    })
}


module.exports = {createTask,getAllTasks,getTaskBySpecificId,deleteTask,updateTask}