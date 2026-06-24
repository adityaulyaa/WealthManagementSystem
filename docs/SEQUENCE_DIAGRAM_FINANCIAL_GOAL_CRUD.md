# Sequence Diagram - Financial Goal CRUD Operations

## 📋 Overview

This document describes the complete Financial Goal CRUD (Create, Read, Update, Delete) operations for the Wealth Management System. Financial goals allow users to define target amounts, target dates, and categories for their saving objectives. All goal operations require validation and DTO transformation.

**Document Version**: 1.0  
**Created**: 24 Juni 2026  
**Phase**: Phase 5.5 - Documentation & Architecture Modeling  
**Status**: ⏳ Review Pending

---

## 🔧 Components

### Backend Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **FinancialGoalController** | Handles goal CRUD requests | `controller/FinancialGoalController.java` |
| **FinancialGoalMapper** | Converts between DTO and Entity objects | `mapper/FinancialGoalMapper.java` |
| **FinancialGoalService** | Goal business logic, validation | `service/FinancialGoalService.java` |
| **FinancialGoalRepository** | Database access for goal data | `repository/FinancialGoalRepository.java` |
| **UserService** | User lookup for goal ownership | `service/UserService.java` |
| **GlobalExceptionHandler**| Handles validation and business exceptions | `exception/GlobalExceptionHandler.java` |

### External Components

| Component | Responsibility |
|-----------|---------------|
| **API Client** | Application making goal requests (web, mobile, etc.) |
| **MySQL Database** | Persistent storage for goal data |

### DTO Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **FinancialGoalRequest** | Goal request data with validation | `dto/request/FinancialGoalRequest.java` |
| **FinancialGoalResponse** | Goal response data | `dto/response/FinancialGoalResponse.java` |

---

## 📊 Sequence Diagrams

### A. Create Financial Goal

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant UserSvc as UserService
    participant Mapper as FinancialGoalMapper
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database
    participant GlobalEx as GlobalExceptionHandler

    Client->>Controller: POST /api/goals<br/>{userId, goalName, targetAmount, targetDate, category, ...}
    activate Controller

    Note over Controller: @Valid triggers validation

    alt Validation Fails
        Controller-->>GlobalEx: MethodArgumentNotValidException
        activate GlobalEx
        GlobalEx-->>Client: 400 Bad Request<br/>Field validation errors
        deactivate GlobalEx
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
            Mapper-->>Controller: FinancialGoal Entity
            deactivate Mapper

            Controller->>Service: createGoal(goal)
            activate Service

            Service->>Service: validateGoal(goal)
            Note over Service: Check user, name, amount, date, category

            Service->>Repository: save(goal)
            activate Repository
            Repository->>DB: INSERT INTO financial_goals<br/>(user_id, goal_name, target_amount, target_date, category, ...)
            activate DB
            DB-->>Repository: Saved Goal
            deactivate DB
            Repository-->>Service: FinancialGoal Entity
            deactivate Repository

            Service-->>Controller: FinancialGoal Entity
            deactivate Service

            Controller->>Mapper: toResponse(goal)
            activate Mapper
            Mapper-->>Controller: FinancialGoalResponse
            deactivate Mapper

            Controller-->>Client: 201 Created<br/>FinancialGoalResponse
        end
    end
    deactivate Controller
```

---

### B. Read Financial Goal Operations

#### B1. Get Goal by ID

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database
    participant Mapper as FinancialGoalMapper

    Client->>Controller: GET /api/goals/{id}
    activate Controller

    Controller->>Service: getGoalById(id)
    activate Service

    Service->>Repository: findById(id)
    activate Repository
    Repository->>DB: SELECT * FROM financial_goals WHERE id = ?
    activate DB
    DB-->>Repository: Goal or null
    deactivate DB
    Repository-->>Service: Optional<FinancialGoal>
    deactivate Repository

    alt Goal Not Found
        Service-->>Controller: Optional.empty()
        deactivate Service
        Controller-->>Client: 404 Not Found
    else Goal Found
        Service-->>Controller: Optional<FinancialGoal>
        deactivate Service

        Controller->>Mapper: toResponse(goal)
        activate Mapper
        Mapper-->>Controller: FinancialGoalResponse
        deactivate Mapper

        Controller-->>Client: 200 OK<br/>FinancialGoalResponse
    end
    deactivate Controller
```

#### B2. Get All Goals

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database
    participant Mapper as FinancialGoalMapper

    Client->>Controller: GET /api/goals
    activate Controller

    Controller->>Service: getAllGoals()
    activate Service

    Service->>Repository: findAll()
    activate Repository
    Repository->>DB: SELECT * FROM financial_goals
    activate DB
    DB-->>Repository: List<FinancialGoal>
    deactivate DB
    Repository-->>Service: List<FinancialGoal>
    deactivate Repository

    Service-->>Controller: List<FinancialGoal>
    deactivate Service

    loop For each goal
        Controller->>Mapper: toResponse(goal)
        activate Mapper
        Mapper-->>Controller: FinancialGoalResponse
        deactivate Mapper
    end

    Controller-->>Client: 200 OK<br/>List<FinancialGoalResponse>
    deactivate Controller
```

#### B3. Get Goals by User ID

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database
    participant Mapper as FinancialGoalMapper

    Client->>Controller: GET /api/goals/user/{userId}
    activate Controller

    Controller->>Service: getGoalsByUserId(userId)
    activate Service

    Service->>Repository: findByUserId(userId)
    activate Repository
    Repository->>DB: SELECT * FROM financial_goals WHERE user_id = ?
    activate DB
    DB-->>Repository: List<FinancialGoal>
    deactivate DB
    Repository-->>Service: List<FinancialGoal>
    deactivate Repository

    Service-->>Controller: List<FinancialGoal>
    deactivate Service

    loop For each goal
        Controller->>Mapper: toResponse(goal)
        activate Mapper
        Mapper-->>Controller: FinancialGoalResponse
        deactivate Mapper
    end

    Controller-->>Client: 200 OK<br/>List<FinancialGoalResponse>
    deactivate Controller
```

---

### C. Update Financial Goal

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database
    participant Mapper as FinancialGoalMapper
    participant GlobalEx as GlobalExceptionHandler

    Client->>Controller: PUT /api/goals/{id}<br/>{userId, goalName, targetAmount, targetDate, ...}
    activate Controller

    Note over Controller: @Valid triggers validation

    alt Validation Fails
        Controller-->>GlobalEx: MethodArgumentNotValidException
        activate GlobalEx
        GlobalEx-->>Client: 400 Bad Request<br/>Field validation errors
        deactivate GlobalEx
    else Validation Passes
        Controller->>Service: getGoalById(id)
        activate Service
        Service->>Repository: findById(id)
        activate Repository
        Repository->>DB: SELECT * FROM financial_goals WHERE id = ?
        activate DB
        DB-->>Repository: Goal or null
        deactivate DB
        Repository-->>Service: Optional<FinancialGoal>
        deactivate Repository
        Service-->>Controller: Optional<FinancialGoal>
        deactivate Service

        alt Goal Not Found
            Controller-->>Client: 404 Not Found
        else Goal Found
            Controller->>Mapper: updateEntity(existing, request)
            activate Mapper
            Mapper-->>Controller: void
            deactivate Mapper

            Controller->>Service: updateGoal(goal)
            activate Service

            Service->>Service: validateGoal(goal)
            Note over Service: Check user, name, amount, date, category

            Service->>Repository: save(goal)
            activate Repository
            Repository->>DB: UPDATE financial_goals SET ... WHERE id=?
            activate DB
            DB-->>Repository: Updated Goal
            deactivate DB
            Repository-->>Service: FinancialGoal Entity
            deactivate Repository

            Service-->>Controller: FinancialGoal Entity
            deactivate Service

            Controller->>Mapper: toResponse(goal)
            activate Mapper
            Mapper-->>Controller: FinancialGoalResponse
            deactivate Mapper

            Controller-->>Client: 200 OK<br/>FinancialGoalResponse
        end
    end
    deactivate Controller
```

---

### D. Delete Financial Goal

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as FinancialGoalController
    participant Service as FinancialGoalService
    participant Repository as FinancialGoalRepository
    database DB as MySQL Database

    Client->>Controller: DELETE /api/goals/{id}
    activate Controller

    Controller->>Service: deleteGoal(id)
    activate Service

    Service->>Repository: deleteById(id)
    activate Repository
    Repository->>DB: DELETE FROM financial_goals WHERE id = ?
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

## 🔐 Goal CRUD Flow Summary

### A. Create Financial Goal - POST /api/goals

**Request Body**:
```json
{
  "userId": 1,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "targetDate": "2030-12-31",
  "category": "PROPERTY"
}
```

**Success Flow (HTTP 201)**:
1. API Client sends POST request with goal data
2. Controller validates input via `@Valid`
3. UserService looks up user by userId
4. If user not found → Return 404 Not Found
5. FinancialGoalMapper converts FinancialGoalRequest to FinancialGoal entity
6. FinancialGoalService validates goal data (user, name, amount, date, category)
7. FinancialGoalRepository saves goal to database
8. FinancialGoalMapper converts entity to FinancialGoalResponse
9. Return HTTP 201 Created with FinancialGoalResponse

**Error Flows**:
- **Validation fails** → HTTP 400 Bad Request with field errors
- **User not found** → HTTP 404 Not Found

**Success Response (HTTP 201)**:
```json
{
  "id": 1,
  "userId": 1,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "targetDate": "2030-12-31",
  "category": "PROPERTY",
  "createdAt": "2026-06-24T13:45:00Z",
  "updatedAt": "2026-06-24T13:45:00Z"
}
```

---

### B. Read Goal Operations

#### B1. Get Goal by ID - GET /api/goals/{id}

**Success Flow (HTTP 200)**:
1. API Client sends GET request with goal ID
2. FinancialGoalService queries goal by ID
3. If found → FinancialGoalMapper converts to response
4. Return HTTP 200 OK with FinancialGoalResponse

**Error Flow**:
- **Goal not found** → HTTP 404 Not Found

---

#### B2. Get All Goals - GET /api/goals

**Flow (HTTP 200)**:
1. API Client sends GET request
2. FinancialGoalService retrieves all goals from database
3. FinancialGoalMapper converts each to FinancialGoalResponse
4. Return HTTP 200 OK with list of FinancialGoalResponse

---

#### B3. Get Goals by User - GET /api/goals/user/{userId}

**Flow (HTTP 200)**:
1. API Client sends GET request with userId
2. FinancialGoalService queries goals by userId
3. FinancialGoalMapper converts each to FinancialGoalResponse
4. Return HTTP 200 OK with list of FinancialGoalResponse

---

### C. Update Goal - PUT /api/goals/{id}

**Request Body**:
```json
{
  "userId": 1,
  "goalName": "Updated Down Payment",
  "targetAmount": 550000000,
  "targetDate": "2031-12-31",
  "category": "PROPERTY"
}
```

**Success Flow (HTTP 200)**:
1. API Client sends PUT request with goal ID and updated data
2. Controller validates input via `@Valid`
3. FinancialGoalService retrieves existing goal by ID
4. If not found → Return 404 Not Found
5. FinancialGoalMapper updates entity with new values
6. FinancialGoalService validates updated goal
7. FinancialGoalRepository saves updated goal
8. FinancialGoalMapper converts to FinancialGoalResponse
9. Return HTTP 200 OK with updated FinancialGoalResponse

**Error Flows**:
- **Validation fails** → HTTP 400 Bad Request with field errors
- **Goal not found** → HTTP 404 Not Found

---

### D. Delete Goal - DELETE /api/goals/{id}

**Flow (HTTP 204)**:
1. API Client sends DELETE request with goal ID
2. FinancialGoalService deletes goal by ID
3. FinancialGoalRepository executes DELETE statement
4. Return HTTP 204 No Content (empty body)

---

## ✅ Validation Rules

### DTO-Level Validation (@Valid annotations)

**User ID Field**:
- `@NotNull` - Cannot be null
- Message: "User ID is required"

**Goal Name Field**:
- `@NotBlank` - Cannot be empty or whitespace
- Message: "Goal name is required"

**Target Amount Field**:
- `@NotNull` - Cannot be null
- `@Positive` - Must be greater than 0
- Message: "Target amount must be positive"

**Target Date Field**:
- `@NotNull` - Cannot be null
- Message: "Target date is required"

**Category Field**:
- `@NotNull` - Cannot be null
- Message: "Category is required"

### Service-Level Validation

**Goal Validation** (validateGoal method):
- User must exist and not be null → `"Goal must have a user"`
- Goal name must not be empty → `"Goal name is required"`
- Target amount must be positive → `"Target amount must be positive"`
- Target date must not be null → `"Target date is required"`
- Category must not be null → `"Goal category is required"`

---

## 🔐 Security & Business Rules

### 1. User Validation
- Goal ownership tied to User entity
- User must exist before goal can be created
- GET endpoints return goals without authorization restrictions (frontend/user responsibility)

### 2. Financial Goal Relationships
- User can have multiple financial goals (1:N relationship)
- Each goal references a User (many-to-one)
- Goals are independent from portfolios

### 3. Data Integrity
- Audit timestamps automatically set/updated via JPA lifecycle callbacks
- createdAt immutable after creation
- updatedAt updated on every change

---

## 📁 Related Source Files

### Backend Implementation

**Controllers**:
- `backend/src/main/java/com/wealthmanagementsystem/controller/FinancialGoalController.java` - Goal CRUD endpoints

**Services**:
- `backend/src/main/java/com/wealthmanagementsystem/service/FinancialGoalService.java` - Goal business logic
- `backend/src/main/java/com/wealthmanagementsystem/service/UserService.java` - User lookup

**Mappers**:
- `backend/src/main/java/com/wealthmanagementsystem/mapper/FinancialGoalMapper.java` - DTO/Entity conversion

**Repositories**:
- `backend/src/main/java/com/wealthmanagementsystem/repository/FinancialGoalRepository.java` - Database access

**DTOs**:
- `backend/src/main/java/com/wealthmanagementsystem/dto/request/FinancialGoalRequest.java` - Request validation
- `backend/src/main/java/com/wealthmanagementsystem/dto/response/FinancialGoalResponse.java` - Response data

**Entities**:
- `backend/src/main/java/com/wealthmanagementsystem/entity/FinancialGoal.java` - Goal domain model
- `backend/src/main/java/com/wealthmanagementsystem/entity/User.java` - User association

---

## 🧪 Testing the Flow

### 1. Create Goal
```bash
POST http://localhost:8080/api/goals
Content-Type: application/json

{
  "userId": 1,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "targetDate": "2030-12-31",
  "category": "PROPERTY"
}
```

---

### 2. Get Goal by ID
```bash
GET http://localhost:8080/api/goals/1
```

---

### 3. Get All Goals
```bash
GET http://localhost:8080/api/goals
```

---

### 4. Get User's Goals
```bash
GET http://localhost:8080/api/goals/user/1
```

---

### 5. Update Goal
```bash
PUT http://localhost:8080/api/goals/1
Content-Type: application/json

{
  "userId": 1,
  "goalName": "Updated Down Payment",
  "targetAmount": 550000000,
  "targetDate": "2031-12-31",
  "category": "PROPERTY"
}
```

---

### 6. Delete Goal
```bash
DELETE http://localhost:8080/api/goals/1
```

---

## 📝 Implementation Notes

### Design Decisions
- **User Validation**: Goal creation requires valid user (404 if not found)
- **DTO Pattern**: Request/response DTOs prevent exposing internal entity details
- **Mapper Pattern**: Centralized DTO/Entity conversion logic
- **Service Validation**: Goal data validated before persistence
- **Independence**: Financial goals are managed independently of portfolios

### Future Enhancements (Post-MVP)
- Progress calculation and tracking engine
- Insights generation based on progress
- Authorization checks
- Pagination for endpoints
- Recurring contribution tracking
- Multi-currency support

---

**Document Status**: ⏳ Review Pending  
**Implementation Status**: ✅ Tested and Verified  
**CRUD Flow**: Create → Read (single/all/byUser) → Update → Delete

**Next**: Phase 6 - Frontend Foundation Implementation
