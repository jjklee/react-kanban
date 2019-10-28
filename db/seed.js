const { Columns, Cards } = require("./models");

const columnData = [
	{ title: "Backlog" },
	{ title: "In Progress" },
	{ title: "Staged for review" },
	{ title: "Completed" }
];

const cardData = [
	{
		column_id: 1,
		text:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	},
	{
		column_id: 1,
		text:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		column_id: 2,
		text:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	},
	{
		column_id: 2,
		text:
			"Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus."
	},
	{
		column_id: 3,
		text: "Facilisis leo vel fringilla est ullamcorper eget."
	},
	{
		column_id: 3,
		text: "Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat."
	},
	{
		column_id: 4,
		text:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		column_id: 4,
		text:
			"Quis auctor elit sed vulputate mi sit amet. Sit amet risus nullam eget felis eget."
	}
];

Columns.bulkCreate(columnData)
	.then(() => console.log("Successfully seeded Columns"))
	.catch(err => console.error("Failed to seed Columns", err));

Cards.bulkCreate(cardData)
	.then(() => console.log("Successfully seeded Cards"))
	.catch(err => console.error("Failed to seed Cards", err));