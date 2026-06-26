# Architecture & Project Decisions Log

## 📋 Overview

This document records all significant architectural and project decisions made during the Wealth Management System development. Each decision includes the context, rationale, alternatives considered, and implications.

**Recording Period**: Phase 0-4 (21 Juni 2026 - 22 Juni 2026)  
**Decision Framework**: Architecture Decision Records (ADR)
**Total Decisions**: 16 (10 from Phase 0-1, 6 new from Phase 2-4)

---

## Decision 1: MVP Scope - Lean Feature Set

**Date**: 21 Juni 2026  
**Category**: Project Scope  
**Status**: ✅ **APPROVED**

### Context
The project is a learning initiative with 2-3 month timeline. Need to balance comprehensive features with delivery feasibility and learning objectives.

### Decision
**Adopt a lean MVP with exactly 8 core features** instead of including advanced features like real-time data, ML recommendations, or social features.

### Features Included:
1. User authentication
2. Risk profile assessment
3. Portfolio recommendation (pre-defined templates)
4. Financial goal management
5. Goal progress tracking
6. Basic insights generation
7. What-If simulation (single scenario)
8. Dashboard overview

### Features Excluded from MVP:
- Real-time market data
- Multiple portfolios per user
- Advanced risk metrics (Sharpe ratio, volatility)
- Email notifications
- Mobile app
- Admin dashboard
- Machine learning recommendations

### Rationale
- **Speed to MVP**: Focus on core flows reduces development time
- **Learning Value**: Master fundamentals before advanced concepts
- **Quality**: Fewer features = more thorough testing and polishing
- **Scope Control**: Prevents scope creep and ensures completion
- **Future Extensibility**: Clean design allows easy feature additions

### Alternatives Considered
1. ❌ **Full-featured MVP**: Would require 4-6 months, too long for learning project
2. ❌ **Minimal MVP**: Only authentication + goals; lacks investment portfolio aspect
3. ✅ **Lean MVP (Chosen)**: Balanced scope, achievable timeline, good learning value

### Implications
- **Trade-off**: Some advanced features postponed to Phase 2+
- **Quality Focus**: More time for testing and refinement
- **User Feedback**: Can validate core concept before adding features
- **Extension Path**: Clear roadmap for future enhancements

### Related Decisions
- Decision 2 (Tech Stack) supports this decision
- Decision 5 (State Management) influenced by scope

---

## Decision 2: Tech Stack Selection

**Date**: 21 Juni 2026  
**Category**: Technology Selection  
**Status**: ✅ **APPROVED**

### Frontend: React 18 + Context API

**Decision**: Use React 18 with Context API for state management (initial approach)

**Rationale**:
- React dominance in modern web development
- Component-based architecture aligns with project structure
- Context API sufficient for MVP (can migrate to Redux later)
- Large community and abundant learning resources
- Virtual DOM ensures good performance

**Alternatives**:
- ❌ Vue.js: Smaller ecosystem for this project scale
- ❌ Angular: Overkill complexity for MVP
- ❌ Redux immediately: Unnecessary complexity for MVP scope

**Implications**:
- Must learn React hooks (modern approach)
- Can easily upgrade to Redux if needed
- Component reusability becomes critical

---

### Backend: Spring Boot 3 + JWT + JPA

**Decision**: Use Spring Boot 3.x with JWT authentication and Spring Data JPA

**Rationale**:
- Spring Boot industry standard for enterprise Java
- Excellent ecosystem for rapid development
- JPA/Hibernate abstracts database complexity
- Spring Security provides robust authentication/authorization
- Well-suited for REST API development

**Alternatives**:
- ❌ Node.js/Express: Different tech stack, adds complexity
- ❌ Python/Django: Overkill for this scale
- ✅ Spring Boot 3 (Chosen): Perfect for learning Java ecosystem

**Implications**:
- Must learn Spring Boot conventions and annotations
- JPA/Hibernate learning curve
- Access to entire Spring ecosystem (security, testing, etc.)

---

### Database: MySQL 8.0+

**Decision**: Use MySQL 8.0+ (relational database)

**Rationale**:
- Relational model fits financial data perfectly
- MySQL industry standard for web applications
- Native support for transactions (important for financial data)
- Wide hosting support (future deployment)
- Good learning value for database design

**Alternatives**:
- ❌ NoSQL (MongoDB): Poor fit for structured financial data
- ❌ PostgreSQL: More advanced, but MySQL sufficient for MVP
- ✅ MySQL 8.0+ (Chosen): Good balance of capability and simplicity

**Implications**:
- Must design normalized schema in Phase 3
- ACID compliance ensures data integrity
- Need for proper indexing strategy

---

## Decision 3: Module Architecture - Layered 3-Tier

**Date**: 21 Juni 2026  
**Category**: Architecture Pattern  
**Status**: ✅ **APPROVED**

### Decision
Adopt **Layered 3-Tier Architecture**:
- **Presentation Layer**: React frontend components
- **Business Logic Layer**: Spring Boot services
- **Data Access Layer**: Spring Data JPA repositories

### Rationale
- Clear separation of concerns
- Each layer has single responsibility
- Standard pattern for web applications
- Facilitates testing at each layer
- Team scalability (multiple developers on different layers)

### Alternatives Considered
- ❌ Monolithic structure: Would mix concerns
- ❌ Microservices: Overkill for MVP, adds operational complexity
- ✅ Layered 3-Tier (Chosen): Perfect balance for learning project

### Implications
- Must maintain clear API boundaries between layers
- Each layer has distinct responsibilities
- Testing strategy varies by layer (unit, integration, e2e)

---

## Decision 4: Authentication Method - JWT Tokens

**Date**: 21 Juni 2026  
**Category**: Security  
**Status**: ✅ **APPROVED**

### Decision
Use **JWT (JSON Web Tokens)** for stateless authentication instead of session-based approach.

### Rationale
- **Stateless**: Server doesn't maintain session state (easier to scale)
- **RESTful**: Natural fit for REST API architecture
- **Token-based**: Supports future mobile app development
- **Security**: Can include claims and validation
- **Modern Standard**: Industry best practice for APIs

### Implementation Details
- Tokens signed with HS256 (HMAC SHA-256)
- Token expiry: 24 hours (configurable)
- Refresh token strategy: TBD in Phase 2

### Alternatives Considered
- ❌ Session-based: Couples frontend to server, harder to scale
- ❌ OAuth/OpenID: Overkill for MVP, adds external dependency
- ✅ JWT (Chosen): Perfect for stateless REST API

### Implications
- Frontend must store and send token with each request
- Must implement token refresh strategy
- Secure token storage important (localStorage vs secure cookie)

---

## Decision 5: State Management - Context API Initial

**Date**: 21 Juni 2026  
**Category**: Frontend Architecture  
**Status**: ✅ **APPROVED**

### Decision
Start with **React Context API** for state management, with clear upgrade path to Redux if needed.

### Rationale
- Sufficient for MVP complexity
- No external dependency overhead
- Good learning opportunity for Context/hooks
- Can migrate to Redux later without major refactoring
- Smaller bundle size initially

### Upgrade Path
If state complexity increases:
1. Identify global state (user, portfolio, goals)
2. Create Redux store incrementally
3. Migrate contexts to Redux reducers one by one

### Alternatives Considered
- ❌ Redux immediately: Unnecessary complexity for MVP
- ❌ MobX: Less common in learning context
- ✅ Context API (Chosen): Right tool for current scope

### Implications
- Context API usage documented in components
- Clear prop drilling rules to prevent deep nesting
- Redux migration path documented

---

## Decision 6: Recommendation Engine - Rules-Based

**Date**: 21 Juni 2026  
**Category**: Business Logic  
**Status**: ✅ **APPROVED**

### Decision
Implement **rules-based recommendation engine** (simple if-then rules) instead of statistical models or ML.

### Rules Structure
**Risk Profile → Portfolio Template Mapping**:
- Low Risk: 70% bonds, 20% stocks, 10% cash
- Medium Risk: 50% stocks, 40% bonds, 10% cash
- High Risk: 80% stocks, 15% bonds, 5% cash

**Modifiers**:
- Investment timeline: Adjust conservativeness based on years-to-goal
- Goal type: Different templates for retirement vs education vs emergency

### Rationale
- **Simplicity**: Easy to implement and understand
- **Transparency**: Users understand why they got this recommendation
- **Maintainability**: Rules easily modified without model retraining
- **Learning Value**: Focus on logic, not ML complexity
- **Extensibility**: Can add more sophisticated logic later

### Future Enhancement
Phase 2+ can upgrade to:
- Statistical models
- Machine learning (collaborative filtering)
- Backtesting results

### Alternatives Considered
- ❌ ML/Statistical models: Overkill for MVP, requires data science expertise
- ❌ Random recommendations: Unrealistic
- ✅ Rules-based (Chosen): Perfect for MVP with clear learning progression

### Implications
- Rules must be documented and testable
- Easy to validate against financial best practices
- Clear audit trail for recommendations

---

## Decision 7: Insights Generation - Template-Based Messages

**Date**: 21 Juni 2026  
**Category**: Business Logic  
**Status**: ✅ **APPROVED**

### Decision
Use **message templates with calculated parameters** for insights instead of NLP/AI-generated messages.

### Insight Categories
1. **Goal Achievability**:
   - Template: "Target dapat tercapai dalam {months} bulan"
   - Calculation: (target_amount - current_saved) / monthly_savings_rate

2. **Savings Adequacy**:
   - Template: "Perlu menambah tabungan Rp {amount} per bulan"
   - Calculation: target_savings_rate - actual_savings_rate

3. **Risk Assessment**:
   - Template: "Goal ini {status}" (on track / at risk / off track)
   - Calculation: Compare progress % vs time elapsed %

### Rationale
- **Clarity**: Consistent, understandable messages
- **Predictability**: No variability in message quality
- **Maintainability**: Simple to add new insight types
- **Testing**: Easy to validate correctness
- **Localization**: Easy to translate to different languages

### Alternatives Considered
- ❌ AI-generated (NLP): Complex, unpredictable output
- ❌ Simple numeric output: Lacks user-friendly interpretation
- ✅ Template-based (Chosen): Best balance of simplicity and usefulness

### Implications
- Message templates maintained in configuration
- Clear calculation logic documented
- Threshold values defined (e.g., "at risk" threshold)

---

## Decision 8: Sample Data Strategy - Static Mock Data

**Date**: 21 Juni 2026  
**Category**: Data Management  
**Status**: ✅ **APPROVED**

### Decision
Use **static seed data** for portfolio performance and market data instead of live API integration.

### Data Scope
- Pre-defined assets (stocks, bonds, funds)
- Static historical prices (month historical trend)
- Seed portfolios for demonstration
- Sample user accounts for testing

### Rationale
- **Focus on Core**: Avoids dependency on external APIs
- **Reliability**: No API outages affecting learning project
- **Simplicity**: No rate limiting or authentication headaches
- **Testing**: Reproducible scenarios
- **Phase Plan**: Real data integration can be Phase 2+ feature

### Data Refresh Strategy
- Manual refresh: Admin updates seed data periodically
- Version control: Data definitions in Git
- Documentation: Clear seed data specifications

### Alternatives Considered
- ❌ Live API (Alpha Vantage, IEX Cloud): Adds complexity, requires API key management
- ❌ No data: Can't demonstrate key features
- ✅ Static mock data (Chosen): Perfect for MVP learning

### Implications
- Data seed scripts required in Phase 3
- Realistic data values important for demo purposes
- Documentation of data assumptions needed

---

## Decision 9: Testing Strategy - Test Pyramid Approach

**Date**: 21 Juni 2026  
**Category**: Quality Assurance  
**Status**: ✅ **APPROVED**

### Decision
Follow **Test Pyramid** with majority unit tests, fewer integration tests, minimal E2E tests.

### Distribution Target
- 70% Unit Tests (individual components/services)
- 20% Integration Tests (layer-to-layer interaction)
- 10% E2E Tests (full user workflows)

### Backend Testing
- JUnit 5 for unit tests
- Mockito for mocking dependencies
- Spring Boot Test for integration tests

### Frontend Testing
- Jest for unit tests
- React Testing Library for component tests
- Manual E2E testing initially

### Rationale
- **Speed**: Unit tests run fast (quick feedback)
- **Reliability**: Fewer flaky tests
- **Cost**: E2E tests expensive to maintain
- **Learning**: Focus on testable design

### Alternatives Considered
- ❌ All E2E: Slow, flaky, expensive to maintain
- ❌ No tests: Risky, poor learning value
- ✅ Test Pyramid (Chosen): Optimal balance

### Implications
- Must write testable code from start
- Clear unit test coverage requirements
- Test documentation needed

---

## Decision 10: Documentation Approach - Markdown in Git

**Date**: 21 Juni 2026  
**Category**: Documentation  
**Status**: ✅ **APPROVED**

### Decision
Store all project documentation as **Markdown files in Git repository** under `docs/` directory.

### Documentation Structure
```
docs/
├── PROJECT_PLAN.md          # Master project blueprint
├── ARCHITECTURE.md          # System design (Phase 2)
├── API_SPECIFICATION.md     # REST API details (Phase 2)
├── DATABASE_DESIGN.md       # Schema and ERD (Phase 3)
├── USER_STORIES.md          # Feature specifications
└── DEVELOPMENT_GUIDE.md     # Setup instructions
```

### Rationale
- **Version Control**: Track changes, revert if needed
- **Collaboration**: Easy to review and comment
- **Accessibility**: Plain text, readable everywhere
- **Simplicity**: No special tools required
- **Portability**: Works everywhere Git is available

### Alternatives Considered
- ❌ Wiki (Confluence, GitHub Wiki): Separate from code, sync issues
- ❌ Google Docs: Not in version control
- ✅ Markdown in Git (Chosen): Best for technical teams

### Implications
- Documentation kept up-to-date with code
- Clear commit messages for documentation changes
- Code review includes documentation review

---

## Summary Table

| # | Decision | Chosen | Status | Date |
|---|----------|--------|--------|------|
| 1 | MVP Scope | Lean (8 features) | ✅ Approved | 21 Juni 2026 |
| 2a | Frontend | React 18 + Context API | ✅ Approved | 21 Juni 2026 |
| 2b | Backend | Spring Boot 3 + JWT | ✅ Approved | 21 Juni 2026 |
| 2c | Database | MySQL 8.0+ | ✅ Approved | 21 Juni 2026 |
| 3 | Architecture | 3-Tier Layered | ✅ Approved | 21 Juni 2026 |
| 4 | Authentication | JWT Tokens | ✅ Approved | 21 Juni 2026 |
| 5 | State Management | Context API (V1) | ✅ Approved | 21 Juni 2026 |
| 6 | Recommendations | Rules-Based Engine | ✅ Approved | 21 Juni 2026 |
| 7 | Insights | Template-Based Messages | ✅ Approved | 21 Juni 2026 |
| 8 | Sample Data | Static Mock Data | ✅ Approved | 21 Juni 2026 |
| 9 | Testing | Test Pyramid (70-20-10) | ✅ Approved | 21 Juni 2026 |
| 10 | Documentation | Markdown in Git | ✅ Approved | 21 Juni 2026 |
| 11 | Database Platform | MySQL Community 9.7 | ✅ Approved | 22 Juni 2026 |
| 12 | Portfolio Cardinality | Multiple per User (1:N) | ✅ Approved | 22 Juni 2026 |
| 13 | Portfolio-Asset Model | Join Table (Normalized) | ✅ Approved | 22 Juni 2026 |
| 14 | Goal Progress Storage | Runtime Calculation | ✅ Approved | 22 Juni 2026 |
| 15 | Entity Development | Batch Strategy (3 batches) | ✅ Approved | 22 Juni 2026 |
| 16 | Documentation Storage | Git Source of Truth | ✅ Approved | 22 Juni 2026 |

---

## Future Decision Points

These decisions will be made in upcoming phases:

### Phase 2 - System Design:
- [ ] UI Component Library (Material-UI, Bootstrap, Tailwind)
- [ ] Chart library (Chart.js, Recharts, Victory)
- [ ] Error handling and logging strategy
- [ ] CORS policy definition
- [ ] API versioning strategy

### Phase 3 - Database Design:
- [ ] Database indexing strategy
- [ ] Backup and recovery procedure
- [ ] Data migration approach
- [ ] Audit logging requirements

### Phase 4+ - Implementation:
- [ ] Deployment platform (Heroku, AWS, Azure, DigitalOcean)
- [ ] CI/CD pipeline tools (GitHub Actions, Jenkins)
- [ ] Monitoring and logging tools
- [ ] Production security hardening

---

**Document Version**: 2.0  
**Last Updated**: 22 Juni 2026, 15:29  
**Decision Framework**: Architecture Decision Records (ADR)  
**Next Review**: End of Phase 4
**Next Review**: End of Phase 2

---

## Decision 11: Database Platform - MySQL Community Server

**Date**: 22 Juni 2026  
**Category**: Database Infrastructure  
**Status**: ? **APPROVED**  
**Phase**: Phase 3 - Database Design

### Context
Need to select specific MySQL distribution for development and production. Options include MySQL Community Server, MariaDB (XAMPP bundle), Percona Server.

### Decision
**Use MySQL Community Server 9.7** as the primary database platform, not MariaDB from XAMPP bundle.

### Rationale
- **Official Distribution**: MySQL Community Server is the official Oracle MySQL distribution
- **Latest Features**: Version 9.7 includes latest MySQL 8.0+ optimizations
- **Direct Support**: Better documentation and community support
- **Production Parity**: Same platform can be used in production
- **Clean Environment**: Standalone installation, not bundled with Apache/PHP
- **Learning Value**: Industry-standard MySQL experience

### Alternatives Considered
1. ? **MariaDB via XAMPP**: Bundled environment, different SQL dialect, fork of MySQL
2. ? **Percona Server**: More complex, overkill for learning project
3. ? **MySQL Community Server 9.7 (Chosen)**: Official, latest, well-documented

### Implications
- Standalone MySQL installation required (not XAMPP bundle)
- Configuration via MySQL Workbench or command line
- UTF-8 (utf8mb4) character set by default
- InnoDB storage engine with full ACID compliance
- Compatible with Spring Boot JPA/Hibernate

### Related Decisions
- Decision 2c (Database: MySQL 8.0+)
- Decision 3 (3-Tier Layered Architecture)

---

## Decision 12: Portfolio Cardinality - Multiple Portfolios per User

**Date**: 22 Juni 2026  
**Category**: Data Modeling  
**Status**: ? **APPROVED**  
**Phase**: Phase 3 - Database Design

### Context
Original ARCHITECTURE.md specified 1:1 relationship (1 user = 1 portfolio). During Phase 3 design review, identified need for users to experiment with different investment strategies.

### Decision
**Allow one user to have multiple portfolios (1:N relationship)** instead of restricting to single portfolio.

### Rationale
- **User Flexibility**: Users can create different portfolios for different strategies
  - Conservative portfolio for near-term goals
  - Aggressive portfolio for long-term growth
  - Experimental portfolios for testing allocations
- **Real-World Scenario**: Reflects actual wealth management practices
- **Learning Value**: Better demonstration of 1:N relationships
- **No Complexity**: Simple foreign key, no additional complexity
- **Future Features**: Enables portfolio comparison (Level 2+)

### Alternatives Considered
1. ? **1:1 Relationship**: Too restrictive, doesn't reflect real usage
2. ? **1:N Relationship (Chosen)**: Flexible, realistic, simple to implement
3. ? **Unlimited Portfolios**: Could add complexity, but acceptable for MVP

### Implications
- Database: portfolios.user_id foreign key (NO UNIQUE constraint)
- User can create multiple portfolios via API
- Dashboard may need to handle multiple portfolios (show all or let user select)
- No "active portfolio" flag in MVP (all portfolios equal status)
- Query pattern: SELECT * FROM portfolios WHERE user_id = ? ORDER BY created_at DESC

### Impact
- **Database Schema**: Changed from 1:1 to 1:N
- **API Design**: GET /api/portfolios returns array (not single object)
- **Frontend**: Portfolio list view needed (not just single portfolio view)

### Related Decisions
- Decision 13 (Portfolio-Asset Join Table)

---

## Decision 13: Portfolio-Asset Modeling - Join Table vs JSON

**Date**: 22 Juni 2026  
**Category**: Data Modeling  
**Status**: ? **APPROVED**  
**Phase**: Phase 3 - Database Design

### Context
Need to model M:N relationship between Portfolio and Asset with allocation percentages. Options: JSON column in portfolios table vs. normalized join table.

### Decision
**Use normalized join table portfolio_assets** with allocation_percentage column, NOT JSON column approach.

### Rationale
- **Normalization (3NF)**: Proper relational design, follows database best practices
- **Queryability**: Easy to query, filter, aggregate asset allocations
- **Data Integrity**: UNIQUE constraint prevents duplicate assets in portfolio
- **Validation**: Easy to validate SUM(allocation_percentage) = 100% per portfolio
- **Performance**: Proper indexing on foreign keys enables fast JOINs
- **Learning Value**: Demonstrates M:N relationship implementation
- **JPA Mapping**: Clean @ManyToMany via @JoinTable annotation

### Alternatives Considered
1. ? **JSON Column in Portfolios**: 
   - Pros: Simpler structure, fewer tables
   - Cons: Hard to query, no referential integrity, difficult validation
2. ? **Join Table portfolio_assets (Chosen)**: 
   - Pros: Normalized, queryable, integrity constraints, standard practice
   - Cons: One additional table (acceptable trade-off)

### Implementation Details
```sql
CREATE TABLE portfolio_assets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    portfolio_id BIGINT NOT NULL,
    asset_id BIGINT NOT NULL,
    allocation_percentage DECIMAL(5,2) NOT NULL,
    UNIQUE KEY (portfolio_id, asset_id),
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE RESTRICT
);
```

### Implications
- Total tables: 6 (not 5) due to join table
- Query pattern requires JOIN for portfolio composition
- Application must validate total allocation = 100% before save
- Cascade delete: portfolio deleted ? allocations deleted
- Restrict delete: asset cannot be deleted if used in portfolios

### Impact
- **Database Complexity**: +1 table (acceptable)
- **Query Complexity**: Requires JOIN (standard practice)
- **Data Integrity**: ? Enforced at database level
- **Maintainability**: ? Easier to update individual allocations

### Related Decisions
- Decision 12 (Multiple Portfolios per User)


---

## Decision 14: Goal Progress Storage - Calculated vs Persisted

**Date**: 22 Juni 2026  
**Category**: Data Modeling  
**Status**: ? **APPROVED**  
**Phase**: Phase 3 - Database Design

### Context
Need to decide how to store goal progress data: separate goal_progress table for historical tracking vs. calculated fields at runtime.

### Decision
**Calculate progress at runtime, do NOT persist in separate table** for MVP.

### Rationale
- **Always Fresh**: Progress reflects latest data (current_savings, monthly_contribution)
- **Simpler Schema**: Eliminates goal_progress table (6 tables instead of 7)
- **Lightweight Calculation**: Progress formula is simple (< 10ms computation)
- **MVP Focus**: Historical tracking is Level 2+ feature
- **No Redundancy**: Single source of truth in inancial_goals table
- **Easy Recalculation**: Can regenerate progress anytime from base data

### Calculation Formula
```java
// Runtime calculation in GoalService
double progress = (currentSavings / targetAmount) * 100;
int monthsToTarget = (targetAmount - currentSavings) / monthlyContribution;
LocalDate projected = LocalDate.now().plusMonths(monthsToTarget);
String status = (projected <= targetDate) ? "ON_TRACK" : "OFF_TRACK";
```

### Alternatives Considered
1. ? **Separate goal_progress Table**: 
   - Pros: Historical tracking, audit trail
   - Cons: Data redundancy, sync issues, more complex queries
2. ? **Runtime Calculation (Chosen)**: 
   - Pros: Always fresh, simpler schema, single source of truth
   - Cons: No history (acceptable for MVP)

### Implications
- inancial_goals table stores only base data (target, current, monthly)
- Progress calculated in service layer on each request
- No INSERT into progress table on every update
- Insights generated on-demand (not persisted)
- Historical tracking can be added in Level 2 without breaking changes

### Impact
- **Database Tables**: 6 (not 7) - simpler
- **API Response Time**: +5-10ms for calculation (negligible)
- **Storage**: Reduced (no progress history records)
- **Code Complexity**: Calculation logic in service layer

### Related Decisions
- Decision 7 (Template-Based Insights)
- Future: Level 2+ may add goal_progress_history table

---

## Decision 15: Entity Development Strategy - Batch Approach

**Date**: 22 Juni 2026  
**Category**: Development Process  
**Status**: ? **APPROVED**  
**Phase**: Phase 4.2 - JPA Entity Layer

### Context
Need to organize entity development order to manage complexity and enable incremental testing.

### Decision
**Develop entities in 3 batches** based on dependency complexity:

**Batch 1 (Simple, No Dependencies)**:
- User
- RiskProfile

**Batch 2 (Relationships)**:
- Portfolio
- Asset
- PortfolioAsset (join table)

**Batch 3 (Final)**:
- FinancialGoal

### Rationale
- **Incremental Complexity**: Start simple (User, RiskProfile), progress to complex (M:N)
- **Dependency Order**: User ? RiskProfile ? Portfolio ? Goals
- **Testing**: Test each batch before moving forward
- **Learning Progression**: Master basic @Entity before @ManyToMany
- **Risk Mitigation**: Catch mapping errors early in simple entities

### Batch Breakdown

**Batch 1 Rationale**:
- User: Foundation entity, no foreign keys (except incoming)
- RiskProfile: Simple 1:1 relationship (@OneToOne)
- Test: User creation, risk profile assignment

**Batch 2 Rationale**:
- Portfolio: 1:N with User (@ManyToOne)
- Asset: Master data, no dependencies
- PortfolioAsset: M:N join table (@ManyToOne to both)
- Test: Portfolio creation, asset allocation

**Batch 3 Rationale**:
- FinancialGoal: 1:N with User, independent from Portfolio
- Test: Goal CRUD, progress calculation

### Alternatives Considered
1. ? **All at Once**: Risk of cascading errors, hard to debug
2. ? **Alphabetical Order**: Ignores dependencies
3. ? **Batch by Complexity (Chosen)**: Logical progression, incremental testing

### Implications
- Entities developed over 3 sessions (not single session)
- Spring Boot can start with partial entities (validate incrementally)
- Repository layer follows same batch order
- Service layer developed after all entities complete

### Impact
- **Development Time**: Slightly longer (testing between batches)
- **Code Quality**: Higher (incremental validation)
- **Learning**: Better (master concepts progressively)
- **Risk**: Lower (early error detection)

---

## Decision 16: Documentation Strategy - Git as Source of Truth

**Date**: 22 Juni 2026  
**Category**: Project Management  
**Status**: ? **APPROVED**  
**Phase**: Phase 1-4

### Context
Need to establish where project documentation lives and how it's maintained throughout development lifecycle.

### Decision
**Store all design artifacts in docs/ folder with Git as single source of truth**, not external tools (Confluence, Google Docs, Notion).

### Rationale
- **Version Control**: All documentation tracked in Git alongside code
- **Single Source of Truth**: No sync issues between code and docs
- **Offline Access**: Documentation available without internet
- **Markdown Format**: Plain text, readable, portable, tool-agnostic
- **Code Reviews**: Documentation changes reviewed alongside code
- **History**: Full history of design decisions via Git log
- **Collaboration**: Same workflow for code and docs (branches, PRs, merges)

### Documentation Structure
```
docs/
+-- PROJECT_PLAN.md           # Master blueprint (733 lines)
+-- ARCHITECTURE.md           # System design (1,504 lines)
+-- DATABASE_DESIGN.md        # Conceptual schema (1,565 lines)
+-- PHYSICAL_DATABASE.md      # Physical schema (1,423 lines)
+-- BACKEND_SETUP.md          # Backend guide (457 lines)
+-- DECISIONS.md              # This file (ADRs)
+-- CURRENT_PHASE.md          # Progress tracking
+-- NEXT_STEPS.md             # Action items
```

### Alternatives Considered
1. ? **Confluence Wiki**: External tool, requires login, sync issues
2. ? **Google Docs**: Not in version control, poor code formatting
3. ? **Notion**: Proprietary format, offline issues
4. ? **Markdown in Git (Chosen)**: Versioned, portable, developer-friendly

### Implications
- All documentation committed to Git
- Documentation updates in same commits as related code
- Pull requests include documentation review
- No external tools required (reduces dependencies)
- Plain text enables grep/search across all docs

### Impact
- **Total Documentation (as of 22 Juni 2026)**: 7,682 lines
- **Maintainability**: High (single location)
- **Accessibility**: Maximum (Git clone = full access)
- **Collaboration**: Seamless (same PR workflow)

### Related Decisions
- Decision 10 (Documentation: Markdown in Git)


---

## Decision 17: Dashboard Componentization Strategy

**Date**: 26 Juni 2026
**Category**: Frontend Architecture
**Status**: ✅ **APPROVED**
**Phase**: Phase 6.7 - Dashboard Refactor

### Context
The DashboardPage.tsx grew in complexity, handling a large amount of JSX, state, and dummy data. To improve maintainability, readability, and reusability, a componentization strategy was needed.

### Decision
**Refactor DashboardPage.tsx by extracting distinct UI sections into separate, reusable React components** within `frontend/src/components/dashboard/`.

### Rationale
- **Modularity**: Breaks down a large component into smaller, manageable pieces.
- **Reusability**: Individual components (e.g., `Sidebar`, `TopBar`) can be potentially reused elsewhere or easily replaced.
- **Readability**: DashboardPage becomes a high-level orchestrator, making its purpose clearer.
- **Maintainability**: Changes in one UI section are isolated to its component, reducing side effects.
- **Performance**: While not a primary driver for this refactor, smaller components can sometimes offer better render performance in complex applications.

### Components Extracted
- `Sidebar.tsx` (Desktop navigation)
- `MobileSidebar.tsx` (Responsive mobile navigation with overlay)
- `TopBar.tsx` (Header section with user info, search, notifications)
- `SummaryCards.tsx` (Grid of key metric cards)
- `QuickActions.tsx` (Grid of quick action buttons)
- `PortfolioChart.tsx` (Investment performance chart)
- `RecentActivity.tsx` (List of recent user activities)

### Implications
- `DashboardPage.tsx` now primarily manages state, helper functions, and integrates these sub-components.
- Increased number of files but improved overall project structure.
- Clearer separation of concerns.

---

## Decision 18: Dashboard Data and Type Management

**Date**: 26 Juni 2026
**Category**: Frontend Architecture
**Status**: ✅ **APPROVED**
**Phase**: Phase 6.7 - Dashboard Refactor

### Context
With componentization, dummy data (`navItems`, `summaryCards`, `activities`, `quickActions`) and their corresponding TypeScript interfaces were duplicated or spread across multiple files. A centralized approach was needed.

### Decision
**Centralize all Dashboard-specific static dummy data into `frontend/src/components/dashboard/data.tsx`** and **all related TypeScript interfaces into `frontend/src/components/dashboard/types.ts`**. Additionally, a generic helper function `getInitials` was moved to `frontend/src/utils/user.ts` for broader utility.

### Rationale
- **Single Source of Truth**: Eliminates data and type duplication, reducing potential inconsistencies.
- **Improved Maintainability**: Changes to data or types only need to be made in one location.
- **Code Organization**: Keeps related data and types logically grouped.
- **Type Safety**: Ensures all components use consistent, type-safe data structures.
- **Reusability**: Helper functions like `getInitials` are placed in a more appropriate, accessible `utils` directory.

### Implications
- Components now import data and types from these central locations.
- `DashboardPage.tsx` itself also imports from these files.
- `data.tsx` requires a `.tsx` extension due to embedded JSX elements within data structures (e.g., SVG path elements).

---

## Decision 19: Portfolio Service Early Preparation

**Date**: 26 Juni 2026
**Category**: Development Process / Backend Integration
**Status**: ✅ **APPROVED**
**Phase**: Phase 6.8 - Portfolio Module (Infrastructure)

### Context
To streamline future backend integration and prevent last-minute API layer development, it was decided to create the `PortfolioService` and its associated Data Transfer Objects (DTOs) ahead of the planned schedule.

### Decision
**Develop the `PortfolioService` and its DTOs (`PortfolioResponse`, `CreatePortfolioRequest`, `UpdatePortfolioRequest`, `RiskLevel` enum) as a skeletal service layer** during Phase 6.8, even though the corresponding UI and backend endpoints are not yet ready for full integration.

### Rationale
- **Proactive Development**: Anticipates future needs, preventing bottlenecks when UI development begins.
- **Architectural Consistency**: Establishes the service layer pattern for upcoming modules, following `AuthService`'s example.
- **Type Definition**: Provides clear TypeScript types for frontend-backend contracts early, aiding UI development planning.
- **Early Feedback**: Allows for early review of the service layer architecture.

### Implications
- `PortfolioService` and its DTOs are currently unused by the frontend UI.
- Direct calls to `PortfolioService` from UI components will be intentionally postponed.
- Documentation must clearly state that this service is "prepared infrastructure" and "intentionally unused" until the dedicated backend integration phase for the Portfolio module.
- The service will initially handle only frontend-side data validation or mock responses until a live backend is connected.

### Related Decisions
- Decision 3 (Module Architecture - Layered 3-Tier) - reinforces clear service layer definition.
- Decision 12 (Portfolio Cardinality) - `PortfolioResponse` reflects multiple portfolios.
