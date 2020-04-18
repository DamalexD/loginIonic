const user = require('../modelos/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};

userController.getUsers = async(req, res) => {
    const users = await user.find();
    res.json(users);
}

userController.createUser = async(req, res) => {
    let contraseña = req.body.password;
    const crypt = bcrypt.hashSync(contraseña, saltRounds);

    const AddUser = {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        userName: req.body.userName,
        email: req.body.email,
        password: crypt
    }
    const newUser = new user(AddUser)
    await newUser.save();

    res.json({
        status: "Si lo guardo :')"
    });
}

userController.login = async(req, res) => {
    const userData = {
        userName: req.body.userName,
        password: req.body.password
    }
    await user.findOne({ userName: userData.userName }, (err, user) => {
        if (err) return res.status(400)
        if (!user) {
            res.json({
                status: 'Peto :('
            })
        } else {
            const passUser = bcrypt.compareSync(userData.password, user.password);
            if (passUser) {
                res.json({
                    status: "Eyyyy si está! :')",
                    User: userData.userName
                })
            } else {
                res.json({
                    status: "Eyyyy no está! :("
                })
            }
        }
    });
}

module.exports = userController;