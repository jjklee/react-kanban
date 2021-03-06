const Columns = require("./models/columns");
const Cards = require("./models/cards");

const columnData = [
	{ id: 1, title: "Backlog", card_order: [1,2,3,4,5] },
	{ id: 2, title: "In Progress", card_order: [6,7,8,9] },
	{ id: 3, title: "Staged for review", card_order: [10,11,12,13] },
	{ id: 4, title: "Completed", card_order: [14,15,16] }
];

const cardData = [
	{
		id: 1,
		column_id: 1,
		priority: 0,
		text:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		due_date: "2019-12-30"
	},
	{
		id: 2,
		column_id: 1,
		priority: 1,
		text:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		due_date: "2019-12-20"
	},
	{
		id: 3,
		column_id: 1,
		priority: 2,
		text: "Duis porttitor consequat lacinia.",
		due_date: "2019-12-01"
	},
	{
		id: 4,
		column_id: 1,
		priority: 3,
		text:
			"estibulum vulputate finibus eros sit amet feugiat. Ut vestibulum sapien molestie tempus gravida. Vestibulum fringilla nisl sit amet commodo pellentesque. Vestibulum commodo metus at urna.",
		due_date: "2019-12-11"
	},
	{
		id: 5,
		column_id: 1,
		priority: 4,
		text:
			"Nullam eget lorem lobortis, efficitur massa ut, semper sapien. Nunc vitae ipsum egestas, aliquam enim non, interdum leo. Maecenas tristique massa id tortor ultricies vehicula.",
		due_date: "2020-01-13"
	},
	{
		id: 6,
		column_id: 2,
		priority: 5,
		text:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		due_date: "2020-03-02"
	},
	{
		id: 7,
		column_id: 2,
		priority: 6,
		text:
			"Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus.",
		due_date: "2020-01-10"
	},
	{
		id: 8,
		column_id: 2,
		priority: 7,
		text: "Aenean id fermentum erat, nec finibus erat.",
		due_date: "2019-11-29"
	},
	{
		id: 9,
		column_id: 2,
		priority: 8,
		text:
			"Nulla massa quam, imperdiet sed aliquet ut, vehicula et turpis. Nunc sed orci eget metus bibendum interdum. Nam congue felis quis purus blandit, id eleifend.",
		due_date: "2020-02-01"
	},
	{
		id: 10,
		column_id: 3,
		priority: 9,
		text: "Facilisis leo vel fringilla est ullamcorper eget.",
		due_date: "2020-02-01"
	},
	{
		id: 11,
		column_id: 3,
		priority: 10,
		text: "Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat.",
		due_date: "2020-01-01"
	},
	{
		id: 12,
		column_id: 3,
		priority: 1,
		text: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
		due_date: "2019-12-01"
	},
	{
		id: 13,
		column_id: 3,
		priority: 2,
		text:
			"Praesent sit amet ultrices elit, eget aliquet neque. Curabitur vestibulum eget tortor quis varius. Quisque egestas leo feugiat mauris laoreet aliquam.",
		due_date: "2019-12-21"
	},
	{
		id: 14,
		column_id: 4,
		priority: 3,
		text:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		due_date: "2019-07-20"
	},
	{
		id: 15,
		column_id: 4,
		priority: 4,
		text:
			"Quis auctor elit sed vulputate mi sit amet. Sit amet risus nullam eget felis eget.",
		due_date: "2019-04-17"
	},
	{
		id: 16,
		column_id: 4,
		priority: 5,
		text:
			"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		due_date: "2019-01-01"
	}
];

Columns.bulkCreate(columnData)
	.then(() => console.log("Successfully seeded Columns"))
	.catch(err => console.error("Failed to seed Columns", err));

Cards.bulkCreate(cardData)
	.then(() => console.log("Successfully seeded Cards"))
	.catch(err => console.error("Failed to seed Cards", err));
