const Item = require('../models/Items');
const Plan = require('../models/PlanOptions');
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

    const data = req.body;
    const items = JSON.parse(data.itemsData);


    if (!items) {
        return res.status(400).send({
            status: "error",
            message: "Datos incompletos"
        });
    }

    const promesasDeActualizacion = items.map((item) => {

        return Item.findByIdAndUpdate(
            { _id: item.id },
            { name: item.name, category: item.category },
            { new: true }
        );
    });

    const resultados = await Promise.all(promesasDeActualizacion);

    res.status(200).send({
        status: "success",
        message: "Item actualizado",
        item: resultados
    });


}

const deleteItem = async (req, res) => {
    const id = req.params.id;

    await Item.findByIdAndUpdate({ _id: id }, {active: 'ELI'})
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

    await Item.find({ active: 'ACT' })
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

    const body = req.body;

    let page;
    let limit;
    let skip = 0;

    if (body.first && body.rows) {
        page = parseInt(body.first, 30) || 0;
        limit = parseInt(body.rows, 30) || 30;
        skip = (query.page - 1) * query.limit;
    }

    const items = await Item.find().lean().skip(skip).limit(limit); // .lean() para que sean objetos JS manipulables;

    if (items && items.length > 0) {

        if (!body.planId) {
            return res.status(200).send({
                status: "success",
                message: "listado completado",
                items: items
            });
        }

        const itemsPlan = await Plan.findById(body.planId);

        const newPlan = itemsPlan.availableItems.map(item => item.item._id.toString());

        newItems = items.map(item => {

            const itemPlan = itemsPlan.availableItems.find(i => i.item._id.toString() === item._id.toString());

            return {
                ...item,
                exists: newPlan.includes(item._id.toString()),
                chance: itemPlan ? itemPlan.chance : null
            };
        });

        return res.status(200).send({
            status: "success",
            message: "listado completado",
            items: newItems
        });
    }

    return res.status(200).send({
        status: "success",
        message: "listado completado",
        items: []
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