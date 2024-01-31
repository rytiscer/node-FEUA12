const express = require("express"); //importuojam express
const app = express(); //inicijuojam express aplikacija
const port = 3001; //uostas

//sukuriam route(kelia) kuriuo uzejus grazinsime (GET metodas) teksta "Hello, world"
app.get("/", (req, res) => {
  //request/response
  res.send("Hello, word"); //issiuncia kvietejui atsakyma
});
const cars = ["Bmw", "Audi", "WV"];
app.get("/cars", (req, res) => {
  res.send(cars);
});

const students = [
  { id: 1, name: "Rytis", age: 26 },
  { id: 2, name: "Jonas", age: 25 },
];
app.get("/students", (req, res) => {
  res.send(students);
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});

const users = ["Alex", "Rose", "Megan"];
app.get("/users", (req, res) => {
  res.send(users);
});
