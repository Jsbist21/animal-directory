document.addEventListener("DOMContentLoaded", () => {
  const addAnimalForm = document.getElementById("addAnimalForm");
  const animalsList = document.getElementById("animals");

  // Fetch all animals and display them
  fetch("http://localhost:3000/animals") // Update URL to correct backend address
    .then((response) => response.json())
    .then((data) => {
      data.forEach((animal) => {
        const li = document.createElement("li");
        li.textContent = `${animal.name} - ${animal.species}`;
        animalsList.appendChild(li);
      });
    });

  // Handle form submission to add a new animal
  addAnimalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addAnimalForm);
    const name = formData.get("name");
    const species = formData.get("species");

    // Send POST request to add new animal
    fetch("http://localhost:3000/animals", {
      // Update URL to correct backend address
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, species }),
    })
      .then((response) => response.json())
      .then((data) => {
        const li = document.createElement("li");
        li.textContent = `${data.name} - ${data.species}`;
        animalsList.appendChild(li);
        addAnimalForm.reset();
      });
  });
});
