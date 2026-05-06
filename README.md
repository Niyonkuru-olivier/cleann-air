# Clean Air System

A real-time CO (Carbon Monoxide) air quality monitoring platform built with Next.js and Tailwind CSS. The system collects sensor readings from IoT devices (ESP32 + MQ-7 sensor), displays live data on a dashboard, and triggers alerts when CO levels exceed safe thresholds.

---

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Hardware:** ESP32 microcontroller + MQ-7 CO sensor
- **Database:** Firebase / MySQL
- **Backend:** REST API

---

## Authentication

There is **no self-registration** in this system. Only an Admin can create new user accounts.

**Account creation flow:**
1. Admin fills in the new user's name, email address, role, and a temporary password on the **Add User** page.
2. The system creates the account and **automatically emails the temporary password** to the user's email address.
3. The user logs in with that temporary password and is prompted to change it on first login.

---

## User Roles & Functionality

### Admin
The Admin has full access to the entire platform.

| Feature | Description |
|---|---|
| Dashboard overview | View real-time CO readings, metrics, and system-wide statistics |
| Device management | Add, edit, view, and delete any device in the system |
| User management | Create new users and send their default password by email; edit or delete any account; assign roles |
| Alert management | Configure alert rules and view all triggered alerts across all devices |
| History | Access historical CO readings for any device |
| Settings | Manage system-wide settings and configurations |

---

### Operator
The Operator can monitor and control all devices but cannot manage users or system settings.

| Feature | Description |
|---|---|
| Dashboard overview | View real-time CO readings and metrics for all devices |
| Device management | View all devices, add new devices, and update device details |
| Alert management | View and configure alert rules for all devices |
| History | Access historical CO readings for all devices |

---

### Viewer (User)
The Viewer has read-only access and can only see data for their own assigned device.

| Feature | Description |
|---|---|
| Dashboard | View real-time CO readings for their assigned device only |
| Device view | See the status and details of their own device |
| Alerts | View alerts triggered by their own device |
| History | View historical CO readings for their own device |

---

## Project Structure

```
cleanAirSystem/
├── frontend/
│   └── app/
│       ├── page.tsx              # Landing page
│       ├── login/                # Login page
│       ├── dashboard/
│       │   ├── page.tsx          # Dashboard home (metrics, charts)
│       │   ├── devices/          # Device list, add device, device detail
│       │   ├── alerts/           # Alerts list and alert rules
│       │   ├── history/          # Historical readings and charts
│       │   ├── users/            # User management (Admin only)
│       │   └── settings/         # System settings (Admin only)
│       ├── components/           # Shared UI components (Navbar, Footer, Modal)
│       └── sections/             # Landing page sections
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Features

- Real-time CO level monitoring with live charts
- Color-coded air quality indicators (safe / warning / danger)
- Automatic alerts when CO exceeds configured thresholds
- Historical data view with filterable charts and tables
- Role-based access control (Admin / Operator / Viewer)
- Dark mode support
- Responsive design for desktop and mobile
