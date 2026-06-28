# Wealth Management System - Project Plan

## 📋 Ringkasan Proyek

**Wealth Management System** adalah aplikasi web untuk manajemen keuangan pribadi yang membantu pengguna mengelola portofolio investasi dan melacak pencapaian tujuan keuangan. Proyek ini dikembangkan sebagai proyek pembelajaran untuk memahami pengembangan aplikasi full-stack modern menggunakan ReactJS, Spring Boot, dan MySQL.

### informasi Proyek

- **Nama Proyek**: Wealth Management System
- **Tipe**: Learning Project / Educational Application
- **Status**: Phase 7 - Backend Integration (In Progress)
- **Tanggal Mulai**: 21 Juni 2026
- **Target Completion MVP**: TBD

**Current Progress**:
- ✅ Phase 1 - Requirements Analysis (Complete)
- ✅ Phase 2 - System Design (Complete)
- ✅ Phase 3 - Database Design (Complete)
- ✅ Phase 4 - Backend Development (Complete)
- ✅ Phase 5 - Documentation & Architecture Modeling (Complete)
- ✅ Phase 6 - React Frontend Development (Complete)

Current Phase 7 Progress:
- ✅ Phase 7.1 - FinancialGoalService & DTOs (Complete)
- ✅ Phase 7.2 - Portfolio Backend Integration (Complete)
- ✅ Phase 7.2.1 - Portfolio Backend Integration Cleanup (Complete)
- ✅ Phase 7.3.1 - Financial Goals Backend Integration (Read Only) (Complete)
- ✅ Phase 7.3.1.1 - Financial Goals Backend Integration Polishing (Complete)
- ✅ Phase 7.4 - Extracted Data Fetching to Custom Hooks (Complete)
- ✅ Phase 7.4.1 - Custom Hook Cleanup (Complete)
- ✅ Phase 7.5.1 - Reusable Portfolio Modal Foundation (Complete)
- ✅ Phase 7.6 - Connect Create Portfolio API (Complete)

Phase 6 Sub-phases Completed:
- ✅ Phase 6.1 - React Frontend Foundation
- ✅ Phase 6.2 - API Client Layer
- ✅ Phase 6.3 - Authentication Context
- ✅ Phase 6.4 - Authentication Service
- ⏳ Phase 6.5 - Login UI Integration

---

## 🎯 Tujuan Pembelajaran

Proyek ini dirancang untuk mencapai tujuan pembelajaran berikut:

### 1. Frontend Development (ReactJS)
- Memahami component-based architecture
- Implementasi state management
- Integrasi dengan REST API
- Data visualization dengan charts
- Form handling dan validation
- Responsive UI design

### 2. Backend Development (Spring Boot)
- RESTful API design dan implementation
- Business logic layer development
- Security implementation (JWT authentication)
- Database interaction dengan JPA/Hibernate
- Service-oriented architecture
- Error handling dan validation

### 3. Database Design (MySQL)
- Relational database schema design
- Data normalization
- Query optimization
- Transaction management
- Data migration strategy

### 4. Full-Stack Integration
- Frontend-backend communication
- API contract management
- Authentication flow
- State synchronization
- Error handling across layers

### 5. Software Development Best Practices
- Clean code principles
- Version control dengan Git
- Project structure organization
- Documentation practices
- Testing strategies
- AI-assisted development dengan OpenCode

---

## 🎯 Scope MVP (Minimum Viable Product)

### Fitur yang TERMASUK dalam MVP:

#### 1. User Management (Basic)
- User registration
- User login/logout
- Basic profile management
- Risk profile assessment (simple questionnaire)

#### 2. Portfolio Recommendation
- User input: tujuan keuangan (amount, timeline)
- User input: tingkat toleransi risiko (Low/Medium/High)
- Sistem memberikan rekomendasi portofolio dari 3-5 template pre-defined
- Rekomendasi berdasarkan rules engine sederhana
- Display alokasi aset (e.g., 60% stocks, 40% bonds)

#### 3. Financial Goal Management
- Create financial goal (target amount, target date, category)
- View list of goals
- Update goal progress
- Delete goal

#### 4. Goal Progress Tracking
- Visual progress indicator (progress bar/percentage)
- Status indicator (on track / at risk / off track)
- Basic insights generation:
  - "Target dapat tercapai dalam X bulan"
  - "Tabungan Anda terlalu kecil untuk mencapai target"
  - "Perlu menambah tabungan Rp X per bulan"

#### 5. What-If Simulator
- Simulate perubahan income (increase/decrease)
- Simulate perubahan expenses (increase/decrease)
- Calculate impact terhadap goal achievement timeline
- Display comparison: current vs simulated scenario

#### 6. Dashboard
- Portfolio overview (allocation, value)
- Goals summary (active goals, progress)
- Key metrics display
- Portfolio performance chart (sample data)
- Recent activity/insights

### Success Criteria MVP:
- ✅ User dapat register dan login
- ✅ User dapat complete risk profile assessment
- ✅ User dapat receive portfolio recommendation
- ✅ User dapat create dan track financial goals (minimum 1-3 goals)
- ✅ User dapat view dashboard dengan portfolio dan goals
- ✅ User dapat run What-If simulation
- ✅ System dapat generate basic insights

---

## ❌ Fitur yang TIDAK Termasuk MVP

Fitur-fitur berikut akan dikembangkan di fase post-MVP:

### Phase 2+ (Future Enhancements):
- Real-time market data integration
- Multiple portfolios per user
- Portfolio rebalancing recommendations
- Advanced risk metrics (Sharpe ratio, volatility, beta)
- Recurring transactions tracking
- Income/expense management
- Multi-scenario comparison
- Export reports (PDF/Excel)
- Email notifications
- Advanced analytics dashboard
- Mobile responsive optimization
- Multi-currency support
- Social features (portfolio comparison, sharing)
- Machine learning recommendations
- Admin dashboard
- User activity analytics
- API rate limiting
- Advanced security features (2FA, session management)

---

## 🗺️ Roadmap Pengembangan

### PHASE 0: Environment Setup
**Duration**: 1-2 hari  
**Objective**: Setup development environment dan project structure

**Tasks**:
- [x] Install Java JDK 11+
- [x] Install Node.js dan npm
- [x] Install MySQL 8.0+
- [x] Install IDE (IntelliJ IDEA / VS Code)
- [x] Install Postman untuk API testing
- [ ] Setup Git repository
- [ ] Create project directories
- [ ] Initialize Spring Boot project dengan Maven
- [ ] Initialize React project dengan Create React App
- [ ] Verify all tools installation

**Deliverables**:
- Configured development environment
- Initialized project repositories
- Basic README.md

---

### PHASE 1: Requirements Analysis
**Duration**: 1-2 hari  
**Objective**: Understand dan document project requirements

**Tasks**:
- [x] Analyze functional requirements
- [x] Analyze non-functional requirements
- [x] Identify core modules
- [x] Define MVP scope
- [x] Create project plan document
- [ ] Define user stories
- [ ] Create feature breakdown

**Deliverables**:
- PROJECT_PLAN.md (this document)
- User stories document
- Feature requirements list

---

### PHASE 2: System Design
**Duration**: 2-3 hari  
**Objective**: Design system architecture dan technical specifications

**Tasks**:
- [ ] Design system architecture (high-level)
- [ ] Define API contracts (REST endpoints)
- [ ] Design data flow diagrams
- [ ] Define component hierarchy (React)
- [ ] Design service layer structure (Spring Boot)
- [ ] Define authentication flow
- [ ] Create mockups/wireframes (optional)
- [ ] Design recommendation rules engine
- [ ] Design insights generation logic

**Deliverables**:
- ARCHITECTURE.md
- API_SPECIFICATION.md
- Component design documents
- Wireframes (optional)

---

### PHASE 3: Database Design
**Duration**: 2-3 hari  
**Objective**: Design database schema dan relationships

**Tasks**:
- [ ] Design Entity-Relationship Diagram (ERD)
- [ ] Define database tables dan columns
- [ ] Define relationships dan foreign keys
- [ ] Design indexes untuk performance
- [ ] Create sample data plan
- [ ] Write database migration scripts
- [ ] Document database schema

**Deliverables**:
- DATABASE_DESIGN.md
- ERD diagram
- SQL migration scripts
- Sample data scripts

---

### PHASE 4: Spring Boot Backend Foundation
**Duration**: 5-7 hari  
**Objective**: Build backend core infrastructure

**Tasks**:
- [ ] Setup Spring Boot project structure
- [ ] Configure MySQL connection
- [ ] Setup JPA/Hibernate entities
- [ ] Implement JWT authentication
- [ ] Create User Management APIs
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/users/profile
  - PUT /api/users/profile
- [ ] Create exception handling
- [ ] Setup request validation
- [ ] Configure CORS
- [ ] Test APIs dengan Postman
- [ ] Write unit tests

**Deliverables**:
- Working backend authentication system
- User management APIs
- API documentation
- Unit tests

---

### PHASE 5: Documentation & Architecture Modeling
**Duration**: 3-5 hari  
**Objective**: Document implemented backend flows with sequence diagrams

**Status**: ✅ **COMPLETE**

**Completed Deliverables**:
- Login Sequence Diagram
- Registration Sequence Diagram
- Portfolio CRUD Sequence Diagram
- Financial Goal CRUD Sequence Diagram

**Deferred Deliverable**:
- Architecture Diagram (Level 3) postponed until React Frontend Foundation is completed

---

### PHASE 6: React Frontend Development
**Duration**: 5-7 hari
**Objective**: Build frontend application and integrate it with Spring Boot backend

**Status**: ⏳ IN PROGRESS

## Completed

### Phase 6.1 - React Frontend Foundation
- ✅ React + TypeScript + Vite
- ✅ Tailwind CSS
- ✅ React Router DOM
- ✅ React Hook Form
- ✅ React Toastify
- ✅ Folder structure

### Phase 6.2 - API Client Layer
- ✅ Axios Client
- ✅ Base URL configuration
- ✅ Request Interceptor
- ✅ Response Interceptor
- ✅ Automatic JWT header injection

### Phase 6.3 - Authentication Context
- ✅ AuthContext
- ✅ AuthProvider
- ✅ useAuth()
- ✅ Token persistence
- ✅ Login / Logout API
- ✅ localStorage initialization

### Phase 6.4 - Authentication Service
- ✅ AuthService
- ✅ LoginRequest DTO
- ✅ LoginResponse DTO
- ✅ Backend authentication integration
- ✅ DTO synchronization with Spring Boot

### Phase 6.5 - Login UI Integration
- ✅ Final LoginPage UI
- ✅ React Hook Form
- ✅ AuthContext.login()
- ✅ Backend validation errors
- ✅ Loading state
- ✅ UI preservation

### Phase 6.6 - Dashboard Layout
- ✅ DashboardPage UI
- ✅ Responsive layout
- ✅ TopBar
- ✅ Summary cards
- ✅ Portfolio chart
- ✅ Recent activity
- ✅ Mobile sidebar
- ✅ Logout integration
- ✅ Notification badge
- ✅ Quick Actions

### Phase 6.7 - Dashboard Component Refactor
- ✅ DashboardPage refactored into reusable components
- ✅ Shared types extracted
- ✅ Shared data extracted
- ✅ Shared utils extracted

### Phase 6.9 - Financial Goals UI (Dummy)
- ✅ Goal list display with responsive grid
- ✅ Goal Card component with progress bar
- ✅ Goal Detail panel with target, saved, remaining, progress, date, risk, category
- ✅ Search by goal name and category
- ✅ Remaining amount display
- ✅ Improved hover animation on goal cards

### Phase 6.10 - Protected Routes
- ✅ ProtectedRoute component
- ✅ AppRoutes updated

### Phase 6 Completed

Phase 6 Frontend Development is fully completed. All UI components (Dashboard, Portfolio, Financial Goals) have been built, refactored for modularity, audited, and standardized.

---

### PHASE 7: Backend Integration (In Progress)

#### Phase 7.1 - FinancialGoalService & DTOs
- ✅ Created FinancialGoalService class (mirrors PortfolioService structure)
- ✅ Created FinancialGoalResponse DTO
- ✅ Created CreateFinancialGoalRequest DTO
- ✅ Created UpdateFinancialGoalRequest DTO
- ✅ Endpoints: GET /goals, GET /goals/{id}, POST /goals, PUT /goals/{id}, DELETE /goals/{id}
- ⏳ Service not yet integrated with UI

#### Phase 7.2 - Portfolio Backend Integration
- ✅ Integrated `PortfolioPage` with backend via `PortfolioService.getAllPortfolios()`
- ✅ Created `frontend/src/utils/mappers.ts` for DTO to UI model mapping
- ✅ Implemented loading and error states
- ✅ Fallback to dummy data for assets
- ✅ Build and TypeScript validation passed

#### Phase 7.4 - Extracted Data Fetching to Custom Hooks
- ✅ Created `usePortfolio.ts` and `useFinancialGoals.ts` custom hooks.
- ✅ Refactored `PortfolioPage.tsx` and `FinancialGoalsPage.tsx` to use these hooks, significantly reducing their line count and complexity.
- ✅ Data fetching, state management, and API logic are now encapsulated within the hooks.

#### Phase 7.5.1 - Reusable Portfolio Modal Foundation
- ✅ Created reusable `PortfolioModal` component at `frontend/src/components/portfolio/modal/PortfolioModal.tsx`
- ✅ Modal supports `create` and `edit` modes with dynamic title and submit button
- ✅ Fields: Portfolio Name (input), Portfolio Type (select), Risk Level (select)
- ✅ `PortfolioToolbar` now accepts `onNewPortfolio` callback
- ✅ `PortfolioPage` controls modal open/close state
- ✅ **State hoisting refactor**: Form state (`portfolioName`, `portfolioType`, `riskLevel`) moved from `PortfolioModal` to `PortfolioPage`
- ✅ `PortfolioModal` is now a **controlled component** — pure presentation, no internal state
- ✅ `onSubmit` callback added to `PortfolioModal`, ready for API integration
- ✅ No backend integration yet — `handleSubmitPortfolio` is a placeholder
- ✅ Build and TypeScript validation passed

#### Phase 7.6 - Connect Create Portfolio API
- ✅ `createPortfolio` function added to `usePortfolio` hook
- ✅ Calls `PortfolioService.createPortfolio()`, then `refreshPortfolios()` on success
- ✅ Error handling via `toast.error()` with re-throw
- ✅ `PortfolioPage.handleSubmitPortfolio` now calls `createPortfolio()` with authenticated `userId` and form state
- ✅ On success: modal closes, form resets, `toast.success()` shown
- ✅ Dummy data fallback still active for read operations
- ✅ `RiskLevel` type unified to uppercase (`'LOW' | 'MEDIUM' | 'HIGH'`) across the codebase
- ✅ Build and TypeScript validation passed

#### Phase 7.7 - Portfolio Edit Preparation + RiskLevel Cleanup
- ✅ `RiskLevel` type unified to `src/types/common.ts`; `src/types/portfolio/RiskLevel.ts` removed.
- ✅ `mappers.tsx` simplified; removed unnecessary `RiskLevel` conversions.
- ✅ `PortfolioPage.tsx` filter logic updated for direct `RiskLevel` comparison (removed `.toLowerCase()`).
- ✅ `PortfolioDetail` component enhanced with an "Edit" button that triggers `handleEditPortfolio` via props.
- ✅ `PortfolioPage` gained `handleEditPortfolio` function: populates modal fields with `selectedPortfolio` data and opens modal in "edit" mode.
- ✅ `PortfolioModal` now correctly displays "Edit Portfolio" title and "Save Changes" button when `mode="edit"`.
- ✅ Build and TypeScript validation passed.

- ✅ Build and TypeScript validation passed.

#### Phase 7.8 - Complete Portfolio Update Flow
- ✅ `PortfolioPage.handleSubmitPortfolio` refactored: now acts as a router, dispatching to `handleCreatePortfolio` or `handleUpdatePortfolio`.
- ✅ `handleCreatePortfolio` now uses `isSubmitting` state to disable button and show loading text (`"Creating..."`).
- ✅ `usePortfolio` hook now includes `updatePortfolio` function: calls `PortfolioService.updatePortfolio()`, refreshes portfolios, and handles error toasts.
- ✅ `handleUpdatePortfolio` implemented in `PortfolioPage`: constructs `UpdatePortfolioRequest`, calls `usePortfolio().updatePortfolio()`, shows success toast, closes modal, and resets form. Also uses `isSubmitting` state (`"Saving..."`).
- ✅ `PortfolioModal` type improved to use `RiskLevel | ''` for `riskLevel` and `setRiskLevel` props, removing unnecessary casting.
- ✅ `PortfolioModal` button disabled and text updated to "Creating..."/"Saving..." based on `isSubmitting` state.
- ✅ Helper function `resetPortfolioForm()` added to `PortfolioPage` for clearing form state.
- ✅ Build and TypeScript validation passed.

### PHASE 8: Financial Goal Module
**Duration**: 5-7 hari  
**Objective**: Implement complete goal management feature

**Backend Tasks**:
- [ ] Create Goal entity dan repository
- [ ] Implement Goal Management APIs
  - POST /api/goals (create)
  - GET /api/goals (list)
  - GET /api/goals/{id} (detail)
  - PUT /api/goals/{id} (update)
  - DELETE /api/goals/{id} (delete)
- [ ] Implement goal progress calculation logic
- [ ] Implement insights generation engine
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] Create Goal List page
- [ ] Create Goal Form (Create/Edit)
- [ ] Create Goal Detail view
- [ ] Implement goal progress visualization
- [ ] Display insights
- [ ] Integrate with backend APIs
- [ ] Test CRUD operations

**Deliverables**:
- Working goal management feature
- Progress tracking functionality
- Basic insights generation

---

### PHASE 8: Investment Portfolio Module
**Duration**: 7-10 hari  
**Objective**: Implement portfolio recommendation system

**Backend Tasks**:
- [ ] Create Portfolio entity dan repository
- [ ] Create Asset entity (stocks, bonds, etc.)
- [ ] Implement Risk Profile APIs
  - POST /api/risk-profile (save assessment)
  - GET /api/risk-profile (get current)
- [ ] Implement recommendation rules engine
- [ ] Create Portfolio Recommendation APIs
  - POST /api/portfolio/recommend (get recommendation)
  - POST /api/portfolio/save (save portfolio)
  - GET /api/portfolio (get user portfolio)
- [ ] Create sample market data
- [ ] Implement portfolio value calculation
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] Create Risk Profile Questionnaire
- [ ] Create Portfolio Recommendation page
- [ ] Display portfolio allocation (pie chart)
- [ ] Create Portfolio Detail view
- [ ] Show portfolio composition
- [ ] Integrate with backend APIs
- [ ] Test recommendation flow

**Deliverables**:
- Working risk assessment
- Portfolio recommendation engine
- Portfolio visualization

---

### PHASE 9: Dashboard Module
**Duration**: 5-7 hari  
**Objective**: Create main dashboard dengan overview

**Backend Tasks**:
- [ ] Create Dashboard API
  - GET /api/dashboard/summary (portfolio + goals summary)
  - GET /api/dashboard/portfolio-performance (chart data)
- [ ] Aggregate data dari goals dan portfolio
- [ ] Generate key metrics
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] Create Dashboard layout
- [ ] Implement Portfolio Overview section
- [ ] Implement Goals Summary section
- [ ] Create portfolio performance chart
- [ ] Display key metrics
- [ ] Create recent insights section
- [ ] Integrate with backend APIs
- [ ] Make dashboard responsive

**Deliverables**:
- Complete dashboard page
- Data visualization charts
- Key metrics display

---

### PHASE 10: What-If Simulator
**Duration**: 5-7 hari  
**Objective**: Implement financial scenario simulation

**Backend Tasks**:
- [ ] Create Simulation API
  - POST /api/simulation/goal-impact (calculate impact)
- [ ] Implement simulation calculation logic
  - Income change impact
  - Expense change impact
  - Combined scenarios
- [ ] Calculate new timeline projections
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] Create Simulation page
- [ ] Create input controls (sliders/inputs)
- [ ] Display current scenario
- [ ] Display simulated scenario
- [ ] Show comparison view
- [ ] Create visualization (before/after charts)
- [ ] Integrate with backend API
- [ ] Test various scenarios

**Deliverables**:
- Working What-If simulator
- Scenario comparison functionality
- Impact visualization

---

### PHASE 11: Testing & Polish
**Duration**: 5-7 hari  
**Objective**: Test, fix bugs, dan polish application

**Tasks**:
- [ ] End-to-end testing (manual)
- [ ] Write integration tests (backend)
- [ ] Write component tests (frontend)
- [ ] Fix bugs dan issues
- [ ] Performance optimization
- [ ] UI/UX improvements
- [ ] Code refactoring
- [ ] Documentation updates
- [ ] Security review
- [ ] Prepare deployment configuration
- [ ] Create user guide (optional)

**Deliverables**:
- Tested dan stable MVP
- Bug-free application
- Complete documentation
- Deployment-ready code

---

## ??? Tech Stack

### Frontend
- **Framework**: React 18.x
- **Language**: JavaScript (ES6+) / TypeScript (optional)
- **Routing**: React Router v6
- **State Management**: Context API / Redux Toolkit
- **HTTP Client**: Axios
- **UI Components**: Custom components / Material-UI / Bootstrap (TBD)
- **Charts**: Chart.js / Recharts
- **Form Handling**: React Hook Form (optional)
- **Styling**: CSS Modules / Styled Components / Tailwind (TBD)

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 11+
- **Build Tool**: Maven
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA + Hibernate
- **Validation**: Bean Validation (JSR-380)
- **Documentation**: Swagger / SpringDoc OpenAPI (optional)

### Database
- **Database**: MySQL 8.0+
- **Migration**: Flyway / Liquibase (optional)

### Development Tools
- **IDE**: IntelliJ IDEA / VS Code
- **API Testing**: Postman
- **Version Control**: Git + GitHub
- **AI Assistant**: OpenCode

### Testing
- **Backend Testing**: JUnit 5, Mockito, Spring Boot Test
- **Frontend Testing**: Jest, React Testing Library

---

## ??? Struktur Modul Tingkat Tinggi

### Backend Module Structure (Spring Boot)

```
wealth-management-backend/
+-- src/main/java/com/wealthmanagement/
�   +-- config/                    # Configuration classes
�   �   +-- SecurityConfig.java
�   �   +-- CorsConfig.java
�   �   +-- JwtConfig.java
�   �
�   +-- controller/                # REST Controllers
�   �   +-- AuthController.java
�   �   +-- UserController.java
�   �   +-- GoalController.java
�   �   +-- PortfolioController.java
�   �   +-- DashboardController.java
�   �   +-- SimulationController.java
�   �
�   +-- service/                   # Business Logic Layer
�   �   +-- UserService.java
�   �   +-- GoalService.java
�   �   +-- PortfolioService.java
�   �   +-- RecommendationService.java
�   �   +-- InsightsService.java
�   �   +-- SimulationService.java
�   �   +-- DashboardService.java
�   �
�   +-- repository/                # Data Access Layer
�   �   +-- UserRepository.java
�   �   +-- GoalRepository.java
�   �   +-- PortfolioRepository.java
�   �   +-- AssetRepository.java
�   �   +-- RiskProfileRepository.java
�   �
�   +-- model/                     # Domain Models
�   �   +-- User.java
�   �   +-- Goal.java
�   �   +-- Portfolio.java
�   �   +-- Asset.java
�   �   +-- RiskProfile.java
�   �
�   +-- dto/                       # Data Transfer Objects
�   �   +-- request/
�   �   +-- response/
�   �
�   +-- security/                  # Security Components
�   �   +-- JwtTokenProvider.java
�   �   +-- JwtAuthenticationFilter.java
�   �   +-- UserDetailsServiceImpl.java
�   �
�   +-- exception/                 # Exception Handling
�   �   +-- GlobalExceptionHandler.java
�   �   +-- CustomExceptions.java
�   �
�   +-- util/                      # Utility Classes
�       +-- DateUtil.java
�       +-- CalculationUtil.java
�
+-- src/main/resources/
�   +-- application.properties
�   +-- application-dev.properties
�   +-- application-prod.properties
�
+-- src/test/java/
    +-- (unit tests)
```

### Frontend Module Structure (React)

```
wealth-management-frontend/
+-- public/
�   +-- index.html
�
+-- src/
�   +-- components/               # Reusable Components
�   �   +-- common/
�   �   �   +-- Button.jsx
�   �   �   +-- Input.jsx
�   �   �   +-- Card.jsx
�   �   �   +-- Modal.jsx
�   �   �
�   �   +-- layout/
�   �   �   +-- Header.jsx
�   �   �   +-- Sidebar.jsx
�   �   �   +-- Footer.jsx
�   �   �   +-- Layout.jsx
�   �   �
�   �   +-- charts/
�   �   �   +-- PieChart.jsx
�   �   �   +-- LineChart.jsx
�   �   �   +-- ProgressBar.jsx
�   �   �
�   �   +-- forms/
�   �       +-- GoalForm.jsx
�   �       +-- RiskProfileForm.jsx
�   �
�   +-- pages/                    # Page Components
�   �   +-- auth/
�   �   �   +-- LoginPage.jsx
�   �   �   +-- RegisterPage.jsx
�   �   �
�   �   +-- dashboard/
�   �   �   +-- DashboardPage.jsx
�   �   �
�   �   +-- goals/
�   �   �   +-- GoalListPage.jsx
�   �   �   +-- GoalDetailPage.jsx
�   �   �   +-- CreateGoalPage.jsx
�   �   �
�   �   +-- portfolio/
�   �   �   +-- PortfolioPage.jsx
�   �   �   +-- RecommendationPage.jsx
�   �   �
�   �   +-- simulation/
�   �       +-- SimulationPage.jsx
�   �
�   +-- services/                 # API Services
�   �   +-- api.js
�   �   +-- authService.js
�   �   +-- goalService.js
�   �   +-- portfolioService.js
�   �   +-- simulationService.js
�   �
�   +-- context/                  # State Management
�   �   +-- AuthContext.jsx
�   �   +-- PortfolioContext.jsx
�   �   +-- GoalContext.jsx
�   �
�   +-- hooks/                    # Custom Hooks
�   �   +-- useAuth.js
�   �   +-- useApi.js
�   �
�   +-- utils/                    # Utility Functions
�   �   +-- formatters.js
�   �   +-- validators.js
�   �   +-- constants.js
�   �
�   +-- routes/                   # Routing
�   �   +-- AppRoutes.jsx
�   �   +-- ProtectedRoute.jsx
�   �
�   +-- styles/                   # Global Styles
�   �   +-- global.css
�   �
�   +-- App.jsx
�   +-- index.js
�
+-- package.json
```

---

## ?? Risiko Proyek

### Risiko Teknis

| Risiko | Probabilitas | Dampak | Mitigasi |
|--------|--------------|--------|----------|
| Kompleksitas What-If simulation logic | Medium | Medium | Start dengan simple calculation, iterate gradually |
| Performance issues dengan large datasets | Low | Medium | Implement pagination, indexing, lazy loading |
| JWT token management dan security | Medium | High | Follow Spring Security best practices, use proven libraries |
| React state management complexity | Medium | Medium | Start dengan Context API, migrate ke Redux jika perlu |
| Cross-browser compatibility issues | Low | Low | Test di major browsers, use modern React practices |
| Database schema changes during development | High | Medium | Use migration tools (Flyway), maintain version control |

### Risiko Non-Teknis

| Risiko | Probabilitas | Dampak | Mitigasi |
|--------|--------------|--------|----------|
| Scope creep (feature additions) | High | High | Stick to MVP scope, maintain feature backlog |
| Timeline delays | Medium | Medium | Set realistic deadlines, track progress regularly |
| Learning curve untuk new technologies | High | Medium | Allocate learning time, use documentation extensively |
| Lack of testing leading to bugs | Medium | High | Write tests incrementally, don't skip testing phase |
| Poor code quality | Medium | Medium | Follow coding standards, regular code reviews |

### Dependencies & Assumptions

**Assumptions**:
- Development time: 2-3 bulan untuk MVP (part-time learning)
- Single developer project
- No production deployment required initially
- Sample/dummy data acceptable untuk MVP
- Basic UI/UX acceptable (not production-grade design)

**External Dependencies**:
- MySQL database availability
- Java JDK 11+ installed
- Node.js dan npm installed
- Stable internet untuk library downloads

---

## ?? Progress Tracking

### Overall Progress: Phase 6 React Frontend Development Completed

| Phase | Status | Completion | Notes |
|-------|--------|------------|-------|
| Phase 0: Environment Setup | ✅ Complete | 100% | Tools installed, project structure ready |
| Phase 1: Requirements Analysis | ✅ Complete | 100% | Requirements documented |
| Phase 2: System Design | ✅ Complete | 100% | Architecture designed |
| Phase 3: Database Design | ✅ Complete | 100% | Schema implemented and validated |
| Phase 4: Backend Development | ✅ Complete | 100% | Spring Boot backend fully operational |
| Phase 5: Documentation & Architecture Modeling | ✅ Complete | 100% | Sequence diagrams completed; architecture diagram postponed |
| Phase 6: React Frontend Foundation | ✅ Complete | 100% | Authentication, Dashboard, Portfolio, Financial Goals UI all complete |
| Phase 7: Backend Integration | ⏳ In Progress | 0% | Phase 7.1 - FinancialGoalService & DTOs Completed |
| Phase 8: Dashboard Module (Backend Integration) | ⏳ Pending | 0% | - |
| Phase 9: What-If Simulator | ⏳ Pending | 0% | - |
| Phase 10: Testing & Polish | ⏳ Pending | 0% | - |

### Current Status

- **Current Phase**: Phase 7 - Backend Integration
- **Current Task**: Phase 7.5.1 Completed (Reusable Portfolio Modal Foundation)
- **Backend Status**: Complete
- **Frontend Status**:
  - Authentication completed
  - Dashboard layout completed
  - Dashboard component refactor completed
  - Protected routes completed
  - Portfolio UI completed
  - Financial Goals UI completed
  - Frontend utility layer has been cleaned up by removing unnecessary abstractions and keeping only shared utilities.
  - Portfolio service integrated with UI
  - Reusable Portfolio Modal foundation created
- **Blockers**: None

---

## ?? Dokumentasi Terkait

Dokumen-dokumen yang akan dibuat selama proyek:

1. **PROJECT_PLAN.md** (this document) - Master project plan
2. **ARCHITECTURE.md** - System architecture design
3. **API_SPECIFICATION.md** - REST API documentation
4. **DATABASE_DESIGN.md** - Database schema dan ERD
5. **DEVELOPMENT_GUIDE.md** - Setup dan development instructions
6. **USER_STORIES.md** - Detailed user stories
7. **TESTING_GUIDE.md** - Testing strategy dan test cases
8. **DEPLOYMENT_GUIDE.md** - Deployment instructions (future)

---

## ?? Notes

### Development Principles
- **Keep It Simple**: Focus on MVP scope, avoid over-engineering
- **Incremental Development**: Build features incrementally, test frequently
- **Documentation First**: Document before coding complex features
- **Security First**: Never compromise on security practices
- **Learning Focused**: Prioritize understanding over speed
- **Code Quality**: Write clean, maintainable code

### Next Steps

Current:

1. ✅ Phase 6.1 - React Foundation
2. ✅ Phase 6.2 - API Client Layer
3. ✅ Phase 6.3 - Authentication Context
4. ✅ Phase 6.4 - Authentication Service
5. ✅ Phase 6.5 - Login UI Integration
6. ✅ Phase 6.6 - Dashboard Layout
7. ✅ Phase 6.7 - Dashboard Component Refactor
8. ✅ Phase 6.10 - Protected Routes

Upcoming:

9. Backend Integration

---

**Document Version**: 1.2
**Last Updated**: 27 Juni 2026
**Author**: System Architect
**Status**: ⏳ Phase 6 React Frontend Development (Authentication Module)
