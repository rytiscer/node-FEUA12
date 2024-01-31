// Duomenys: https://pastebin.com/M3FQdwqf
// 1. Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.
// 2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,
// bei grąžins Sk tuos produktus, kurie priklauso šiai kategorijai.
// 3. Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins aSSnkamą
// prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės
// konvertuoS.
// 4. Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas:
// ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH1000XM4", "Bose QuietComfort 35 II"]).
// 5. Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra
// mažesnis už nurodytą kiekį, pavadinimus ir likug (formatas: [{"name": "Samsung
// Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).

const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3003;
//1
app.get("/data", (req, res) => {
  res.send(data);
});
//4
app.get("/data/items", (req, res) => {
  console.log(data); // Spausdiname visą duomenų masyvą
  const items = data.map((item) => item.name);
  console.log(items); // Spausdiname pavadinimus
  res.send(items);
});
//3
app.get("/data/:id", (req, res) => {
  const itemId = +req.params.id;
  const foundItem = data.find((item) => item.id === itemId);
  console.log(foundItem);
  res.send(foundItem);
});

//2
app.get("/data/:categoryName", (req, res) => {
  const { categoryName } = req.params;
  const filteredData = data.filter((item) => {
    const firstWord = item.category.split(" ")[0];
    return firstWord.toLowerCase() === categoryName.toLowerCase();
  });
  console.log(filteredData);
  res.send(filteredData);
});
//5
app.get("/data/stock/:quantity", (req, res) => {
  const quantityThreshold = parseInt(req.params.quantity, 10);

  if (isNaN(quantityThreshold)) {
    return res.status(400).send("Nurodykite tinkamą kiekį.");
  }

  const lowStockItems = data
    .filter((item) => item.stock < quantityThreshold)
    .map((item) => ({ name: item.name, stock: item.stock }));

  res.send(lowStockItems);
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
