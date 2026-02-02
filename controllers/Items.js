const Item = require('../models/Items');
const fs = require('fs');
const path = require('path');

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "prueba item controller"
    });
}

const add = async (req, res) => {

    await Item.findById(req.params.id).then(item => {
        if (!item) {
            const itemSave = new Item(req.body);
            const itemSaved = itemSave.save();

            return res.status(200).send({
                status: "success",
                message: "Item creado",
                item: itemSaved
            });
        } else {
            return res.status(400).send({
                status: "error",
                message: "Ya existe un item con ese id"
            });
        }
    });

}

const update = async (req, res) => {
    const id = req.params.id;

    await Item.findByIdAndUpdate(id, req.body, { new: true })
        .then(itemUpdated => {
            return res.status(200).send({
                status: "success",
                message: "Item actualizado",
                item: itemUpdated
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error actualizando item",
                error: error.message
            });
        });
}

const deleteItem = async (req, res) => {
    const id = req.params.id;

    await Item.findByIdAndDelete({ _id: id })
        .then(itemDelete => {
            return res.status(200).send({
                status: "success",
                message: "Item eliminado"
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error eliminando item"
            });
        });
}

const findAll = async (req, res) => {

    await Item.find()
        .then(items => {
            return res.status(200).send({
                status: "success",
                message: "Items encontrados",
                items: items
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando items"
            });
        });
}

const itemId = async (req, res) => {

    const itemId = req.params.id;

    await Item.findById(itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    status: "error",
                    message: "Error item no existe"
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Item encontrado",
                item: item
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando item"
            });
        });
}

const upload = async (req, res) => {

    try {

        const files = req.files;
        const itemsData = JSON.parse(req.body.itemsData);

        if (!files || files.length === 0) {
            return res.status(400).send({ message: "No se subieron imágenes" });
        }

        const promesasDeGuardado = files.map((file, index) => {
            const nuevoItem = new Item({
                name: itemsData[index].name,
                category: itemsData[index].category,
                url: file.filename
            });
            return nuevoItem.save();
        });

        await Promise.all(promesasDeGuardado);

        res.status(200).send({
            status: "success",
            message: `Se han cargado ${files.length} ítems correctamente.`
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al crear el item",
            error: error.message
        });
    }
};

const getAll = async (req, res) => {

    const items = await Item.find();

    return res.status(200).send({
        status: "success",
        message: "listado completado",
        items: items
    });
}

const image = async (req, res) => {

    const filePath = path.resolve("./uploads/items/", req.params.img);

    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).end(); 
    }

    return res.sendFile(filePath);
}

module.exports = {
    add,
    findAll,
    itemId,
    update,
    deleteItem,
    prueba,
    upload,
    getAll,
    image
}