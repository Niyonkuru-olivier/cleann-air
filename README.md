# CleanAir Monitoring System

A professional Air Quality Monitoring System built with a focus on real-time data visualization, secure user management, and administrative control.

## 🚀 Recent Updates & Features

### 🔐 Advanced Authentication & Security
- **Strict Status-Based Access**: Integrated a status validation system where only `ACTIVE` accounts can access the dashboard.
  - Suspended or Inactive accounts receive specialized guidance to contact administrators.
- **Enhanced Login Security**: 
  - Case-insensitive email handling for better user experience.
  - Granular error messaging ("Invalid Email" vs "Invalid Password") for faster troubleshooting.
  - Automated session management with `AuthGuard` route protection.
- **Secure Password Flow**:
  - Beautifully designed **Forgot Password** page with a Starry Night theme.
  - Automated security token generation and email-based password recovery.
  - Mandatory password reset for new accounts using temporary credentials.

### 👤 Admin Profile & User Management
- **Dynamic Profile Settings**: Admins can now update their Full Name, Email, Phone Number, and Password directly from the dashboard.
- **Real-time Synchronization**: All profile updates are immediately synchronized between the frontend UI and the MySQL database.
- **Interactive UI**: Added password visibility toggles and real-time validation feedback.
- **Identity Display**: The logged-in user's email is now dynamically displayed in the sidebar for easy identification.

### 📊 Dashboard & Monitoring
- **Auth-Protected Dashboard**: Complete dashboard suite protected by client-side and server-side authentication checks.
- **Modern UI/UX**: Premium design aesthetics using glassmorphism, smooth gradients, and micro-animations.
- **Secure Logout**: Implemented a reliable session expiration and logout workflow.

## 🛠 Technical Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Lucide Icons.
- **Backend**: NestJS (Node.js framework).
- **Database**: MySQL with Prisma ORM.
- **Security**: Bcrypt.js for hashing, secure token management.
- **Mailing**: Nodemailer with SMTP integration.

## ⚙️ Getting Started

### 1. Installation
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 2. Database Setup
```bash
cd backend
npx prisma db push
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory with the following:
```env
DATABASE_URL="mysql://user:password@localhost:3306/cleanair"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
MAIL_FROM="your-email@gmail.com"
FRONTEND_URL="http://localhost:3000"
```

### 4. Running the Project
```bash
# Run Backend (from /backend)
npm run start:dev

# Run Frontend (from /frontend)
npm run dev
```

---
Built with ❤️ for the CleanAir Monitoring Project.
