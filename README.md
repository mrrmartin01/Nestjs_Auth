<p align="center">
  <a href="https://github.com/mrrmartin01/nestjs-prisma-auth">
    <img src="https://user-images.githubusercontent.com/38547278/41305783-3192a2ac-6e9e-11e8-8080-48320e4efaac.png" alt="Logo" width="220" height="120">
  </a>

  <h3 align="center">NestJS Prisma Authentication Template</h3>

  <p align="center">
    A robust NestJS template providing secure, cookie-based authentication with Prisma, Docker, and Bun.
    <br />
    <a href="https://github.com/mrrmartin01/nestjs-prisma-auth/issues">Report Bug</a>
    ·
    <a href="https://github.com/mrrmartin01/nestjs-prisma-auth/issues">Request Feature</a>
  </p>
</p>

<p align="center">
  <img alt="Project Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?style=flat-square" />
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-red?style=flat-square&logo=nestjs&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-blue?style=flat-square&logo=prisma&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img alt="Argon2" src="https://img.shields.io/badge/Argon2-lightgrey?style=flat-square&logo=minutemailer&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square" />
  <img alt="Test Coverage" src="https://img.shields.io/badge/coverage-TBD-orange.svg?style=flat-square" />
</p>

---

## Table of Contents

*   [Overview](#overview)
*   [Features](#features)
*   [Architecture](#architecture)
*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Usage](#usage)
*   [Configuration](#configuration)
*   [Database Schema](#database-schema)
*   [API Reference](#api-reference)
*   [Tech Stack](#tech-stack)
*   [Contributing](#contributing)
*   [License](#license)
*   [Roadmap](#roadmap)
*   [Acknowledgements](#acknowledgements)

---

## Overview

In modern web development, establishing a secure and efficient authentication system is paramount. This project, `nestjs-prisma-auth`, serves as a comprehensive template designed to jumpstart your NestJS applications with a robust, cookie-based JWT authentication solution.

It addresses the common challenge of integrating multiple technologies—NestJS for server-side logic, Prisma as an elegant ORM, PostgreSQL for data persistence, and Docker for environment consistency—into a cohesive and developer-friendly package. By providing a pre-configured setup with password hashing (Argon2), secure JWTs stored in HTTP-only cookies, and a streamlined development workflow using Bun, `nestjs-prisma-auth` significantly reduces setup time, allowing developers to focus on core application features from day one.

## Features

This template comes packed with a suite of features designed to provide a secure, efficient, and enjoyable development experience:

*   **Robust Authentication**: Secure, cookie-based JWT (JSON Web Token) authentication strategy.
*   **Password Hashing**: Utilizes `argon2` for strong, industry-standard password hashing.
*   **Database Management**: Integrated with `Prisma ORM` for seamless interaction with a `PostgreSQL` database.
*   **Dockerized Environment**: `docker-compose` setup for easily spinning up a local PostgreSQL database.
*   **Performance & Efficiency**: Leverages `Bun` as a fast JavaScript runtime and package manager.
*   **Modular Architecture**: Follows NestJS best practices with dedicated modules for `Auth` and `Users`.
*   **API Documentation**: Built-in `Swagger` documentation for clear API endpoint definitions and testing.
*   **Input Validation**: Global `ValidationPipe` with `class-validator` and `class-transformer` for robust data integrity.
*   **Testing Suite**: Includes `Jest` for unit and end-to-end testing, with `Pactum` for API contract testing.
*   **Code Quality**: Enforced with `ESLint` and `Prettier` for consistent and maintainable code.
*   **Environment Management**: Flexible `.env` file handling with `dotenv` and `dotenv-cli` for different environments (development, test).

## Architecture

The `nestjs-prisma-auth` application follows a modular and layered architecture, typical for NestJS projects, emphasizing separation of concerns and maintainability.

```mermaid
graph TD
    A[Client Application] --> B(NestJS Application)
    B --> C{Auth Module}
    B --> D[Users Module]
    C --> E[JWT Strategy]
    C --> F(Argon2 for Hashing)
    C -- Authenticates --> D
    D --> G(Prisma Service)
    G --> H[PostgreSQL Database]
    E -- Validates Token --> C

    subgraph NestJS Core
        B
        C
        D
        G
    end
    subgraph Security Layer
        E
        F
    end
    subgraph Data Layer
        G
        H
    end
    style NestJS Core fill:#f9f,stroke:#333,stroke-width:2px
    style Security Layer fill:#ccf,stroke:#333,stroke-width:2px
    style Data Layer fill:#cfc,stroke:#333,stroke-width:2px
```

*   **Client Application**: Interacts with the NestJS application via HTTP requests.
*   **NestJS Application**: The core of the backend, orchestrating requests and responses. It serves as the entry point and routes requests to appropriate modules.
*   **Auth Module**: Handles user authentication, including registration (`signUp`), login (`signIn`), JWT generation, and cookie management. It relies on the `JWT Strategy` and `Argon2` for security.
*   **Users Module**: Manages user-related operations, interacting directly with the `Prisma Service` to perform CRUD operations on user data. It's often used by the `Auth Module` after successful authentication to retrieve user details.
*   **JWT Strategy**: A Passport.js strategy responsible for extracting and validating JSON Web Tokens, typically from HTTP-only cookies.
*   **Argon2 for Hashing**: Used within the `Auth Module` to securely hash user passwords before storing them in the database.
*   **Prisma Service**: A singleton service that encapsulates the Prisma Client, providing a centralized and efficient way to interact with the database.
*   **PostgreSQL Database**: The relational database used for persistent storage of application data, including user accounts.

This architecture ensures a clear flow of data and responsibilities, promoting scalability and ease of debugging.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Bun**: A fast all-in-one JavaScript runtime.
    *   [Install Bun](https://bun.sh/docs/installation)
*   **Docker & Docker Compose**: For managing the PostgreSQL database.
    *   [Install Docker](https://docs.docker.com/get-docker/)

## Installation

Follow these steps to get your development environment up and running:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/mrrmartin01/nestjs-prisma-auth.git
    cd nestjs-prisma-auth
    ```

2.  **Create environment file**:
    Copy the example environment file and update it with your configuration (e.g., `DATABASE_URL`, `JWT_SECRET`).

    ```bash
    cp .env.example .env
    # Open .env and configure your variables
    ```
    *Make sure to change `YOUR_SECRET_KEY` in `.env` to a strong, random string.*

3.  **Start the local PostgreSQL database**:
    This command uses Docker Compose to spin up a PostgreSQL container in detached mode (`-d`).

    ```bash
    bun db:dev:up
    ```

4.  **Deploy Prisma migrations**:
    Apply the database schema to your local PostgreSQL instance.

    ```bash
    bun prisma:dev:deploy
    ```

5.  **Install dependencies**:
    Use Bun to install all project dependencies.

    ```bash
    bun install
    ```

6.  **Start the application in development mode**:

    ```bash
    bun start:dev
    ```
    The application will be running on `http://localhost:3000` (or your configured `PORT`).

## Usage

### Running the Application

*   **Development Mode**:
    ```bash
    bun start:dev
    ```
    The application will watch for file changes and restart automatically.

*   **Production Mode**:
    First, build the application:
    ```bash
    bun build
    ```
    Then, start the compiled application:
    ```bash
    bun start:prod
    ```

### Accessing API Documentation

Once the application is running, the interactive API documentation powered by Swagger UI can be accessed at:

```
http://localhost:3000/api/docs
```

This interface allows you to explore all available endpoints, view expected request/response formats, and even send requests directly from your browser.

### Running Tests

*   **Unit/Integration Tests**:
    ```bash
    bun test
    ```

*   **End-to-End Tests**:
    This will spin up a separate test database, run the tests, and then tear down the database.
    ```bash
    bun test:e2e
    ```

## Configuration

All environment-specific configurations are managed through `.env` files. A `.env.example` is provided to guide you.
Key environment variables to configure:

| Variable           | Description                                                                 | Default Value            |
| :----------------- | :-------------------------------------------------------------------------- | :----------------------- |
| `PORT`             | The port on which the NestJS application will listen.                       | `3000`                   |
| `DATABASE_URL`     | Connection string for the PostgreSQL database (e.g., `postgresql://user:password@host:port/database`). | `postgresql://user:password@localhost:5432/nestjsauth?schema=public` |
| `JWT_SECRET`       | A strong, secret key used for signing and verifying JWTs. **CRITICAL FOR SECURITY**. | `YOUR_SECRET_KEY`        |
| `JWT_EXPIRATION_TIME` | Expiration time for JWTs (e.g., `1h`, `7d`).                             | `1h`                     |
| `NODE_ENV`         | Environment mode (`development`, `production`, `test`).                     | `development`            |

**Important**: Ensure `JWT_SECRET` is a strong, random, and confidential string in production environments.

## Database Schema

The project uses Prisma ORM to define and manage the database schema. The primary entity is the `User`.

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  hash      String   // Stores the Argon2 hashed password
  firstName String?
  lastName  String?
}
```

This schema defines a `User` model with essential fields for authentication and user profiles:
*   `id`: Unique identifier for the user.
*   `createdAt`, `updatedAt`: Timestamps for record creation and last update.
*   `email`: User's email, which must be unique.
*   `hash`: The securely hashed password.
*   `firstName`, `lastName`: Optional fields for user's first and last name.

## API Reference

The API provides endpoints for user authentication and basic user management. All endpoints are prefixed with `/api`.

### Authentication Endpoints (`/auth`)

| Method | Endpoint    | Description                                       | Request Body                  | Response Status | Response Body (Success)           |
| :----- | :---------- | :------------------------------------------------ | :---------------------------- | :-------------- | :-------------------------------- |
| `POST` | `/auth/signup` | Registers a new user.                             | `CreateUserDto`               | `201 Created`   | `User` object (without hash)      |
| `POST` | `/auth/signin` | Authenticates a user and sets a JWT cookie.     | `SignInDto`                   | `200 OK`        | `User` object (without hash)      |
| `POST` | `/auth/signout` | Clears the JWT cookie and logs out the user.      | `N/A`                         | `200 OK`        | `{ message: 'Logged out successfully' }` |

**`CreateUserDto`**

```typescript
{
  "email": "string",
  "password": "string",
  "firstName"?: "string",
  "lastName"?: "string"
}
```

**`SignInDto`**

```typescript
{
  "email": "string",
  "password": "string"
}
```

### User Endpoints (`/users`)

| Method | Endpoint     | Description                                       | Authentication | Response Status | Response Body (Success)     |
| :----- | :----------- | :------------------------------------------------ | :------------- | :-------------- | :-------------------------- |
| `GET`  | `/users/me`  | Retrieves the profile of the authenticated user. | `JWT Bearer`   | `200 OK`        | `User` object (without hash) |
| `PATCH`| `/users/me`  | Updates the profile of the authenticated user.   | `JWT Bearer`   | `200 OK`        | `User` object (without hash) |

**Note**: All authenticated endpoints require a valid JWT in an `HttpOnly` cookie. The Swagger UI can handle this automatically after a successful `signIn`.

## Tech Stack

This project leverages a modern and powerful set of technologies:

*   **Backend Framework**: [NestJS](https://nestjs.com/) (v11.x) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*   **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
*   **ORM**: [Prisma](https://www.prisma.io/) (v6.x) - Next-generation ORM for Node.js and TypeScript.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.x) - A typed superset of JavaScript that compiles to plain JavaScript.
*   **Runtime/Package Manager**: [Bun](https://bun.sh/) - An incredibly fast all-in-one JavaScript runtime, bundler, test runner, and package manager.
*   **Authentication**:
    *   [Passport.js](http://www.passportjs.org/) (v0.7.x) - Simple, unobtrusive authentication for Node.js.
    *   [JWT (JSON Web Tokens)](https://jwt.io/) - For secure information exchange between parties.
    *   [Argon2](https://github.com/P-H-C/phc-winner-argon2) (v0.44.x) - A strong password hashing function.
    *   [Cookie-Parser](https://www.npmjs.com/package/cookie-parser) (v1.4.x) - Parse Cookie header and populate `req.cookies`.
*   **Validation**: [Class-Validator](https://github.com/typestack/class-validator) (v0.14.x) & [Class-Transformer](https://github.com/typestack/class-transformer) (v0.5.x) - For declarative validation and transformation of objects.
*   **API Documentation**: [Swagger (OpenAPI)](https://swagger.io/) via `@nestjs/swagger` (v11.x).
*   **Testing**:
    *   [Jest](https://jestjs.io/) (v29.x) - Delightful JavaScript Testing.
    *   [Pactum](https://pactumjs.com/) (v3.8.x) - A lightweight, yet powerful, API testing framework.
    *   [Supertest](https://github.com/visionmedia/supertest) (v6.x) - HTTP assertions made easy via `superagent`.
*   **Linting & Formatting**: [ESLint](https://eslint.org/) (v9.x) & [Prettier](https://prettier.io/) (v3.x).
*   **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) - For containerized development environment.

## Contributing

We welcome contributions from the community! Whether it's a bug report, a new feature, or improving documentation, your help is appreciated. Please take a moment to review the following guidelines.

### How to Report Bugs

If you find a bug, please open an issue on the [GitHub repository](https://github.com/mrrmartin01/nestjs-prisma-auth/issues).
When reporting a bug, please include:

1.  A clear and concise description of the bug.
2.  Steps to reproduce the behavior.
3.  Expected behavior.
4.  Screenshots or error messages, if applicable.
5.  Your operating system, Node.js/Bun version, and any other relevant environment details.

### How to Request Features

Have an idea for a new feature or improvement? Open an issue on the [GitHub repository](https://github.com/mrrmartin01/nestjs-prisma-auth/issues) with the label `feature-request`.
Please provide:

1.  A clear and concise description of the proposed feature.
2.  The problem it solves or the benefit it provides.
3.  Any potential design considerations or alternatives.

### Development Setup Instructions

1.  **Fork the repository**: Click the "Fork" button at the top right of this repository's page.
2.  **Clone your forked repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/nestjs-prisma-auth.git
    cd nestjs-prisma-auth
    ```
3.  **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name-or-bugfix/issue-number
    ```
4.  **Set up environment**:
    *   Ensure Bun and Docker are installed (see [Prerequisites](#prerequisites)).
    *   Copy `.env.example` to `.env` and configure your settings.
    *   Start the development database: `bun db:dev:up`
    *   Deploy Prisma migrations: `bun prisma:dev:deploy`
    *   Install dependencies: `bun install`
5.  **Start the development server**: `bun start:dev`
6.  **Make your changes**: Implement your feature or fix.
7.  **Write tests**: Ensure your changes are covered by appropriate unit or E2E tests.
8.  **Run tests**: `bun test` and `bun test:e2e` to ensure everything works as expected.
9.  **Format and Lint**: Ensure your code adheres to project standards:
    ```bash
    bun format
    bun lint
    ```

### Code Style Guidelines

*   Follow the existing code style. The project uses Prettier and ESLint, which can automatically format and lint your code.
*   Use meaningful variable and function names.
*   Keep functions and methods small and focused on a single responsibility.
*   Add comments where the code isn't self-explanatory.
*   Adhere to NestJS best practices regarding module, service, and controller structure.

### Pull Request Process

1.  **Commit your changes**: Write clear and concise commit messages.
    ```bash
    git add .
    git commit -m "feat: Add new user registration endpoint"
    ```
2.  **Push your branch to your GitHub fork**:
    ```bash
    git push origin feature/your-feature-name
    ```
3.  **Open a Pull Request**:
    *   Go to the original `nestjs-prisma-auth` repository on GitHub.
    *   You should see a "Compare & pull request" button for your recently pushed branch.
    *   Provide a clear title and description for your pull request.
    *   Reference any related issues (e.g., `Fixes #123`, `Closes #456`).
4.  **Await Review**: Project maintainers will review your code. Be prepared to address feedback and make further changes if necessary.

This is a simplified representation of the Pull Request workflow:

```mermaid
gitGraph
    commit id: "Initial commit"
    branch feature/my-new-feature
    checkout feature/my-new-feature
    commit id: "Implement signup DTO"
    commit id: "Add signup controller logic"
    commit id: "Write unit tests for signup"
    checkout main
    commit id: "Hotfix: Security patch"
    checkout feature/my-new-feature
    merge main id: "Merge upstream/main"
    commit id: "Address review comments"
    checkout main
    merge feature/my-new-feature id: "Pull Request Merge (feature/my-new-feature)"
    tag "v0.0.1"
```

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 mrrmartin01

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Roadmap

*   [ ] Implement JWT refresh tokens for extended session management.
*   [ ] Add integration tests for all authentication flows.
*   [ ] Implement password reset functionality (forgot password flow).
*   [ ] Add email verification for new user registrations.
*   [ ] Integrate role-based access control (RBAC) with decorators.
*   [ ] Expand user management endpoints (e.g., `GET /users`, `DELETE /users/:id`).
*   [ ] Add GraphQL support.
*   [ ] Dockerize the entire NestJS application for production deployment.
*   [ ] Set up CI/CD pipeline for automated testing and deployment.
*   [ ] Improve error handling and logging mechanisms.

## Acknowledgements

*   [NestJS](https://nestjs.com/) - The superb framework that powers this project.
*   [Prisma](https://www.prisma.io/) - For making database interactions a breeze.
*   [Docker](https://www.docker.com/) - For simplifying environment setup.
*   [Bun](https://bun.sh/) - For revolutionizing JavaScript tooling speed.
*   [Swagger](https://swagger.io/) - For excellent API documentation.
*   [Shields.io](https://shields.io/) - For the awesome badges.
*   [Mermaid.js](https://mermaid.js.org/) - For powerful diagrams in markdown.

---
<p align="center">
  <sub>📝 Generated with <a href="https://github.com/Owusu1946/docsagev2">DocSage</a> - AI-powered documentation</sub>
</p>