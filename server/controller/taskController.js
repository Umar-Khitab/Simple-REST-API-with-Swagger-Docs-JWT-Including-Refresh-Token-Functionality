const Task = require('../models/Task')
const mongoose = require('mongoose');


// <--- GET ALL --->
const getTask = async(req,res) => {
    const task = await Task.find({})
    res.status(200).json(task)
}

// <--- CREATE --->
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    }
    catch (error) {
        res.status(500).json(error)
    }
}
// <--- DELETE --->
const deleteTask = async (req, res) => {
    const {id} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'no such task id'})
    }
    try {
        const task = await Task.findByIdAndDelete(id)
        res.status(200).json("Task has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
}
// <--- GET --->
const getTaskById = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'no such Task id'})
    }
    try {
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
        res.status(500).json(error)
    }
}




module.exports = { getTask, createTask, deleteTask, getTaskById }