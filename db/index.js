const Sequelize = require("sequelize");

const sequelize = new Sequelize("kanban", "root", "", {
	host: "localhost",
	dialect: "mysql"
});

sequelize
	.authenticate()
	.then(() => console.log("Connected to kanban db."))
	.catch(err => console.error("Unable to connect to the database:", err));

module.exports = sequelize;