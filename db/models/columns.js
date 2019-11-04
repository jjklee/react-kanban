const Sequelize = require("sequelize");
const sequelize = require("../index");
const Model = Sequelize.Model;

class Columns extends Model {}
Columns.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING,
			notNull: true
		},
		card_order: {
			type: Sequelize.STRING,
			get: function() {
				return JSON.parse(this.getDataValue("card_order"));
			},
			set: function(val) {
				return this.setDataValue('card_order', JSON.stringify(val));
			}
		}
	},
	{ timestamps: false, sequelize }
);

Columns.sync()
	.then(() => console.log("Able to connect to Columns Table"))
	.catch(err => console.error("Unable to connect to Columns Table", err));

module.exports = Columns;
