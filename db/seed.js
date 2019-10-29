const Columns = require("./models/columns");
const Cards = require("./models/cards");

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
		column_id: 1,
		text: "Duis porttitor consequat lacinia."
	},
	{
		column_id: 1,
		text:
			"estibulum vulputate finibus eros sit amet feugiat. Ut vestibulum sapien molestie tempus gravida. Vestibulum fringilla nisl sit amet commodo pellentesque. Vestibulum commodo metus at urna."
	},
	{
		column_id: 1,
		text:
			"Nullam eget lorem lobortis, efficitur massa ut, semper sapien. Nunc vitae ipsum egestas, aliquam enim non, interdum leo. Maecenas tristique massa id tortor ultricies vehicula."
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
		column_id: 2,
		text: "Aenean id fermentum erat, nec finibus erat."
	},
	{
		column_id: 2,
		text:
			"Nulla massa quam, imperdiet sed aliquet ut, vehicula et turpis. Nunc sed orci eget metus bibendum interdum. Nam congue felis quis purus blandit, id eleifend."
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
		column_id: 3,
		text: "Interdum et malesuada fames ac ante ipsum primis in faucibus."
	},
	{
		column_id: 3,
		text:
			"Praesent sit amet ultrices elit, eget aliquet neque. Curabitur vestibulum eget tortor quis varius. Quisque egestas leo feugiat mauris laoreet aliquam."
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
	},
	{
		column_id: 4,
		text:
			"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
	}
];

Columns.bulkCreate(columnData)
	.then(() => console.log("Successfully seeded Columns"))
	.catch(err => console.error("Failed to seed Columns", err));

Cards.bulkCreate(cardData)
	.then(() => console.log("Successfully seeded Cards"))
	.catch(err => console.error("Failed to seed Cards", err));
