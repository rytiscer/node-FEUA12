const express = require("express");
const app = express();
const port = 3002;
const path = require("path");

const carBrands = ["BMW", "VW", "Porsche", "Audi"];

app.get("/car_brands", (req, res) => {
  res.send(carBrands);
});

const frontendPath = __dirname;

app.use(express.static(frontendPath));

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
