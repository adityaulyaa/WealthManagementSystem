# Wealth Management System - Project Plan

## 📋 Ringkasan Proyek

**Wealth Management System** adalah aplikasi web untuk manajemen keuangan pribadi yang membantu pengguna mengelola portofolio investasi dan melacak pencapaian tujuan keuangan. Proyek ini dikembangkan sebagai proyek pembelajaran untuk memahami pengembangan aplikasi full-stack modern menggunakan ReactJS, Spring Boot, dan MySQL.

### informasi Proyek

- **Nama Proyek**: Wealth Management System
- **Tipe**: Learning Project / Educational Application
- **Status**: ⏳ Phase 8 - Financial Goal Tracker (Starting Now)
- **Tanggal Mulai**: 21 Juni 2026
- **Target Completion MVP**: Mid-July 2026 (3-4 weeks remaining)

**Completed Phases**:
- ✅ Phase 1 - Requirements Analysis (Complete)
- ✅ Phase 2 - System Design (Complete)
- ✅ Phase 3 - Database Design (Complete)
- ✅ Phase 4 - Backend Development (Complete)
- ✅ Phase 5 - Documentation & Architecture Modeling (Complete)
- ✅ Phase 6 - React Frontend Development (Complete)
- ✅ Phase 7 - Backend Integration & Stabilization (Complete)

**Phase 7 Summary** (All Complete):
- ✅ Phase 7.1-7.14 - Portfolio CRUD fully integrated, stabilized, and refactored
- ✅ Reusable hooks created: `usePortfolio`, `usePortfolioCrud`, `useAsyncAction`, `useDirtyForm`, `useConfirmation`
- ✅ Reusable components: `ConfirmationModal`, `LoadingState`, `EmptyState`
- ✅ Validation utilities: `validators.ts`
- ✅ FinancialGoalsPage created (read-only, route missing)

**Phase 6 Summary** (All Complete):
- ✅ Phase 6.1-6.10 - React Foundation, Auth, Dashboard, Portfolio UI, Financial Goals UI
- ✅ Protected Routes implemented
- ✅ All UI components refactored, audited, and standardized

**Current Active Phase**: 
- 🚀 **Phase 8 - Financial Goal Tracker** (0% → Target: 100% in 4-5 days)
  - Next Task: Phase 8.1 - Add `/goals` route (5 min quick win)

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

**Status**: ✅ **COMPLETE**

**Tasks**:
- [x] Design system architecture (high-level) - ARCHITECTURE.md Section 2
- [x] Define API contracts (REST endpoints) - API_SPECIFICATION.md created (documented inline in controllers)
- [x] Design data flow diagrams - ARCHITECTURE.md Section 7 (detailed flow for all features)
- [x] Define component hierarchy (React) - ARCHITECTURE.md Section 4 (updated to match implementation)
- [x] Design service layer structure (Spring Boot) - ARCHITECTURE.md Section 5
- [x] Define authentication flow - ARCHITECTURE.md Section 7.1 (Login flow)
- [~] Create mockups/wireframes (optional) - Skipped
- [x] Design recommendation rules engine - ARCHITECTURE.md Section 5.2 (Rules Engine Logic)
- [x] Design insights generation logic - ARCHITECTURE.md Section 5.3 (Progress & Insights Logic)

**Deliverables**:
- ✅ ARCHITECTURE.md (Updated to match implementation)
- ✅ API_SPECIFICATION.md (Created)
- ✅ Component design documents (Section 4 in ARCHITECTURE.md)
- ⏭️ Wireframes (optional - skipped)

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

**Status**: ✅ **COMPLETE**

All UI components built, refactored for modularity, audited, and standardized:
- ✅ React + TypeScript + Vite foundation
- ✅ Tailwind CSS, React Router, React Hook Form, React Toastify
- ✅ Axios client with JWT interceptors
- ✅ AuthContext + AuthService + Login UI
- ✅ DashboardPage with components refactored
- ✅ PortfolioPage (read-only integration)
- ✅ FinancialGoalsPage (read-only integration)
- ✅ Protected Routes
- ✅ TypeScript validation: zero errors
- ✅ Build validation: successful

---

### PHASE 7: Backend Integration & Stabilization
**Duration**: 7-10 hari
**Objective**: Integrate frontend with backend APIs and establish reusable patterns

**Status**: ✅ **COMPLETE**

All CRUD functionality for Portfolios implemented, stabilized, and refactored:

**Completed Sub-phases (Phase 7.1 - 7.14)**:
- ✅ Phase 7.1 - FinancialGoalService & DTOs (read-only)
- ✅ Phase 7.2 - Portfolio Backend Integration (read-only)
- ✅ Phase 7.4 - Data Fetching Hooks (`usePortfolio`, `useFinancialGoals`)
- ✅ Phase 7.5 - Reusable Modal Foundation (controlled components)
- ✅ Phase 7.6 - Create Portfolio API integration
- ✅ Phase 7.7 - Portfolio Edit Preparation
- ✅ Phase 7.8 - Complete Portfolio Update Flow
- ✅ Phase 7.9 - Confirmation Dialog + Portfolio Delete
- ✅ Phase 7.10 - Portfolio CRUD Stabilization (selection preservation)
- ✅ Phase 7.11 - Portfolio CRUD Logic Extraction (`usePortfolioCrud`)
- ✅ Phase 7.12 - Portfolio UX Improvement (`useDirtyForm`, confirmation)
- ✅ Phase 7.13 - Shared Async Action Hook (`useAsyncAction`)
- ✅ Phase 7.14 - Shared CRUD Foundation (`useConfirmation`, `useModalState`)

**Deliverables Completed**:
- ✅ Portfolio CRUD fully operational (Create, Read, Update, Delete)
- ✅ Reusable custom hooks pattern established
- ✅ Reusable components created
- ✅ Form validation utilities created
- ✅ Dirty form detection implemented
- ✅ Async action handling standardized
- ✅ TypeScript validation: zero errors
- ✅ Build validation: successful

**Architecture Achievements**:
- ✅ Clear separation of concerns (UI ↔ Hooks ↔ Services)
- ✅ Reusable patterns ready for Goal CRUD
- ✅ Scalable component structure
- ✅ Type-safe throughout

### PHASE 8: Financial Goal Tracker (CORE FEATURE #1)
**Duration**: 4-5 hari  
**Objective**: Implement complete goal management with CRUD, progress tracking, and insights

**Priority**: ⭐⭐⭐ HIGHEST - This is a core feature from project requirements

**Backend Tasks**:
- [x] FinancialGoal entity dan repository (already done)
- [x] Goal Management APIs (already done)
  - POST /api/goals (create)
  - GET /api/goals (list)
  - GET /api/goals/{id} (detail)
  - PUT /api/goals/{id} (update)
  - DELETE /api/goals/{id} (delete)
- [ ] Implement goal progress calculation logic
- [ ] Implement insights generation engine (3 types):
  - "Target dapat tercapai dalam X bulan"
  - "Tabungan Anda terlalu kecil untuk mencapai target"
  - "Perlu menambah tabungan Rp X per bulan"
- [ ] Write unit tests for insights

**Frontend Tasks**:
- [ ] 8.1: Add route `/goals` to AppRoutes.tsx (5 min quick win)
- [ ] 8.2: Goal Create modal + form validation (1 day)
- [ ] 8.3: Goal Edit modal (0.5 day)
- [ ] 8.4: Goal Delete with confirmation (0.5 day)
- [ ] 8.5: Hook `useFinancialGoalCrud` (mirroring Portfolio pattern) (0.5 day)
- [ ] 8.6: Insights generation logic & display (1 day)
- [ ] 8.7: Progress visualization (ProgressBar, percentage) (0.5 day)
- [ ] 8.8: Full integration & testing (0.5 day)

**Deliverables**:
- ✅ Financial Goal CRUD fully operational
- ✅ Progress tracking with visualization
- ✅ Insights generation (3 types)
- ✅ FinancialGoalsPage accessible via `/goals`

---

### PHASE 9: Risk Assessment & Portfolio Recommendation (CORE FEATURE #2)
**Duration**: 7-8 hari  
**Objective**: Implement portfolio manager with risk questionnaire and recommendation engine

**Priority**: ⭐⭐⭐ HIGH - This is a core feature from project requirements

**Backend Tasks**:
- [x] RiskProfile entity dan repository (already done)
- [ ] Implement recommendation rules engine (rules-based logic)
  - Low risk → 70% bonds, 30% stocks
  - Medium risk → 50% bonds, 50% stocks
  - High risk → 30% bonds, 70% stocks
- [ ] Create Portfolio Recommendation API
  - POST /api/portfolio/recommend (get recommendation based on risk profile)
- [ ] Create sample asset allocations
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] 9.1: Create `RiskAssessmentPage.tsx` (questionnaire form) (2 days)
- [ ] 9.2: Integrate with RiskProfileController (0.5 day)
- [ ] 9.3: Add route `/risk-assessment` (5 min)
- [ ] 9.4: Build recommendation engine logic (2 days)
- [ ] 9.5: Create `RecommendationPage.tsx` (show suggested portfolio) (1.5 days)
- [ ] 9.6: Add route `/recommendation` (5 min)
- [ ] 9.7: Acceptance flow - save portfolio recommendation (1 day)

**Deliverables**:
- ✅ Risk Assessment questionnaire UI
- ✅ Portfolio Recommendation engine
- ✅ Recommendation page with allocation visualization
- ✅ Portfolio acceptance & save flow

---

### PHASE 10: What-If Simulator
**Duration**: 6-7 hari  
**Objective**: Implement financial scenario simulation feature

**Priority**: ⭐⭐⭐ HIGH - This is a requirement from project description

**Backend Tasks**:
- [ ] Create `SimulationService` (calculation logic)
- [ ] Implement simulation calculation:
  - Income change impact
  - Expense change impact
  - Combined scenarios
  - New timeline projections
- [ ] Create Simulation API
  - POST /api/simulation/goal-impact (calculate impact on goals)
- [ ] Write unit tests

**Frontend Tasks**:
- [ ] 10.1: Create `SimulationPage.tsx` (2 days)
- [ ] 10.2: Input controls (sliders/inputs) for income/expense (1 day)
- [ ] 10.3: Current scenario display (1 day)
- [ ] 10.4: Simulated scenario display + comparison (1 day)
- [ ] 10.5: Add route `/simulation` (5 min)
- [ ] 10.6: Integration & testing (1 day)

**Deliverables**:
- ✅ Working What-If simulator
- ✅ Scenario comparison view
- ✅ Impact visualization (before/after)

---

### PHASE 11: Dashboard Backend Integration
**Duration**: 4 hari  
**Objective**: Integrate real backend data into dashboard (replace dummy data)

**Priority**: ⭐⭐ MEDIUM - After core features are complete

**Backend Tasks**:
- [ ] Create `DashboardService` (aggregation logic)
- [ ] Create Dashboard APIs
  - GET /api/dashboard/summary (portfolio + goals summary)
  - GET /api/dashboard/portfolio-performance (chart data)
- [ ] Aggregate data from goals and portfolio
- [ ] Generate key metrics

**Frontend Tasks**:
- [ ] 11.1: Create `useDashboard` hook (1 day)
- [ ] 11.2: Replace dummy data in DashboardPage with API calls (1 day)
- [ ] 11.3: Update portfolio performance chart with real data (1 day)
- [ ] 11.4: Integration & testing (0.5 day)

**Deliverables**:
- ✅ Dashboard with real-time data
- ✅ Portfolio performance chart
- ✅ Goals summary with live progress

---

### PHASE 12: Nice-to-Have Features (OPTIONAL)
**Duration**: 2-3 hari  
**Objective**: Implement optional features (non-MVP)

**Tasks**:
- [ ] Create `RegisterPage.tsx` (1 day)
- [ ] Create User Profile page (0.5 day)
- [ ] Advanced charts (Recharts/Chart.js) (0.5 day)
- [ ] UI/UX improvements (0.5 day)

**Deliverables**:
- User registration UI
- Profile management

---

### PHASE 13: Testing & Polish
**Duration**: 3-4 hari  
**Objective**: Test, fix bugs, dan polish application for MVP release

**Priority**: ⭐⭐⭐ CRITICAL - Final phase

**Backend Tasks**:
- [ ] Write integration tests (JUnit 5, MockMvc) (2 days)
- [ ] Write unit tests for all services (1 day)
- [ ] Security review & hardening (0.5 day)

**Frontend Tasks**:
- [ ] Write component tests (Jest + React Testing Library) (2 days)
- [ ] Write end-to-end tests (manual) (1 day)
- [ ] Fix bugs dan issues (1 day)
- [ ] Performance optimization (0.5 day)

**General Tasks**:
- [ ] Documentation updates & finalization (0.5 day)
- [ ] Code review & refactoring (0.5 day)
- [ ] Prepare deployment configuration (0.5 day)

**Deliverables**:
- ✅ Tested dan stable MVP
- ✅ Bug-free application
- ✅ Complete documentation
- ✅ Deployment-ready code

---

## 🧰 Tech Stack

### Frontend
- **Framework**: React + Vite
- **Language**: TypeScript
- **Routing**: React Router DOM
- **State Management**: React Context + custom hooks
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form where needed, controlled components for existing CRUD modals
- **Notifications**: React Toastify
- **Styling**: Tailwind CSS + shared global CSS
- **UI Approach**: Custom reusable components

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java
- **Build Tool**: Maven
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA + Hibernate
- **Validation**: Bean Validation
- **Architecture**: Controller → Service → Repository → Entity/DTO

### Database
- **Database**: MySQL
- **Schema**: Existing SQL schema under `database/schema/`

### Development Tools
- **IDE**: IntelliJ IDEA / VS Code
- **API Testing**: Postman/manual API testing
- **Version Control**: Git + GitHub
- **AI Assistant**: OpenCode

### Testing
- **Backend Testing**: JUnit 5, Mockito, Spring Boot Test
- **Frontend Testing**: TypeScript checks, build validation, future component tests with React Testing Library after MVP features stabilize.

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

## 📊 Progress Tracking

### Overall Progress: ~65% MVP Complete (Phase 8 Ready to Start)

| Phase | Status | Completion | Notes |
|-------|--------|------------|-------|
| Phase 0: Environment Setup | ✅ Complete | 100% | Tools installed, project structure ready |
| Phase 1: Requirements Analysis | ✅ Complete | 100% | Requirements documented |
| Phase 2: System Design | ✅ Complete | 100% | Architecture designed |
| Phase 3: Database Design | ✅ Complete | 100% | Schema implemented and validated |
| Phase 4: Backend Development | ✅ Complete | 100% | Spring Boot backend fully operational |
| Phase 5: Documentation & Architecture Modeling | ✅ Complete | 100% | Sequence diagrams completed |
| Phase 6: React Frontend Foundation | ✅ Complete | 100% | Auth, Dashboard, Portfolio, Goals UI complete |
| Phase 7: Backend Integration & Stabilization | ✅ Complete | 100% | Portfolio CRUD stabilized & refactored |
| **Phase 8: Financial Goal Tracker** | ⏳ **NEXT** | 0% | **STARTING NOW** - Route + CRUD + Insights |
| Phase 9: Risk Assessment & Portfolio Recommendation | ⏳ Pending | 0% | After Phase 8 |
| Phase 10: What-If Simulator | ⏳ Pending | 0% | Core requirement |
| Phase 11: Dashboard Integration | ⏳ Pending | 0% | Replace dummy data |
| Phase 12: Nice-to-Have (Optional) | ⏳ Pending | 0% | RegisterPage, Profile |
| Phase 13: Testing & Polish | ⏳ Pending | 0% | Final phase before MVP release |

### Current Status (Updated: 29 Juni 2026)

- **Current Phase**: Phase 8 - Financial Goal Tracker ⭐⭐⭐ HIGHEST PRIORITY
- **Next Task**: Phase 8.1 - Add `/goals` route to AppRoutes.tsx (5 min quick win)
- **Backend Status**: 
  - ✅ All CRUD endpoints ready (FinancialGoalController)
  - ⏳ Insights generation logic pending
- **Frontend Status**:
  - ✅ Portfolio CRUD complete & stable (Phase 7)
  - ✅ FinancialGoalsPage exists (read-only)
  - ⚠️ Route `/goals` MISSING (not accessible yet!)
  - ⏳ Goal CRUD (create/edit/delete) pending
  - ⏳ Insights display pending
- **Architecture Status**:
  - ✅ Reusable hooks pattern established (`usePortfolioCrud`, `useAsyncAction`, `useDirtyForm`)
  - ✅ Reusable components ready (`ConfirmationModal`, `LoadingState`, `EmptyState`)
  - ✅ Validation utilities ready (`validators.ts`)
- **Blockers**: None
- **Estimated Time to MVP**: 3-4 weeks (if working 4-5 hours/day)

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

### Execution Roadmap (Week by Week)

**WEEK 1-2: Financial Goal Tracker (Phase 8)** ⭐ PRIORITY
- Day 1: 8.1 Add `/goals` route (quick win)
- Day 1-2: 8.2 Goal Create modal + validation
- Day 2: 8.3 Goal Edit modal
- Day 2: 8.4 Goal Delete with confirmation
- Day 3: 8.5 Hook `useFinancialGoalCrud`
- Day 3-4: 8.6-8.7 Insights logic + display
- Day 4: 8.8 Testing & integration
- **Outcome**: FinancialGoalsPage fully CRUD + Insights ✅

**WEEK 3-4: Portfolio Manager (Phase 9)** ⭐ HIGH
- Day 1-2: 9.1 RiskAssessmentPage (questionnaire)
- Day 2: 9.2 RiskProfile integration
- Day 3-4: 9.4 Recommendation engine logic
- Day 4-5: 9.5 RecommendationPage UI
- Day 5: 9.7 Acceptance flow
- **Outcome**: Full risk assessment + portfolio recommendation ✅

**WEEK 5: What-If Simulator (Phase 10)** ⭐ HIGH
- Day 1-2: 10.1 Backend SimulationService
- Day 2-3: 10.2 SimulationPage UI
- Day 3: 10.4 Comparison view + charts
- **Outcome**: What-If simulator functional ✅

**WEEK 6: Dashboard Integration (Phase 11)** ⭐ MEDIUM
- Day 1-2: 11.1-11.3 Real data integration
- Day 2: 11.4 Testing
- **Outcome**: Dashboard with live data ✅

**WEEK 7: Testing & Polish (Phase 13)** ⭐ CRITICAL
- Day 1-2: Unit & integration tests
- Day 2-3: Bug fixes & optimization
- Day 3: Documentation finalization
- **Outcome**: MVP ready for release ✅

---

### Quick Resume Commands

```text
# Start Phase 8
Review Phase 8 requirements
Check FinancialGoalsPage structure
Prepare Phase 8.1 implementation

# Status Check
npm run dev
npm run build
git status
```

---

**Document Version**: 3.0  
**Last Updated**: 29 Juni 2026  
**Author**: System Architect  
**Status**: ✅ ROADMAP ALIGNED & APPROVED - Starting Phase 8.1  
**Next Action**: Implement Phase 8.1 (Add `/goals` route)
