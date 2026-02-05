const PlanOption = require('../models/PlanOptions');


const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "prueba plan option controller"
    });
}

const add = async (req, res) => {

    await PlanOption.findById(req.params.id).then(plan => {
        if (!plan) {
            const planOption = new PlanOption(req.body);
            const planOptionSave =  planOption.save();

            return res.status(200).send({
                status: "success",
                message: "Opcion de plan creada",
                planOption: planOptionSave
            });
        }else{
            return res.status(400).send({
                status: "error",
                message: "Ya existe una opción de plan con ese id"
            });
        }
    });

}

const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    console.log(id);
    console.log(data);


   await PlanOption.findByIdAndUpdate(id, data, { new: true })
        .then(planOptionUpdated => {
            return res.status(200).send({
                status: "success",
                message: "Opcion de plan actualizada",
                planOption: planOptionUpdated
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error actualizando opción de plan",
                error: error.message
            });
        });
}

const deletePlanOption = async(req, res) => {
    const id = req.params.id;

   await PlanOption.findByIdAndDelete({ _id: id })
        .then(planOptionDelete => {
            return res.status(200).send({
                status: "success",
                message: "Opcion de plan eliminada"
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error eliminando opción de plan"
            });
        });
}   

const findAll = async (req, res) => {
    
   await PlanOption.find()
        .then(planOptions => {
            return res.status(200).send({
                status: "success",
                message: "Opciones de plan encontradas",
                planOptions: planOptions
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando opciones de plan"
            });
        });
}

const planId = async (req, res) => {

    const planId = req.params.id;

    await PlanOption.findById(planId)
        .then(planOption => {
            if (!planOption) {
                return res.status(404).send({
                    status: "error",
                    message: "Error opción de plan no existe"
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Opción de plan encontrada",
                planOption: planOption
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando opción de plan"
            });
        });
}

module.exports = {
    add,
    findAll,
    planId,
    update,
    deletePlanOption,
    prueba

}