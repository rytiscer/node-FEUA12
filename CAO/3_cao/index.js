const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

const port = 3000;

// Pavyzdinis duomenų masyvas su objektais
let data = [
  { name: "Petras", surname: "Slekys" },
  { name: "Jonas", surname: "Kazlauskas" },
];
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "frontend", "index.html");
  res.sendFile(htmlPath);
});

// GET route
app.get("/users", (req, res) => {
  res.send(data);
});

// POST route
app.post("/addUser", (req, res) => {
  const { name, surname } = req.body;

  if (!name || !surname) {
    return res.status(400).json({ error: "Name and surname are required" });
  }

  // Sukuriamas naujas vartotojo objektas
  const newUser = { name, surname };

  // Pridedamas naujas vartotojo objektas prie duomenų masyvo
  data.push(newUser);

  // Grąžinamas atnaujintas duomenų masyvas
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
