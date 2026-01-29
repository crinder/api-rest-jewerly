const Item = require('../models/Items');

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
            const itemSaved =  itemSave.save();

            return res.status(200).send({
                status: "success",
                message: "Item creado",
                item: itemSaved
            });
        }else{
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

const deleteItem = async(req, res) => {
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

module.exports = {
    add,
    findAll,
    itemId,
    update,
    deleteItem,
    prueba

}