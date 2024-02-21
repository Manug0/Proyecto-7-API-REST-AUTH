const { isAdmin } = require("../../middlewares/admin");
const {
	getConsole,
	updateConsole,
	postConsole,
	deleteConsole,
	getConsoleById,
} = require("../controllers/console");

const consoleRoutes = require("express").Router();

consoleRoutes.get("/", getConsole);
consoleRoutes.get("/:id", getConsoleById);
consoleRoutes.post("/", [isAdmin], postConsole);
consoleRoutes.put("/update/:id", [isAdmin], updateConsole);
consoleRoutes.delete("/delete/:id", [isAdmin], deleteConsole);

module.exports = consoleRoutes;
