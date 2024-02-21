const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		añoSalida: { type: Number, required: true },
		mínimoEdad: { type: Number, required: true },
		precio: { type: Number, required: true },
		multijugador: { type: Boolean, required: true },
	},
	{
		timestamps: true,
		collection: "games",
	}
);

const Game = mongoose.model("games", gameSchema, "games");
module.exports = Game;
