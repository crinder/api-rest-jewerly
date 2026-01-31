const Transaction = require('../models/transactions');

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "prueba transaction controller"
    });
}

const add = async (req, res) => {
    try {
        const { sessionId, type, amount, method } = req.body;

        const transaction = new Transaction({
            sessionId: sessionId,
            type: type,
            amount: amount,
            method: method
        });

        const transactionSaved = await transaction.save();

        return res.status(200).send({
            status: "success",
            message: "Transacción creada exitosamente",
            transaction: transactionSaved
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al crear la transacción",
            error: error.message
        });
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    await Transaction.findByIdAndUpdate(id, req.body, { new: true })
        .then(transactionUpdated => {
            return res.status(200).send({
                status: "success",
                message: "Transacción actualizada",
                transaction: transactionUpdated
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error actualizando transacción",
                error: error.message
            });
        });
}

const deleteTransaction = async (req, res) => {
    const id = req.params.id;

    await Transaction.findByIdAndDelete({ _id: id })
        .then(transactionDelete => {
            return res.status(200).send({
                status: "success",
                message: "Transacción eliminada"
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error eliminando transacción"
            });
        });
}

const findAll = async (req, res) => {

    await Transaction.find()
        .then(transactions => {
            return res.status(200).send({
                status: "success",
                message: "Transacciones encontradas",
                transactions: transactions
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando transacciones"
            });
        });
}

const transactionId = async (req, res) => {

    const transactionId = req.params.id;

    await Transaction.findById(transactionId)
        .then(transaction => {
            if (!transaction) {
                return res.status(404).send({
                    status: "error",
                    message: "Error transacción no existe"
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Transacción encontrada",
                transaction: transaction
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando transacción"
            });
        });
}

module.exports = {
    add,
    findAll,
    transactionId,
    update,
    deleteTransaction,
    prueba
}