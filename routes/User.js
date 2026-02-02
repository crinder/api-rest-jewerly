const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const authRefresh = require('../middleware/authRefresh');

router.get('/prueba', userController.prueba);
router.post('/add', userController.add);
router.get('/list', userController.findAll);
router.post('/update/:id', userController.update);
router.post('/login', userController.login);         
router.get('/refresh',authRefresh.authRefresh,userController.refresh);
router.post('/logout', userController.logout);

module.exports = router;    
