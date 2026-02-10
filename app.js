import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

let tasks = [
  {
    id: 1,
    title: "Setup Node.js & Express",
    description: "Initialize project, install Express, and configure basic server"
  },
  {
    id: 2,
    title: "Build EJS CRUD Functionality",
    description: "Create routes and views to add, edit, update, and delete tasks"
  },
  {
    id: 3,
    title: "Apply CSS Styling",
    description: "Use external CSS to design a clean and responsive UI"
  }
];


app.get("/", (req, res) => {
  res.render("index", { tasks });
});


app.get("/add", (req, res) => {
  res.render("add");
});


app.post("/add", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description
  };
  tasks.push(newTask);
  res.redirect("/");
});


app.get("/edit/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  res.render("edit", { task });
});


app.post("/update/:id", (req, res) => {
  tasks = tasks.map(task =>
    task.id == req.params.id
      ? {
          ...task,
          title: req.body.title,
          description: req.body.description
        }
      : task
  );
  res.redirect("/");
});


app.get("/delete/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.redirect("/");
});

const port = 5000;

app.listen(port, () => {
  console.log("server running on ", port);
});