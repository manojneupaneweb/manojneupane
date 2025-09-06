import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve the index.html file
app.get("/", (req, res) => {
    res.render('index', { name: 'Manoj Neupane' });
});

app.get("/admin", (req, res) => {
  res.send("This is the Admin page");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
