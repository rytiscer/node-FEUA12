async function fetchCarBrands() {
  try {
    const response = await fetch("http://localhost:3002/car_brands");
    const carBrands = await response.json();

    const carBrandsList = document.getElementById("carBrandsList");

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
