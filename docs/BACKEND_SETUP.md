# Wealth Management System - Backend Setup Documentation
## Phase 4 - Spring Boot Backend Foundation

**Document Version**: 1.0  
**Created**: 22 Juni 2026  
**Phase**: Phase 4 - Backend Foundation Setup  
**Tech Stack**: Java 17 + Spring Boot 3.2.0 + MySQL 8.0+ + Maven

---

## 1. 📋 PROJECT STRUCTURE

### 1.1 Backend Directory Layout

```
backend/
├── pom.xml                                 # Maven build configuration
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── wealthmanagementsystem/
│   │   │           ├── WealthManagementBackendApplication.java  # Main entry point
│   │   │           ├── controller/         # REST API Controllers
│   │   │           ├── service/           # Business Logic Layer
│   │   │           ├── repository/        # Data Access Layer (JPA)
│   │   │           ├── entity/            # JPA Entities (Database models)
│   │   │           ├── dto/               # Data Transfer Objects
│   │   │           ├── config/            # Configuration classes
│   │   │           ├── exception/         # Custom exceptions & handlers
│   │   │           └── util/              # Utility classes
│   │   └── resources/
│   │       └── application.properties     # Application configuration
│   └── test/
│       └── java/
│           └── com/
│               └── wealthmanagementsystem/  # Test classes
└── target/                                 # Build output (generated)
```

### 1.2 Package Structure Explanation

| Package | Purpose | Examples |
|---------|---------|----------|
| **controller** | REST API endpoints, request/response handling | UserController, PortfolioController |
| **service** | Business logic, calculations, orchestration | UserService, GoalService |
| **repository** | Database access via Spring Data JPA | UserRepository, PortfolioRepository |
| **entity** | JPA entities mapping to database tables | User, Portfolio, FinancialGoal |
| **dto** | Data Transfer Objects for API requests/responses | LoginRequest, PortfolioResponse |
| **config** | Spring configuration classes | SecurityConfig, CorsConfig |
| **exception** | Custom exceptions & global exception handler | ResourceNotFoundException, GlobalExceptionHandler |
| **util** | Utility & helper classes | DateUtil, ValidationUtil |

---

## 2. 🔧 TECHNOLOGY STACK

### 2.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming language (LTS) |
| **Spring Boot** | 3.2.0 | Application framework |
| **Maven** | 3.9+ | Build & dependency management |
| **MySQL** | 8.0+ | Relational database |

### 2.2 Spring Boot Dependencies

#### **Spring Boot Starter Web**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
**Includes**:
- Spring MVC (REST API support)
- Embedded Tomcat server
- JSON serialization (Jackson)
- HTTP request/response handling

**Use Cases**: REST API controllers, HTTP endpoints

---

#### **Spring Boot Starter Data JPA**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
**Includes**:
- Spring Data JPA
- Hibernate ORM
- Entity management
- Repository abstraction

**Use Cases**: Database interactions, entity mapping, repositories

---

#### **MySQL Connector/J**
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.2.0</version>
</dependency>
```
**Purpose**: MySQL JDBC driver for database connectivity

**Use Cases**: Connect Spring Boot to MySQL database

---

#### **Lombok**
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.30</version>
</dependency>
```
**Purpose**: Reduce boilerplate code

**Annotations**:
- `@Data` - Generates getters, setters, toString, equals, hashCode
- `@Getter` / `@Setter` - Generate getters/setters
- `@NoArgsConstructor` / `@AllArgsConstructor` - Generate constructors
- `@Builder` - Generate builder pattern
- `@Slf4j` - Generate logger instance

**Example**:
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String email;
    private String fullName;
    // No need to write getters, setters, constructors!
}
```

---

#### **Spring Boot Starter Validation**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
**Includes**:
- Bean Validation (JSR-380)
- Hibernate Validator

**Annotations**:
- `@NotNull`, `@NotBlank`, `@NotEmpty`
- `@Size`, `@Min`, `@Max`
- `@Email`, `@Pattern`
- `@Valid` - Trigger validation

**Example**:
```java
public class RegisterRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
```

---

#### **Spring Boot DevTools** (Optional)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```
**Purpose**: Hot reload during development

**Features**:
- Automatic application restart on code changes
- LiveReload browser extension support
- Development-only (disabled in production)

---

#### **Spring Boot Starter Test**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```
**Includes**:
- JUnit 5
- Mockito
- AssertJ
- Spring Test

---

## 3. ⚙️ APPLICATION CONFIGURATION

### 3.1 application.properties Overview

**Location**: `src/main/resources/application.properties`

**Key Configurations**:

#### **Server Configuration**
```properties
server.port=8080
```
- Application runs on port 8080
- Access: http://localhost:8080

#### **Database Connection**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wealth_management
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
- Database: `wealth_management` (must be created manually)
- Default: root user, no password (development)
- **Security Note**: Change password for production

#### **JPA/Hibernate Configuration**
```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```
- **ddl-auto=validate**: Validate schema against entities (do NOT auto-create)
- **show-sql=true**: Show SQL queries in console (development only)
- **format_sql=true**: Pretty-print SQL queries

#### **Naming Strategy**
```properties
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy
```
- Java: `camelCase` → Database: `snake_case`
- Example: `fullName` → `full_name`

---

## 4. 🚀 SETUP INSTRUCTIONS

### 4.1 Prerequisites

1. ✅ Java 17 installed
   - Verify: `java -version`
   - Should output: `java version "17.x.x"`

2. ✅ Maven installed
   - Verify: `mvn -version`
   - Should output: `Apache Maven 3.9+`

3. ✅ MySQL 8.0+ installed and running
   - Verify: `mysql --version`

### 4.2 Database Setup

**Step 1**: Create database
```sql
CREATE DATABASE wealth_management 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

**Step 2**: Run schema script
```bash
mysql -u root -p wealth_management < database/schema/V1__create_tables.sql
```

**Step 3**: Verify tables created
```sql
USE wealth_management;
SHOW TABLES;
```
Expected output: 6 tables (users, risk_profiles, portfolios, assets, portfolio_assets, financial_goals)


### 4.3 Build & Run Application

**Step 1**: Navigate to backend directory
```bash
cd backend
```

**Step 2**: Clean & compile
```bash
mvn clean compile
```

**Step 3**: Run application
```bash
mvn spring-boot:run
```

**Expected Console Output**:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _ | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

... Application started on port 8080
```

**Step 4**: Verify application running
- Open browser: http://localhost:8080
- Expected: Whitelabel Error Page (normal - no controllers yet)

---

## 5. ?? MAVEN BUILD LIFECYCLE

### 5.1 Common Maven Commands

| Command | Purpose |
|---------|---------|
| `mvn clean` | Delete target/ directory |
| `mvn compile` | Compile source code |
| `mvn test` | Run unit tests |
| `mvn package` | Create JAR file in target/ |
| `mvn spring-boot:run` | Run application directly |
| `mvn clean install` | Full build + install to local repo |

### 5.2 Project Build Output

**Location**: `backend/target/`

**Generated Files**:
- `wealth-management-backend-1.0.0-SNAPSHOT.jar` - Executable JAR
- `classes/` - Compiled .class files
- `test-classes/` - Compiled test files

**Run JAR directly**:
```bash
java -jar target/wealth-management-backend-1.0.0-SNAPSHOT.jar
```

---

## 6. ?? DEPENDENCY EXPLANATION

### 6.1 Why Spring Boot 3.x?

**Benefits**:
- Java 17 baseline (modern language features)
- Jakarta EE 9+ (namespace change from javax to jakarta)
- Improved performance & memory usage
- Native compilation support (GraalVM)
- Better observability (Micrometer integration)

### 6.2 Why MySQL 8.0+?

**Features Used**:
- utf8mb4 character set (full Unicode, emojis)
- JSON data type (future use)
- Window functions (analytics queries)
- Better performance & indexing
- Common Table Expressions (CTEs)

### 6.3 Why Lombok?

**Code Reduction Example**:

**Without Lombok** (50+ lines):
```java
public class User {
    private Long id;
    private String email;
    private String fullName;
    
    public User() {}
    
    public User(Long id, String email, String fullName) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    // ... more boilerplate
}
```

**With Lombok** (5 lines):
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String email;
    private String fullName;
}
```

**Benefits**:
- 90% less boilerplate code
- Easier to read & maintain
- Auto-updates when fields change
- IDE support (IntelliJ IDEA, Eclipse, VS Code)

---

## 7. ??? ARCHITECTURE PATTERNS

### 7.1 Layered Architecture (3-Tier)

```
+-----------------------------------------+
�        CONTROLLER LAYER                 �
�  - REST API endpoints                   �
�  - Request/Response handling            �
�  - Input validation                     �
�  - HTTP status codes                    �
+-----------------------------------------+
                  �
+-----------------?-----------------------+
�         SERVICE LAYER                   �
�  - Business logic                       �
�  - Calculations                         �
�  - Orchestration                        �
�  - Transaction management               �
+-----------------------------------------+
                  �
+-----------------?-----------------------+
�       REPOSITORY LAYER                  �
�  - Database access                      �
�  - JPA queries                          �
�  - Entity management                    �
�  - CRUD operations                      �
+-----------------------------------------+
```

### 7.2 Request Flow Example

```
HTTP POST /api/users/register
    �
    ?
UserController.register()
    � - Parse JSON request
    � - Validate input (@Valid)
    � - Call service layer
    ?
UserService.registerUser()
    � - Check email exists
    � - Hash password (BCrypt)
    � - Create User entity
    � - Call repository
    ?
UserRepository.save()
    � - Persist to database
    � - Return saved entity
    ?
Return UserResponse (DTO)
    � - Map entity to DTO
    � - HTTP 201 Created
    � - JSON response
    ?
Client receives response
```

---

## 8. ?? NEXT STEPS (Phase 4 Continuation)

### Phase 4.1 - Entity Layer (Completed in this phase: Foundation only)
- ? Create JPA entities (User, Portfolio, Goal, etc.)
- ? Map to database tables
- ? Define relationships (@OneToMany, @ManyToOne)

### Phase 4.2 - Repository Layer
- ? Create Spring Data JPA repositories
- ? Define custom query methods
- ? Add finder methods

### Phase 4.3 - Service Layer
- ? Implement business logic
- ? Add transaction management
- ? Create service tests

### Phase 4.4 - Controller Layer
- ? Create REST API endpoints
- ? Add request/response DTOs
- ? Implement validation

### Phase 4.5 - Exception Handling
- ? Create custom exceptions
- ? Global exception handler
- ? Error response DTOs

---

## 9. ? VALIDATION CHECKLIST

**Phase 4 - Backend Foundation Setup**:

- ? Backend folder structure created
- ? pom.xml with all dependencies configured
- ? application.properties configured
- ? Main Application class created
- ? Package structure ready (controller, service, repository, entity, dto, config, exception, util)
- ? MySQL configuration ready
- ? Lombok annotation processing configured
- ? Spring Boot DevTools enabled
- ? Validation framework included
- ? Documentation complete

**Ready for**:
- Creating JPA entities
- Building repository layer
- Implementing services
- Developing REST APIs

---

## 10. ?? RELATED DOCUMENTATION

- **PROJECT_PLAN.md** - Master project blueprint
- **ARCHITECTURE.md** - System architecture
- **DATABASE_DESIGN.md** - Conceptual database design
- **PHYSICAL_DATABASE.md** - Physical database specification
- **V1__create_tables.sql** - Database schema SQL

---

**Document Version**: 1.0  
**Last Updated**: 22 Juni 2026  
**Phase**: Phase 4 - Spring Boot Backend Foundation  
**Status**: ? Completed  
**Next Phase**: Phase 4.1 - Entity Layer Implementation

---

**END OF DOCUMENT**

