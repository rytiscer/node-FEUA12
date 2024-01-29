const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3003;

let users = [
  { id: 1, name: "Rytis", surname: "Cerniauskas", role: "ADMIN" },
  { id: 2, name: "Rytis", surname: "Cerniauskas", role: "MANAGER" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const fakeId = users.length + 1;
  const user = { ...req.body, id: fakeId };
  if (user.name && user.surname && user.role) {
    users.push(user); //updating list
    res.send(user); //returning created user
  } else {
    res.status(400).send({ message: "User data is mising" });
  }
});
//UPDATES(PUT) existing user
app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  const updatingUser = req.body;

  console.log(id);
  console.log(updatingUser);
  // users = users.map((user) => (user.id === id ? updatingUser : user));
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1, updatingUser);

    res.send(updatingUser);
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1);
    res.send({ message: "Deleted" });
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
