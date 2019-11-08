const Columns = require("../db/models/columns.js");
const Cards = require("../db/models/cards.js");
const Sequelize = require("sequelize");

const getColumns = (req, res) => {
	Columns.findAll({})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

const getCards = (req, res) => {
	Cards.findAll({})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get cards"));
};

const search = (req, res) => {
	let query = `%${req.query.search}%`;
	Cards.findAll({
		where: {
			text: { [Sequelize.Op.like]: query }
		}
	})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not fetch matching cards"));
};

const deleteCard = (req, res) => {
	const id = req.params.id;
	Cards.destroy({
		where: { id }
	})
		.then(data => res.sendStatus(204))
		.catch(err => res.sendStatus(404).send("Could not delete cards"));
};

const addCard = (req, res) => {
	const { id, text, priority, due_date, column_id } = req.body;
	Cards.create({
		id,
		column_id,
		text,
		priority,
		due_date
	})
		.then(data => res.sendStatus(201))
		.catch(err => res.status(404).send(err));
};

const editCard = (req, res) => {
	const id = req.body.cardInd;
	const text = req.body.text;
	Cards.update({ text }, { where: { id } })
		.then(data => res.sendStatus(204))
		.catch(err => res.status(404).send("Could not edit card"));
};

const updateColumn = (req, res) => {
	const { id, column_id } = req.body;
	Cards.update({ column_id }, { where: { id } })
		.then(data => res.sendStatus(204))
		.catch(err => res.sendStatus(404));
};

const moveCard = (req, res) => {
	const { card_order, id } = req.body;
	Columns.update({ card_order }, { where: { id } })
		.then(data => res.sendStatus(204))
		.catch(err => res.status(404).send("Could not move card"));
};

const moveColumns = (req, res) => {
	const { startColId, startOrder, finishColId, finishOrder } = req.body;	
	Columns.update({ card_order: startOrder }, { where: { id: startColId } })
	Columns.update({ card_order: finishOrder }, { where: { id: finishColId } })
		.then(data => res.sendStatus(204))
		.catch(err => res.sendStatus(404));
};

module.exports = {
	getColumns,
	getCards,
	search,
	deleteCard,
	addCard,
	moveCard,
	editCard,
	updateColumn,
	moveColumns
};
