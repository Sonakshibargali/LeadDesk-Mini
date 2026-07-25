# ⚡ LeadDesk Mini

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

LeadDesk Mini is a production-quality, responsive Full Stack SaaS lead management application. The project was built as part of the **Digital Heroes Internship Qualification Task** to demonstrate modern web engineering patterns, security standards, and high-fidelity styling layouts.

---

## 🔗 Live Demo

*   **Frontend**: `[Insert Vercel Deployment Link Here]`
*   **Backend**: `[Insert Render Deployment Link Here]`

---

## ✨ Features

### 🖥️ Public Landing Page
*   **Premium Dark UI**: Built with custom violet-to-blue gradients, rounded corners, soft drop-shadows, and glassmorphism.
*   **Sticky Frosted Navbar**: Blended frosted-glass header with interactive anchors.
*   **Structured Form Validation**: 
    *   *Client-Side*: Interactive checks for empty inputs, email formatting, and minimum message length.
    *   *Server-Side*: Restrictive schemas powered by `express-validator` to reject malformed payloads.
*   **Budget Tier Categorization**: Automatically groups clients by budget size (`<₹50k`, `₹50k-₹2L`, `₹2L-₹5L`, `₹5L+`).
*   **Visual Feedback**: Leverages `react-hot-toast` for rich success notifications.

### 📊 Lead Management Workspace
*   **Search & Queries**: Search leads by client name or email.
*   **Category Filtering**: Sort entries based on pipelines (`NEW`, `CONTACTED`, `CLOSED`).
*   **Optimistic Real-time Updates**: Status updates trigger an optimistic local view update and execute a backend sync, updating counts dynamically *without triggering a page refresh*.
*   **Detail Viewer Dialog**: Truncates long messages in the table and opens them in an overlay modal.
*   **Responsive Adaptation**: Render layouts adapted for viewports (`360px`, `768px`, `1024px`, `1440px`).

### 🔒 JWT Authentication
*   **Secure Route Guards**: Secures administrative panels; attempts to view `/admin` unauthenticated redirect users to `/login`.
*   **Axios Interceptors**: Attaches Bearer JWT headers to API requests and redirects expired sessions on `401 Unauthorized` responses.
*   **Password Hashing**: Protects credentials stored in MySQL using `bcryptjs` hashing.
*   **Session Persistence**: Preserves active tokens in `localStorage`.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React | Single Page Application framework |
| | Vite | Fast Next-gen bundler utility |
| | Tailwind CSS | Utility-first responsive styling framework |
| | Axios | HTTP client with request/response interceptors |
| | React Router | Client-side routing management |
| | Framer Motion | Smooth hover and modal micro-animations |
| **Backend** | Node.js + Express | RESTful API server structure |
| | Prisma ORM | Object-Relational Mapping schema and query builder |
| | JWT | Secure tokens for state authorization |
| | bcryptjs | Secure password hashing algorithm |
| **Database** | MySQL | Relational database storage |
| **Deployment**| Vercel | Frontend hosting |
| | Render | Backend server hosting |

---

## 📁 Project Structure

```
LeadDesk-Mini/
├── README.md
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Database Schema & Models
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Prisma client instance
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── leadController.js
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT Route Guard Middleware
│   │   │   ├── errorHandler.js  # Global API Error Handler
│   │   │   └── validator.js     # express-validator schemas
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── leadRoutes.js
│   │   ├── seed.js              # Database credentials seeder
│   │   └── server.js            # Express app entry point
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/          # Reusable layouts (Navbar, Footer, Forms)
    │   ├── pages/               # Routing views (Landing, Admin, Login)
    │   ├── services/
    │   │   └── api.js           # Axios base client & interceptors
    │   ├── App.jsx              # Routing configurations
    │   ├── index.css            # Tailwind directives & glass utilities
    │   └── main.jsx
    ├── vercel.json              # Vercel client-side rewrites
    ├── tailwind.config.js
    ├── vite.config.js
    ├── .gitignore
    └── package.json
```

---

## 📡 API Endpoints

### Authentication APIs
*   `POST /api/auth/login`
    *   **Description**: Validates admin credentials and issues a JWT token.
    *   **Access**: Public

### Lead Management APIs
*   `POST /api/leads`
    *   **Description**: Creates a new lead in the system. Runs server-side validation.
    *   **Access**: Public
*   `GET /api/leads`
    *   **Description**: Fetches all lead entries. Supports `search` (name/email) and `status` query filters.
    *   **Access**: Private (Requires JWT token)
*   `PATCH /api/leads/:id/status`
    *   **Description**: Updates the status (`NEW`, `CONTACTED`, `CLOSED`) of a specific lead.
    *   **Access**: Private (Requires JWT token)
*   `GET /api/dashboard`
    *   **Description**: Returns counts for Total, New, Contacted, and Closed leads.
    *   **Access**: Private (Requires JWT token)

---

## 🚀 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd LeadDesk-Mini
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Start your MySQL service (e.g., XAMPP MySQL or default windows service) and push the database schema:
   ```bash
   npx prisma db push
   ```
5. Seed the default administrator credentials:
   ```bash
   npm run seed
   ```
6. Start the API development server:
   ```bash
   npm run dev
   ```
   *The server starts on port `5000` (`http://localhost:5000`).*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The client starts on port `5173` (`http://localhost:5173`).*

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/leaddesk_mini" # Adjust password if needed
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="your-secure-jwt-key"
```

### Frontend (`/frontend/.env` - Optional for Local Dev)
```env
VITE_API_URL="http://localhost:5000/api" # Required if deploying to production
```

---

## 👤 Default Administrator Credentials

Use these credentials to test the secure admin panel after running the seeding script:

*   **Email Address**: `admin@leaddesk.co`
*   **Password**: `admin123`

---

## 📸 Screenshots

*   **Landing Page**: `[Insert Landing Page Screenshot Here]`
*   **Lead Form (Validation)**: `[Insert Lead Form Validation Screenshot Here]`
*   **Login Page**: `[Insert Login Page Screenshot Here]`
*   **Admin Dashboard Grid**: `[Insert Admin Dashboard Screenshot Here]`
*   **Search & Filters**: `[Insert Search/Filter Table Screenshot Here]`
*   **Status Update Transition**: `[Insert Status Dropdown Transition Screenshot Here]`

---

## 🌐 Deployment Configuration

### Frontend (Vercel)
The client includes `/frontend/vercel.json` to handle client-side routing.
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **SPA Redirect Rule**:
    ```json
    {
      "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
      ]
    }
    ```

### Backend (Render)
Configure your Web Service on Render with these properties:
*   **Environment**: `Node`
*   **Build Command**: `npm install && npx prisma generate`
*   **Start Command**: `node src/server.js`

---

## 🔮 Future Improvements
- [ ] **Pagination**: Set up cursor-based pagination for large volumes of leads.
- [ ] **CSV Export**: Allow administrators to download leads in Excel/CSV formats.
- [ ] **Email Notifications**: Trigger automated confirmation emails to clients and notify admins of new leads.
- [ ] **Analytics Dashboard**: Add budget analytics charts and conversion metrics graphs.
- [ ] **Role-Based Authorization**: Expand users to include super-admins, managers, and standard agents.
- [ ] **Dark/Light Theme Toggle**: Support light theme toggle for dashboard users.

---

## ✍️ Author
*   **Your Name** — `[Your Name]`
*   **GitHub**: `[Your GitHub Profile URL]`
*   **LinkedIn**: `[Your LinkedIn Profile URL]`
