# Wealth Management System - API Specification

## Document Information

- **Document Version**: 1.0
- **Created**: 29 Juni 2026
- **Scope**: MVP - Wealth Management System REST API
- **Base URL**: `http://localhost:8080/api`

---

## Table of Contents

1. [Authentication APIs](#1-authentication-apis)
2. [User APIs](#2-user-apis)
3. [Portfolio APIs](#3-portfolio-apis)
4. [Financial Goal APIs](#4-financial-goal-apis)
5. [Risk Profile APIs](#5-risk-profile-apis)
6. [Future APIs](#6-future-apis)
7. [Error Handling](#7-error-handling)
8. [Common Data Types](#8-common-data-types)

---

## 1. Authentication APIs

Base Path: `/api/auth`

### 1.1 POST /auth/login

Login with email and password. Returns JWT token for authentication.

**Endpoint**: `POST /api/auth/login`

**Request Headers**:
| Header | Value |
|--------|-------|
| Content-Type | application/json |

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Request Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | String | Yes | Valid email format |
| password | String | Yes | Not blank |

**Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "user@example.com"
}
```

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| token | String | JWT authentication token |
| tokenType | String | Token type (default: "Bearer") |
| userId | Long | Authenticated user's ID |
| email | String | User's email address |

**Status Codes**:
| Code | Description |
|------|-------------|
| 200 | Login successful |
| 400 | Invalid email or password |
| 500 | Internal server error |

---

## 2. User APIs

Base Path: `/api/users`

### 2.1 POST /users

Create a new user (registration).

**Endpoint**: `POST /api/users`

**Request Headers**:
| Header | Value |
|--------|-------|
| Content-Type | application/json |

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Request Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | String | Yes | Valid email format |
| password | String | Yes | 6-100 characters |
| fullName | String | Yes | Max 255 characters |

**Response (201 Created)**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "createdAt": "2026-06-29T10:00:00",
  "updatedAt": "2026-06-29T10:00:00"
}
```

**Status Codes**:
| Code | Description |
|------|-------------|
| 201 | User created successfully |
| 400 | Validation error |
| 409 | Email already exists |

---

### 2.2 GET /users/{id}

Get user by ID.

**Endpoint**: `GET /api/users/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | User's ID |

**Response (200 OK)**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "createdAt": "2026-06-29T10:00:00",
  "updatedAt": "2026-06-29T10:00:00"
}
```

**Status Codes**:
| Code | Description |
|------|-------------|
| 200 | User found |
| 404 | User not found |

---

### 2.3 GET /users/email/{email}

Get user by email.

**Endpoint**: `GET /api/users/email/{email}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| email | String | User's email |

**Response (200 OK)**: Same as GET /users/{id}

---

### 2.4 GET /users

Get all users.

**Endpoint**: `GET /api/users`

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "email": "user1@example.com",
    "fullName": "John Doe",
    "createdAt": "2026-06-29T10:00:00",
    "updatedAt": "2026-06-29T10:00:00"
  },
  {
    "id": 2,
    "email": "user2@example.com",
    "fullName": "Jane Doe",
    "createdAt": "2026-06-28T10:00:00",
    "updatedAt": "2026-06-28T10:00:00"
  }
]
```

---

### 2.5 PUT /users/{id}

Update existing user.

**Endpoint**: `PUT /api/users/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | User's ID |

**Request Body**: Same as POST /users

**Response (200 OK)**: Same as GET /users/{id}

**Status Codes**:
| Code | Description |
|------|-------------|
| 200 | User updated successfully |
| 400 | Validation error |
| 404 | User not found |

---

### 2.6 DELETE /users/{id}

Delete user by ID.

**Endpoint**: `DELETE /api/users/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | User's ID |

**Response (204 No Content)**: Empty body

**Status Codes**:
| Code | Description |
|------|-------------|
| 204 | User deleted successfully |
| 404 | User not found |

---

## 3. Portfolio APIs

Base Path: `/api/portfolios`

### 3.1 POST /portfolios

Create a new portfolio.

**Endpoint**: `POST /api/portfolios`

**Request Headers**:
| Header | Value |
|--------|-------|
| Content-Type | application/json |
| Authorization | Bearer {token} |

**Request Body**:
```json
{
  "userId": 1,
  "portfolioName": "Retirement Fund",
  "portfolioType": "INVESTMENT",
  "riskLevel": "MEDIUM",
  "assets": [
    {
      "assetId": 1,
      "allocationPercentage": 60.00
    },
    {
      "assetId": 2,
      "allocationPercentage": 40.00
    }
  ]
}
```

**Request Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| userId | Long | Yes | Must be valid user |
| portfolioName | String | Yes | Not blank |
| portfolioType | String | Yes | Not blank |
| riskLevel | Enum | Yes | LOW, MEDIUM, HIGH |
| assets | List<PortfolioAssetRequest> | Yes | At least one asset, sum of allocation should be 100% (validated in service) |

**PortfolioAssetRequest Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| assetId | Long | Yes | Must be valid asset |
| allocationPercentage | BigDecimal | Yes | 0-100% |

**Response (201 Created)**:
```json
{
  "id": 1,
  "userId": 1,
  "portfolioName": "Retirement Fund",
  "portfolioType": "INVESTMENT",
  "riskLevel": "MEDIUM",
  "assets": [
    {
      "id": 101,
      "assetId": 1,
      "assetName": "Vanguard S&P 500 ETF",
      "assetType": "STOCK",
      "assetCode": "VOO",
      "allocationPercentage": 60.00,
      "currentPrice": 400.00
    },
    {
      "id": 102,
      "assetId": 2,
      "assetName": "iShares Core U.S. Bonds",
      "assetType": "BOND",
      "assetCode": "AGG",
      "allocationPercentage": 40.00,
      "currentPrice": 100.00
    }
  ],
  "createdAt": "2026-06-29T10:00:00",
  "updatedAt": "2026-06-29T10:00:00"
}
```

**PortfolioAssetResponse Schema**:
| Field | Type | Description |
|-------|------|-------------|
| id | Long | Allocation ID |
| assetId | Long | Asset ID |
| assetName | String | Asset Name |
| assetType | String | Asset Type |
| assetCode | String | Asset Ticker/Code |
| allocationPercentage | BigDecimal | Allocation Percentage |
| currentPrice | BigDecimal | Current price of asset |

**Status Codes**:
| Code | Description |
|------|-------------|
| 201 | Portfolio created successfully |
| 400 | Validation error (e.g., asset not found, total allocation != 100%) |
| 404 | User not found |

---

### 3.2 GET /portfolios/{id}

Get portfolio by ID.

**Endpoint**: `GET /api/portfolios/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Portfolio's ID |

**Response (200 OK)**: Same as POST /portfolios response

---

### 3.3 GET /portfolios

Get all portfolios.

**Endpoint**: `GET /api/portfolios`

**Response (200 OK)**: Array of portfolio objects

---

### 3.4 GET /portfolios/user/{userId}

Get all portfolios for a specific user.

**Endpoint**: `GET /api/portfolios/user/{userId}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | Long | User's ID |

**Response (200 OK)**: Array of portfolio objects for the user

---

### 3.5 PUT /portfolios/{id}

Update existing portfolio.

**Endpoint**: `PUT /api/portfolios/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Portfolio's ID |

**Request Body**: Same as POST /portfolios

**Response (200 OK)**: Updated portfolio object

---

### 3.6 DELETE /portfolios/{id}

Delete portfolio by ID.

**Endpoint**: `DELETE /api/portfolios/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Portfolio's ID |

**Response (204 No Content)**: Empty body

---

## 4. Financial Goal APIs

Base Path: `/api/goals`

### 4.1 POST /goals

Create a new financial goal.

**Endpoint**: `POST /api/goals`

**Request Headers**:
| Header | Value |
|--------|-------|
| Content-Type | application/json |
| Authorization | Bearer {token} |

**Request Body**:
```json
{
  "userId": 1,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "targetDate": "2030-12-31",
  "category": "PROPERTY",
  "currentSavings": 50000000,
  "monthlyContribution": 5000000
}
```

**Request Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| userId | Long | Yes | Must be valid user |
| goalName | String | Yes | Not blank |
| targetAmount | BigDecimal | Yes | Positive value |
| targetDate | LocalDate | Yes | Future date |
| category | Enum | Yes | See GoalCategory enum |
| currentSavings | BigDecimal | No | Default: 0 |
| monthlyContribution | BigDecimal | No | Default: 0 |

**GoalCategory Enum Values**:
| Value | Description |
|-------|-------------|
| RETIREMENT | Retirement savings |
| PROPERTY | Property purchase |
| EDUCATION | Education funding |
| EMERGENCY | Emergency fund |
| TRAVEL | Travel savings |
| VEHICLE | Vehicle purchase |
| BUSINESS | Business investment |
| OTHER | Other goals |

**Response (201 Created)**:
```json
{
  "id": 1,
  "userId": 1,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "targetDate": "2030-12-31",
  "category": "PROPERTY",
  "currentSavings": 50000000,
  "monthlyContribution": 5000000,
  "createdAt": "2026-06-29T10:00:00",
  "updatedAt": "2026-06-29T10:00:00"
}
```

---

### 4.2 GET /goals/{id}

Get goal by ID.

**Endpoint**: `GET /api/goals/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Goal's ID |

**Response (200 OK)**: Same as POST /goals response

---

### 4.3 GET /goals

Get all goals.

**Endpoint**: `GET /api/goals`

**Response (200 OK)**: Array of goal objects

---

### 4.4 GET /goals/user/{userId}

Get all goals for a specific user.

**Endpoint**: `GET /api/goals/user/{userId}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | Long | User's ID |

**Response (200 OK)**: Array of goal objects for the user

---

### 4.5 PUT /goals/{id}

Update existing goal.

**Endpoint**: `PUT /api/goals/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Goal's ID |

**Request Body**: Same as POST /goals

**Response (200 OK)**: Updated goal object

---

### 4.6 DELETE /goals/{id}

Delete goal by ID.

**Endpoint**: `DELETE /api/goals/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Goal's ID |

**Response (204 No Content)**: Empty body

---

## 5. Risk Profile APIs

Base Path: `/api/risk-profiles`

### 5.1 POST /risk-profiles

Create a new risk profile.

**Endpoint**: `POST /api/risk-profiles`

**Request Headers**:
| Header | Value |
|--------|-------|
| Content-Type | application/json |
| Authorization | Bearer {token} |

**Request Body**:
```json
{
  "userId": 1,
  "riskLevel": "MEDIUM",
  "timeHorizonYears": 10
}
```

**Request Schema**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| userId | Long | Yes | Must be valid user |
| riskLevel | Enum | Yes | LOW, MEDIUM, HIGH |
| timeHorizonYears | Integer | Yes | 1-50 years |

**RiskLevel Enum Values**:
| Value | Description |
|-------|-------------|
| LOW | Conservative investor |
| MEDIUM | Balanced investor |
| HIGH | Aggressive investor |

**Response (201 Created)**:
```json
{
  "id": 1,
  "userId": 1,
  "riskLevel": "MEDIUM",
  "timeHorizonYears": 10,
  "createdAt": "2026-06-29T10:00:00",
  "updatedAt": "2026-06-29T10:00:00"
}
```

---

### 5.2 GET /risk-profiles/{id}

Get risk profile by ID.

**Endpoint**: `GET /api/risk-profiles/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Risk profile's ID |

**Response (200 OK)**: Same as POST /risk-profiles response

---

### 5.3 GET /risk-profiles/user/{userId}

Get risk profile by user ID.

**Endpoint**: `GET /api/risk-profiles/user/{userId}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | Long | User's ID |

**Response (200 OK)**: Risk profile object for the user

**Status Codes**:
| Code | Description |
|------|-------------|
| 200 | Risk profile found |
| 404 | No risk profile for user |

---

### 5.4 GET /risk-profiles

Get all risk profiles.

**Endpoint**: `GET /api/risk-profiles`

**Response (200 OK)**: Array of risk profile objects

---

### 5.5 PUT /risk-profiles/{id}

Update existing risk profile.

**Endpoint**: `PUT /api/risk-profiles/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Risk profile's ID |

**Request Body**: Same as POST /risk-profiles

**Response (200 OK)**: Updated risk profile object

---

### 5.6 DELETE /risk-profiles/{id}

Delete risk profile by ID.

**Endpoint**: `DELETE /api/risk-profiles/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Long | Risk profile's ID |

**Response (204 No Content)**: Empty body

---

## 6. Future APIs

These APIs are planned for future phases.

### 6.1 Dashboard API

**Base Path**: `/api/dashboard`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard/summary | Get dashboard summary data |

**Planned Response**:
```json
{
  "totalPortfolioValue": 150000000,
  "totalGoals": 5,
  "activeGoals": 3,
  "onTrackGoals": 2,
  "goalsSummary": [
    { "goalName": "House", "progress": 25 },
    { "goalName": "Car", "progress": 60 }
  ]
}
```

---

### 6.2 Simulation API

**Base Path**: `/api/simulation`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /simulation/goal-impact | Calculate What-If impact |

**Planned Request**:
```json
{
  "goalId": 1,
  "currentIncome": 20000000,
  "simulatedIncome": 25000000,
  "currentExpenses": 12000000,
  "simulatedExpenses": 11000000
}
```

**Planned Response**:
```json
{
  "currentScenario": {
    "monthlySavings": 8000000,
    "monthsToTarget": 56,
    "completionDate": "2030-10-22"
  },
  "simulatedScenario": {
    "monthlySavings": 14000000,
    "monthsToTarget": 32,
    "completionDate": "2028-08-22"
  },
  "impact": {
    "timeSaved": 24,
    "savingsIncrease": 6000000
  }
}
```

---

## 7. Error Handling

### 7.1 Error Response Format

All error responses follow a standard format:

```json
{
  "timestamp": "2026-06-29T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation error message"
}
```

### 7.2 Common Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content to return |
| 400 | Bad Request - Validation error or invalid input |
| 401 | Unauthorized - Invalid or missing authentication |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

### 7.3 Validation Error Format

```json
{
  "timestamp": "2026-06-29T10:00:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Email must be valid",
  "field": "email"
}
```

---

## 8. Common Data Types

### 8.1 RiskLevel Enum

| Value | Description |
|-------|-------------|
| LOW | Conservative - Focus on capital preservation |
| MEDIUM | Balanced - Mix of growth and stability |
| HIGH | Aggressive - Focus on maximum growth |

### 8.2 GoalCategory Enum

| Value | Description |
|-------|-------------|
| RETIREMENT | Retirement savings |
| PROPERTY | Property/housing goals |
| EDUCATION | Education funding |
| EMERGENCY | Emergency fund |
| TRAVEL | Vacation/travel goals |
| VEHICLE | Vehicle purchase |
| BUSINESS | Business investment |
| OTHER | Other financial goals |

### 8.3 Date Formats

| Format | Example | Description |
|--------|---------|-------------|
| ISO Date | 2026-12-31 | LocalDate |
| ISO DateTime | 2026-06-29T10:00:00 | LocalDateTime |

---

## Appendix A: Authentication

### Using JWT Token

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token is obtained from `/api/auth/login` response.

### Token Expiration

Default token expiration: 24 hours (configurable in backend).

---

## Appendix B: Request/Response Examples

### Complete Login Flow

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "user@example.com"
}

# Get User Profile
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Create Portfolio
curl -X POST http://localhost:8080/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"userId":1,"portfolioName":"Test","portfolioType":"INVESTMENT","riskLevel":"MEDIUM"}'
```

---

**Document Version**: 1.0
**Last Updated**: 29 Juni 2026
**Author**: System Architect
**Status**: Complete - MVP APIs Documented

---