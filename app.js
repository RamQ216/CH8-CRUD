const express = require("express");
const path = require("path");

const topicRoutes = require("./routes/topicRoutes");
const linkRoutes = require("./routes/linkRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", topicRoutes);
app.use("/", linkRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});