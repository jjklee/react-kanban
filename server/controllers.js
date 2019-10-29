const Columns = require("../db/models/columns.js");
const Cards = require("../db/models/cards.js");
const Sequelize = require("sequelize");

const getColumns = (req, res) => {
	Columns.findAll()
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

const getCards = (req, res) => {
	Cards.findAll()
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

const search = (req, res) => {
	let query = `%${req.query.search}%`;
	Cards.findAll({
		where: {
			text: {
				[Sequelize.Op.like]: query
			}
		}
	})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not fetch matching cards"));
};

const deleteCard = (req, res) => {
	const id = req.params.id;
	Cards.destroy({
		where: {
			id
		}
	})
		.then(data => res.sendStatus(200).send(data))
		.catch(err => res.sendStatus(404).send("Could not fetch matching cards"));
};

const addCard = (req, res) => {
	const text = req.body.text;
	const column_id = req.body.colInd;
	Cards.create({
		column_id,
		text
	})
		.then(data => res.sendStatus(200).send(data))
		.catch(err => res.sendStatus(404).send("Could not fetch matching cards"));
};

const moveCard = (req, res) => {
	const id = req.body.cardInd;
	const column_id = req.body.newColInd;
	Cards.update(
		{ column_id },
		{ where: id }
	)
	.then(data => res.sendStatus(200).send(data))
	.catch(err => res.sendStatus(404).send("Could not fetch matching cards"));

}

module.exports = { getColumns, getCards, search, deleteCard, addCard, moveCard };