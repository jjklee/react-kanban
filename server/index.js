const express = require("express");
const parser = require("body-parser");
const path = require("path");
const {
	getColumns,
	getCards,
	search,
	deleteCard,
	addCard,
	moveCard,
	editCard
} = require("./controllers");
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/columns", getColumns);
app.get("/api/cards", getCards);
app.get("/api/search", search);
app.delete("/api/delete/:id", deleteCard);
app.post("/api/add", addCard);
app.patch("/api/move", moveCard);
app.patch("/api/edit", editCard);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}!`));
