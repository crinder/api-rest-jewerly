const express = require('express');
const router = express.Router();
const planController = require('../controllers/PlanOptions');


router.get('/prueba', planController.prueba);
router.post('/add', planController.add);
router.get('/list', planController.findAll);
router.get('/plan/:id', planController.planId);
router.post('/update/:id', planController.update);    
router.post('/delete/:id', planController.deletePlanOption);

module.exports = router;