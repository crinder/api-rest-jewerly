const Session = require('../models/Sesions');
const Plan = require('../models/PlanOptions');
const Item = require('../models/Items');

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "prueba sesion controller"
    });
}

const add = async (req, res) => {
    try {
        const { planId, optionId } = req.body;

        const planOriginal = await Plan.findById(planId);

        if (!planOriginal) {
            return res.status(404).send({ status: "error", message: "El plan no existe" });
        }

        const opcionElegida = planOriginal.options.id(optionId);

        if (!opcionElegida) {
            return res.status(404).send({ status: "error", message: "La opción de plan no es válida" });
        }

        const newSession = new Session({
            planSnapshot: {
                planId: planOriginal._id,
                planCode: planOriginal.code,
                planName: planOriginal.name,
                optionId: opcionElegida._id,
                price: opcionElegida.price,
                turns: opcionElegida.turns,
                bonusTurns: opcionElegida.bonusTurns
            },
            status: "initial",
            totalPaid: opcionElegida.price,
            turnsUsed: 0,
            prizes: []
        });

        const sesionSaved = await newSession.save();

        return res.status(200).send({
            status: "success",
            message: "Sesión creada exitosamente con snapshot",
            session: sesionSaved
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al crear la sesión",
            error: error.message
        });
    }
};

const turnPlay = async (req, res) => {
    try {
        const { sesionId } = req.params;

        const session = await Session.findById(sesionId);
        if (!session) {
            return res.status(400).send({ message: "Sesión no encontrada o finalizada" });
        }

        //-->> valido el total de turnos
        const totalMaxTurns = session.planSnapshot.turns + session.planSnapshot.bonusTurns;

        if (session.turnsUsed >= totalMaxTurns) {
            return res.status(400).send({ message: "No quedan turnos disponibles" });
        }

        // valido los chance 
        const plan = await Plan.findById(session.planSnapshot.planId).populate('availableItems.item');

        // valido que tenga items con stock disponible
        const itemsConStock = plan.availableItems.filter(entry => entry.item.stock > 0);

        if (itemsConStock.length === 0) {
            return res.status(400).send({ message: "No hay premios disponibles en stock físico" });
        }


        const totalWeight = itemsConStock.reduce((sum, el) => sum + el.chance, 0);
        let random = Math.random() * totalWeight;
        let selectedEntry = null;

        for (const entry of itemsConStock) {
            if (random < entry.chance) {
                selectedEntry = entry;
                break;
            }
            random -= entry.chance;
        }

        const itemGanado = selectedEntry.item;


        session.turnsUsed += 1;

        session.prizes.push({
            itemId: itemGanado._id,
            name: itemGanado.name,
            category: itemGanado.category,
            imageUrl: itemGanado.imageUrl
        });

        if (session.turnsUsed === totalMaxTurns) {
            session.status = "finished";
            session.finishedAt = Date.now();
        }

        await session.save();

        await Item.findByIdAndUpdate(itemGanado._id, { $inc: { stock: -1 } });

        return res.status(200).send({
            status: "success",
            item: itemGanado,
            remainingTurns: totalMaxTurns - session.turnsUsed
        });

    } catch (error) {
        return res.status(500).send({ message: "Error al procesar el turno", error: error.message });
    }
}

const update = async (req, res) => {
    const id = req.params.id;

    await Session.findByIdAndUpdate(id, req.body, { new: true })
        .then(sesionUpdated => {
            return res.status(200).send({
                status: "success",
                message: "Sesion actualizada",
                sesion: sesionUpdated
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error actualizando sesion",
                error: error.message
            });
        });
}

const deleteSesion = async (req, res) => {
    const id = req.params.id;

    await Session.findByIdAndDelete({ _id: id })
        .then(sesionDelete => {
            return res.status(200).send({
                status: "success",
                message: "Sesion eliminada"
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error eliminando sesion"
            });
        });
}

const findAll = async (req, res) => {

    await Session.find()
        .then(sesions => {
            return res.status(200).send({
                status: "success",
                message: "Sesiones encontradas",
                sesions: sesions
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando sesiones"
            });
        });
}

const sesionId = async (req, res) => {

    const sesionId = req.params.id;

    await Session.findById(sesionId)
        .then(sesion => {
            if (!sesion) {
                return res.status(404).send({
                    status: "error",
                    message: "Error sesion no existe"
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Sesion encontrada",
                sesion: sesion
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando sesion"
            });
        });
}

module.exports = {
    add,
    findAll,
    sesionId,
    update,
    deleteSesion,
    prueba,
    turnPlay
}