const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI =
  "mongodb+srv://admin:admin@cluster0.jdz8luo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URI);

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("pets").collection("pets").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).send({ error: "Failed to fetch data from MongoDB" });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db("pets").collection("pets").insertOne({
      name: "Bob",
      type: "mouse",
      age: 5,
    });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
