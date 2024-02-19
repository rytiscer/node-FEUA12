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

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo1").collection("services").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const newService = req.body;
    const con = await client.connect();
    const dbRes = await con
      .db("demo1")
      .collection("services")
      .insertOne(newService);
    await con.close();
    res.send(dbRes);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/memberships/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db("demo1")
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/users", async (req, res) => {
  const order = req.params.order;
  try {
    const con = await client.connect();
    const data = await con
      .db("demo1")
      .collection("users2")
      .aggregate([
        {
          $addFields: {
            service_id: { $toObjectId: "$service_id" }, // Convert service_id to ObjectId
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "service_id",
            foreignField: "_id",
            as: "Membership",
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    const con = await client.connect();
    const dbRes = await con.db("demo1").collection("users2").insertOne(newUser);
    await con.close();
    res.send(dbRes);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
