# Butchery Online Software – Open Source Meat Shop Management System (PHP & MySQL)
A complete online butchery system for managing orders, inventory, and customers.  
Built with PHP and MySQL – perfect for small meat businesses, developers, and open-source contributors.
## 📌 About the Project

**Butchery Online Software** is a web-based application built with PHP and MySQL, designed to help small and medium-sized butcheries manage their businesses online. It allows shop owners to sell meat products digitally, track inventory, process customer orders, and manage daily operations through a user-friendly admin dashboard.

### 🎯 Key Features

- 🛒 **Online Meat Ordering** – Customers can browse products, add items to a cart, and place orders.
- 👤 **Customer Accounts** – Login and track past orders for a more personalized experience.
- 📦 **Inventory Management** – Admins can monitor and update stock levels in real time.
- 📊 **Dashboard Overview** – Admin panel with sales insights, order history, and product controls.
- 🔐 **Secure Login System** – Separate logins for customers and administrators.
- 💬 **Contact/Feedback Form** – Allow customers to reach out with questions or suggestions.

This project is ideal for:
- Butchery owners looking to digitize their business
- Developers exploring practical PHP + MySQL projects
- Open-source contributors who want to collaborate or extend the system
### 📚 Tech Stack

This project is built using a combination of front-end and back-end technologies. Below is a breakdown of each technology and its role in the Butchery Online Software project:

- **HTML**: Used for creating the structure and content of the web pages. It defines the elements on the page such as headers, footers, forms, buttons, and product listings, forming the backbone of the user interface.

- **CSS**: Responsible for styling the web pages to make them visually appealing. It is used to control the layout, colors, typography, and overall look of the site, ensuring a responsive and user-friendly design.

- **JavaScript**: Adds interactivity to the website. It is used for tasks such as form validation, dynamically updating the shopping cart without reloading the page, and enabling smooth user interactions with elements like buttons, dropdowns, and modal dialogs.

- **PHP**: The server-side scripting language used for handling business logic. PHP processes user input, manages user authentication (e.g., for admin login), and communicates with the MySQL database to fetch, insert, and update data such as customer orders and product information.

- **SQL**: A query language used for managing the database. MySQL is used to store data related to customer orders, product inventory, user information, and order history. SQL queries allow the PHP backend to interact with the database by retrieving, updating, and deleting data as needed.

## 🚀 Getting Started

Follow these simple steps to get **Butchery Online Software** up and running on your local machine. 

### 📝 Prerequisites

Before you begin, make sure you have the following installed:

- **PHP** (Version 7.x or higher)
- **MySQL** (For database management)
- **A Web Server** (e.g., XAMPP, WAMP, or LAMP)

You can download them from:
- [PHP Official Download](https://www.php.net/downloads.php)
- [MySQL Official Download](https://dev.mysql.com/downloads/)
- [XAMPP (includes Apache, PHP, MySQL)](https://www.apachefriends.org/index.html)

### 🔧 Installation
To set up the **Butchery Online Software** on your local machine, follow these steps:

1. **Clone the Repository**  
   Start by cloning this project to your local machine:

   ```bash
   git clone https://github.com/Ruthneemu/Butchery-online-software-


2. **Move the Project to Your Web Server Directory**
   If you’re using XAMPP, for example, move the project folder into the `htdocs` directory:

   ```bash
   mv Butchery-online-software- /path/to/xampp/htdocs/
   ```

3. **Import the Database**
   You’ll need to set up the database for the application:

   * Open **phpMyAdmin** in your browser (typically [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)).
   * Create a new database, for example, `butchery_db`.
   * Import the database structure from the SQL file in this repository (usually something like `butchery_db.sql`). You can find it in the project’s root or a `/database/` folder.

4. **Configure Database Connection**
   After importing the database, update your database configuration:

   * Navigate to the `/config/` folder and open `db.php` or `config.php` (depending on how the project is structured).
   * Update the database connection settings:

   ```php
   $host = 'localhost';
   $user = 'root';       // Default MySQL username
   $pass = '';           // Default MySQL password (blank for XAMPP)
   $db   = 'butchery_db'; // The database name you created earlier
   ```

---

### ▶️ Start Your Web Server

Open your local web server (XAMPP, WAMP, or similar).

Start the following services:

* **Apache** (web server)
* **MySQL** (database server)

---

### 🌐 Access the Application

Once the server is running, navigate to the following URL in your browser:

```
http://localhost/Butchery-online-software-
```

You should now be able to see the home page of the **Butchery Online Software**.

---

### ⚙️ Usage

After setting up the project, here’s how you can use it:

#### 🛒 Customer Access

* Browse the available products (meat items).
* Add items to your shopping cart.
* Complete the checkout process by entering your details and submitting the order.

#### 🧑‍💼 Admin Access

* Log in to the admin panel using the credentials in the database (you can add new admin users via phpMyAdmin if needed).
* From the admin dashboard, you can:

  * View and manage incoming customer orders.
  * Update the inventory of products.
  * View order history and sales data.

---

### 🔒 Default Login Credentials (for Testing)

#### Admin

* **Username**: `admin`
* **Password**: `admin123`

#### Customer

* **Username**: `testuser`
* **Password**: `password123`

> 💡 *Feel free to change these after logging in for better security.*

---

### 🚨 Troubleshooting

If you encounter any issues during the installation or usage, here are a few things to check:

* **Error 500**: Ensure your PHP version is compatible (PHP 7.x or higher).
* **Database connection issues**: Double-check your `db.php` configuration and make sure MySQL is running.

---
We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or adding new features, your help is greatly appreciated.

### 🧭 How to Contribute

Please follow these steps if you'd like to contribute:

1. **Fork the Repository**  
   Click the "Fork" button at the top right of this page to create your own copy of the project.

2. **Clone Your Fork Locally**  
   ```bash
   git clone https://github.com/your-username/Butchery-online-software-.git
   cd Butchery-online-software-


3. **Create a New Branch**
   Use a descriptive branch name related to your changes:

   ```bash
   git checkout -b fix/issue-description
   

4. **Make Your Changes**
   Write clear, concise, and working code. Follow the existing code style and conventions.

5. **Commit Your Changes**
   Please write meaningful commit messages. Squash your commits before creating a pull request:

   ```bash
   git commit -m "Fix: resolved cart update issue when item is removed"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin fix/issue-description
   ```

7. **Open a Pull Request (PR)**
   Go to the original repository and click **"New Pull Request"**. Link your pull request to an existing issue if applicable.


Thank you for helping improve **Butchery Online Software**! Your contribution makes this project better for everyone. 🙏

