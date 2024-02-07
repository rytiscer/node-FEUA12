const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(URI);
//suranda ir grazina visus elementus is mongoDB
app.get("/cars", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo1").collection("cars").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/students", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo1").collection("students").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// pasirinktas kiekis elementu
app.get("/count", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo1").collection("cars").countDocuments();
    await con.close();
    return res.send({ count: data });
  } catch {
    res.status(500).send({ err });
  }
});

//gauti elementa su pasirinkti id

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db("demo1")
      .collection("cars")
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});
//POST
app.post("/vw", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con
      .db("demo1")
      .collection("cars")
      .insertOne({ brand: "VW", model: "Arteon" });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/audi", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con
      .db("demo1")
      .collection("cars")
      .insertOne({ brand: "Audi", model: "100" });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/newStudent", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db("demo1").collection("students").insertOne({
      vardas: "Jonas",
      pavarde: "Makaronas",
      amzius: 22,
      universitetas: "MRU",
    });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// .insertOne(body); - prideda vieną elementą
app.post("/", async (req, res) => {
  try {
    const newCar = req.body;
    const con = await client.connect(); // same
    const dbRes = await con.db("demo1").collection("cars").insertOne(newCar);
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
