const express = require('express');
const router = express.Router();
const itemController = require('../controllers/Items');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo imágenes JPG, PNG y WebP.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});


router.get('/prueba', itemController.prueba);
router.post('/add', itemController.add);
router.get('/list', itemController.findAll);
router.get('/item/:id', itemController.itemId);
router.post('/update', upload.none(), itemController.update);
router.post('/delete/:id', itemController.deleteItem);
router.post('/upload', upload.array('images', 20), itemController.upload);
router.post('/getAll', itemController.getAll);
router.get('/image/:img', itemController.image);

module.exports = router;    