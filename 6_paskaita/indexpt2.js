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

//grazina users
app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo1").collection("users").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//grazina viena user pagal id parametra

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);
    const con = await client.connect();
    const data = await con
      .db("demo1")
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    console.log("Found Data:", data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
//POST
app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con
      .db("demo1")
      .collection("users")
      .insertOne({ name: "Rytis Cerniauskas", username: "rytiscer" });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//PUT
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;

    const con = await client.connect();

    // Use updateOne to update a single document based on its ID
    const dbRes = await con
      .db("demo1")
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedUserData });

    await con.close();

    if (dbRes.modifiedCount === 1) {
      return res.send({ message: "User updated successfully" });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//delete
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const con = await client.connect();

    // Use deleteOne to delete a single document based on its ID
    const dbRes = await con
      .db("demo1")
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    await con.close();

    if (dbRes.deletedCount === 1) {
      return res.send({ message: "User deleted successfully" });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
