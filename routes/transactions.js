const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');


router.get('/prueba', transactionController.prueba);
router.post('/add', transactionController.add);
router.get('/list', transactionController.findAll);
router.get('/transaction/:id', transactionController.transactionId);
router.post('/update/:id', transactionController.update);    
router.post('/delete/:id', transactionController.deleteTransaction);    

module.exports = router;