const jwt = require("jwt-simple");
const moment = require("moment");
require('dotenv').config();

const secret = process.env.SECRET_KEY;
const secretRefesh = process.env.SECRET_KEY_REFRESH;

const createToken = (user) =>{

    const payload = {
        id: user._id,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(10, 'minutes').unix()
    }

     return jwt.encode(payload,secret);
     
}

const createtokenRefresh = (user) =>{

    const payload = {
        id: user._id,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(20, 'days').unix()
    }

     return jwt.encode(payload,secretRefesh);

}

module.exports = {
    secret,
    secretRefesh,
    createToken,
    createtokenRefresh
}