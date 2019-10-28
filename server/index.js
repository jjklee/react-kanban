const express = require("express");
const parser = require("body-parser");
const path = require("path");
const { getColumns, getCards } = require("./controllers");
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/columns", getColumns);
app.get("/api/cards", getCards);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}!`));
