const profileImg = document.querySelector("header img");
const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const locationEl = document.querySelector("#location");

// Hacemos una solicitud a la API de randomuser.me
fetch("https://randomuser.me/api/")
  .then((response) => response.json())
  .then((data) => {
    // Actualizamos los elementos del CV con los datos recibidos
    const user = data.results[0];
    profileImg.src = user.picture.large;
    nameEl.textContent = `${user.name.first} ${user.name.last}`;
    emailEl.textContent = user.email;
    locationEl.textContent = `${user.location.city}, ${user.location.country}`;
  })
  .catch((error) => console.log(error));

const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Obtener los valores del formulario
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Envío de los datos del formulario a través de AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/send-email");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Mostrar mensaje de confirmación
      const confirmation = document.createElement("p");
      confirmation.textContent =
        "Gracias por contactarme. En breve me contacto con usted.";
      form.parentNode.insertBefore(confirmation, form.nextSibling);
      form.reset();
    } else {
      alert("Ha ocurrido un error. Por favor, intenta de nuevo más tarde.");
    }
  };
  xhr.send(JSON.stringify({ name, surname, email, phone, message }));
});
