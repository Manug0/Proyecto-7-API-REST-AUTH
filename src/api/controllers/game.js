const Console = require("../models/console");
const Game = require("../models/game");

// GET

const getGame = async (req, res, next) => {
	try {
		const gameRead = await Game.find();
		return res.status(200).json({ gameRead });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getGameById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const gameFindId = await Game.findById(id);
		return res.status(200).json({ gameFindId });
	} catch (error) {
		return res.status(400).json(error);
	}
};

// POST

const postGame = async (req, res, next) => {
	try {
		const newGame = new Game({
			nombre: req.body.nombre,
			añoSalida: req.body.añoSalida,
			mínimoEdad: req.body.mínimoEdad,
			precio: req.body.precio,
			multijugador: req.body.multijugador,
		});

		const saveGame = await newGame.save();

		const consoleId = req.body.consoleId;

		const console = await Console.findById(consoleId);
		console.juegosCompatibles.push(saveGame._id);

		await console.save();

		return res.status(201).json(saveGame);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// PUT

const updateGame = async (req, res, next) => {
	try {
		const { id } = req.params;
		const gameUpdated = new Game(req.body);
		gameUpdated._id = id;
		const update = await Game.findByIdAndUpdate(id, gameUpdated);
		return res.status(200).json(update);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// DELETE

const deleteGame = async (req, res, next) => {
	try {
		const { id } = req.params;
		const gameDeleted = await Game.findByIdAndDelete(id);
		return res.status(200).json({ mensaje: "Juego eliminado", gameDeleted });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	postGame,
	deleteGame,
	getGame,
	getGameById,
	updateGame,
};
