const jwt = require('jwt-simple');
const moment = require('moment');

const libjwt = require('../service/jwt');
const secret = libjwt.secretRefesh;

exports.authRefresh = (req,res,next) => {

    const token = req.cookies.token_refresh_jewerly;
    const tokenAccess = req.headers.authorization;
    let tokenNew;

    if(!token){

        return res.status(403).json({
            status: 'error',
            message: '1. error no existe token'
        });

    }

    if(tokenAccess){
        tokenNew = req.headers.authorization.replace(/[''']+/g,'');
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

    req.user = payload;
    req.tokenNew = tokenNew;

    next();
    
}