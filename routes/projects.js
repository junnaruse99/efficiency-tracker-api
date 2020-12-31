const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');



// api/projects

// Create a new project
router.post('/',
    auth,
    [
        check('name', 'The name of the project is mandatory').not().isEmpty()
    ],
    projectController.createProject
);

// Get project by user id
router.get('/',
    auth,
    projectController.getProject
);

// Update project by project id
router.put('/:id',
    auth,
    [
        check('name', 'The name of the project is mandatory').not().isEmpty()
    ],
    projectController.updateProject
);

// Delete a project by project id
router.delete('/:id',
    auth,
    projectController.deleteProject
);

module.exports = router;