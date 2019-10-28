const Sequelize = require("sequelize");
const sequelize = require("../index");
const Columns = require("./columns");
const Model = Sequelize.Model;

class Cards extends Model {}
Cards.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		column_id: {
			type: Sequelize.INTEGER,
			references: {
				model: Columns,
				key: "id"
			}
		},
		text: {
			type: Sequelize.STRING,
			allowNull: false,
			notEmpty: true
		}
	},
	{ sequelize, timestamps: false }
);

Cards.sync()
	.then(() => console.log("Able to connect to Cards Table"))
	.catch(err => console.error("Unable to connect to Cards Table", err));

module.exports = Cards;