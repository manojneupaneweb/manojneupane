const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => res.render("index"));
app.get("/admin", (req, res) => res.send("This is Admin page"));





app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

