const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/tasks

// Create a new task
router.post('/',
    auth,
    [
        check('name', 'The name of the task is required').not().isEmpty()
    ],
    taskController.createTask
);

// Gets tasks
router.get('/',
    auth,
    taskController.getTasks
);

// Update a task
router.put('/:id',
    auth,
    taskController.updateTask
);

// Delete a task
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;