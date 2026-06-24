# Sequence Diagram - User Registration Flow

## 📋 Overview

This document describes the complete user registration flow for the Wealth Management System, from API request through user creation, validation, and password hashing to the HTTP response. The system validates input, checks for duplicate emails, hashes passwords using BCrypt, and persists new users to the database.

**Document Version**: 1.0  
**Created**: 24 Juni 2026  
**Phase**: Phase 5.3 - Documentation & Architecture Modeling  
**Status**: ⏳ Review Pending

---

## 🔧 Components

### Backend Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **UserController** | Handles registration requests, coordinates user creation | `controller/UserController.java` |
| **UserMapper** | Converts between DTO and Entity objects | `mapper/UserMapper.java` |
| **UserService** | User creation business logic, validation | `service/UserService.java` |
| **PasswordEncoder** | BCrypt password hashing | Spring Security (BCryptPasswordEncoder) |
| **UserRepository** | Database access for user data | `repository/UserRepository.java` |

### External Components

| Component | Responsibility |
|-----------|---------------|
| **API Client** | Application making registration request (web, mobile, etc.) |
| **MySQL Database** | Persistent storage for user data |

### DTO Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **UserRequest** | Incoming registration data with validation | `dto/request/UserRequest.java` |
| **UserResponse** | Outgoing user data after successful registration | `dto/response/UserResponse.java` |

---

## 📊 Sequence Diagram

### Complete Registration Flow

```mermaid
sequenceDiagram
    actor Client as API Client
    participant Controller as UserController
    participant Mapper as UserMapper
    participant Service as UserService
    participant Encoder as PasswordEncoder
    participant Repository as UserRepository
    database DB as MySQL Database
    participant GlobalEx as GlobalExceptionHandler

    Client->>Controller: POST /api/users<br/>{email, password, fullName}
    activate Controller

    Note over Controller: @Valid triggers validation
    alt Validation Fails
        Controller-->>GlobalEx: MethodArgumentNotValidException
        activate GlobalEx
        GlobalEx-->>Client: 400 Bad Request<br/>Field validation errors
        deactivate GlobalEx
    else Validation Passes
        Controller->>Mapper: toEntity(request)
        activate Mapper
        Mapper-->>Controller: User Entity
        deactivate Mapper

        Controller->>Service: createUser(user)
        activate Service

        Service->>Repository: existsByEmail(email)
        activate Repository
        Repository->>DB: SELECT email FROM users<br/>WHERE email = ?
        activate DB
        DB-->>Repository: Email exists? (true/false)
        deactivate DB
        Repository-->>Service: true/false
        deactivate Repository

        alt Email Already Exists
            Service-->>GlobalEx: throw IllegalArgumentException<br/>"Email already exists"
            deactivate Service
            activate GlobalEx
            GlobalEx-->>Client: 400 Bad Request<br/>"Email already exists"
            deactivate GlobalEx
        else Email Not Found
            Service->>Encoder: encode(plainPassword)
            activate Encoder
            Note over Encoder: BCrypt hashing<br/>with salt
            Encoder-->>Service: BCrypt Hash
            deactivate Encoder

            Note over Service: Set passwordHash<br/>on user entity

            Service->>Repository: save(user)
            activate Repository
            Repository->>DB: INSERT INTO users<br/>(email, passwordHash, fullName, createdAt, updatedAt)
            activate DB
            DB-->>Repository: User Saved
            deactivate DB
            Repository-->>Service: Saved User Entity
            deactivate Repository

            Service-->>Controller: User Entity
            deactivate Service

            Controller->>Mapper: toResponse(user)
            activate Mapper
            Mapper-->>Controller: UserResponse
            deactivate Mapper

            Controller-->>Client: 201 Created<br/>UserResponse {id, email, fullName}
        end
    end
    deactivate Controller
```

---

## 🔐 Registration Flow Summary

### Endpoint: `POST /api/users`

**Request Body**:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User"
}
```

### Success Flow

**Step-by-Step Process**:

1. **API Client** sends POST request to `/api/users` with registration data
2. **UserController** receives request
3. **@Valid** annotation triggers DTO validation on UserRequest
4. If validation fails → **MethodArgumentNotValidException** is thrown and handled by **GlobalExceptionHandler**, returning HTTP 400 Bad Request with field validation errors
5. If validation passes → **UserMapper** converts UserRequest to User entity
6. **UserController** calls **UserService.createUser(user)**
7. **UserService** checks if email already exists via **UserRepository.existsByEmail(email)**
8. If email exists → **UserService** throws **IllegalArgumentException** ("Email already exists") which is caught and handled by the **GlobalExceptionHandler**
9. If email not found → **PasswordEncoder** BCrypt hashes the plain password
10. **UserService** sets the BCrypt hash as passwordHash on user entity
11. **UserService** calls **UserRepository.save(user)** to persist to database
12. **MySQL** stores new user with all fields
13. **UserRepository** returns saved User entity
14. **UserService** returns User entity to controller
15. **UserController** calls **UserMapper.toResponse(user)** to convert entity to DTO
16. **UserController** returns HTTP 201 Created with UserResponse

**Success Response** (HTTP 201):
```json
{
  "id": 1,
  "email": "test@example.com",
  "fullName": "Test User",
  "createdAt": "2026-06-24T12:42:08Z",
  "updatedAt": "2026-06-24T12:42:08Z"
}
```

---

## ✅ Validation Rules

### DTO-Level Validation (@Valid annotations)

**Email Field**:
- `@NotBlank` - Cannot be empty or whitespace
- `@Email` - Must be valid email format
- Example valid: `user@example.com`
- Example invalid: `invalid.email`, `@example.com`, `user@`, empty string

**Password Field**:
- `@NotBlank` - Cannot be empty or whitespace
- `@Size(min=6, max=100)` - Must be 6-100 characters
- Example valid: `password123`, `MySecureP@ss`
- Example invalid: `pass`, empty string, `>100 char string`

**Full Name Field**:
- `@NotBlank` - Cannot be empty or whitespace
- `@Size(max=255)` - Maximum 255 characters
- Example valid: `John Doe`, `Maria García`, `李明`
- Example invalid: Empty string, string > 255 characters

### Service-Level Validation

**Email Uniqueness**:
- `UserRepository.existsByEmail(email)` checks database
- If email already exists → IllegalArgumentException
- Message: "Email already exists: {email}"

---

## 🔐 Security Features

### 1. Password Security
- **BCrypt Hashing**: All passwords hashed using Spring Security BCryptPasswordEncoder
- **Never Plain Text**: Password never stored as plain text in database
- **Salt Generation**: BCrypt automatically generates unique salt per password
- **Work Factor**: Configurable cost factor for computation time
- **One-Way Encryption**: Cannot reverse BCrypt hash to get original password

### 2. Input Validation
- **DTO Validation**: All input validated at controller level via `@Valid`
- **Email Format**: RFC 5322 email validation via `@Email`
- **Password Length**: Enforced minimum (6 chars) and maximum (100 chars)
- **Name Length**: Maximum 255 characters to match database column
- **Whitespace Trimming**: Spring validation automatically handles whitespace

### 3. Duplicate Prevention
- **Email Uniqueness**: Database check prevents duplicate registrations.
- **Database Constraint**: Unique constraint on `users.email` column as backup.

### 4. Data Integrity
- **Audit Timestamps**: `createdAt` and `updatedAt` automatically set by JPA @PrePersist
- **Immutable Creation Time**: `createdAt` never updated after creation
- **DTOs**: Request/response DTOs prevent exposing internal entity details

---

## 📁 Related Source Files

### Backend Implementation

**Controllers**:
- `backend/src/main/java/com/wealthmanagementsystem/controller/UserController.java` - Registration endpoint

**Services**:
- `backend/src/main/java/com/wealthmanagementsystem/service/UserService.java` - User creation business logic

**Repositories**:
- `backend/src/main/java/com/wealthmanagementsystem/repository/UserRepository.java` - Database access

**Mappers**:
- `backend/src/main/java/com/wealthmanagementsystem/mapper/UserMapper.java` - DTO/Entity conversion

**DTOs**:
- `backend/src/main/java/com/wealthmanagementsystem/dto/request/UserRequest.java` - Registration request validation
- `backend/src/main/java/com/wealthmanagementsystem/dto/response/UserResponse.java` - Registration response

**Security**:
- `backend/src/main/java/com/wealthmanagementsystem/security/SecurityConfig.java` - BCryptPasswordEncoder bean definition

**Configuration**:
- `backend/src/main/resources/application.properties` - Spring configuration

---

## 🧪 Testing The Flow

### 1. Successful Registration
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User"
}
```

**Expected Response** (HTTP 201):
```json
{
  "id": 1,
  "email": "newuser@example.com",
  "fullName": "New User",
  "createdAt": "2026-06-24T12:42:08Z",
  "updatedAt": "2026-06-24T12:42:08Z"
}
```

---

### 2. Validation Error - Invalid Email
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "invalid-email",
  "password": "password123",
  "fullName": "Test User"
}
```

**Expected Response** (HTTP 400):
```json
{
  "timestamp": "2026-06-24T12:42:08Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Field validation failed",
  "errors": [
    {
      "field": "email",
      "message": "must be a valid email address"
    }
  ]
}
```

---

### 3. Validation Error - Password Too Short
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "pass",
  "fullName": "Test User"
}
```

**Expected Response** (HTTP 400):
```json
{
  "timestamp": "2026-06-24T12:42:08Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Field validation failed",
  "errors": [
    {
      "field": "password",
      "message": "size must be between 6 and 100"
    }
  ]
}
```

---

### 4. Duplicate Email Error
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "existing@example.com",
  "password": "password123",
  "fullName": "Another User"
}
```

**Expected Response** (HTTP 400):
The **IllegalArgumentException** thrown by **UserService** is handled by **GlobalExceptionHandler**.
```json
{
  "timestamp": "2026-06-24T12:42:08Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists: existing@example.com"
}
```

---

### 5. Missing Required Fields
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Expected Response** (HTTP 400):
```json
{
  "timestamp": "2026-06-24T12:42:08Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Field validation failed",
  "errors": [
    {
      "field": "password",
      "message": "must not be blank"
    },
    {
      "field": "fullName",
      "message": "must not be blank"
    }
  ]
}
```

---

## 📝 Notes

### Design Decisions
- **DTO Validation First**: Input validated at API boundary before processing
- **Service-Level Checks**: Email uniqueness check in service for business logic consistency
- **Mapper Pattern**: Separates DTO from entity, prevents internal details exposure
- **BCrypt Standard**: Industry-standard secure password hashing algorithm
- **Audit Fields**: Automatic timestamps via JPA lifecycle callbacks ensure data integrity

### Registration vs Login
- **Registration** (this flow): Creates new user, validates input, hashes password, persists to DB
- **Login** (Phase 5.2): Authenticates existing user, validates BCrypt hash, generates JWT token

### Password Storage Guarantee
- Passwords **never** stored in plain text
- All passwords **immediately** hashed with BCrypt upon creation
- BCrypt uses unique salt per password
- BCrypt hash is one-way (cannot reverse to get original password)

### Future Enhancements (Post-MVP)
- Email verification/confirmation flow
- Password strength meter
- Rate limiting on registration attempts
- CAPTCHA to prevent automated registrations
- Account activation via email link
- Welcome email notification
- Phone number support
- User profile picture upload
- Terms of Service acceptance tracking

---

**Document Status**: ⏳ Review Pending  
**Implementation Status**: ✅ Tested and Verified  
**End-to-End Flow**: Email Validation → Duplicate Check → BCrypt Hash → Save → HTTP 201 Response

**Next**: Phase 5.4 - Portfolio CRUD Sequence Diagram
