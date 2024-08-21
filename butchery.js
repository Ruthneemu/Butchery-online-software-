function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display='flex'

}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display='none'

}
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    const dropdownMenu = toggle.nextElementSibling;
    dropdownMenu.classList.toggle('show');
  });
});
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
//login.html 
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (email === '' || password === '') {
    alert("Please fill in all fields!");
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('email=' + email + '&password=' + password);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        if (response === 'success') {
          alert("Login successful!");
          // Redirect to dashboard or other page
        } else {
          alert("Invalid email or password!");
        }
      } else {
        alert("Error: " + xhr.status);
      }
    };
  }
}
// registration.html
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
  
/*close button*/
function close(){
  const container = document.querySelector('.container')
  container.style.display='none'
}
//contact.html
function myFunction() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  if (name === '' || email === '' || message === '') {
    alert("Empty! Please fill in all fields and send us a message.");
  } else {
    alert("Message sent successfully!");
  }
}
//add to cart
document.getElementById('add-to-cart-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);

  // Make an AJAX request to add the item to the cart
  fetch('add_to_cart.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert('Item added to cart!');
      // Optionally update cart UI or redirect
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
