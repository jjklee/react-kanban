const Columns = require("../db/models/columns.js");
const Cards = require("../db/models/cards.js");
const Sequelize = require("sequelize");

const getColumns = (req, res) => {
	Columns.findAll()
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get columns"));
};

const getCards = (req, res) => {
	Cards.findAll({
		order: [["order", "DESC"]]
	})
		.then(data => res.status(200).send(data))
		.catch(err => res.status(404).send("Could not get cards"));
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
		.then(data => res.sendStatus(204))
		.catch(err => res.sendStatus(404).send("Could not delete cards"));
};

const addCard = (req, res) => {
	const { text, priority, due_date, column_id } = req.body;
	Cards.findAll({
		where: { column_id },
		order: [["order", "DESC"]],
		limit: 1
	})
		.then(data => {
			const lastOrder = data[0].dataValues.order;
			Cards.create({
				column_id,
				text,
				priority,
				due_date,
				order: lastOrder + 1
			})
				.then(data => res.sendStatus(201))
				.catch(err => res.status(404).send("Could not add cards"));
		})
		.catch(err => console.log(err));
};

const moveCard = (req, res) => {
	const id = req.body.cardInd;
	const column_id = req.body.newColInd;
	Cards.update({ column_id }, { where: { id } })
		.then(data => res.sendStatus(204))
		.catch(err => res.status(404).send("Could not move card"));
};

const editCard = (req, res) => {
	const id = req.body.cardInd;
	const text = req.body.text;
	Cards.update({ text }, { where: { id } })
		.then(data => res.sendStatus(204))
		.catch(err => res.status(404).send("Could not edit card"));
};

module.exports = {
	getColumns,
	getCards,
	search,
	deleteCard,
	addCard,
	moveCard,
	editCard
};
