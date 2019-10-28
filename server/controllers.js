const Columns = require("../db/models/columns.js");
const Cards = require("../db/models/cards.js");

const getColumns = (req, res) => {
	Columns.findAll({})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

const getCards = (req, res) => {
	Cards.findAll({})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

module.exports = { getColumns, getCards };
