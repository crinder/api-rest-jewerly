const express = require('express');
const router = express.Router();
const itemController = require('../controllers/Items');


router.get('/prueba', itemController.prueba);
router.post('/add', itemController.add);
router.get('/list', itemController.findAll);
router.get('/item/:id', itemController.itemId);
router.post('/update/:id', itemController.update);    
router.post('/delete/:id', itemController.deleteItem);

module.exports = router;    