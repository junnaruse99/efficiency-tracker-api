const Project = require('../model/Projects');
const Task = require('../model/Tasks');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
    
    // Check if there was any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json( { errors: errors.array() } );
    }


    try {

        // Extract project id
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if(!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        // Check if the project belongs to the user
        if(project.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Create task
        const task = new Task(req.body);

        await task.save();
        res.json( task );


    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Geat taks
exports.getTasks = async (req, res) => {
    try {
        // Extract project id
        const { projectId } = req.query;

        const project = await Project.findById(projectId);
        if(!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        // Check if the project belongs to the user
        if(project.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" }).sort({ created: -1 });
        }

        // Get tasks if projects by projectId
        const tasks = await Task.find( { projectId } );
        res.json( { tasks } );

    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
    }
}

// Update a task by taskId
exports.updateTask = async (req, res) => {
    try {
        // Extract project id
        const { projectId, name, state } = req.body;

        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        // Extract project
        const project = await Project.findById(projectId);
        // If task exists, then project exists

        // Check if the project belongs to the user
        if(project.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Create a new task
        const newTask = {};

        if(name) {
            newTask.name = name;
        }
        if(state !== null) {
            newTask.state = state;
        }

        task = await Task.findOneAndUpdate( { _id: req.params.id }, newTask, { new: true } ); 

        res.json( { newTask, task } );

    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
    }
}

exports.deleteTask = async (req, res) => {
    try {

        // Extract project id
        const { projectId } = req.query;

        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        // Extract project
        const project = await Project.findById(projectId);
        // If task exists, then project exists

        // Check if the project belongs to the user
        if(project.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Delete
        await Task.findOneAndRemove( { _id: req.params.id } );
        res.json( { msg: "Task was deleted" } );

    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
    }
}