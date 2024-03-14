const { generateSign } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET

const getUser = async (req, res, next) => {
	try {
		const userRead = await User.find();
		return res.status(200).json({ userRead });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userReadbyId = await User.findById(id);
		return res.status(200).json({ userReadbyId });
	} catch (error) {
		return res.status(400).json(error);
	}
};

// POST

const registerUser = async (req, res, next) => {
	try {
		const newUser = new User({
			email: req.body.email,
			userName: req.body.userName,
			contraseña: req.body.contraseña,
			añoNacimiento: req.body.añoNacimiento,
			rol: req.body.rol,
			imagenPerfil: req.body.imagenPerfil,
		});

		const userDuplicated = await User.findOne({
			userName: req.body.userName,
		});

		if (userDuplicated) {
			return res.status(400).json("Ese nombre de usuario ya existe");
		}

		const saveUser = await newUser.save();

		return res.status(201).json(saveUser);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ userName: req.body.userName });

		if (user) {
			if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
				const token = generateSign(user._id);
				return res.status(200).json({ user, token });
			} else {
				return res.status(400).json("El nombre o la contraseña no son correctos");
			}
		} else {
			return res.status(400).json("El nombre o la contraseña no son correctos");
		}
	} catch (error) {
		return res.status(400).json(error);
	}
};

// PUT

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userUpdated = new User(req.body);
		userUpdated._id = id;
		const update = await User.findByIdAndUpdate(id, userUpdated);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// DELETE

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userDeleted = await User.findByIdAndDelete(id);
		return res.status(200).json({ mensaje: "Usuario eliminado", userDeleted });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	registerUser,
	login,
	deleteUser,
	getUser,
	getUserById,
	updateUser,
};
