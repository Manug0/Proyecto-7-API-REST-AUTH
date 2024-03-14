const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, trim: true, required: true, unique: true },
		userName: { type: String, required: true },
		contraseña: { type: String, required: true },
		añoNacimiento: { type: Number, trim: true, required: true },
		rol: {
			type: String,
			required: true,
			default: "user",
			enum: ["admin", "user"],
		},
		imagenPerfil: { type: String, trim: true, required: true },
	},
	{
		timestamps: true,
		collection: "users",
	}
);

userSchema.pre("save", function () {
	this.contraseña = bcrypt.hashSync(this.contraseña, 10);
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;
