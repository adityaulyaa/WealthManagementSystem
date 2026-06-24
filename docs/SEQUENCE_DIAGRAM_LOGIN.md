# Sequence Diagram - Login Authentication Flow

## 📋 Overview

This document describes the complete authentication flow for the Wealth Management System, from user login through JWT token generation to accessing protected endpoints. The system uses JWT (JSON Web Token) for stateless authentication with BCrypt password hashing.

**Document Version**: 1.0  
**Created**: 24 Juni 2026  
**Phase**: Phase 5.2 - Documentation & Architecture Modeling  
**Status**: ⏳ Review Pending

---

## 🔧 Components

### Backend Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **AuthController** | Handles login requests, coordinates authentication | `controller/AuthController.java` |
| **UserService** | User lookup, business logic | `service/UserService.java` |
| **PasswordEncoder** | BCrypt password validation | Spring Security (BCryptPasswordEncoder) |
| **JwtUtil** | JWT token generation and validation | `security/JwtUtil.java` |
| **JwtAuthenticationFilter** | Intercepts requests, validates Bearer tokens | `security/JwtAuthenticationFilter.java` |
| **SecurityContext** | Stores authenticated user context | Spring Security |
| **UserController** | Protected endpoints requiring authentication | `controller/UserController.java` |
| **UserRepository** | Database access for user data | `repository/UserRepository.java` |

### External Components

| Component | Responsibility |
|-----------|---------------|
| **API Client** | Application consuming the API (web, mobile, etc.) |
| **MySQL Database** | Persistent storage for user credentials |

---

## 📊 Sequence Diagram

### Complete Authentication Flow

```mermaid
sequenceDiagram
    participant Client as API Client
    participant AuthCtrl as AuthController
    participant UserSvc as UserService
    participant PwdEnc as PasswordEncoder
    participant JWT as JwtUtil
    participant DB as MySQL Database
    participant Filter as JwtAuthenticationFilter
    participant SecCtx as SecurityContext
    participant UserCtrl as UserController

    Note over Client,DB: Phase 1: Login & Token Generation
    
    Client->>AuthCtrl: POST /api/auth/login<br/>{email, password}
    activate AuthCtrl
    
    AuthCtrl->>UserSvc: findByEmail(email)
    activate UserSvc
    
    UserSvc->>DB: SELECT * FROM users WHERE email = ?
    activate DB
    DB-->>UserSvc: User entity (with passwordHash)
    deactivate DB
    
    alt User Not Found
        UserSvc-->>AuthCtrl: null
        AuthCtrl-->>Client: 400 Bad Request<br/>"Invalid email or password"
    else User Found
        UserSvc-->>AuthCtrl: User object
        deactivate UserSvc
        
        AuthCtrl->>PwdEnc: matches(plainPassword, passwordHash)
        activate PwdEnc
        
        alt Password Invalid
            PwdEnc-->>AuthCtrl: false
            deactivate PwdEnc
            AuthCtrl-->>Client: 400 Bad Request<br/>"Invalid email or password"
        else Password Valid
            PwdEnc-->>AuthCtrl: true
            deactivate PwdEnc
            
            AuthCtrl->>JWT: generateToken(email)
            activate JWT
            JWT-->>AuthCtrl: JWT token string
            deactivate JWT
            
            AuthCtrl-->>Client: 200 OK<br/>LoginResponse {token, userId, email}
            deactivate AuthCtrl
        end
    end
    
    Note over Client,UserCtrl: Phase 2: Accessing Protected Endpoints
    
    Client->>Filter: GET /api/users<br/>Header: Authorization: Bearer {token}
    activate Filter
    
    Filter->>Filter: Extract token from<br/>Authorization header
    
    Filter->>JWT: validateToken(token)
    activate JWT
    
    alt Token Invalid or Expired
        JWT-->>Filter: false / exception
        deactivate JWT
        Filter-->>Client: 401 Unauthorized
    else Token Valid
        JWT-->>Filter: true
        deactivate JWT
        
        Filter->>JWT: extractEmail(token)
        activate JWT
        JWT-->>Filter: user email
        deactivate JWT
        
        Filter->>SecCtx: setAuthentication(<br/>UsernamePasswordAuthenticationToken)
        activate SecCtx
        Note over SecCtx: User authenticated<br/>in security context
        deactivate SecCtx
        
        Filter->>UserCtrl: Forward request
        deactivate Filter
        activate UserCtrl
        
        UserCtrl->>UserSvc: getAllUsers()
        activate UserSvc
        UserSvc->>DB: SELECT * FROM users
        activate DB
        DB-->>UserSvc: List of users
        deactivate DB
        UserSvc-->>UserCtrl: List<User>
        deactivate UserSvc
        
        UserCtrl-->>Client: 200 OK<br/>List<UserResponse>
        deactivate UserCtrl
    end
```

---

## 🔐 Authentication Flow Summary

### Phase 1: Login & Token Generation

**Endpoint**: `POST /api/auth/login`

**Flow**:
1. **API Client** sends login request with email and password
2. **AuthController** receives the request
3. **UserService** queries database to find user by email
4. **Database** returns user entity with BCrypt passwordHash
5. If user not found → Return 400 Bad Request
6. If user found → **PasswordEncoder** validates plain password against BCrypt hash
7. If password invalid → Return 400 Bad Request
8. If password valid → **JwtUtil** generates JWT token with email as subject
9. **AuthController** returns LoginResponse with token, userId, and email

**Success Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "user@example.com"
}
```

**Error Response** (Invalid Credentials):
```json
{
  "timestamp": "2026-06-24T11:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid email or password"
}
```

---

### Phase 2: Accessing Protected Endpoints

**Endpoint**: `GET /api/users` (or any protected endpoint)

**Flow**:
1. **API Client** sends request with Authorization header: `Bearer {token}`
2. **JwtAuthenticationFilter** intercepts the request
3. **Filter** extracts token from Authorization header
4. **JwtUtil** validates token signature and expiration
5. If token invalid → Return 401 Unauthorized
6. If token valid → **JwtUtil** extracts email from token claims
7. **Filter** creates UsernamePasswordAuthenticationToken with email
8. **SecurityContext** stores authentication (user is now authenticated)
9. Request forwarded to **UserController**
10. **UserController** processes request (user is authenticated in SecurityContext)
11. **UserService** fetches data from database
12. **UserController** returns response

**Success Response**:
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "createdAt": "2026-06-23T10:00:00",
    "updatedAt": "2026-06-23T10:00:00"
  }
]
```

**Error Response** (Unauthorized):
```json
{
  "timestamp": "2026-06-24T11:30:00Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Full authentication is required to access this resource"
}
```

---

## 🔑 Security Features

### 1. Password Security
- **BCrypt Hashing**: Passwords stored as BCrypt hashes (never plain text)
- **Salt**: BCrypt automatically generates unique salt per password
- **Work Factor**: BCrypt configured with appropriate cost factor

### 2. Token Security
- **JWT Standard**: Industry-standard JSON Web Token (RFC 7519)
- **Signing Algorithm**: HMAC SHA-256 (HS256)
- **Token Expiration**: 24 hours (86400000 ms)
- **Secret Key**: Configurable via `application.properties`
- **Stateless**: No server-side session storage required

### 3. Authentication Flow Security
- **Single Error Message**: "Invalid email or password" (no user enumeration)
- **Stateless Sessions**: SessionCreationPolicy.STATELESS
- **Bearer Token**: Standard Authorization header format
- **Protected Endpoints**: All `/api/users/**`, `/api/portfolios/**`, `/api/goals/**`, `/api/risk-profiles/**` require authentication
- **Public Endpoints**: Only `/api/auth/**` accessible without authentication

---

## 📁 Related Source Files

### Backend Implementation

**Controllers**:
- `backend/src/main/java/com/wealthmanagementsystem/controller/AuthController.java` - Login endpoint
- `backend/src/main/java/com/wealthmanagementsystem/controller/UserController.java` - Protected user endpoints

**Services**:
- `backend/src/main/java/com/wealthmanagementsystem/service/UserService.java` - User business logic

**Security**:
- `backend/src/main/java/com/wealthmanagementsystem/security/JwtUtil.java` - JWT token operations
- `backend/src/main/java/com/wealthmanagementsystem/security/JwtAuthenticationFilter.java` - Token validation filter
- `backend/src/main/java/com/wealthmanagementsystem/security/SecurityConfig.java` - Security configuration

**DTOs**:
- `backend/src/main/java/com/wealthmanagementsystem/dto/request/LoginRequest.java` - Login request body
- `backend/src/main/java/com/wealthmanagementsystem/dto/response/LoginResponse.java` - Login response body
- `backend/src/main/java/com/wealthmanagementsystem/dto/response/UserResponse.java` - User response body

**Repositories**:
- `backend/src/main/java/com/wealthmanagementsystem/repository/UserRepository.java` - User data access

**Configuration**:
- `backend/src/main/resources/application.properties` - JWT secret and expiration config

---

## 🧪 Testing the Flow

### 1. Register a New User
```bash
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User"
}
```

### 2. Login with Credentials
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "test@example.com"
}
```

### 3. Access Protected Endpoint
```bash
GET http://localhost:8080/api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Notes

### Design Decisions
- **Stateless Authentication**: JWT tokens enable horizontal scaling without session storage
- **BCrypt Password Hashing**: Industry-standard secure password storage
- **Single Error Message**: Prevents user enumeration attacks
- **Bearer Token Standard**: Follows OAuth 2.0 Bearer Token specification
- **Filter-based Authentication**: Spring Security filter chain for consistent token validation

### Future Enhancements (Post-MVP)
- Refresh token mechanism for token renewal
- Token revocation/blacklist for logout
- Multi-factor authentication (MFA)
- Rate limiting on login attempts
- Account lockout after failed attempts
- Password reset flow
- OAuth 2.0 integration (Google, GitHub)

---

**Document Status**: ✅ Complete  
**Implementation Status**: ✅ Tested and Verified  
**End-to-End Flow**: Register → BCrypt Hash → Login → JWT Token → Protected Access

**Next**: Phase 5.5 - Documentation Review
