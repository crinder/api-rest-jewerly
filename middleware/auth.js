const jwt = require('jwt-simple');
const moment = require('moment');

const libjwt = require('../service/jwt');
const secret = libjwt.secret;

exports.auth = (req,res,next) => {


    const token = req.headers.authorization;

    if(!token){

        return res.status(403).json({
            status: 'error',
            message: 'error no existe token'
        });

    }

    let payload;

    try{
        payload = jwt.decode(token,secret);

        if(payload.exp <= moment.unix()){

            return res.status(403).json({
                status: 'error',
                message: 'el token ha expirado'
            });
        }
    }catch(error){
        return res.status(403).json({
            status: 'error',
            message: 'token invalido'
        }); 
    }

    console.log('payload...',payload);

    req.user = payload;

    next();
    
}