const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../service/jwt');

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "prueba admin controller"
    });
}

// no se hace auth por google por el momento por se app cerrada

const add = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usersave = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10),
            role: "admin",
            active: true,
            lastLoginAt: Date.now()
        });

        const userSaved = await usersave.save();

        return res.status(200).send({
            status: "success",
            message: "Admin creado exitosamente",
            admin: userSaved
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al crear el admin",
            error: error.message
        });
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndUpdate(id, req.body, { new: true })
        .then(adminUpdated => {
            return res.status(200).send({
                status: "success",
                message: "Admin actualizado",
                user: adminUpdated
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error actualizando admin",
                error: error.message
            });
        });
}

const deleteAdmin = async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndDelete({ _id: id })
        .then(adminDelete => {
            return res.status(200).send({
                status: "success",
                message: "Admin eliminado"
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error eliminando admin"
            });
        });
}

const findAll = async (req, res) => {

    await User.find()
        .then(admin => {
            return res.status(200).send({
                status: "success",
                message: "Admin encontrados",
                user: admin
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando admin"
            });
        });
}

const adminId = async (req, res) => {

    const adminId = req.params.id;

    await User.findById(adminId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    status: "error",
                    message: "Error admin no existe"
                });
            }
            return res.status(200).send({
                status: "success",
                message: "Admin encontrado",
                user: user
            });
        }).catch(error => {
            return res.status(400).send({
                status: "error",
                message: "Error buscando admin"
            });
        });
}

const login = async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Error usuario no existe"
            });
        }

        let pwd = bcrypt.compareSync(password, user.password);

        if (!pwd) {
            return res.status(400).send({
                status: 400,
                message: "Contraseña incorrecta"
            });
        }

        const tokenRefresh = jwt.createtokenRefresh(user);

        res.cookie('token_refresh_jewerly', tokenRefresh, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({
            status: "success",
            token: tokenRefresh
        });

}

const refresh = (req, res) => {

    const user = req.user;
    const tokenNew = req.tokenNew;

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'error no existe token',
            token: null
        });
    }

    if (tokenNew) {
        return res.status(200).json({
            status: 'success',
            token: tokenNew,
            message: 'token anterior'
        });
    }

    const newToken = jwt.createToken(user);

    return res.status(200).json({
        status: 'success',
        token: newToken,
        id_user: user.id,
        image: user.img
    })
}

const logout = (req, res) => {

    res.clearCookie("token_refresh_jewerly", {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/'
    });
    return res.status(200).json({
        status: 'success',
        message: 'usuario desconectado'
    });
}

module.exports = {
    add,
    findAll,
    adminId,
    update,
    deleteAdmin,
    prueba,
    login,
    refresh,
    logout
}