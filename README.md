# 🚀 DevConnect Backend

**DevConnect** is a developer matchmaking and collaboration platform backend.  
This repository contains the **API service** that powers user registration, authentication, match requests, matches, and messaging for the DevConnect platform.t.

## 📖 Features

- 🔐 **JWT-based Authentication with Refresh Tokens**
- 📄 **User Profiles** — including bio, skills, social links
- 🎯 **Match Request System** — request, accept, and manage developer matches
- 💬 **Messaging between Matched Users**
- 🗄️ **Clean, Scalable Prisma-powered PostgreSQL Database Design**


## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Access & Refresh Tokens)
- **Dev Tools:** Nodemon, ESLint, Prettier, dotenv

## 📦 Database Overview

**Tables**
- `users`
- `match_requests`
- `matches`
- `messages`
- `refresh_tokens`

**Relations**
- One-to-many: `users` → `refresh_tokens`
- One-to-many: `users` → `match_requests` (sent and received)
- Many-to-many: `users` ↔️ `matches`
- One-to-many: `users` → `messages`

  ## 🔐 Auth & Token Flow

- **Access Token**: JWT, short-lived, sent with each authenticated request
- **Refresh Token**: Stored in DB with device info & IP. Used to issue new access tokens
- Tokens tied to users with proper expiry timestamps stored as `DateTime` values in PostgreSQL
- Token revocation support via DB record deletion


## 📡 API Endpoints (Planned/Implemented)

| Method | Endpoint                    | Description                            | Auth Required |
|:--------|:----------------------------|:----------------------------------------|:--------------|
| POST   | `/auth/register`             | Register a new user                    | ❌           |
| POST   | `/auth/login`                | Login and receive tokens               | ❌           |
| POST   | `/auth/refresh-token`        | Get new access token via refresh token | ❌           |
| GET    | `/users/me`                  | Get authenticated user's profile       | ✅           |
| POST   | `/matches/request`           | Send a match request                   | ✅           |
| POST   | `/matches/accept`            | Accept a match request                 | ✅           |
| GET    | `/matches`                   | List all matches for user              | ✅           |
| POST   | `/messages`                  | Send message to a matched user         | ✅           |
| GET    | `/messages/:matchId`         | Get chat history for a match           | ✅           |

## 📜 Project Philosophy

DevConnect Backend is designed for:
- **Separation of concerns between user data, tokens, and chat systems**
- **Production-grade, scalable authentication handling**
- **Clean, type-safe Prisma models**
- **Token-based session management with per-device tracking**



## ⚙️ Installation

```bash
git clone https://github.com/yourhandle/your-project.git
cd your-project
npm install
cp .env.example .env  # configure your env variables
npm run dev
