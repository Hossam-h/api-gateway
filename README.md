# VM Platform - Microservices Architecture

A Virtual Machine Management Platform built with NestJS using Microservices Architecture.

---

## Architecture Overview

```
Client
  │
  ▼
API Gateway (Port 3000)
  │
  ├──► Auth Service (Port 3001)
  │         └── auth_db (PostgreSQL)
  │
  └──► Machine Service (Port 3002)
            └── machine_db (PostgreSQL)
```

### Services

| Service | Port | Responsibility |
|---|---|---|
| API Gateway | 3000 | Routes requests, validates tokens |
| Auth Service | 3001 | Register, Login, JWT tokens |
| Machine Service | 3002 | Create and manage VMs |

---

## Tech Stack

- **Framework:** NestJS with Express
- **Database:** PostgreSQL + TypeORM
- **Authentication:** JWT (Access + Refresh tokens)
- **Communication:** REST via Axios
- **Validation:** class-validator

---

## Project Structure

```
api-gateway/
   └── src/
       ├── auth/
       ├── machines/
       ├── guards/
       │   └── auth.guard.ts
       ├── app.module.ts
       └── main.ts

 auth-service/
    └── src/
        ├── auth/
        │   ├── dto/
        │   ├── entities/
        │   ├── auth.controller.ts
        │   ├── auth.service.ts
        │   └── auth.module.ts
        ├── app.module.ts
        └── main.ts

machine-service/
    └── src/
        ├── machines/
        │   ├── dto/
        │   ├── entities/
        │   ├── machines.controller.ts
        │   ├── machines.service.ts
        │   └── machines.module.ts
        ├── app.module.ts
        └── main.ts
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL
- NestJS CLI: `npm install -g @nestjs/cli`

---

## Setup & Installation

### 1. Create Databases

Open PostgreSQL and run:

```sql
CREATE DATABASE auth_db;
CREATE DATABASE machine_db;
```

### 2. Configure Environment Variables

Create a `.env` file in each service:

**auth-service/.env**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=auth_db
JWT_SECRET=secret123
JWT_REFRESH_SECRET=refresh_secret123
```

**machine-service/.env**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=machine_db
```

### 3. Install Dependencies

```bash
# Auth Service
cd auth-service
npm install

# Machine Service
cd ../machine-service
npm install

# API Gateway
cd ../api-gateway
npm install
```

### 4. Run All Services

Open **3 separate terminals**:

```bash
# Terminal 1 - Auth Service
cd auth-service && npm run start:dev

# Terminal 2 - Machine Service
cd machine-service && npm run start:dev

# Terminal 3 - API Gateway
cd api-gateway && npm run start:dev
```

---

## API Endpoints

All requests go through the **API Gateway on port 3000**.

### Auth

#### Register
```
POST http://localhost:3000/auth/register
```
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

#### Login
```
POST http://localhost:3000/auth/login
```
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```
Returns `accessToken` and `refreshToken`.

---

### Machines (Requires Authorization Header)

> Add `Authorization: Bearer <accessToken>` to all machine requests.

#### Create VM
```
POST http://localhost:3000/machines
```
```json
{
  "hostname": "my-server",
  "password": "vm_password",
  "cpuCores": 4,
  "memorySize": 8,
  "diskSize": 100,
  "os": "Ubuntu 22.04"
}
```

#### Get My VMs
```
GET http://localhost:3000/machines?page=1&limit=10
```


## Key Design Decisions

### Why UUID over Incremental ID?
Each service has its own database. UUID guarantees globally unique IDs across all services without conflicts.


## Assumptions

- Passwords stored in the machine are not encrypted (mocked VM creation)
- No external cloud provider integration (mocked)
- `synchronize: true` used for development (use migrations in production)
