const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

router.get('/prueba', userController.prueba);
router.post('/add', userController.add);
router.get('/list', userController.findAll);
router.post('/update/:id', userController.update);
router.post('/login', userController.login);        

module.exports = router;    
