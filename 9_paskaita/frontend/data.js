document.addEventListener("DOMContentLoaded", function () {
  // Fetch memberships from the server and display them
  fetch("http://localhost:8080/memberships")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((membership) => {
        // Add dollar sign before the price
        const formattedPrice = "$" + membership.price;

        // Create HTML element with membership information
        const itemHTML = `
        <div class="item">
          <div class="price-name">
            <div class="price">${formattedPrice}</div>
            <div class="name">${membership.name}</div>
          </div>
          <div class="description">${membership.description}</div>
          <img class="deleteButton" src="assets/trash.png" alt="Delete button" data-id="${membership._id}">
        </div>
      `;
        // Insert HTML into memberships container
        document
          .getElementById("membershipsContainer")
          .insertAdjacentHTML("beforeend", itemHTML);
      });
    })
    .catch((error) => {
      console.error("Error fetching memberships:", error);
      // Optionally, display an error message to the user
    });

  // Add click event listener to the delete button to delete a membership
  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("deleteButton")) {
      const membershipId = event.target.dataset.id;
      const button = event.target; // Store reference to the button for later use

      // Send request to the server to delete the membership with the specified ID
      fetch("http://localhost:8080/memberships/" + membershipId, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete membership");
          }
          // Remove the membership element from HTML
          button.closest(".item").remove();
        })
        .catch((error) => {
          console.error("Error deleting membership:", error);
          // Optionally, display an error message to the user
        });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const membershipsContainer = document.getElementById("selectMembership");

  fetch("http://localhost:8080/memberships")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((service) => {
        const option = document.createElement("option");
        option.value = service._id;
        option.textContent = service.name;
        membershipsContainer.appendChild(option);
      });
    })
    .catch((err) => console.error("Klaida:", err));
});

document.addEventListener("DOMContentLoaded", function () {
  let membershipsLink = document.getElementById("membershipsLink");
  let usersLink = document.getElementById("usersLink");

  // Patikriname, ar esame index.html ir paryškiname tinkamą nuorodą
  if (window.location.pathname === "/index.html") {
    membershipsLink.classList.add("active");
  } else if (window.location.pathname === "/users.html") {
    usersLink.classList.add("active");
  }

  membershipsLink.addEventListener("click", function () {
    membershipsLink.classList.add("active");
    usersLink.classList.remove("active");
  });

  usersLink.addEventListener("click", function () {
    usersLink.classList.add("active");
    membershipsLink.classList.remove("active");
  });
});
