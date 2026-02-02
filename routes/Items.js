const express = require('express');
const router = express.Router();
const itemController = require('../controllers/Items');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/items');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        
        const filerename = +Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        cb(null, `item-${filerename}${fileExtension}`);
    }
});

const upload = multer({ storage: storage });


router.get('/prueba', itemController.prueba);
router.post('/add', itemController.add);
router.get('/list', itemController.findAll);
router.get('/item/:id', itemController.itemId);
router.post('/update/:id', itemController.update);    
router.post('/delete/:id', itemController.deleteItem);
router.post('/upload', upload.array('images', 20), itemController.upload);
router.get('/getAll', itemController.getAll);
router.get('/image/:img', itemController.image);

module.exports = router;    