# Wealth Management System - High Level Architecture Design
## Phase 2.1 - Level 1 (MVP)

**Document Version**: 1.0  
**Created**: 22 Juni 2026  
**Scope**: Level 1 (MVP) - Individual Learning Project  
**Stack**: React 18 + Spring Boot 3 + MySQL 8.0+

---

## 1. 🎯 TUJUAN ARSITEKTUR SISTEM

### 1.1 Objektif Desain

Arsitektur Wealth Management System dirancang dengan fokus pada:

1. **Pembelajaran Software Engineering**
   - Memahami 3-tier architecture dalam praktik
   - Implementasi REST API yang proper
   - Database design untuk financial domain
   - Frontend state management
   - Authentication & authorization

2. **Kesederhanaan & Maintainability**
   - Mudah dipahami oleh single developer
   - Clear separation of concerns
   - Minimal boilerplate code
   - Easy to extend untuk Phase 2+

3. **MVP Fokus**
   - Hanya fitur essensial Level 1
   - Static/mock data (bukan real-time)
   - Calculation-based (bukan ML/AI)
   - No historical tracking (Phase 2+)

4. **Learning Value**
   - Master fundamentals sebelum advanced
   - Real-world pattern (tidak over-engineer)
   - Pragmatic design trade-offs

### 1.2 Target Pengguna

- **Primary**: Satu developer (pembelajaran individual)
- **Teknologi**: React, Spring Boot, MySQL
- **Timeline**: 12 minggu (3 bulan)

---

## 2. 🏗️ HIGH LEVEL ARCHITECTURE

### 2.1 3-Tier Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│           PRESENTATION LAYER (React - Port 3000)                │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Components  │ State (AuthContext) │ Routes │ Services      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                   HTTP/REST API (JSON)
                   ↓ Request
                   ↑ Response
                   JWT in Headers
                              │
┌─────────────────────────────────────────────────────────────────┐
│        APPLICATION LAYER (Spring Boot - Port 8080)               │
│                                                                   │
│  Controllers (6) → Services (5) → Repositories (5)               │
│                                                                   │
│  [Auth] [User] [Portfolio] [Goal] [Dashboard] [Simulation]       │
│        ↓                                                           │
│  [UserService] [PortfolioService] [GoalService]                  │
│  [SimulationService] [DashboardService]                          │
│        ↓                                                           │
│  [UserRepo] [RiskProfileRepo] [PortfolioRepo]                    │
│  [AssetRepo] [GoalRepo]                                          │
│                                                                   │
│  + Security Layer (JWT Authentication)                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                   JPA/Hibernate (JDBC)
                   ↓ SQL Queries
                   ↑ Result Set
                              │
┌─────────────────────────────────────────────────────────────────┐
│            DATA LAYER (MySQL - Port 3306)                        │
│                                                                   │
│  5 Core Tables:                                                   │
│  [users] [risk_profiles] [portfolios] [assets] [financial_goals] │
│                                                                   │
│  Relationships: User 1---1 RiskProfile                            │
│                 User 1---1 Portfolio                              │
│                 User 1---* Goals                                  │
│                 Portfolio → Assets (via JSON)                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 🔄 ALUR INTERAKSI: REACT ↔ SPRING BOOT ↔ MYSQL

### 3.1 Communication Protocol

```
USER ACTION (React UI)
    ↓
Component Event Handler
    ↓
API Service Call (Axios)
    ↓
HTTP Request
├─ Method: GET/POST/PUT/DELETE
├─ Headers: { Authorization: "Bearer {JWT}" }
├─ Body: JSON (if POST/PUT)
└─ URL: http://localhost:8080/api/{endpoint}
    ↓
Spring Boot Server
├─ Receive HTTP Request
├─ JwtAuthenticationFilter validates token
├─ Spring Security sets SecurityContext
└─ Route to appropriate Controller
    ↓
Controller Layer
├─ Parse request body → DTO
├─ Validate input
└─ Call Service layer
    ↓
Service Layer
├─ Execute business logic
├─ Call Repository if needed
├─ Format response
└─ Return DTO
    ↓
Repository Layer
├─ Execute JPA queries
├─ Interact with MySQL via Hibernate
└─ Return Entity objects
    ↓
MySQL Database
├─ Execute SQL
└─ Return result set
    ↓
Service returns to Controller
    ↓
Controller sends HTTP Response
├─ Status: 200/201/400/401/404/500
├─ Body: JSON response
└─ Headers: Standard HTTP headers
    ↓
React receives response
    ↓
Update Component State (local or Context)
    ↓
Re-render UI
    ↓
User sees updated interface
```

### 3.2 Technology Bridges

| Bridge | Technology | Format |
|--------|-----------|--------|
| **Frontend → Backend** | HTTP/REST + Axios | JSON + JWT Header |
| **Backend → Database** | Spring Data JPA | SQL Queries (Hibernate) |
| **Authentication** | JWT Token | Bearer {token} in header |
| **Data Format** | JSON | Request & Response bodies |

---

## 4. 📱 MODUL FRONTEND (REACT)

### 4.1 Frontend Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
│
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── PortfolioPage.tsx
│   └── FinancialGoalsPage.tsx
│
├── components/
│   ├── common/
│   │   ├── ConfirmationModal.tsx
│   │   ├── LoadingState.tsx
│   │   └── EmptyState.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── MobileSidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── QuickActions.tsx
│   │   ├── PortfolioChart.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── types.ts
│   │   └── data.tsx
│   ├── portfolio/
│   │   ├── PortfolioToolbar.tsx
│   │   ├── PortfolioList.tsx
│   │   ├── PortfolioDetail.tsx
│   │   ├── modal/PortfolioModal.tsx
│   │   ├── types.ts
│   │   └── data.tsx
│   └── financialGoals/
│       ├── GoalToolbar.tsx
│       ├── GoalList.tsx
│       ├── GoalDetail.tsx
│       ├── GoalCard.tsx
│       ├── ProgressBar.tsx
│       ├── types.ts
│       ├── data.tsx
│       └── utils.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── usePortfolio.ts
│   ├── usePortfolioCrud.ts
│   ├── useFinancialGoals.ts
│   ├── useAsyncAction.ts
│   ├── useDirtyForm.ts
│   ├── useConfirmation.ts
│   └── useModalState.ts
│
├── services/
│   ├── api.ts
│   ├── AuthService.ts
│   ├── PortfolioService.ts
│   └── FinancialGoalService.ts
│
├── context/
│   └── AuthContext.tsx
│
├── types/
│   └── common.ts
│
└── utils/
    ├── validators.ts
    ├── mappers.tsx
    ├── common.ts
    └── user.ts
```

### 4.2 Key Frontend Modules

#### **Module 1: Authentication**
**Tanggung jawab**: User login, register, logout

Pages:
- LoginPage.tsx (implemented)
- RegisterPage.tsx (not yet implemented)

Components:
- LoginPage integrates directly with AuthService via `useAuth` hook

State Management:
- AuthContext (global) - user, token, isAuthenticated, login(), logout()

---

#### **Module 2: Portfolio Management**
**Tanggung jawab**: Risk assessment, portfolio recommendation, view

Pages:
- PortfolioPage.tsx (single page with integrated list, detail, and modal)
- RiskAssessmentPage.tsx (not yet implemented - Phase 9)
- RecommendationPage.tsx (not yet implemented - Phase 9)

Components:
- PortfolioToolbar.tsx - Search, filter, and create button
- PortfolioList.tsx - Grid of portfolio cards
- PortfolioDetail.tsx - Selected portfolio details with edit/delete
- modal/PortfolioModal.tsx - Reusable controlled modal for create/edit

Local State (Custom Hooks):
- `usePortfolio()` - Data fetching, loading, error states
- `usePortfolioCrud()` - Create, update, delete handlers

Implementation Pattern:
```
PortfolioPage
  │
  ├── usePortfolio()         → Data fetching
  ├── usePortfolioCrud()     → CRUD logic
  ├── PortfolioToolbar        → Search, filter, create button
  ├── PortfolioList           → Grid layout
  │     └── PortfolioDetail   → Selected item detail + edit/delete
  └── PortfolioModal          → Create/Edit form
```

---

#### **Module 3: Goal Management**
**Tanggung jawab**: CRUD goals, view progress, display insights

Pages:
- FinancialGoalsPage.tsx (single page with integrated list and detail)
- CreateGoalPage.tsx (not implemented - using modal pattern instead)
- GoalDetailPage.jsx (integrated in FinancialGoalsPage)

Components:
- GoalToolbar.tsx - Search, filter, and create button
- GoalList.tsx - Grid of goal cards
- GoalDetail.tsx - Selected goal details with progress bar
- GoalCard.tsx - Individual goal card with progress
- ProgressBar.tsx - Progress visualization

Local State (Custom Hooks):
- `useFinancialGoals()` - Data fetching, loading, error states
- `useFinancialGoalCrud()` (planned - mirroring Portfolio pattern)

Implementation Pattern:
```
FinancialGoalsPage
  │
  ├── useFinancialGoals()    → Data fetching
  ├── GoalToolbar             → Search, filter, create button
  ├── GoalList                → Grid layout
  │     └── GoalDetail        → Selected item detail + progress
  └── GoalModal (planned)     → Create/Edit form
```

---

#### **Module 4: Dashboard**
**Tanggung jawab**: Summary view, key metrics

Page:
- DashboardPage.tsx (fully implemented with components)

Components:
- Sidebar.tsx / MobileSidebar.tsx - Navigation
- TopBar.tsx - User info, logout
- SummaryCards.tsx - Key metrics display
- PortfolioChart.tsx - Portfolio allocation pie chart
- RecentActivity.tsx - Activity feed
- QuickActions.tsx - Quick action buttons

State Management:
- Static dummy data (planned: useDashboard hook integration in Phase 11)

---

#### **Module 5: Simulation**
**Tanggung jawab**: What-If scenario analysis

Page:
- SimulationPage.tsx (not yet implemented - Phase 10)

Components (Planned):
- ScenarioInputs.tsx (Sliders for income/expense)
- ComparisonView.tsx (Current vs simulated)
- ImpactChart.tsx (Timeline comparison)

Local State (Planned):
- currentScenario (useState)
- simulatedScenario (useState)

Status: **Phase 10 - Not implemented yet**

---

### 4.3 Frontend State Management

**Architecture Pattern**: Single Global Context + Custom Hooks per Feature

**1. AuthContext** (Global - Single Source of Truth)
```
user: { id, email, fullName } | null
token: JWT string | null
isAuthenticated: boolean
isLoading: boolean
login(credentials): Promise<void>
logout(): void
```

**2. Portfolio State** (Custom Hooks Pattern)
- `usePortfolio()` - Data fetching, loading, error states
  - Returns: `{ portfolios, loading, error, selectedId, setSelectedId, refreshPortfolios, createPortfolio, updatePortfolio, deletePortfolio }`
- `usePortfolioCrud()` - CRUD logic, form state, modal handling
  - Returns: `{ portfolioName, portfolioType, riskLevel, modalOpen, modalMode, isSubmitting, isModalDirty, ...handlers }`

**3. Financial Goals State** (Custom Hooks Pattern)
- `useFinancialGoals()` - Data fetching, loading, error states
  - Returns: `{ goals, loading, error, selectedId, setSelectedId, refreshGoals }`
- `useFinancialGoalCrud()` (planned Phase 8) - CRUD logic mirror Portfolio pattern

**4. Reusable Hooks** (Shared Infrastructure)
- `useAsyncAction()` - Async loading state, success/error toasts
- `useDirtyForm()` - Detects unsaved form changes
- `useConfirmation()` - Confirmation modal state management
- `useModalState()` - Modal open/close state with controlled logic

**Implementation Example** (Portfolio):
```
const { portfolios, loading, refreshPortfolios } = usePortfolio()
const {
  portfolioName, portfolioType, riskLevel,
  modalOpen, modalMode,
  handleNewPortfolio, handleEditPortfolio, handleCloseModal,
  handleSubmitPortfolio, handleDeletePortfolio
} = usePortfolioCrud({
  portfolios,
  refreshPortfolios,
  selectedPortfolio
})
```

**Benefits**:
- **Separation of Concerns**: Data fetching (usePortfolio) terpisah dari CRUD logic (usePortfolioCrud)
- **Reusability**: Custom hooks bisa digunakan di multiple pages
- **Testability**: Hooks bisa di-test secara independent
- **Clean Code**: Pages menjadi thin orchestration layer (~60-70% smaller)

---

## 5. 🔧 MODUL BACKEND (SPRING BOOT)

### 5.1 Backend Structure

```
com.wealthmanagementsystem/
│
├── config/
│   ├── SecurityConfig.java
│   └── CorsConfig.java
│
├── controller/                  # 6 Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── PortfolioController.java
│   ├── GoalController.java
│   ├── DashboardController.java
│   └── SimulationController.java
│
├── service/                     # 5 Services (SIMPLIFIED)
│   ├── UserService.java
│   ├── PortfolioService.java
│   ├── GoalService.java
│   ├── SimulationService.java
│   └── DashboardService.java
│
├── repository/                  # 5 Repositories
│   ├── UserRepository.java
│   ├── RiskProfileRepository.java
│   ├── PortfolioRepository.java
│   ├── AssetRepository.java
│   └── GoalRepository.java
│
├── entity/                      # Domain Models (5 Entities)
│   ├── User.java
│   ├── RiskProfile.java
│   ├── Portfolio.java
│   ├── Asset.java
│   └── FinancialGoal.java
│
├── dto/                         # Data Transfer Objects
│   ├── request/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── GoalRequest.java
│   │   ├── SimulationRequest.java
│   │   └── RiskProfileRequest.java
│   │
│   └── response/
│       ├── AuthResponse.java
│       ├── UserResponse.java
│       ├── PortfolioResponse.java
│       ├── GoalResponse.java
│       ├── DashboardResponse.java
│       └── SimulationResponse.java
│
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── UserDetailsServiceImpl.java
│   └── JwtAuthenticationEntryPoint.java
│
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   └── UnauthorizedException.java
│
├── util/
│   ├── DateUtil.java
│   ├── CalculationUtil.java
│   └── ValidationUtil.java
│
└── WealthManagementApplication.java
```

### 5.2 Service Layer (SIMPLIFIED - 5 Services)

#### **Service 1: UserService**
**Responsibilities**:
- User registration & login
- User profile management
- Risk profile assessment (save & get)
- JWT token generation

Methods:
```
register(RegisterRequest): UserResponse
login(LoginRequest): AuthResponse (with JWT)
getProfile(userId): UserResponse
updateProfile(userId, UserRequest): UserResponse
saveRiskProfile(userId, RiskProfileRequest): void
getRiskProfile(userId): RiskProfileResponse
```

---

#### **Service 2: PortfolioService**
**Responsibilities**:
- Portfolio recommendation (Rules Engine)
- Save user portfolio
- Get user portfolio

Methods:
```
generateRecommendation(userId): PortfolioRecommendationResponse
  ├─ Get risk profile
  ├─ Apply rules engine (private method)
  └─ Build allocation
savePortfolio(userId, PortfolioRequest): PortfolioResponse
getUserPortfolio(userId): PortfolioResponse

Private:
applyRulesEngine(riskLevel, timeHorizon): AllocationRules
```

**Rules Engine Logic**:
```
IF risk_level = LOW:
  allocation = { stocks: 20%, bonds: 70%, cash: 10% }
ELSE IF risk_level = MEDIUM:
  allocation = { stocks: 50%, bonds: 40%, cash: 10% }
ELSE IF risk_level = HIGH:
  allocation = { stocks: 80%, bonds: 15%, cash: 5% }

Modifiers:
  IF timeHorizon < 3 years:
    increase conservatism by 20%
```

---

#### **Service 3: GoalService**
**Responsibilities**:
- Goal CRUD operations
- Progress calculation (on-the-fly)
- Insights generation (on-the-fly)

Methods:
```
createGoal(userId, GoalRequest): GoalResponse
getGoals(userId): List<GoalResponse>
getGoalById(goalId): GoalWithProgressResponse
  ├─ Calculate progress (private)
  └─ Generate insights (private)
updateGoal(goalId, GoalRequest): GoalResponse
deleteGoal(goalId): void
updateGoalSavings(goalId, currentSavings): void

Private:
calculateProgress(Goal): ProgressData
generateInsights(Goal, ProgressData): List<String>
determineStatus(projectedDate, targetDate): Status
```

**Progress Calculation Logic**:
```
currentProgress = (currentSavings / targetAmount) * 100
monthsToTarget = (targetAmount - currentSavings) / monthlySavings
projectedDate = NOW() + monthsToTarget months

IF projectedDate <= targetDate:
  status = ON_TRACK
ELSE IF projectedDate <= targetDate + 6 months:
  status = AT_RISK
ELSE:
  status = OFF_TRACK
```

**Insights Generation Logic**:
```
Template 1 (Achievability):
  "Target dapat tercapai dalam {months} bulan"

Template 2 (Savings):
  "Perlu menambah tabungan Rp {amount} per bulan"

Template 3 (Status):
  IF status = ON_TRACK:
    "Anda on track untuk mencapai goal ini"
  ELSE IF status = AT_RISK:
    "Goal berisiko tidak tercapai, naikkan tabungan"
  ELSE:
    "Goal off track, butuh perubahan signifikan"
```

---

#### **Service 4: SimulationService**
**Responsibilities**:
- Calculate What-If scenarios for goals

Methods:
```
simulateGoalImpact(SimulationRequest): SimulationResponse
  ├─ Calculate current scenario (private)
  ├─ Calculate simulated scenario (private)
  └─ Calculate impact (private)

Private:
projectCompletionDate(goal, monthlySavings): LocalDate
calculateTimeSaved(current, simulated): int
calculateSavingsIncrease(current, simulated): double
```

---

#### **Service 5: DashboardService (MINIMAL)**
**Responsibilities**:
- Aggregate data dari multiple sources
- Format untuk dashboard display

Methods:
```
getDashboardSummary(userId): DashboardResponse
  ├─ userService.getProfile()
  ├─ portfolioService.getUserPortfolio()
  ├─ goalService.getGoals()
  └─ Aggregate & format
```


---

## 6. ??? DATABASE ENTITIES (5 TABEL MVP)

### 6.1 Entity Relationship Diagram (Conceptual)

```
+--------------+
�    users     �
+--------------+
       � 1
       �
       +---------- 1:1 -------+
       �                      �
       � 1                    ?
       �              +------------------+
       �              �  risk_profiles   �
       �              +------------------+
       �
       +---------- 1:1 -------+
       �                      �
       � 1                    ?
       �              +------------------+
       �              �   portfolios     �
       �              � (JSON allocation)�
       �              +------------------+
       �                        �
       �                        � references
       �                        ?
       �              +------------------+
       �              �     assets       �
       �              � (master data)    �
       �              +------------------+
       �
       +---------- 1:N -------+
                              �
                              ?
                      +------------------+
                      � financial_goals  �
                      � (calculated)     �
                      +------------------+
```

---

### 6.2 Table 1: users

**Purpose**: User authentication & basic profile

Columns:
- id: Primary key
- email: Unique user identifier untuk login
- password_hash: BCrypt hashed password
- full_name: User display name
- created_at, updated_at: Audit timestamps

Relationships:
- 1-to-1 dengan risk_profiles
- 1-to-1 dengan portfolios
- 1-to-many dengan financial_goals

Notes:
- Tidak ada phone, address, birth_date (MVP tidak perlu)
- Password harus BCrypt (minimum 10 rounds)

---

### 6.3 Table 2: risk_profiles

**Purpose**: Store risk assessment hasil

Columns:
- id: Primary key
- user_id: Foreign key ke users (UNIQUE - 1 user = 1 profile)
- risk_level: Calculated risk level (LOW/MEDIUM/HIGH)
- time_horizon_years: Investment timeline (e.g., 3, 5, 10 years)
- investment_goal_type: Retirement, Education, Property, etc.
- risk_score: Numeric score dari questionnaire (0-100)
- assessment_data: JSON - Store raw questionnaire answers
- Timestamps

JSON Structure (assessment_data):
{
  "questions": [
    { "id": 1, "question": "...", "answer": "A" },
    { "id": 2, "question": "...", "answer": "B" }
  ],
  "total_score": 65
}

Relationships:
- Belongs to users (1-to-1)

Notes:
- JSON column untuk flexibility (easy to add/remove questions)
- No versioning (MVP hanya support 1 assessment per user)

---

### 6.4 Table 3: portfolios

**Purpose**: Store recommended portfolio yang diterima user

Columns:
- id: Primary key
- user_id: Foreign key ke users (UNIQUE - 1 user = N portfolio di MVP)
- risk_level: Risk level dari recommendation
- allocation: Join Table - Asset allocation details
- expected_return_percentage: Expected annual return (e.g., 7.5%)
- recommendation_text: Explanation untuk user
- Timestamps

JSON Structure (allocation):
[
  {
    "asset_id": 1,
    "asset_name": "Stocks",
    "asset_code": "VOO",
    "percentage": 50,
    "amount": 50000000
  },
  {
    "asset_id": 2,
    "asset_name": "Bonds",
    "asset_code": "AGG",
    "percentage": 40,
    "amount": 40000000
  }
]

Relationships:
- Belongs to users (1-to-1)
- References assets via JSON (no FK constraint)

Notes:
- SIMPLIFIED: No separate allocations table
- JSON sufficient untuk MVP (max 10-15 assets)
- No portfolio value tracking (calculated on-demand)
- No multiple portfolios per user (Phase 2+)

---

### 6.5 Table 4: assets

**Purpose**: Master data untuk available investment assets

Columns:
- id: Primary key
- asset_name: Display name (e.g., "Vanguard S&P 500 ETF")
- asset_type: Asset classification
- asset_code: Ticker/code (e.g., "VOO", "AGG")
- description: Asset description
- current_price: STATIC price for MVP (manual update)
- expected_annual_return: Historical average return
- risk_category: Risk classification
- is_active: Enable/disable assets
- Timestamps

Sample Data:
1. VOO  | ETF   | Vanguard S&P 500        | 400,000 | 10.0% | HIGH
2. AGG  | ETF   | iShares Core U.S. Bonds | 100,000 |  4.0% | LOW
3. CASH | CASH  | Cash/Money Market       |   1,000 |  2.0% | LOW

Relationships:
- Referenced dalam portfolios.allocation JSON (no FK)

Notes:
- STATIC PRICING: No real-time data di MVP
- No asset_prices historical table
- Admin manual update prices jika perlu
- 10-15 assets cukup untuk MVP

---

### 6.6 Table 5: financial_goals

**Purpose**: User financial goals dengan calculated progress

Columns:
- id: Primary key
- user_id: Foreign key ke users
- goal_name: User-defined goal name
- target_amount: Target jumlah uang
- target_date: Target tanggal completion
- category: Goal classification
- current_savings: Current saved amount
- monthly_contribution: Monthly savings rate
- current_progress_percentage: Calculated field (denormalized)
- status: Calculated field (ON_TRACK/AT_RISK/OFF_TRACK)
- projected_completion_date: Calculated field
- Timestamps

Relationships:
- Belongs to users (many-to-one)

Notes:
- CALCULATED FIELDS STORED: Performance optimization
- No goal_progress history table (MVP tidak track historical)
- No insights table (generated on-demand)
- Recalculate saat update (trigger atau service layer)

Sample Data:
Goal: "House Down Payment"
Target: Rp 500,000,000
Target Date: 2030-12-31
Current: Rp 50,000,000
Monthly: Rp 5,000,000
Progress: 10%
Status: ON_TRACK
Projected: 2028-06-30

---

### 6.7 Relationships Summary

users (1) <-> (1) risk_profiles
users (1) <-> (1) portfolios
users (1) <-> (*) financial_goals

portfolios.allocation JSON -> references assets (loosely coupled)

Foreign Keys:
- risk_profiles.user_id -> users.id
- portfolios.user_id -> users.id
- financial_goals.user_id -> users.id

No Foreign Key:
- portfolios.allocation -> assets (JSON reference, no FK constraint)

---

### 6.8 Simplified vs Original Design

| Aspect | Original Design | Simplified MVP | Change |
|--------|----------------|----------------|--------|
| Total Tables | 9 tables | 5 tables | -44% |
| Allocations | Separate table | JSON column | Simplified |
| Goal Progress | Separate table | Calculated fields | Removed table |
| Insights | Separate table | Generated on-demand | Removed table |
| Asset Prices | Separate table | Static field | Removed table |

Benefits:
- 44% fewer tables = simpler schema
- Fewer JOINs = better performance
- Easier to understand & maintain
- Still preserves learning value

Trade-offs:
- No historical tracking (acceptable untuk MVP)
- JSON less queryable (acceptable untuk small dataset)
- Can migrate to normalized later jika scale


---

## 7. ?? DATA FLOW UNTUK FITUR UTAMA

### 7.1 Data Flow: LOGIN

**User Journey**: User masuk dengan email & password

**Frontend (React)**:
1. User masuk di LoginPage.jsx
2. Input email & password
3. Click tombol "Login"
4. LoginForm call apiService.login(email, password)
5. Axios POST ke http://localhost:8080/api/auth/login
6. Request body: { "email": "user@email.com", "password": "password123" }
7. Menunggu response

**Backend (Spring Boot)**:
1. AuthController menerima POST /api/auth/login
2. JwtAuthenticationFilter tidak intercept (public endpoint)
3. UserService.login(email, password)
   - Query: SELECT * FROM users WHERE email = ?
   - Validate password dengan BCrypt
   - If valid:
     - JwtTokenProvider.generateToken(userId)
     - Return AuthResponse { token, user }
   - If invalid:
     - Throw UnauthorizedException

**Database (MySQL)**:
- Query users table WHERE email = email

**Response**:
`
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "email": "user@email.com",
    "fullName": "John Doe"
  }
}
`

**Frontend (React)** - Receive Response:
1. API call successful
2. Store token di localStorage: localStorage.setItem('token', token)
3. AuthContext.login(token, user)
   - setUser(user)
   - setToken(token)
   - setIsAuthenticated(true)
4. ProtectedRoute detects isAuthenticated = true
5. Navigate to /dashboard
6. All subsequent API calls include header:
   Authorization: Bearer {token}

**Key Components**:
- Frontend: LoginPage, LoginForm, AuthContext, apiService
- Backend: AuthController, UserService, JwtTokenProvider
- Database: users table

---

### 7.2 Data Flow: PORTFOLIO RECOMMENDATION

**User Journey**: User complete risk questionnaire ? get recommendation ? accept portfolio

**Step 1: Risk Assessment Questionnaire**

Frontend:
1. User navigates to /portfolio/risk-assessment
2. RiskAssessmentPage displays RiskQuestionnaireForm
3. Questions: investment timeline, risk tolerance, goal type
4. User answers semua pertanyaan
5. Click "Submit Assessment"

Backend:
1. POST /api/risk-profile
2. JwtAuthenticationFilter validates JWT
3. UserService.saveRiskProfile(userId, answers)
   - Calculate risk_score dari answers
   - Determine risk_level (LOW/MEDIUM/HIGH)
   - INSERT INTO risk_profiles
4. Response: { success: true }

Database:
- INSERT INTO risk_profiles (user_id, risk_level, assessment_data, ...)

---

**Step 2: Get Recommendation**

Frontend:
1. Navigate to /portfolio/recommend
2. RecommendationPage calls portfolioService.getRecommendation()

Backend:
1. GET /api/portfolio/recommend
2. PortfolioService.generateRecommendation(userId)
   - Query: SELECT * FROM risk_profiles WHERE user_id = ?
   - Apply Rules Engine (private method):
     IF risk_level = MEDIUM:
       allocation = { stocks: 50%, bonds: 40%, cash: 10% }
   - Query: SELECT * FROM assets WHERE asset_type IN (...)
   - Build response dengan allocation & assets

Database:
- SELECT from risk_profiles, assets

Response:
`
{
  "riskLevel": "MEDIUM",
  "allocation": [
    { "assetId": 1, "assetName": "Stocks", "percentage": 50 },
    { "assetId": 2, "assetName": "Bonds", "percentage": 40 },
    { "assetId": 3, "assetName": "Cash", "percentage": 10 }
  ],
  "expectedReturn": 7.5,
  "recommendation": "Balanced portfolio untuk risk level medium"
}
`

Frontend:
1. Display AllocationChart (Pie Chart) dengan allocation
2. Show expected return, recommendation text
3. User dapat melihat detail

---

**Step 3: Accept Portfolio**

Frontend:
1. User click tombol "Accept Recommendation"
2. portfolioService.savePortfolio(allocation)

Backend:
1. POST /api/portfolio
2. PortfolioService.savePortfolio(userId, portfolioDTO)
   - Prepare allocation JSON
   - INSERT INTO portfolios (user_id, allocation, risk_level, ...)

Database:
- INSERT INTO portfolios (allocation as JSON)

Frontend:
1. Navigate to /dashboard
2. Show success message
3. Portfolio now accessible di PortfolioDetailPage

---

### 7.3 Data Flow: GOAL TRACKING

**User Journey**: Create goal ? view progress ? see insights

**Step 1: Create Goal**

Frontend:
1. User navigate to /goals/create
2. CreateGoalPage displays GoalForm
3. Input: goal name, target amount, target date, category, current savings, monthly contribution
4. Click "Create Goal"

Backend:
1. POST /api/goals
2. JwtAuthenticationFilter validates JWT
3. GoalService.createGoal(userId, goalDTO)
   - Validate input
   - Calculate progress:
     - progress = (current_savings / target_amount) * 100
     - months_to_target = (target - current) / monthly_savings
     - projected_date = NOW() + months_to_target
     - status = determineStatus(projected_date, target_date)
   - INSERT INTO financial_goals (with calculated fields)

Database:
- INSERT INTO financial_goals

Response:
`
{
  "id": 456,
  "goalName": "House Down Payment",
  "targetAmount": 500000000,
  "currentProgress": 10,
  "status": "ON_TRACK"
}
`

---

**Step 2: View Goal Details & Progress**

Frontend:
1. User click goal dari GoalListPage
2. Navigate to /goals/{id}
3. GoalDetailPage calls goalService.getGoalById(id)

Backend:
1. GET /api/goals/{id}
2. GoalService.getGoalById(goalId)
   - Query: SELECT * FROM financial_goals WHERE id = ?
   - Re-calculate progress (in case data stale)
   - Generate insights (private method):
     - "Target dapat tercapai dalam 90 bulan"
     - "Continue contributing Rp 5M/month"
     - "You're on track to reach goal in 90 months"

Database:
- SELECT FROM financial_goals

Response:
`
{
  "goal": {
    "id": 456,
    "goalName": "House Down Payment",
    "targetAmount": 500000000,
    "targetDate": "2030-12-31",
    "currentSavings": 50000000,
    "monthlySavings": 5000000
  },
  "progress": {
    "percentage": 10,
    "status": "ON_TRACK",
    "monthsToTarget": 90,
    "projectedDate": "2028-06-30"
  },
  "insights": [
    "Target dapat tercapai dalam 90 bulan",
    "Continue contributing Rp 5,000,000/month",
    "You're on track!"
  ]
}
`

Frontend:
1. Display GoalDetailPage:
   - Goal info (name, target, dates)
   - ProgressBar component (10% filled)
   - Status badge ("ON_TRACK")
   - InsightsList component
   - Projected completion timeline

---

### 7.4 Data Flow: WHAT-IF SIMULATION

**User Journey**: Adjust income/expense scenarios ? see impact

**Frontend**:
1. User navigate to /simulation
2. SimulationPage loads current goal data
3. Display ScenarioInputs with sliders:
   - Income: -50% to +50%
   - Expenses: -50% to +50%
4. User adjust sliders
5. System updates preview real-time

Backend:
1. POST /api/simulation/goal-impact
2. Request:
`
{
  "goalId": 456,
  "currentIncome": 20000000,
  "simulatedIncome": 24000000,
  "currentExpenses": 12000000,
  "simulatedExpenses": 10800000
}
`

3. SimulationService.simulateGoalImpact(request)
   - Calculate current scenario:
     - monthly_savings = income - expenses = 8M
     - months_to_target = 450M / 8M = 56.25 = 56 months
     - completion_date = NOW() + 56 months
   - Calculate simulated scenario:
     - monthly_savings = 24M - 10.8M = 13.2M
     - months_to_target = 450M / 13.2M = 34 months
     - completion_date = NOW() + 34 months
   - Calculate impact:
     - time_saved = 56 - 34 = 22 months
     - savings_increase = 13.2M - 8M = 5.2M

Response:
`
{
  "currentScenario": {
    "monthlySavings": 8000000,
    "monthsToTarget": 56,
    "completionDate": "2030-10-22"
  },
  "simulatedScenario": {
    "monthlySavings": 13200000,
    "monthsToTarget": 34,
    "completionDate": "2028-08-22"
  },
  "impact": {
    "timeSaved": 22,
    "savingsIncrease": 5200000,
    "recommendation": "Achieve goal 1.8 years faster!"
  }
}
`

Frontend:
1. Display ComparisonView side-by-side:
   - Current vs Simulated
   - Show metrics: monthly savings, months to target, completion date
2. Display ImpactChart:
   - Timeline visualization
   - Highlight time saved
3. Show recommendation/insight


---

## 8. ?? ALASAN DESAIN YANG DIPILIH

### 8.1 Arsitektur 3-Tier Layered

**Keputusan**: Gunakan 3-tier architecture (Presentation ? Business Logic ? Data Access)

**Alasan**:
- ? **Separation of Concerns**: Setiap layer punya tanggung jawab jelas
- ? **Maintainability**: Perubahan di satu layer tidak affect layer lain
- ? **Testability**: Mudah test tiap layer secara independent
- ? **Learning Value**: Pattern standard di industry
- ? **Scalability**: Bisa scale layer tertentu sesuai needs

**Trade-offs**:
- ? Lebih banyak boilerplate code (DTO, mappers)
- ? Benefit: Clear boundaries lebih penting untuk learning

---

### 8.2 REST API (bukan GraphQL atau WebSocket)

**Keputusan**: REST API dengan JSON

**Alasan**:
- ? **Simplicity**: HTTP methods straightforward (GET/POST/PUT/DELETE)
- ? **Standard**: Industry standard, banyak resources
- ? **Caching**: HTTP caching sudah built-in
- ? **Tooling**: Postman, Swagger, browser dev tools
- ? **Learning Curve**: Lebih mudah dipahami
- ? **Stateless**: Cocok dengan JWT authentication

**Trade-offs**:
- ? Multiple roundtrips untuk complex queries
- ? Acceptable untuk MVP, optimize later

---

### 8.3 JWT Authentication (bukan Session-based)

**Keputusan**: JWT tokens untuk authentication

**Alasan**:
- ? **Stateless**: Server tidak perlu store session
- ? **Mobile-Ready**: JWT cocok untuk future mobile app
- ? **RESTful**: Align dengan REST principles
- ? **Decentralized**: Token contains user info, no DB lookup per request
- ? **Expiration Built-in**: Token expiry mechanism included

**Implementation**:
- Login ? Server generates JWT ? Client stores in localStorage
- Every request includes: Authorization: Bearer {token}
- Server validates token on each request

**Trade-offs**:
- ? Cannot revoke token before expiry
- ? Mitigasi: Short expiry (24 hours) + refresh token strategy

---

### 8.4 React Context API (bukan Redux Immediate)

**Keputusan**: Single AuthContext, local state untuk data lain

**Alasan**:
- ? **Sufficient for MVP**: Not too much global state
- ? **No Dependencies**: Built into React
- ? **Learning Path**: Understand fundamentals first
- ? **Lightweight**: Smaller bundle size
- ? **Easy Migration**: Bisa migrate ke Redux nanti

**State Structure**:
- AuthContext (global): user, token, isAuthenticated
- Portfolio & Goals: Local component state (useState)

**Migration Path**: Jika state complexity meningkat ? Redux Toolkit

---

### 8.5 Rules-Based Recommendation Engine (bukan ML)

**Keputusan**: Simple if-then rules untuk portfolio recommendation

**Alasan**:
- ? **Simplicity**: Easy to implement & understand
- ? **Transparency**: User tahu kenapa dapat recommendation
- ? **Maintainability**: Rules gampang di-update
- ? **No Training Data**: Tidak perlu dataset
- ? **Deterministic**: Same input = same output (easier testing)
- ? **Learning Focus**: Fokus ke logic, bukan ML complexity

**Rules Example**:
`
IF risk_level = MEDIUM THEN
  allocation = { stocks: 50%, bonds: 40%, cash: 10% }

IF timeHorizon < 3 years THEN
  increase conservatism by 20%
`

**Future Enhancement**: Level 2/3 bisa upgrade ke ML

---

### 8.6 Template-Based Insights (bukan NLP/AI)

**Keputusan**: Message templates dengan calculated parameters

**Alasan**:
- ? **Consistency**: Predictable message quality
- ? **Localization**: Easy to translate
- ? **Testing**: Easy to validate correctness
- ? **Performance**: No API calls ke AI services
- ? **Cost**: Zero external service costs

**Template Examples**:
- "Target dapat tercapai dalam {months} bulan"
- "Perlu menambah tabungan Rp {amount} per bulan"
- "Anda on track untuk mencapai goal ini"

---

### 8.7 JSON Column untuk Allocation (bukan Normalized Table)

**Keputusan**: Store portfolio allocation sebagai JSON di portfolios table

**Alasan**:
- ? **Simplicity**: No JOIN complexity untuk MVP
- ? **Performance**: Max 10-15 assets, JSON cukup fast
- ? **Flexibility**: Easy to modify structure
- ? **Query Support**: MySQL JSON functions powerful
- ? **Learning Value**: Exposure to JSON columns

**Trade-offs**:
- ? Less flexible untuk complex queries
- ? Acceptable: MVP tidak butuh complex asset analytics
- ? Migration Path: Bisa normalize nanti jika scale

---

### 8.8 Calculated Fields dalam Goals Table (bukan Separate Progress Table)

**Keputusan**: Store progress_percentage, status, projected_date dalam financial_goals

**Alasan**:
- ? **Performance**: No JOIN untuk common queries
- ? **Simplicity**: Single table = simpler queries
- ? **Real-time**: Recalculate on update (always fresh)
- ? **MVP Focus**: Historical tracking adalah Level 2 feature

**Calculation Logic**:
- Service layer recalculates saat update
- Store calculated values untuk read performance

**Trade-offs**:
- ? Denormalization (data redundancy)
- ? Acceptable: Trade-off untuk simplicity & speed

---

### 8.9 Static Asset Pricing (bukan Real-time)

**Keputusan**: Static current_price field di assets table

**Alasan**:
- ? **MVP Focus**: Bukan trading platform, fokus ke planning
- ? **Simplicity**: No external API dependencies
- ? **Reliability**: No API rate limits atau outages
- ? **Testing**: Reproducible scenarios
- ? **Learning Focus**: Master fundamentals dulu

**Update Strategy**:
- Manual update prices via admin (weekly/monthly)
- No historical tracking di MVP

**Trade-offs**:
- ? Portfolio value tidak real-time accurate
- ? Acceptable: Planning-focused, not investment tracking
- ? Level 2: Add real-time integration

---

### 8.10 On-Demand Insights Generation (bukan Persisted)

**Keputusan**: Generate insights saat request, tidak disimpan

**Alasan**:
- ? **Always Fresh**: Insights reflect latest data
- ? **Simplicity**: No insights table to maintain
- ? **Storage**: Reduce database size
- ? **Performance**: Calculation sangat ringan (<10ms)

**Generation Logic**:
- Template-based dengan parameters
- Calculated dalam GoalService
- Returned dalam API response

**Trade-offs**:
- ? Small computation overhead per request
- ? Acceptable: Lightweight calculation
- ? Can add caching later if needed

---

## 9. ?? RUANG LINGKUP LEVEL 1 (MVP)

### 9.1 Fitur yang TERMASUK Level 1

**Module 1: User Management**
- ? User registration (email, password, name)
- ? User login/logout (JWT authentication)
- ? Basic profile view/edit
- ? Risk profile assessment (questionnaire)

**Module 2: Portfolio Recommendation**
- ? Risk questionnaire (5-7 questions)
- ? Risk level calculation (LOW/MEDIUM/HIGH)
- ? Portfolio recommendation (rules-based)
- ? Asset allocation visualization (pie chart)
- ? Accept & save portfolio

**Module 3: Financial Goal Management**
- ? Create goal (target amount, date, category)
- ? View list of goals
- ? View goal details
- ? Update goal progress (current savings)
- ? Delete goal

**Module 4: Goal Progress Tracking**
- ? Progress percentage calculation
- ? Status indicator (ON_TRACK/AT_RISK/OFF_TRACK)
- ? Projected completion date
- ? Basic insights generation (3-5 insights per goal)

**Module 5: What-If Simulator**
- ? Adjust income (slider: -50% to +50%)
- ? Adjust expenses (slider: -50% to +50%)
- ? Calculate impact on goal timeline
- ? Comparison view (current vs simulated)
- ? Time saved calculation

**Module 6: Dashboard**
- ? Portfolio summary (allocation, expected return)
- ? Goals summary (active goals count, avg progress)
- ? Key metrics (total goals, on-track count)
- ? Recent insights (top 3-5)

---

### 9.2 Fitur yang TIDAK TERMASUK Level 1

**Dijadwalkan untuk Level 2 (Professional)**:
- ? Real-time market data integration
- ? Multiple portfolios per user
- ? Portfolio rebalancing recommendations
- ? Advanced risk metrics (Sharpe ratio, volatility)
- ? Recurring transactions tracking
- ? Income/expense management module
- ? Multi-scenario comparison
- ? Export reports (PDF/Excel)
- ? Email notifications
- ? Advanced analytics dashboard
- ? Mobile responsive optimization (beyond basic)
- ? Multi-currency support

**Dijadwalkan untuk Level 3 (Enterprise)**:
- ? Machine learning recommendations
- ? Social features (portfolio comparison)
- ? Admin dashboard
- ? User activity analytics
- ? API rate limiting
- ? Multi-language support
- ? Native mobile apps

---

### 9.3 Success Criteria Level 1

**Functionality**:
- ? User dapat register dan login
- ? User dapat complete risk assessment
- ? User dapat receive portfolio recommendation
- ? User dapat create minimum 1-3 financial goals
- ? User dapat view goal progress & insights
- ? User dapat run What-If simulation
- ? User dapat view dashboard summary

**Technical**:
- ? All REST APIs functional & documented
- ? JWT authentication working properly
- ? Database schema implemented (5 tables)
- ? Frontend responsive (desktop & tablet)
- ? Error handling implemented
- ? Basic validation on all forms

**Quality**:
- ? Zero critical bugs
- ? 70%+ unit test coverage (backend)
- ? Key flows tested (login, recommendation, goals)
- ? Performance: API response < 500ms

---

### 9.4 Timeline Estimasi Level 1

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 2: System Design | 2-3 hari | ARCHITECTURE.md, API_SPEC.md |
| Phase 3: Database Design | 2-3 hari | DATABASE_DESIGN.md, ERD, SQL scripts |
| Phase 4: Backend Foundation | 5-7 hari | Auth APIs, User Management |
| Phase 5: Frontend Foundation | 5-7 hari | Auth pages, Layout, Routing |
| Phase 6: Goal Module | 5-7 hari | Goal CRUD, Progress, Insights |
| Phase 7: Portfolio Module | 7-10 hari | Risk assessment, Recommendation |
| Phase 8: Dashboard Module | 5-7 hari | Dashboard page, Aggregation |
| Phase 9: Simulation Module | 5-7 hari | What-If calculator |
| Phase 10: Testing & Polish | 5-7 hari | Bug fixes, Testing, Documentation |

**Total**: 12 minggu (3 bulan)

---

## 10. ?? REFERENSI & DOKUMENTASI TERKAIT

### Dokumen Proyek:
- **PROJECT_PLAN.md** - Master project blueprint
- **DECISIONS.md** - Architecture decision records
- **CURRENT_PHASE.md** - Phase tracking
- **NEXT_STEPS.md** - Action items

### Dokumen yang Akan Dibuat:
- **API_SPECIFICATION.md** - REST API documentation (Phase 2.2)
- **DATABASE_DESIGN.md** - Detailed schema & ERD (Phase 3)
- **DEVELOPMENT_GUIDE.md** - Setup instructions (Phase 4)
- **TESTING_GUIDE.md** - Testing strategy (Phase 10)

---

**Document Version**: 1.0  
**Last Updated**: 22 Juni 2026  
**Phase**: Phase 2.1 - High Level Architecture Design  
**Status**: ? Completed  
**Next Phase**: Phase 2.2 - API Specification Design

---

**END OF DOCUMENT**

