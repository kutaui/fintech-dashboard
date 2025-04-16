# FinSureTex

## Table of Contents
- [How to Run](#how-to-run)
  - [Using Docker (Recommended)](#using-docker-recommended)
  - [Running Without Docker](#running-without-docker)
- [Features and Technologies](#features-and-technologies)
  - [Technology Stack](#technology-stack)
  - [Features](#features)
- [What Would I Do If I Had the Time](#what-would-i-do-if-i-had-the-time)

## HOW TO RUN

### Using Docker (Recommended)

P.S: The default user is `admin@admin.com` and `123456q!`

1. Make sure you have [Docker](https://www.docker.com/get-started) installed on your system.

2. Clone this repository:
   ```
   git clone <repository-url>
   cd finsuretex
   ``` 

3. Start the application stack:
   ```
   docker compose up -d
   ```

   This will start:
   - PostgreSQL database (accessible on port 5432)
   - Backend service (accessible on http://localhost:3001)
   - Frontend service (accessible on http://localhost:3000)

4. To stop all services:
   ```
   docker-compose down
   ```

   To remove volumes when stopping:
   ```
   docker-compose down -v
   ```

### Running Without Docker

If you prefer not to use Docker:

1. Database Setup:
   - Install PostgreSQL 15
   - Create a database named 'mydatabase'
   - Create a user 'admin' with password 'adminpass'

2. Backend Setup:
   - Navigate to the backend directory: `cd backend`
   - Install dependencies: `npm install`
   - Configure your .env file with appropriate database connection
   - Build the application: `npm run build`
   - Start the server: `npm start`

3. Frontend Setup:
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `bun install` (or npm install)
   - Configure to point to your backend API
   - Build the application: `bun run build` (or npm run build)
   - Start the frontend: `bun run start` (or npm run start)

Make sure you deleted the `example` suffix on `.env.example` or create a `.env` file.

## FEATURES AND TECHNOLOGIES

### Technology Stack

#### Backend
- Used Fastify because of seamless integration with Typescript, faster than express, and the plugin architecture and has more built-in functionalities.
- DrizzleORM because of minimal abstraction, more control over migrations and easier to migrate to serverless architecture.
- PostgreSQL for more performance, flexibility and advanced features.


#### Frontend
- Next.js
- Shadcn UI for components
- Tanstack Query for network requests
- Zod and React Hook Form for form validation and UX
- Recharts for Analytics page
- Zustand for state management

### Features
- JWT authentication
- Authentication middleware both on the frontend and backend for a better UX and security.
- CRUD for offers
- Filter and search on the frontend.
- Responsive design all around the application, Tables, Charts etc.
- A good looking DataTable and better UX with ordering.
- Pagination on the frontend
- Edit, delete and add dialogs
- Sonners for feedback to the user


## WHAT WOULD I DO IF I HAD THE TIME

I've got plenty of time to work on the improvements listed below, but I've tackled these challenges before in my career. While they'd definitely polish the project, I'm not sure they'd offer me much in terms of new learning experiences given how much time they take to complete.

Since this is an important dashboard, I would implement two-factor authentication (2FA), starting with email or phone verification. Later, I would add support for 2FA authentication apps.

For the frontend, I would prioritize moving pagination to the backend, followed by implementing backend filtering and sorting capabilities.

I would implement these filter and sort operations using query parameters to make the URLs shareable.

I would add localization (i18n).

I would add dark and light theme and theme switch.

Drag and drop for charts ordering (syncing with backend) and more charts variations.

