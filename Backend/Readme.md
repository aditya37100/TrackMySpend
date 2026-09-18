# 📊 TrackMySpend API

**TrackMySpend API** is a full-featured RESTful backend built with **Node.js**, **Express**, and **MongoDB**, enabling users to manage expenses, incomes, budgets, and generate comprehensive financial reports.

* 🌐 **Live API**: [https://trackmyspendapi-3.onrender.com](https://trackmyspendapi-3.onrender.com)
* 📘 **Swagger Docs**: [https://trackmyspendapi-3.onrender.com/api-docs](https://trackmyspendapi-3.onrender.com/api-docs)

---

## 🔑 Key Features

* 🔐 JWT-based User Authentication
* 🧑‍💼 Admin Login Support
* 💰 Add & View Expenses and Incomes
* 📋 Budget Allocation & Evaluation
* 📊 Date-Based Report Generation (Daily, Monthly, Yearly)
* 📘 Interactive Swagger API Documentation

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (JSON Web Tokens)**
* **Zod** (Input Validation)
* **Axios**
* **Swagger (OpenAPI 3)**
* **Render** (Cloud Deployment)

---

## 📁 Project Structure

```
TrackMySpendAPI/
├── main.js
├── routes/
│   ├── userroutes.js
│   ├── adminroutes.js
│   ├── expenseroutes.js
│   ├── incomeroutes.js
│   ├── categoryroutes.js
│   ├── budgetroutes.js
│   └── reportroutes.js
├── middlewares/
│   ├── tokenauth.js
│   ├── validauth.js
│   └── zodauth.js
├── database/
│   ├── admin.js
│   ├── database.js
│   ├── expenses.js
│   ├── income.js
│   └── user.js
├── swagger.js
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Blitzkrieg28/TrackMySpendAPI.git
cd TrackMySpendAPI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Use `.env.example` as a template and add your values:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```bash
node main.js
```

---

## 🔐 Authentication

Most routes are protected and require authentication.
Pass your JWT token in request headers:

```
Authorization: Bearer <your_token>
```

---

## 📘 API Documentation

All API endpoints are documented with Swagger.

🔗 [Swagger Docs](https://trackmyspendapi-3.onrender.com/api-docs)

### 📌 Example Endpoints

* `POST /user/signup` – User Registration
* `POST /user/signin` – User Login
* `POST /admin/signin` – Admin Login
* `POST /expense/addexpense` – Add Expense
* `GET /budget/totalbudget` – Get Budget Summary
* `GET /report/viewreport` – View Financial Report

---

## 👨‍💻 Author

**Aditya Sharma**
GitHub: [@aditya37100](https://github.com/aditya37100)
