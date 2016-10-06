const router = require('express').Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.index);
router.post('/new', taskController.insert);
router.post('/delete', taskController.remove);
router.post('/update', taskController.edit);
router.post('/reorder', taskController.reorder);

module.exports = router;
