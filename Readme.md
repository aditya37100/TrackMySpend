# 📊 TrackMySpend

**TrackMySpend** is a full-stack personal finance application that helps you track your expenses, manage your income, set budgets, and visualize your financial health through comprehensive reports.

This repository contains both the **Frontend** (React Client) and the **Backend** (Node.js/Express API).

* 🌐 **Live API**: [https://trackmyspendapi-3.onrender.com](https://trackmyspendapi-3.onrender.com)
* 📘 **Swagger Docs**: [https://trackmyspendapi-3.onrender.com/api-docs](https://trackmyspendapi-3.onrender.com/api-docs)

---

## 🔑 Key Features

* 🔐 **Secure Authentication:** JWT-based User and Admin Login.
* 💰 **Expense & Income Tracking:** Easily add, edit, and categorize your transactions.
* 📋 **Budget Management:** Allocate budgets and monitor your spending limits.
* 📊 **Financial Reporting:** Generate interactive charts and reports (Daily, Monthly, Yearly).
* 🧾 **Smart Receipt Scanning:** OCR integration (via Tesseract.js / AWS Textract) to automatically extract data from receipts.
* 📘 **API Documentation:** Interactive Swagger UI for developers.

---

## 🛠 Tech Stack

### 🖥 Frontend (Client-Side)
* **React 19** (initialized with Vite)
* **Tailwind CSS, DaisyUI, & Flowbite** (UI & Styling)
* **React Router v7** (Navigation)
* **Chart.js & React-ChartJS-2** (Data Visualization)
* **Axios** (HTTP Client)
* **Tesseract.js** (In-browser OCR)

### ⚙️ Backend (Server-Side)
* **Node.js & Express.js**
* **MongoDB + Mongoose** (Database)
* **JWT** (JSON Web Tokens for Security)
* **Zod** (Request Input Validation)
* **Swagger (OpenAPI 3)** (API Documentation)

---

## 📁 Project Structure

```text
TrackMySpendAPI/
├── Frontend/           # React + Vite Client Application
│   ├── src/            # Components, Pages, Assets
│   ├── public/         # Static files
│   ├── package.json
│   └── tailwind.config.js
├── Backend/            # Node.js + Express REST API
│   ├── routes/         # API endpoints (User, Expense, Income, etc.)
│   ├── middlewares/    # Authentication & Validation logic
│   ├── database/       # Mongoose schemas & models
│   ├── main.js         # API Entry point
│   └── package.json
└── learning/           # Architectural documentation & overviews
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Blitzkrieg28/TrackMySpendAPI.git
cd TrackMySpendAPI
```

### 2. Backend Setup

Open a terminal and navigate to the Backend folder:

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory (use `.env.example` as a template):
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the API Server:
```bash
npm start
# or `node main.js`
```

### 3. Frontend Setup

Open a new terminal and navigate to the Frontend folder:

```bash
cd Frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Your frontend should now be running (usually on `http://localhost:5173`) and communicating with your backend on `http://localhost:3000`.

---

## 📘 API Documentation

The backend includes a fully documented Swagger interface. Once the backend server is running, you can explore all endpoints here:

🔗 [Local Swagger Docs](http://localhost:3000/api-docs)

### 📌 Example Endpoints
* `POST /user/signup` – Register a new user
* `POST /user/signin` – User Login
* `POST /expense/addexpense` – Record a new expense
* `GET /budget/totalbudget` – Get Budget Summary
* `GET /report/viewreport` – View Financial Report

---

## 👨‍💻 Author

**Aditya Sharma**  
GitHub: [@aditya37100](https://github.com/aditya37100)
