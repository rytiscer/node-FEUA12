const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
const uri = process.env.DB_CONNECTION_STRING;

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
