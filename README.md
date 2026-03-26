# 🏋️ Tommy Fitness - Premium Fitness & Membership platform

Tommy Fitness is a modern, high-performance E-Commerce and Membership Management platform designed for luxury fitness centers and gyms. This project demonstrates a production-grade full-stack architecture using **React 19** and **.NET 8 Minimal APIs**, focusing on security, performance, and premium user experience.

---

## 🚀 Live Demo / Preview
- **Frontend**: [https://test-c13a5.web.app/](https://test-c13a5.web.app/)  

---

## ✨ Key Features

### 🔐 Secure Identity Management
- **Enterprise Auth**: Built on **ASP.NET Identity** with secure password hashing.
- **XSS Protection**: Uses **HttpOnly, Secure, and SameSite=None** cookies for authentication tokens, preventing access from malicious scripts.
- **Account Dashboard**: Users can securely change passwords and manage account details.

### 🛒 E-Commerce & Membership
- **Plan Management**: Dynamic membership selection (1 Mo, 1 Year, etc.) with a "Cart" experience.
- **Ecwid Integration**: Ready for a secure e-commerce gateway with transaction verification.
- **Order History**: Personal order ledger stored in PostgreSQL for all membership transactions.

### 🏢 Gym Operations
- **Public Check-In**: A dedicated endpoint for front-desk counters to verify member status (active/expired) via phone number.

### 🧪 Quality Assurance
- **Full-Stack Testing**: 
  - **Backend**: xUnit tests for business logic and model integrity.
  - **Frontend**: Vitest + jsdom for component and API layer verification.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, TanStack Query, Axios, Lucide Icons |
| **Backend** | .NET 8 Minimal API, ASP.NET Identity, Entity Framework Core |
| **Database** | PostgreSQL (hosted on Supabase) |
| **Testing** | Vitest (Frontend), xUnit (Backend) |
| **Deployment** | Firebase Hosting (Frontend), Render (Backend), Supabase (Database) |

---

## 🏗️ Architecture & Security Patterns

- **Clean API Design**: Uses a Minimal API approach for lightweight, high-performance endpoints.
- **CORS Integrity**: Strict origin policies to ensure only authorized frontends can interact with the API.
- **Environment Driven**: Decoupled secrets and credentials using environment variables (DATABASE_URL, etc.).

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- .NET 8.0 SDK
- PostgreSQL (or Supabase account)

### 1. Setup Backend
```bash
cd Recreate.server/backend
dotnet restore
# Set your connection string in environment variables or appsettings.json
dotnet run
```

### 2. Setup Frontend
```bash
npm install
# Configure VITE_API_BASE_URL in your .env
npm run dev
```

---

## 🛡️ Important Security Note for Production
In this portfolio version, the `/Auth/updateExpiration` endpoint is a functional demonstration. In a live production environment, this would be hardened with **Webhooks** from your payment provider (Stripe/PayPal) to cryptographically verify successful transactions before updating user records. As it stands, this is currently set up for demo purposes only.

---

### 📬 Contact & Portfolio
Designed and Developed with ❤️ for a professional portfolio.  
Feel free to reach out via https://www.linkedin.com/in/tommy-mclaughlin-501a36249/ | https://tommyportfolio-2026update.web.app/
