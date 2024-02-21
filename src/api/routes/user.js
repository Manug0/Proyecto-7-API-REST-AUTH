const { isAuth } = require("../../middlewares/auth");
const {
	registerUser,
	login,
	deleteUser,
	getUser,
} = require("../controllers/user");

const userRoutes = require("express").Router();

userRoutes.get("/", getUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", login);
userRoutes.delete("/delete/:id", [isAuth], deleteUser);

module.exports = userRoutes;
