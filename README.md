# 🖥️ STL Server — Save The Link Backend

> REST API server for the STL (Save The Link) bookmark manager application. Built with Node.js, Express, TypeScript, and MongoDB.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Error Handling](#-error-handling)
- [Deployment](#-deployment)

---

## 🌐 Overview

The STL Server is a RESTful API that powers the Save The Link application. It handles user authentication, bookmark management, folder organization, tag management, and link preview fetching.

**Base URL (Production):** `https://stl-server.vercel.app/api/v1`

**Base URL (Development):** `http://localhost:5000/api/v1`\

**API Collection:** [Postman Collection](https://shadow-avengers4.postman.co/workspace/My-Workspace~deeea427-9d40-4d15-854d-fab4af1e5f40/collection/39939908-cd42b76d-8522-482c-b306-742bea6b1d59?action=share&source=copy-link&creator=39939908)

---

## ✨ Features

- ✅ JWT Authentication with Access & Refresh Tokens
- ✅ Password hashing with Bcrypt
- ✅ OTP-based password reset via Email
- ✅ Bookmark CRUD with link preview metadata
- ✅ Folder management with cascade delete
- ✅ Tag management with color support
- ✅ Advanced search, filter, sort via QueryBuilder
- ✅ Pin/unpin bookmarks
- ✅ Mongoose pre/post hooks for data integrity
- ✅ Global error handling
- ✅ Request validation with Zod
- ✅ Rate limiting & security headers
- ✅ Graceful server shutdown

---

## 🛠️ Technology Stack

| Technology         | Version | Purpose               |
| ------------------ | ------- | --------------------- |
| Node.js            | 18+     | Runtime               |
| Express.js         | 4+      | Web framework         |
| TypeScript         | 5+      | Type safety           |
| MongoDB            | 6+      | Database              |
| Mongoose           | 8+      | ODM                   |
| JWT                | -       | Authentication        |
| Bcrypt             | -       | Password hashing      |
| Nodemailer         | -       | Email sending (OTP)   |
| Zod                | -       | Request validation    |
| link-preview-js    | -       | URL metadata fetching |
| Helmet             | -       | Security headers      |
| express-rate-limit | -       | Rate limiting         |
| http-status-codes  | -       | HTTP status codes     |
| cookie-parser      | -       | Cookie parsing        |
| cors               | -       | Cross-origin requests |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account or local MongoDB
- Gmail account with App Password enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/jmjubaer/stl-server.git
cd stl-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in your environment variables

# Run in development
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Scripts

```bash
npm run dev       # Start with ts-node-dev (hot reload)
npm run build     # Compile TypeScript to dist/
npm start         # Run compiled JS
npm run lint      # Run ESLint
```

---

## 📁 Project Structure

```
stl-server/
├── src/
│   ├── config/
│   │   └── index.ts              # Environment config
│   ├── errors/
│   │   └── AppError.ts           # Custom error class
│   ├── middleware/
│   │   ├── auth.ts               # JWT auth middleware
│   │   ├── globalErrorHandler.ts # Global error handler
│   │   ├── notFound.ts           # 404 handler
│   │   └── validateRequest.ts    # Zod validation middleware
│   ├── module/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   ├── bookmark/
│   │   │   ├── bookmark.controller.ts
│   │   │   ├── bookmark.interface.ts
│   │   │   ├── bookmark.model.ts
│   │   │   ├── bookmark.route.ts
│   │   │   ├── bookmark.service.ts
│   │   │   └── bookmark.validation.ts
│   │   ├── folder/
│   │   │   ├── folder.controller.ts
│   │   │   ├── folder.interface.ts
│   │   │   ├── folder.model.ts
│   │   │   ├── folder.route.ts
│   │   │   ├── folder.service.ts
│   │   │   └── folder.validation.ts
│   │   ├── tag/
│   │   │   ├── tag.controller.ts
│   │   │   ├── tag.interface.ts
│   │   │   ├── tag.model.ts
│   │   │   ├── tag.route.ts
│   │   │   ├── tag.service.ts
│   │   │   └── tag.validation.ts
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.model.ts
│   │       ├── user.route.ts
│   │       └── user.service.ts
│   ├── types/
│   │   └── index.d.ts            # Global type declarations
│   └── utils/
│   │   ├── catchAsync.ts         # Async error wrapper
│   │   ├── sendEmail.ts          # Nodemailer email utility
│   │   ├── sendResponse.ts       # Consistent API response
│   │   ├── verifyToken.ts        # JWT token verification
│   │   └── QueryBuilder.ts       # Search/filter/sort/paginate
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── dist/                             # Compiled output
├── .env                              # Environment variables
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/stl

# JWT
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Bcrypt
BCRYPT_SALT_ROUND=12

# Nodemailer (Gmail)
NODEMAILER_USER_EMAIL=your_gmail@gmail.com
NODEMAILER_USER_PASS=your_gmail_app_password

# Client
CLIENT_URL=http://localhost:3000
```

### Gmail App Password Setup

1. Go to your Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use that password as `NODEMAILER_USER_PASS`

---

## 📡 API Reference

### Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [
    {
      "path": "field",
      "message": "Specific error"
    }
  ],
  "stack": "Error stack (development only)"
}
```

---

### 🔐 Auth Routes

**Base:** `/api/v1/auth`

#### Register

```http
POST /api/v1/user/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

#### Refresh Token

```http
POST /api/v1/auth/access-token
Authorization: <refreshToken>
```

#### Send OTP

```http
POST /api/v1/auth/send-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify OTP

```http
POST /api/v1/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password

```http
PATCH /api/v1/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "newpassword123"
}
```

---

### 👤 User Routes

**Base:** `/api/v1/user` | 🔒 Requires Auth

#### Get My Profile

```http
GET /api/v1/user/me
Authorization: <accessToken>
```

#### Update Profile

```http
PATCH /api/v1/user/me/update
Authorization: <accessToken>
Content-Type: application/json

{
  "name": "New Name",
  "image": "https://image-url.com/photo.jpg",
  ...
}
```

---

### 🔖 Bookmark Routes

**Base:** `/api/v1/bookmark` | 🔒 Requires Auth

#### Get All Bookmarks

```http
GET /api/v1/bookmark
Authorization: <accessToken>
```

**Query Parameters:**

| Parameter    | Type   | Example       | Description                              |
| ------------ | ------ | ------------- | ---------------------------------------- |
| `searchTerm` | string | `github`      | Search title, URL, description, tag name |
| `sort`       | string | `-createdAt`  | Sort field (prefix `-` for descending)   |
| `tags`       | string | `id1,id2,id3` | Filter by tag IDs (comma separated)      |
| `folder`     | string | `folderId`    | Filter by folder ID                      |

**Sort Options:**

| Value        | Description            |
| ------------ | ---------------------- |
| `-createdAt` | Newest first (default) |
| `createdAt`  | Oldest first           |
| `-updatedAt` | Recently updated       |
| `title`      | Title A to Z           |
| `-title`     | Title Z to A           |

**Response:**

```json
{
  "success": true,
  "data": {
    "pinnedBookmarks": [],
    "folders": [
      {
        "_id": "folderId",
        "name": "Work",
        "bookmarks": []
      }
    ],
    "bookmarks": []
  },
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPage": 5
  }
}
```

#### Create Bookmark

```http
POST /api/v1/bookmark/create
Authorization: <accessToken>
Content-Type: application/json

{
  "url": "https://github.com",
  "title": "GitHub",
  "description": "Where the world builds software",
  "image": "https://github.com/og-image.png",
  "favicon": "https://github.com/favicon.ico",
  "domain": "github.com",
  "siteName": "GitHub",
  "notes": "My personal notes",
  "isPinned": false,
  "isFavorite": false,
  "tags": ["tagId1", "tagId2"],
  "folder": "folderId"
}
```

#### Update Bookmark

```http
PUT /api/v1/bookmark/:id
Authorization: <accessToken>
Content-Type: application/json

{
  "title": "Updated Title",
  "notes": "Updated notes",
  "tags": ["tagId1"],
  "folder": "folderId",
  "isFavorite": true,
  "isPublic": true
}
```

#### Delete Bookmark

```http
DELETE /api/v1/bookmark/:id
Authorization: <accessToken>
```

#### Toggle Pin Bookmarks

```http
PATCH /api/v1/bookmark/pin
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "bookmarkIds": ["id1", "id2"],
  "isPinned": true
}
```

#### Add to Folder

```http
PATCH /api/v1/bookmark/add-to-folder
Authorization: <accessToken>
Content-Type: application/json

{
  "bookmarkIds": ["id1", "id2"],
  "folderId": "folderId"
}
```

#### Link Preview

```http
GET /api/v1/bookmark/link-preview?url=https://github.com
```

**Response:**

```json
{
  "success": true,
  "data": {
    "title": "GitHub",
    "description": "Where the world builds software",
    "images": ["https://og-image.png"],
    "favicons": ["https://favicon.ico"],
    "siteName": "GitHub",
    "domain": "github.com"
  }
}
```

---

### 📁 Folder Routes

**Base:** `/api/v1/folder` | 🔒 Requires Auth

#### Get All Folders

```http
GET /api/v1/folder
Authorization: <accessToken>
```

#### Create Folder

```http
POST /api/v1/folder/create
Authorization: <accessToken>
Content-Type: application/json

{
  "name": "Work"
}
```

#### Update Folder

```http
PATCH /api/v1/folder/:id
Authorization: <accessToken>
Content-Type: application/json

{
  "name": "New Folder Name"
}
```

#### Delete Folder

```http
DELETE /api/v1/folder/:id
Authorization: <accessToken>
```

> ⚠️ Deleting a folder removes the folder and unlinks all bookmarks from it (bookmarks are NOT deleted).

---

### 🏷️ Tag Routes

**Base:** `/api/v1/tag` | 🔒 Requires Auth

#### Get All Tags

```http
GET /api/v1/tag
Authorization: <accessToken>
```

#### Create Tag

```http
POST /api/v1/tag/create
Authorization: <accessToken>
Content-Type: application/json

{
  "name": "Development",
  "color": "#1A8CFF"
}
```

#### Delete Tag

```http
DELETE /api/v1/tag/:id
Authorization: <accessToken>
```

---

## 🗄️ Database Schema

### User

```typescript
{
  name: String,           // required
  email: String,          // required, unique, lowercase
  image: String,          // optional
  password: String,       // required, select: false
  isDeleted: Boolean,     // default: false
  resetPasswordOtp: String,    // default: null
  resetPasswordExpires: Date,  // default: null
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmark

```typescript
{
  url: String,            // required
  domain: String,
  title: String,          // required
  description: String,
  image: String,
  favicon: String,
  siteName: String,
  notes: String,
  previewStatus: Enum,    // PENDING | SUCCESS | FAILED
  isPinned: Boolean,      // default: false
  pinnedAt: Date,
  isFavorite: Boolean,    // default: false
  isPublic: Boolean,      // default: false
  visitCount: Number,     // default: 0
  lastVisitedAt: Date,
  tags: [ObjectId],       // ref: Tag
  folder: ObjectId,       // ref: Folder
  user: ObjectId,         // ref: User, required
  createdAt: Date,
  updatedAt: Date
}
```

### Folder

```typescript
{
  name: String,           // required
  userId: ObjectId,       // ref: User, required
  createdAt: Date,
  updatedAt: Date
}
```

### Tag

```typescript
{
  name: String,           // required
  color: String,          // required (hex color)
  userId: ObjectId,       // ref: User, required
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security

### Authentication Flow

```
1. User registers/logs in
2. Server returns accessToken (30d) + refreshToken (90d)
3. Client stores tokens in local storage
4. Every request sends accessToken in Authorization header
5. When accessToken expires → Show error alert and logout
```

### Security Measures

- **Helmet** — sets secure HTTP headers
- **Rate Limiting** — 100 requests per 15 minutes per IP
- **Bcrypt** — passwords hashed with salt rounds
- **JWT** — signed tokens with expiry
- **Zod** — all inputs validated before processing
- **Mongoose hooks** — prevents operations on deleted users
- **CORS** — restricted to CLIENT_URL only

---

## ⚠️ Error Handling

The server handles these error types automatically:

| Error Type          | Status Code | Description            |
| ------------------- | ----------- | ---------------------- |
| `AppError`          | Custom      | Business logic errors  |
| `ZodError`          | 400         | Validation errors      |
| `CastError`         | 400         | Invalid MongoDB ID     |
| `ValidationError`   | 400         | Mongoose validation    |
| `JsonWebTokenError` | 401         | Invalid token          |
| `TokenExpiredError` | 401         | Expired token          |
| `11000 (Duplicate)` | 400         | Duplicate unique field |

### Global Error Handler

All errors are caught by the global error handler which returns a consistent error response format. Stack traces are only included in `development` mode.

---

## 🗂️ QueryBuilder

The `QueryBuilder` class provides a chainable API for building complex queries:

```typescript
const result = new QueryBuilder(bookmarkModel.find({ user: userId }), req.query)
  .search(['title', 'url', 'description', 'siteName'])
  .filter() // handles tags, folder, isFavorite, isPinned
  .sort() // ?sort=-createdAt
  .fields(); // ?fields=title,url

const data = await result.queryModel;
// const meta = await result.countTotal();
```

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables on Vercel

Go to **Vercel Dashboard → Project → Settings → Environment Variables** and add all variables from `.env`.

### MongoDB Atlas Setup

1. Create a cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Whitelist all IPs: `0.0.0.0/0` (required for Vercel)
4. Copy the connection string to `DATABASE_URL`

### `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ],
  "functions": {
    "dist/server.js": {
      "maxDuration": 10
    }
  }
}
```

---

## 🧪 Testing API with Thunder Client / Postman

Import the following base configuration:

```json
{
  "baseUrl": "http://localhost:5000/api/v1",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "{{accessToken}}"
  }
}
```

---

## 👨‍💻 Author

Built with ❤️ by the Md Jubaer Jm

🌐 [MD JUBAER](https://www.linkedin.com/in/jmjubaer/)
