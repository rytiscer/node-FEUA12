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
              <div class="name">${membership.name}</div>
              <div class="price">${formattedPrice}</div>
              <div class="description">${membership.description}</div>
              <button class="deleteButton" data-id="${membership._id}">Delete</button>
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
