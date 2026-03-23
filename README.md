# Vehicle Services Platform

## Overview
The Vehicle Services Platform is a full-stack web application designed to connect customers with mechanics for various vehicle services. The platform provides a seamless experience for users to book services, manage their vehicles, and access a range of features tailored for customers, mechanics, and administrators.

## Features
- **Customer Features:**
  - Browse and select vehicle services
  - Book appointments with mechanics
  - View service history and manage vehicle details
  - Leave reviews and ratings for services

- **Mechanic Features:**
  - Manage service offerings and availability
  - View and manage bookings
  - Respond to customer reviews
  - Access earnings and performance metrics

- **Admin Features:**
  - Manage users (customers and mechanics)
  - Oversee service catalog and bookings
  - Generate reports and analytics
  - Handle disputes and customer support

## Tech Stack
- **Frontend:** Next.js, TypeScript, React
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (using Prisma ORM)
- **Authentication:** Clerk for user authentication
- **Styling:** CSS Modules and global styles

## Project Structure
```
vehicle-services-platform
├── apps
│   ├── web                # Frontend application
│   └── api                # Backend application
├── packages
│   ├── shared             # Shared code between frontend and backend
│   └── ui                 # UI components
├── prisma                 # Database schema and migrations
├── docs                   # Documentation
├── .env.example           # Environment variables example
├── .gitignore             # Git ignore file
├── package.json           # Root package.json
├── tsconfig.base.json     # Base TypeScript configuration
├── README.md              # Project documentation
└── turbo.json             # Turbo configuration
```

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   cd vehicle-services-platform
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd apps/web
   npm install
   cd ../api
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Run the development servers:
   - For the frontend:
     ```
     cd apps/web
     npm run dev
     ```
   - For the backend:
     ```
     cd apps/api
     npm run dev
     ```

5. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.