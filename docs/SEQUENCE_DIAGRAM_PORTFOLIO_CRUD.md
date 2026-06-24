# Sequence Diagram - Portfolio CRUD Operations

## 📋 Overview

This document describes the complete Portfolio CRUD (Create, Read, Update, Delete) operations for the Wealth Management System. The system manages user investment portfolios with risk levels, allocation strategies, and asset compositions. Portfolio operations require user validation and proper DTO transformation.

**Document Version**: 1.0  
**Created**: 24 Juni 2026  
**Phase**: Phase 5.4 - Documentation & Architecture Modeling  
**Status**: ⏳ Review Pending

---

## 🔧 Components

### Backend Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **PortfolioController** | Handles portfolio CRUD requests | `controller/PortfolioController.java` |
| **PortfolioMapper** | Converts between DTO and Entity objects | `mapper/PortfolioMapper.java` |
| **PortfolioService** | Portfolio business logic, validation | `service/PortfolioService.java` |
| **PortfolioRepository** | Database access for portfolio data | `repository/PortfolioRepository.java` |
| **UserService** | User lookup for portfolio ownership | `service/UserService.java` |

### External Components

| Component | Responsibility |
|-----------|---------------|
| **API Client** | Application making portfolio requests (web, mobile, etc.) |
| **MySQL Database** | Persistent storage for portfolio data |

### DTO Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **PortfolioRequest** | Portfolio request data with validation | `dto/request/PortfolioRequest.java` |
| **PortfolioResponse** | Portfolio response data | `dto/response/PortfolioResponse.java` |

---

## 📊 Sequence Diagrams

### A. Create Portfolio

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant UserSvc as UserService
    participant Mapper as PortfolioMapper
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database

    Client->>Controller: POST /api/portfolios<br/>{userId, portfolioName, portfolioType, riskLevel}
    activate Controller

    Note over Controller: @Valid triggers validation

    alt Validation Fails
        Controller-->>Client: 400 Bad Request<br/>Field validation errors
    else Validation Passes
        Controller->>UserSvc: getUserById(userId)
        activate UserSvc
        UserSvc->>DB: SELECT * FROM users WHERE id = ?
        activate DB
        DB-->>UserSvc: User or null
        deactivate DB
        UserSvc-->>Controller: Optional<User>
        deactivate UserSvc

        alt User Not Found
            Controller-->>Client: 404 Not Found
        else User Found
            Controller->>Mapper: toEntity(request, user)
            activate Mapper
            Mapper-->>Controller: Portfolio Entity
            deactivate Mapper

            Controller->>Service: createPortfolio(portfolio)
            activate Service

            Service->>Service: validatePortfolio(portfolio)
            Note over Service: Check user, name, type, riskLevel

            Service->>Repository: save(portfolio)
            activate Repository
            Repository->>DB: INSERT INTO portfolios<br/>(user_id, portfolio_name, portfolio_type, risk_level, created_at, updated_at)
            activate DB
            DB-->>Repository: Saved Portfolio
            deactivate DB
            Repository-->>Service: Portfolio Entity
            deactivate Repository

            Service-->>Controller: Portfolio Entity
            deactivate Service

            Controller->>Mapper: toResponse(portfolio)
            activate Mapper
            Mapper-->>Controller: PortfolioResponse
            deactivate Mapper

            Controller-->>Client: 201 Created<br/>PortfolioResponse
        end
    end
    deactivate Controller
```

---

### B. Read Portfolio Operations

#### B1. Get Portfolio by ID

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database
    participant Mapper as PortfolioMapper

    Client->>Controller: GET /api/portfolios/{id}
    activate Controller

    Controller->>Service: getPortfolioById(id)
    activate Service

    Service->>Repository: findById(id)
    activate Repository
    Repository->>DB: SELECT * FROM portfolios WHERE id = ?
    activate DB
    DB-->>Repository: Portfolio or null
    deactivate DB
    Repository-->>Service: Optional<Portfolio>
    deactivate Repository

    alt Portfolio Not Found
        Service-->>Controller: Optional.empty()
        deactivate Service
        Controller-->>Client: 404 Not Found
    else Portfolio Found
        Service-->>Controller: Optional<Portfolio>
        deactivate Service

        Controller->>Mapper: toResponse(portfolio)
        activate Mapper
        Mapper-->>Controller: PortfolioResponse
        deactivate Mapper

        Controller-->>Client: 200 OK<br/>PortfolioResponse
    end
    deactivate Controller
```

#### B2. Get All Portfolios

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database
    participant Mapper as PortfolioMapper

    Client->>Controller: GET /api/portfolios
    activate Controller

    Controller->>Service: getAllPortfolios()
    activate Service

    Service->>Repository: findAll()
    activate Repository
    Repository->>DB: SELECT * FROM portfolios
    activate DB
    DB-->>Repository: List<Portfolio>
    deactivate DB
    Repository-->>Service: List<Portfolio>
    deactivate Repository

    Service-->>Controller: List<Portfolio>
    deactivate Service

    loop For each portfolio
        Controller->>Mapper: toResponse(portfolio)
        activate Mapper
        Mapper-->>Controller: PortfolioResponse
        deactivate Mapper
    end

    Controller-->>Client: 200 OK<br/>List<PortfolioResponse>
    deactivate Controller
```

#### B3. Get Portfolios by User ID

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database
    participant Mapper as PortfolioMapper

    Client->>Controller: GET /api/portfolios/user/{userId}
    activate Controller

    Controller->>Service: getPortfoliosByUserId(userId)
    activate Service

    Service->>Repository: findByUserId(userId)
    activate Repository
    Repository->>DB: SELECT * FROM portfolios WHERE user_id = ?
    activate DB
    DB-->>Repository: List<Portfolio>
    deactivate DB
    Repository-->>Service: List<Portfolio>
    deactivate Repository

    Service-->>Controller: List<Portfolio>
    deactivate Service

    loop For each portfolio
        Controller->>Mapper: toResponse(portfolio)
        activate Mapper
        Mapper-->>Controller: PortfolioResponse
        deactivate Mapper
    end

    Controller-->>Client: 200 OK<br/>List<PortfolioResponse>
    deactivate Controller
```

---

### C. Update Portfolio

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database
    participant Mapper as PortfolioMapper

    Client->>Controller: PUT /api/portfolios/{id}<br/>{userId, portfolioName, portfolioType, riskLevel}
    activate Controller

    Note over Controller: @Valid triggers validation

    alt Validation Fails
        Controller-->>Client: 400 Bad Request<br/>Field validation errors
    else Validation Passes
        Controller->>Service: getPortfolioById(id)
        activate Service
        Service->>Repository: findById(id)
        activate Repository
        Repository->>DB: SELECT * FROM portfolios WHERE id = ?
        activate DB
        DB-->>Repository: Portfolio or null
        deactivate DB
        Repository-->>Service: Optional<Portfolio>
        deactivate Repository
        Service-->>Controller: Optional<Portfolio>
        deactivate Service

        alt Portfolio Not Found
            Controller-->>Client: 404 Not Found
        else Portfolio Found
            Controller->>Mapper: updateEntity(existing, request)
            activate Mapper
            Mapper-->>Controller: void
            deactivate Mapper

            Controller->>Service: updatePortfolio(portfolio)
            activate Service

            Service->>Service: validatePortfolio(portfolio)
            Note over Service: Check user, name, type, riskLevel

            Service->>Repository: save(portfolio)
            activate Repository
            Repository->>DB: UPDATE portfolios SET portfolio_name=?, portfolio_type=?, risk_level=?, updated_at=? WHERE id=?
            activate DB
            DB-->>Repository: Updated Portfolio
            deactivate DB
            Repository-->>Service: Portfolio Entity
            deactivate Repository

            Service-->>Controller: Portfolio Entity
            deactivate Service

            Controller->>Mapper: toResponse(portfolio)
            activate Mapper
            Mapper-->>Controller: PortfolioResponse
            deactivate Mapper

            Controller-->>Client: 200 OK<br/>PortfolioResponse
        end
    end
    deactivate Controller
```

---

### D. Delete Portfolio

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as PortfolioController
    participant Service as PortfolioService
    participant Repository as PortfolioRepository
    database DB as MySQL Database

    Client->>Controller: DELETE /api/portfolios/{id}
    activate Controller

    Controller->>Service: deletePortfolio(id)
    activate Service

    Service->>Repository: deleteById(id)
    activate Repository
    Repository->>DB: DELETE FROM portfolios WHERE id = ?
    activate DB
    DB-->>Repository: Row deleted
    deactivate DB
    Repository-->>Service: void
    deactivate Repository

    Service-->>Controller: void
    deactivate Service

    Controller-->>Client: 204 No Content
    deactivate Controller
```

---

## 🔐 Portfolio CRUD Flow Summary

### A. Create Portfolio - POST /api/portfolios

**Request Body**:
```json
{
  "userId": 1,
  "portfolioName": "Retirement Fund",
  "portfolioType": "Conservative",
  "riskLevel": "LOW"
}
```

**Success Flow (HTTP 201)**:
1. API Client sends POST request with portfolio data
2. Controller validates input via `@Valid`
3. UserService looks up user by userId
4. If user not found → Return 404 Not Found
5. PortfolioMapper converts PortfolioRequest to Portfolio entity
6. PortfolioService validates portfolio data (user, name, type, riskLevel)
7. PortfolioRepository saves portfolio to database
8. PortfolioMapper converts entity to PortfolioResponse
9. Return HTTP 201 Created with PortfolioResponse

**Error Flows**:
- **Validation fails** → HTTP 400 Bad Request with field errors
- **User not found** → HTTP 404 Not Found

**Success Response (HTTP 201)**:
```json
{
  "id": 1,
  "userId": 1,
  "portfolioName": "Retirement Fund",
  "portfolioType": "Conservative",
  "riskLevel": "LOW",
  "createdAt": "2026-06-24T13:28:00Z",
  "updatedAt": "2026-06-24T13:28:00Z"
}
```

---

### B. Read Portfolio Operations

#### B1. Get Portfolio by ID - GET /api/portfolios/{id}

**Success Flow (HTTP 200)**:
1. API Client sends GET request with portfolio ID
2. PortfolioService queries portfolio by ID
3. If found → PortfolioMapper converts to response
4. Return HTTP 200 OK with PortfolioResponse

**Error Flow**:
- **Portfolio not found** → HTTP 404 Not Found

---

#### B2. Get All Portfolios - GET /api/portfolios

**Flow (HTTP 200)**:
1. API Client sends GET request
2. PortfolioService retrieves all portfolios from database
3. PortfolioMapper converts each to PortfolioResponse
4. Return HTTP 200 OK with list of PortfolioResponse

---

#### B3. Get Portfolios by User - GET /api/portfolios/user/{userId}

**Flow (HTTP 200)**:
1. API Client sends GET request with userId
2. PortfolioService queries portfolios by userId
3. PortfolioMapper converts each to PortfolioResponse
4. Return HTTP 200 OK with list of PortfolioResponse

---

### C. Update Portfolio - PUT /api/portfolios/{id}

**Request Body**:
```json
{
  "userId": 1,
  "portfolioName": "Updated Retirement Fund",
  "portfolioType": "Balanced",
  "riskLevel": "MEDIUM"
}
```

**Success Flow (HTTP 200)**:
1. API Client sends PUT request with portfolio ID and updated data
2. Controller validates input via `@Valid`
3. PortfolioService retrieves existing portfolio by ID
4. If not found → Return 404 Not Found
5. PortfolioMapper updates entity with new values
6. PortfolioService validates updated portfolio
7. PortfolioRepository saves updated portfolio
8. PortfolioMapper converts to PortfolioResponse
9. Return HTTP 200 OK with updated PortfolioResponse

**Error Flows**:
- **Validation fails** → HTTP 400 Bad Request with field errors
- **Portfolio not found** → HTTP 404 Not Found

---

### D. Delete Portfolio - DELETE /api/portfolios/{id}

**Flow (HTTP 204)**:
1. API Client sends DELETE request with portfolio ID
2. PortfolioService deletes portfolio by ID
3. PortfolioRepository executes DELETE statement
5. Return HTTP 204 No Content (empty body)

---

## ✅ Validation Rules

### DTO-Level Validation (@Valid annotations)

**User ID Field**:
- `@NotNull` - Cannot be null
- Message: "User ID is required"
- Example valid: `1`, `123`, `999`
- Example invalid: `null`

**Portfolio Name Field**:
- `@NotBlank` - Cannot be empty or whitespace
- Message: "Portfolio name is required"
- Example valid: `"Retirement Fund"`, `"Emergency Fund"`
- Example invalid: `""`, `"   "`, `null`

**Portfolio Type Field**:
- `@NotBlank` - Cannot be empty or whitespace
- Message: "Portfolio type is required"
- Example valid: `"Conservative"`, `"Aggressive"`, `"Balanced"`
- Example invalid: `""`, `null`

**Risk Level Field**:
- `@NotNull` - Cannot be null
- Message: "Risk level is required"
- Example valid: `LOW`, `MEDIUM`, `HIGH`
- Example invalid: `null`, invalid enum value

### Service-Level Validation

**Portfolio Validation** (validatePortfolio method):
- User must exist and not be null → `"Portfolio must have a user"`
- Portfolio name must not be empty → `"Portfolio name is required"`
- Portfolio type must not be empty → `"Portfolio type is required"`
- Risk level must not be null → `"Risk level is required"`

---

## 🔐 Security & Business Rules

### 1. User Validation
- Portfolio ownership tied to User entity
- User must exist before portfolio can be created
- All portfolio endpoints require authentication via JWT Bearer Token.
Ownership validation is not yet implemented.
Authenticated users may access portfolio endpoints regardless of ownership.

### 2. Portfolio Relationships

**Current Implementation**:
- Portfolio has a Many-to-One relationship with User.
- PortfolioAsset relationship is not currently mapped in Portfolio.java.

**Future Implementation**:
- Portfolio ↔ PortfolioAsset ↔ Asset relationship may be added in later phases.

### 3. Data Integrity
- Audit timestamps automatically set/updated via JPA lifecycle callbacks
- createdAt immutable after creation
- updatedAt updated on every change

---

## 📁 Related Source Files

### Backend Implementation

**Controllers**:
- `backend/src/main/java/com/wealthmanagementsystem/controller/PortfolioController.java` - Portfolio CRUD endpoints

**Services**:
- `backend/src/main/java/com/wealthmanagementsystem/service/PortfolioService.java` - Portfolio business logic
- `backend/src/main/java/com/wealthmanagementsystem/service/UserService.java` - User lookup

**Mappers**:
- `backend/src/main/java/com/wealthmanagementsystem/mapper/PortfolioMapper.java` - DTO/Entity conversion

**Repositories**:
- `backend/src/main/java/com/wealthmanagementsystem/repository/PortfolioRepository.java` - Database access

**DTOs**:
- `backend/src/main/java/com/wealthmanagementsystem/dto/request/PortfolioRequest.java` - Request validation
- `backend/src/main/java/com/wealthmanagementsystem/dto/response/PortfolioResponse.java` - Response data

**Entities**:
- `backend/src/main/java/com/wealthmanagementsystem/entity/Portfolio.java` - Portfolio domain model
- `backend/src/main/java/com/wealthmanagementsystem/entity/User.java` - User association

---

## 🧪 Testing the Flow

### 1. Create Portfolio
```bash
POST http://localhost:8080/api/portfolios
Content-Type: application/json

{
  "userId": 1,
  "portfolioName": "My First Portfolio",
  "portfolioType": "Balanced",
  "riskLevel": "MEDIUM"
}
```

**Expected Response** (HTTP 201):
```json
{
  "id": 1,
  "userId": 1,
  "portfolioName": "My First Portfolio",
  "portfolioType": "Balanced",
  "riskLevel": "MEDIUM",
  "createdAt": "2026-06-24T13:28:00Z",
  "updatedAt": "2026-06-24T13:28:00Z"
}
```

---

### 2. Get Portfolio by ID
```bash
GET http://localhost:8080/api/portfolios/1
```

**Expected Response** (HTTP 200): Portfolio data with ID 1

---

### 3. Get All Portfolios
```bash
GET http://localhost:8080/api/portfolios
```

**Expected Response** (HTTP 200): Array of all portfolios

---

### 4. Get User's Portfolios
```bash
GET http://localhost:8080/api/portfolios/user/1
```

**Expected Response** (HTTP 200): Array of portfolios for user 1

---

### 5. Update Portfolio
```bash
PUT http://localhost:8080/api/portfolios/1
Content-Type: application/json

{
  "userId": 1,
  "portfolioName": "Updated Portfolio Name",
  "portfolioType": "Conservative",
  "riskLevel": "LOW"
}
```

**Expected Response** (HTTP 200): Updated portfolio data

---

### 6. Delete Portfolio
```bash
DELETE http://localhost:8080/api/portfolios/1
```

**Expected Response** (HTTP 204): Empty body, No Content

---

## 📝 Implementation Notes

### Design Decisions
- **User Validation**: Portfolio creation requires valid user (404 if not found)
- **DTO Pattern**: Request/response DTOs prevent exposing internal entity details
- **Mapper Pattern**: Centralized DTO/Entity conversion logic
- **Service Validation**: Portfolio data validated before persistence

### Portfolio Structure
- **Portfolio**: Represents a named investment strategy (user owns many)
- **PortfolioAsset**: Represents individual asset allocations within a portfolio (separate entity, not currently linked in Portfolio.java)
- This document focuses on Portfolio CRUD; PortfolioAsset documented separately

### Future Enhancements (Post-MVP)
- Authorization checks (ensure users can only modify own portfolios)
- Pagination for getAllPortfolios endpoint
- Portfolio performance tracking
- Rebalancing recommendations
- Portfolio comparison features
- Export portfolio as PDF/CSV

---

**Document Status**: ⏳ Review Pending  
**Implementation Status**: ✅ Tested and Verified  
**CRUD Flow**: Create → Read (single/all/byUser) → Update → Delete

**Next**: Phase 5.5 - Financial Goal CRUD Sequence Diagram
