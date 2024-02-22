document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/memberships")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((membership) => {
        const formattedPrice = "$" + membership.price;

        const itemHTML = `
        <div class="item">
          <div class="price-name">
            <div class="price">${formattedPrice}&nbsp</div>
            <div class="name">${membership.name}</div>
          </div>
          <div class="description">${membership.description}</div>
          <img class="deleteButton" src="assets/trash.png" alt="Delete button" data-id="${membership._id}">
        </div>
      `;

        document
          .getElementById("membershipsContainer")
          .insertAdjacentHTML("beforeend", itemHTML);
      });
    })
    .catch((error) => {
      console.error("Error fetching memberships:", error);
    });

  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("deleteButton")) {
      const membershipId = event.target.dataset.id;
      const button = event.target;

      fetch("http://localhost:8080/memberships/" + membershipId, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete membership");
          }

          button.closest(".item").remove();
        })
        .catch((error) => {
          console.error("Error deleting membership:", error);
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
