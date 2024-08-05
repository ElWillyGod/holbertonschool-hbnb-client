/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/
async function loginUser(email, password) {
  // Sends response
  const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
  });
  // Handles response

  if (response.ok) {
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/`;
    window.location.href = 'index.html';
} else {
    alert('Login failed: ' + response.statusText);
}
}

function checkAuthentication() {
  const token = getCookie("token");
  const loginLink = document.getElementById("login-link");

  if (!token) {
    loginLink.style.display = "block";
  } else {
    loginLink.style.display = "none";
    // Fetch places data if the user is authenticated
    fetchPlaces(token);
  }
}

function getCookie(name) {
  // Function to get a cookie value by its name
  // Your code here
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

/*
function fetchPlaces() {
  const headers = {Accept: 'application/json', }
  const options = {method: 'GET', headers};
  const token = getJwtToken();
  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }
  fetch('http://localhost:5000/places', options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayPlaces(data);
    })
    .catch((err) => {
      //console.log(err.toString());
      throw err;
    });
}
*/

function displayPlaces(places) {
  // Clear the current content of the places list
  // Iterate over the places data
  // For each place, create a div element and set its content
  // Append the created element to the places list
  const placesList = document.getElementById("places-list");
  placesList.innerHTML = "";

  for (const place of places) {
    const placeElement = document.createElement("div");
    placeElement.className = "place-card";
    placeElement.innerHTML = `
                <h4>${place.id}</h4>
                <img src="resource/place1.jpg" alt="place1" class="place-image">
                <p>Price per night: ${place.price_per_night}</p>
                <p>Location: ${place.city_name} ${place.country_name}</p>
                <button class="details-button">View Details</button>
    `;
    placesList.appendChild(placeElement);
  }
}

async function fetchPlaces(token) {
  // Make a GET request to fetch places data
  // Include the token in the Authorization header
  // Handle the response and pass the data to displayPlaces function
  const response = await fetch("http://localhost:5000/places", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    displayPlaces(data);
  } else {
    alert("Failed to fetch places: " + response.statusText);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      // Your code to handle form submission
      loginUser(loginForm.email.value, loginForm.password.value);
    });
  }

  checkAuthentication();
});


document.getElementById('country-filter').addEventListener('change', (event) => {
  // Get the selected country value
  // Iterate over the places and show/hide them based on the selected country
});