const express = require("express");
const { route } = require("..");
let router = express.Router();
var Task = require("../../models/transportvehicle");
//get tasks
router.get("/",async(req,res)=>{
    let tasks = await Task.find();
    return res.send(tasks);
});
//get single tasks
router.get("/:id",async(req,res)=>{
    try{
        let task = await Task.findById(req.params.id);
        if (! task) 
            return res.status(404).send("Task Id is Incorrect");
        return res.status(404).send(task);//everything is okay
    }
    catch(err){
        return res.send("Invalid Id")
    }
});

//update a record
router.put("/:id",async(req,res)=>{
    let task = await Task.findById(req.params.id);
    task.title = req.body.title;
    task.task = req.body.body;
    await task.save();
    return res.send(task);
});
//delete a record
router.delete("/:id",async(req,res)=>{
    try{
        let task = await Task.findByIdAndDelete(req.params.id);
        if (! task) 
            return res.status(404).send("Task Id is Incorrect");
        return res.send(task);
    }
    catch(err){
        return res.send("Invalid Id")
    }
    
});
//Insert a record
router.post("/",async(req,res)=>{
    let task = new Transportvehicle();
    task.title = req.body.title;
    task.body = req.body.body;
    await task.save();
    return res.send(task);
});
module.exports = router;