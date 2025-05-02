document.addEventListener("DOMContentLoaded", () => {
    // Safe firstName textContent setting
    const firstNameElem = document.getElementById("firstName");
    if (firstNameElem) {
      firstNameElem.textContent = "<?php echo $firstName ?? 'Guest'; ?>";
    }
  
    // Hide user dropdown on outside click
    document.addEventListener("click", (e) => {
      const userGreeting = document.getElementById("userGreeting");
      const userDropdown = document.getElementById("userDropdown");
      const categoriesMenu = document.getElementById("categoriesMenu");
      const categoriesDropdown = document.getElementById("categoriesDropdown");
  
      if (userGreeting && userDropdown && !userGreeting.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = "none";
      }
  
      if (categoriesMenu && categoriesDropdown && !categoriesMenu.contains(e.target) && !categoriesDropdown.contains(e.target)) {
        categoriesDropdown.style.display = "none";
      }
    });
  
    // Here you can add the rest of your JavaScript from original butcha.js as needed,
    // including event listeners for add-to-cart buttons, increment, decrement, etc.
  
  });
  