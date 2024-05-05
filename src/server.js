import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

let animals = [
  { id: 1, name: "Lion", species: "Mammal" },
  { id: 2, name: "Eagle", species: "Bird" },
  { id: 3, name: "Snake", species: "Reptile" },
];

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// GET all animals
app.get("/animals", (req, res) => {
  res.json(animals);
});

// POST a new animal
app.post("/animals", (req, res) => {
  const newAnimal = req.body;
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

// PUT update an existing animal
app.put("/animals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = animals.findIndex((animal) => animal.id === id);
  if (index === -1) {
    res.status(404).send("Animal not found");
  } else {
    animals[index] = req.body;
    res.json(animals[index]);
  }
});

// DELETE an animal
app.delete("/animals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = animals.findIndex((animal) => animal.id === id);
  if (index === -1) {
    res.status(404).send("Animal not found");
  } else {
    const deletedAnimal = animals.splice(index, 1);
    res.json(deletedAnimal[0]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
