function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display='flex'

}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display='none'

}
// Toggle chatbox on click
document.getElementById('chat-icon').addEventListener('click', function() {
  document.getElementById('chatbox').style.display = 'block';
});

// Close chatbox on click
document.getElementById('close-chatbox').addEventListener('click', function() {
  document.getElementById('chatbox').style.display = 'none';
});

// Send message on click
document.getElementById('send-message').addEventListener('click', function() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    const chatContent = document.querySelector('.chatbox-content');
    const messageHTML = `
      <div class="message">
        <p>${message}</p>
      </div>
    `;
    chatContent.innerHTML += messageHTML;
    messageInput.value = '';
  }
});
const eyeIcon = document.getElementById('eye');
const passwordInput = document.querySelector('.password-input input');

eyeIcon.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.add('fa-eye-slash');
    eyeIcon.classList.remove('fa-eye');
  } else {
    passwordInput.type = 'password';
    eyeIcon.classList.add('fa-eye');
    eyeIcon.classList.remove('fa-eye-slash');
  }
});

// Add event listener for touch devices
eyeIcon.addEventListener('touchstart', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.add('fa-eye-slash');
    eyeIcon.classList.remove('fa-eye');
  } else {
    passwordInput.type = 'password';
    eyeIcon.classList.add('fa-eye');
    eyeIcon.classList.remove('fa-eye-slash');
  }
});
/*google maps*/
// Create the map
document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById("searchButton");
  const saveButton = document.getElementById("saveButton");

  searchButton.addEventListener("click", function() {
    alert("Search button clicked!");
  });

  saveButton.addEventListener("click", function() {
    alert("Save button clicked!");
  });
});
  // Create the map
  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);