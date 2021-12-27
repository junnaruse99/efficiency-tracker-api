const Project = require('../model/Projects');
const { validationResult }  = require('express-validator');


exports.createProject = async (req, res) => {

    // Check if there was any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        console.log("POST /api/projects 400");
        console.log(errors.array());
        return res.status(400).json( { errors: errors.array() } );
    }
    
    try {
        // Create a new project
        const project = new Project(req.body);

        // Get the creator by jwt
        project.userId = req.user.id;

        // Save project
        await project.save();
        res.json( project );

        console.log("POST /api/projects 201");

    } catch (error) {
        console.log("POST /api/projects 500");
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Get all projects of current usr
exports.getProject = async (req, res) => {
    try {
        const projects = await Project.find( { userId: req.user.id } ).sort({ created: -1 });
        res.json({ projects });
        console.log("GET /api/projects 200");


    } catch (error) {
        console.log("GET /api/projects 500");
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Update a project
exports.updateProject = async ( req, res ) => {
    // Check if there was any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        console.log("PUT /api/projects 400");
        console.log(errors.array());
        return res.status(400).json( { errors: errors.array() } );
    }

    // Extract project information
    const { name } = req.body;
    const newProject = {};

    if(name) {
        newProject.name = name;
    }

    try {

        // Check project ID
        let project = await Project.findById(req.params.id);

        // Check if project exists
        if(!project) {
            console.log("PUT /api/projects 404");
            console.log("Project not found");
            return res.status(404).json( { msg: 'Project not found' } );
        }

        // Verify the userID
        if(project.userId.toString() !== req.user.id) {
            console.log("PUT /api/projects 401");
            console.log("Not authorized")
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Update
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set : newProject }, { new: true } );
        res.json( { project } );
        console.log("PUT /api/projects 200");


    } catch (error) {
        console.log("PUT /api/projects 500");
        console.log(error);
        res.status(500).send('There was an error');
    }

}

// Delete a project by id
exports.deleteProject = async ( req, res ) => {
    try {
        // Check project ID
        let project = await Project.findById(req.params.id);

        // Check if project exists
        if(!project) {
            console.log("DEL /api/projects 404");
            console.log("Project not found");
            return res.status(404).json( { msg: 'Project not found' } );
        }

        // Verify the userID
        if(project.userId.toString() !== req.user.id) {
            console.log("DEL /api/projects 401");
            console.log("Not authorized");
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Delete project by id
        await Project.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: "The project was deleted" });
        console.log("DEL /api/projects 200");

        
    }
    catch (error) {
        console.log("DEL /api/projects 500");
        console.log(error);
        res.status(500).send('There was an error');
    }
}