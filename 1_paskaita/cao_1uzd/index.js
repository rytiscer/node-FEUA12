async function fetchCarBrands() {
  try {
    const response = await fetch("http://localhost:3002/car_brands");
    const carBrands = await response.json();

    const carBrandsList = document.getElementById("carBrandsList");

    // Sukurkite naują p elementą
    const newItem = document.createElement("p");
    newItem.innerHTML = "Hello world";

    // Įterpkite naują p elementą po h1 elementu
    const h1Element = document.querySelector("h1");
    h1Element.insertAdjacentElement("afterend", newItem);

    // Iteruokite per automobilių prekių ženklus ir pridėkite juos į ul elementą
    carBrands.forEach((brand) => {
      const listItem = document.createElement("li");
      listItem.textContent = brand;
      carBrandsList.appendChild(listItem);
    });
  } catch (error) {
    console.log("Error fetching car brands", error);
  }
}

fetchCarBrands();
