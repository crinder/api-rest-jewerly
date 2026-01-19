const mongoose = require("mongoose");
require('dotenv').config();

const conexion = async() => {
    
    try{
        mongoose.connect(process.env.DB_URL);

        console.log("Conexión completada");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    conexion
}