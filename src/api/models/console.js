const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		añoSalida: { type: Number, required: true },
		precio: { type: Number, required: true },
		capacidad: { type: Number, required: true },
	},
	{
		timestamps: true,
		collection: "consoles",
	}
);

const Console = mongoose.model("consoles", consoleSchema, "consoles");
module.exports = Console;
