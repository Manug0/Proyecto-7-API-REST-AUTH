require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/api/routes/user");
const consoleRoutes = require("./src/api/routes/console");
const gameRoutes = require("./src/api/routes/game");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/console", consoleRoutes);
app.use("/api/v1/game", gameRoutes);

app.use("*", (req, res, next) => {
	return res.status(404).json("Route not found");
});

app.listen(3000, () => {
	console.log("Servidor lanzado en: http://localhost:3000");
});
