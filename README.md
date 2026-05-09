<h1 align="center">📋 Trello API - Board & Task Management Platform</h1>

<p align="center">
  A full-stack REST API for collaborative board and task management, featuring real-time updates, user authentication, and comprehensive board organization capabilities.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-6-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Babel-7.22-F9DC3E?style=flat-square&logo=babel&logoColor=black" />
  <img src="https://img.shields.io/badge/JWT-Authentication-FF6B6B?style=flat-square" />
  <img src="https://img.shields.io/badge/Cloudinary-Upload-4A6FA5?style=flat-square&logo=cloudinary&logoColor=white" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Boards](#boards)
  - [Columns](#columns)
  - [Cards](#cards)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [Best Practices](#best-practices)
- [Roadmap](#roadmap)

---

## Overview

Trello API is a RESTful backend service for managing collaborative boards, columns, and tasks. It provides a solid foundation for building project management applications with features like user authentication, role-based access control, real-time task management, and file upload capabilities.

**Key characteristics:**
- Clean RESTful API design with versioned routes (`/v1`)
- JWT-based authentication with refresh token mechanism
- Role-based authorization (Client, Admin)
- Comprehensive error handling and validation
- Babel transpilation for modern JavaScript support
- MongoDB for flexible document storage
- CORS configured for frontend integration
- File upload integration with Cloudinary

---

## Features

### User Management
- **User Registration & Login** — Email/password authentication with JWT tokens
- **Email Verification** — Verify user accounts via email tokens
- **User Roles** — Client and Admin roles with different permission levels
- **Profile Management** — Update user information and avatar
- **Password Security** — Bcrypt hashing for secure password storage

### Board Management
- **Create Boards** — Public or private boards with customizable metadata
- **Board Organization** — Drag-and-drop column ordering with atomic updates
- **Board Sharing** — Invite owners and members to collaborate
- **Board Slug** — URL-friendly board identifiers
- **Board Descriptions** — Rich descriptions for better organization

### Column & Card Management
- **Column Management** — Create, update, and order columns within boards
- **Card Management** — Create, edit, move cards between columns
- **Card Details** — Title, description, and board/column references
- **Card Ordering** — Maintain card order within columns
- **Soft Deletes** — Logical deletion without data loss

### Media & Uploads
- **Avatar Uploads** — User profile pictures stored on Cloudinary
- **File Upload Middleware** — Multer integration for handling multipart forms
- **Cloud Storage** — Secure file hosting with Cloudinary

### Authentication & Security
- **JWT Authentication** — Stateless auth with access and refresh tokens
- **Cookie-based Tokens** — Secure token storage in HTTP-only cookies
- **Token Expiration** — Automatic token refresh mechanism
- **Email Verification** — Account activation via email token
- **CORS Protection** — Configurable CORS for API security

---

## Tech Stack

### Backend
| Technology | Role | Version |
|---|---|---|
| **Node.js** | JavaScript runtime | ≥18.x |
| **Express.js** | Web framework & routing | 4.18.2 |
| **Babel** | ES6+ transpiler | 7.22.10 |
| **MongoDB** | NoSQL database | 6.0.0 |
| **Mongoose** | N/A (using native MongoDB driver) | - |
| **JWT** | Token-based authentication | 9.0.3 |
| **Bcryptjs** | Password hashing | 3.0.3 |
| **Joi** | Request validation & schema | 17.10.2 |
| **Multer** | File upload handling | 2.1.1 |
| **Cloudinary** | Image storage & CDN | 2.0.0 |
| **Brevo** | Email service provider | 4.0.1 |
| **CORS** | Cross-origin requests | 2.8.6 |
| **Cookie Parser** | Cookie handling | 1.4.7 |
| **Dotenv** | Environment variables | 17.3.1 |
| **Nodemon** | Auto-restart on file changes | 3.0.1 |
| **ESLint** | Code linting | 8.47.0 |

### Utilities
| Package | Purpose |
|---|---|
| **http-status-codes** | HTTP status constants |
| **lodash** | Utility functions |
| **uuid** | Unique ID generation |
| **ms** | Time conversion utilities |
| **streamifier** | Stream conversion utilities |
| **cross-env** | Cross-platform environment vars |
| **@babel/runtime** | Babel runtime helpers |

---

## Architecture

### Request Flow

```
┌─────────────────────────────────────────────────────┐
│               Frontend / Client                      │
│          (React, Vue, Mobile, etc.)                 │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP Request
                      ▼
┌─────────────────────────────────────────────────────┐
│          Express.js Server (Port 8017)              │
│  Routes → Middleware → Controllers → Services       │
└─────────────┬──────────────────────────┬────────────┘
              │                          │
              ▼                          ▼
    ┌──────────────────────┐   ┌──────────────────┐
    │  MongoDB Database    │   │  Cloudinary CDN  │
    │  (Data Persistence)  │   │  (File Storage)  │
    └──────────────────────┘   └──────────────────┘
```

### Authentication Flow

```
1. User Login
   ↓
2. Server validates credentials & hashes password with Bcrypt
   ↓
3. JWT tokens generated (access + refresh)
   ↓
4. Tokens stored in HTTP-only cookies
   ↓
5. Protected endpoints verify token before processing
   ↓
6. Token expiration → Refresh token mechanism
```

### Data Model

```
User (Users)
  ├── email (unique)
  ├── password (hashed)
  ├── username
  ├── displayName
  ├── avatar (Cloudinary URL)
  ├── role (Client | Admin)
  ├── isActive
  └── verifyToken

Board (Boards)
  ├── title
  ├── slug (unique, URL-friendly)
  ├── description
  ├── type (PUBLIC | PRIVATE)
  ├── ownerIds → [Users]
  ├── memberIds → [Users]
  └── columnOrderIds → [Columns]

Column (Columns)
  ├── boardId → Board
  ├── title
  ├── cardOrderIds → [Cards]
  └── _destroy (soft delete)

Card (Cards)
  ├── boardId → Board
  ├── columnId → Column
  ├── title
  ├── description
  └── _destroy (soft delete)
```

---

## Project Structure

```
trello-api/
├── .gitignore
├── .eslintrc.json              # ESLint configuration
├── .babelrc                    # Babel transpilation config
├── jsconfig.json               # JavaScript project config
├── package.json                # Dependencies & scripts
├── README.md                   # This file
│
├── src/
│   ├── server.js               # Express app entry point
│   │
│   ├── config/
│   │   ├── cors.js             # CORS configuration
│   │   ├── environment.js      # Environment variables
│   │   └── mongodb.js          # MongoDB connection setup
│   │
│   ├── controllers/
│   │   ├── userController.js   # User auth & profile endpoints
│   │   ├── boardController.js  # Board management endpoints
│   │   ├── columnController.js # Column management endpoints
│   │   └── cardController.js   # Card management endpoints
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── errorHandlingMiddleware.js # Global error handler
│   │   └── multerUploadMiddleware.js  # File upload handling
│   │
│   ├── models/
│   │   ├── userModel.js        # User schema & CRUD operations
│   │   ├── boardModel.js       # Board schema & CRUD operations
│   │   ├── columnModel.js      # Column schema & CRUD operations
│   │   └── cardModel.js        # Card schema & CRUD operations
│   │
│   ├── providers/
│   │   ├── BrevoProvider.js    # Email service provider
│   │   ├── CloundinaryProvider.js # Image upload provider
│   │   └── JwtProvider.js      # JWT token operations
│   │
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── index.js        # API v1 routes aggregation
│   │   │   ├── userRoute.js    # /v1/user endpoints
│   │   │   ├── boardRoute.js   # /v1/board endpoints
│   │   │   ├── columnRoute.js  # /v1/column endpoints
│   │   │   └── cardRoute.js    # /v1/card endpoints
│   │   └── v2/
│   │       └── index.js        # API v2 (future versions)
│   │
│   ├── services/
│   │   ├── userService.js      # User business logic
│   │   ├── boardService.js     # Board business logic
│   │   ├── columnService.js    # Column business logic
│   │   └── cardService.js      # Card business logic
│   │
│   ├── sockets/
│   │   └── exampleSocket.js    # Socket.io events (future)
│   │
│   ├── utils/
│   │   ├── ApiError.js         # Custom error class
│   │   ├── algorithms.js       # Helper algorithms
│   │   ├── constants.js        # Application constants
│   │   ├── formatters.js       # Data formatting utilities
│   │   ├── sorts.js            # Sorting utilities
│   │   └── validators.js       # Validation patterns & rules
│   │
│   └── validations/
│       ├── userValidation.js   # User input schemas
│       ├── boardValidation.js  # Board input schemas
│       ├── columnValidation.js # Column input schemas
│       └── cardValidation.js   # Card input schemas
│
└── build/                      # Compiled output (created after build)
    └── src/
        └── ... (transpiled JavaScript)
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** ≥ 18.x ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **MongoDB 6.0+** ([Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trello-api.git
   cd trello-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Verify installation**
   ```bash
   npm --version
   node --version
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ── Application ────────────────────────────────────────
NODE_ENV=development
BUILD_MODE=dev
AUTHOR=Your Name

# ── Server ────────────────────────────────────────────
LOCAL_DEV_APP_HOST=localhost
LOCAL_DEV_APP_PORT=8017
PORT=3000

# ── MongoDB ───────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/trello_app
MONGODB_USERNAME=
MONGODB_PASSWORD=

# ── JWT (Authentication) ──────────────────────────────
ACCESS_TOKEN_SECRET_SIGNATURE=your_access_token_secret_key_min_20_chars
REFRESH_TOKEN_SECRET_SIGNATURE=your_refresh_token_secret_key_min_20_chars
ACCESS_TOKEN_LIFE=24h
REFRESH_TOKEN_LIFE=7d

# ── Cloudinary (Image Upload) ─────────────────────────
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ── Email Service (Brevo SMTP) ────────────────────────
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_email
BREVO_SMTP_PASS=your_brevo_smtp_key
ADMIN_EMAIL_ADDRESS=admin@trello.com

# ── CORS ───────────────────────────────────────────
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Important:**
- Generate secure JWT secrets: Use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Never commit `.env` to version control
- Store production values in your deployment platform's secrets

---

## Running the Application

### Development

Start the development server with hot-reload using Nodemon:

```bash
npm run dev
# or
yarn dev
```

**Output:**
```
Hello Your Name, I am running at http://localhost:8017
```

**Features:**
- ✅ Auto-restarts on file changes (Nodemon)
- ✅ Babel transpilation on-the-fly
- ✅ Full error logging and debugging
- ✅ CORS enabled for frontend requests

Access the API at `http://localhost:8017`

### Production

Build and run the optimized production version:

```bash
npm run build
npm run production
# or
yarn build
yarn production
```

**Build process:**
1. Cleans the build directory
2. Transpiles `src/` with Babel → `build/src/`
3. Sets `BUILD_MODE=production`
4. Starts the Express server

The production build is optimized for performance and ready for deployment.

### Database Connection

Ensure MongoDB is running before starting the server:

```bash
# Using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trello_app
```

---

## API Reference

### Base URL
```
Development: http://localhost:8017
Production: https://your-api-domain.com
```

### Authentication

All protected endpoints require a valid JWT token in the `Authorization` header or in cookies.

#### Register
```http
POST /v1/user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "johndoe",
  "displayName": "John Doe"
}

Response: 201 Created
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { ... }
}
```

#### Login
```http
POST /v1/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { ... }
}
```

#### Verify Email
```http
PUT /v1/user/verify-email
Content-Type: application/json

{
  "verifyToken": "token_from_email"
}

Response: 200 OK
{ "message": "User verified successfully" }
```

### Boards

#### Get All Boards (Paginated)
```http
GET /v1/board?page=1&itemsPerPage=10
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "data": [ ... ],
  "pagination": { "page": 1, "itemsPerPage": 10, "totalItems": 50 }
}
```

#### Get Board by ID
```http
GET /v1/board/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "_id": "board_id",
  "title": "Project Board",
  "slug": "project-board",
  "description": "Board description",
  "type": "PUBLIC",
  "columns": [ ... ],
  "cards": [ ... ]
}
```

#### Create Board
```http
POST /v1/board
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My New Board",
  "description": "Board for new project",
  "type": "PRIVATE"
}

Response: 201 Created
{ "_id": "new_board_id", ... }
```

#### Update Board
```http
PUT /v1/board/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}

Response: 200 OK
{ ... updated board data ... }
```

#### Delete Board
```http
DELETE /v1/board/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{ "message": "Board deleted successfully" }
```

### Columns

#### Create Column
```http
POST /v1/column
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "boardId": "board_id",
  "title": "To Do"
}

Response: 201 Created
{ "_id": "column_id", ... }
```

#### Update Column
```http
PUT /v1/column/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "In Progress"
}

Response: 200 OK
{ ... }
```

#### Delete Column
```http
DELETE /v1/column/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{ "message": "Column deleted" }
```

### Cards

#### Create Card
```http
POST /v1/card
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "boardId": "board_id",
  "columnId": "column_id",
  "title": "Implement feature",
  "description": "Add new dashboard feature"
}

Response: 201 Created
{ "_id": "card_id", ... }
```

#### Update Card
```http
PUT /v1/card/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated task",
  "columnId": "new_column_id"
}

Response: 200 OK
{ ... }
```

#### Delete Card
```http
DELETE /v1/card/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{ "message": "Card deleted" }
```

---

## Available Scripts

### Development Commands
```bash
npm run dev          # Start dev server with hot reload
npm run lint         # Run ESLint to check code quality
npm run build        # Build for production
npm run production   # Run production build
```

### Available Scripts Explained
| Command | Purpose |
|---|---|
| `npm run dev` | Starts Nodemon with Babel transpilation for development |
| `npm run lint` | Runs ESLint across `src/` directory, fails on warnings |
| `npm run clean` | Removes build directory and creates new one |
| `npm run build-babel` | Transpiles `src/` to `build/src/` using Babel |
| `npm run build` | Runs clean + build-babel |
| `npm run production` | Builds and runs the production server |

---

## Project Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────┐
│          Routes (API Endpoints)                 │
│        /v1/user, /v1/board, etc.               │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│        Controllers (Request Handling)           │
│   - Validate input                              │
│   - Call services                               │
│   - Return responses                            │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│      Services (Business Logic)                  │
│   - Process data                                │
│   - Apply business rules                        │
│   - Orchestrate database calls                  │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│        Models (Data Layer)                      │
│   - Database queries                            │
│   - Schema validation                           │
│   - Data persistence                            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
            MongoDB Database
```

### Middleware Stack

```
Request
  ↓
1. Cookie Parser → Parses cookies from request
  ↓
2. CORS Middleware → Validates origin & headers
  ↓
3. Express JSON → Parses JSON request body
  ↓
4. Auth Middleware (optional) → Verifies JWT token
  ↓
5. Route Handler → Controller & service logic
  ↓
6. Error Handling Middleware → Catches & formats errors
  ↓
Response
```

---

## Best Practices

### Code Quality
- ✅ **ESLint** — Enforced code standards (`npm run lint`)
- ✅ **Babel** — Modern JavaScript transpilation
- ✅ **Joi Validation** — Schema validation for all inputs
- ✅ **Error Handling** — Centralized error middleware

### Security
- 🔒 **JWT Authentication** — Stateless, secure token-based auth
- 🔒 **Bcryptjs** — Passwords hashed with salt rounds
- 🔒 **CORS Configuration** — Restricted origins for API access
- 🔒 **HTTP-only Cookies** — Secure token storage
- 🔒 **Cloudinary** — Secure file upload with credentials

### Database
- 📊 **MongoDB Native Driver** — Direct, efficient queries
- 📊 **Joi Schema Validation** — Enforce data consistency
- 📊 **Pagination** — Efficient data retrieval for large datasets
- 📊 **Soft Deletes** — Preserve data integrity with `_destroy` flags

### Performance
- ⚡ **Babel Transpilation** — Optimized JavaScript output
- ⚡ **Cookie-based Auth** — Reduced token transmission overhead
- ⚡ **Middleware Stacking** — Efficient request processing
- ⚡ **MongoDB Indexing** — Fast queries on frequently accessed fields

---

## Roadmap

### Current Status (v1.0)
| ✅ Completed | Description |
|---|---|
| ✅ User Authentication | Register, login, email verification |
| ✅ Board Management | Create, read, update, delete boards |
| ✅ Column Management | Organize tasks by columns |
| ✅ Card Management | Create and manage individual cards |
| ✅ File Upload | Avatar uploads to Cloudinary |
| ✅ Role-based Access | Client and Admin roles |
| ✅ Error Handling | Global error middleware |

### Future Features (v2.0)
| 🎯 Planned | Description |
|---|---|
| 🔄 Real-time Updates | Socket.io integration for live updates |
| 🔄 Comment System | Add comments and discussions to cards |
| 🔄 Activity Log | Track all board and card changes |
| 🔄 Labels & Tags | Categorize cards with labels |
| 🔄 Due Dates & Reminders | Deadline management |
| 🔄 Card Attachments | Attach files to cards |
| 🔄 User Permissions | Granular access control |
| 🔄 Search & Filter | Advanced board search capabilities |
| 🔄 API Documentation | Swagger/OpenAPI integration |
| 🔄 Unit & Integration Tests | Comprehensive test coverage |

### Future Technologies (v3.0)
| 🚀 Exploring | Description |
|---|---|
| 🚀 GraphQL | Alternative to REST API |
| 🚀 WebSockets | Real-time bi-directional communication |
| 🚀 Redis | Caching layer for performance |
| 🚀 Docker | Containerization for easy deployment |
| 🚀 Docker Compose | Multi-service orchestration |
| 🚀 Kubernetes | Container orchestration at scale |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
- ✅ Code passes linting (`npm run lint`)
- ✅ No breaking changes to existing API
- ✅ Code follows project conventions

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Support & Contact

- 📧 Email: [your-email@example.com](mailto:your-email@example.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/trello-api/issues)
- 📚 Documentation: See [API Reference](#api-reference)

---

## Acknowledgments

- Inspired by [Trello](https://trello.com/)
- Built with [Express.js](https://expressjs.com/)
- Hosted data with [MongoDB](https://www.mongodb.com/)
- Images on [Cloudinary](https://cloudinary.com/)
- Thanks to all [contributors](https://github.com/yourusername/trello-api/graphs/contributors)

---

<p align="center">
  Made with ❤️ by Your Name | Last updated: May 9, 2026
</p>
