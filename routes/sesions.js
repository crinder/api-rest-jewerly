const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesions');


router.get('/prueba', sesionController.prueba);
router.post('/add', sesionController.add);
router.post('/list', sesionController.findAll);
router.get('/sesion/:id', sesionController.sesionId);
router.post('/update/:id', sesionController.update);    
router.post('/delete/:id', sesionController.deleteSesion);
router.post('/turn/:sesionId', sesionController.turnPlay);

module.exports = router;    