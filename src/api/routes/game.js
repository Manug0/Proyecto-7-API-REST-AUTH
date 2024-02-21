const { isAdmin } = require("../../middlewares/admin");
const {
	getGame,
	getGameById,
	postGame,
	updateGame,
	deleteGame,
} = require("../controllers/game");

const gameRoutes = require("express").Router();

gameRoutes.get("/", getGame);
gameRoutes.get("/:id", getGameById);
gameRoutes.post("/", [isAdmin], postGame);
gameRoutes.put("/update/:id", [isAdmin], updateGame);
gameRoutes.delete("/delete/:id", [isAdmin], deleteGame);

module.exports = gameRoutes;
