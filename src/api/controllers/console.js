const Console = require("../models/console");

// GET

const getConsole = async (req, res, next) => {
	try {
		const consoleRead = await Console.find();
		return res.status(200).json({ consoleRead });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getConsoleById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const consoleFindId = await Console.findById(id);
		return res.status(200).json({ consoleFindId });
	} catch (error) {
		return res.status(400).json(error);
	}
};

// POST

const postConsole = async (req, res, next) => {
	try {
		const newConsole = new Console({
			nombre: req.body.nombre,
			añoSalida: req.body.añoSalida,
			precio: req.body.precio,
			capacidad: req.body.capacidad,
		});

		const saveConsole = await newConsole.save();

		return res.status(201).json(saveConsole);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// PUT

const updateConsole = async (req, res, next) => {
	try {
		const { id } = req.params;
		const consoleUpdated = new Console(req.body);
		consoleUpdated._id = id;
		const update = await Console.findByIdAndUpdate(id, consoleUpdated);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// DELETE

const deleteConsole = async (req, res, next) => {
	try {
		const { id } = req.params;
		const consoleDeleted = await Console.findByIdAndDelete(id);
		return res
			.status(200)
			.json({ mensaje: "Consola eliminada", consoleDeleted });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	postConsole,
	deleteConsole,
	getConsole,
	getConsoleById,
	updateConsole,
};
