# Wealth Management System - Conceptual Database Design
## Phase 3 - Level 1 (MVP)

**Document Version**: 1.0  
**Created**: 22 Juni 2026  
**Phase**: Phase 3 - Database Design  
**Scope**: Level 1 (MVP) - Individual Learning Project  
**Database Technology**: MySQL 8.0+

---

## 1. üìã OVERVIEW DATABASE DESIGN

### 1.1 Tujuan Database Design

Desain database Wealth Management System dirancang dengan fokus pada:

1. **Pembelajaran Database Engineering**
   - Relational database design principles
   - Entity-Relationship modeling
   - Normalization (3NF)
   - Foreign key relationships
   - Query optimization

2. **Kesederhanaan & Maintainability**
   - Mudah dipahami single developer
   - Clear entity relationships
   - Minimal complexity
   - Easy to query dan update

3. **MVP Fokus**
   - Hanya entities essensial Level 1
   - No historical tracking (Phase 2+)
   - Calculated fields (runtime, not persisted)
   - No complex dependencies

4. **Scalability Path**
   - Clean design untuk future enhancements
   - Extension points documented
   - Normalization maintained (3NF)

### 1.2 Design Philosophy

- **Normalized Design**: Mengikuti 3NF principles (bukan denormalized JSON untuk MVP)
- **Business-Driven**: Entities merepresentasikan business concepts
- **Query-Focused**: Mudah execute common queries
- **Learning-Friendly**: Clear relationships, understandable structures

---

## 2. üéØ SCOPE LEVEL 1 (MVP)

### 2.1 Fitur yang Didukung Database

‚úÖ **User Management**:
- User registration & authentication
- User profile
- Risk profile assessment

‚úÖ **Portfolio Management**:
- Multiple portfolios per user
- Asset allocation per portfolio
- Portfolio recommendation

‚úÖ **Financial Goals**:
- Multiple goals per user
- Progress tracking (calculated runtime)
- Goal categories

‚úÖ **Dashboard & Reporting**:
- Aggregate data queries
- Portfolio summaries
- Goal progress summaries

### 2.2 Fitur yang TIDAK Termasuk

‚ùå **Historical Tracking**: No goal_progress history table
‚ùå **Transaction Recording**: No transaction ledger
‚ùå **Real-time Pricing**: Static asset prices
‚ùå **Portfolio Rebalancing**: No rebalancing history
‚ùå **Income/Expense Tracking**: Simplified tracking only
‚ùå **Social Features**: No user comparison data

---

## 3. üîç ENTITY IDENTIFICATION

### 3.1 Complete Entity List

**Total Entities**: 6 core entities untuk MVP

```
CORE ENTITIES:
1. user                 - User authentication & profile
2. risk_profile         - Risk assessment data
3. portfolio            - Portfolio (banyak per user)
4. asset                - Master data aset investasi
5. portfolio_asset      - Join table (M:N relationship)
6. financial_goal       - Financial goals user

REMOVED FROM ARCHITECTURE.MD:
‚ùå goal_progress        ‚Üí Calculate at runtime
‚ùå insights             ‚Üí Generate on-demand
‚ùå asset_price          ‚Üí Static price di asset table
‚ùå allocation           ‚Üí Replaced by portfolio_asset join table
```

### 3.2 Entity Purpose Summary

| Entity | Purpose | Scope |
|--------|---------|-------|
| user | Authentication & profile management | MVP |
| risk_profile | Store risk assessment results | MVP |
| portfolio | Store user portfolios (multiple per user) | MVP |
| asset | Master data investment assets | MVP |
| portfolio_asset | Asset allocation dalam portfolio | MVP |
| financial_goal | User financial goals & targets | MVP |

---

## 4. üìä ENTITY DETAILS

### 4.1 Entity 1: USER

**Purpose**: Menyimpan data pengguna sistem untuk authentication dan profile management

**Attributes**:
- `id` - Identifier unik pengguna
- `email` - Email untuk login (unique constraint)
- `password_hash` - Password terenkripsi dengan BCrypt
- `full_name` - Nama lengkap user
- `created_at` - Timestamp registrasi
- `updated_at` - Timestamp update terakhir

**Primary Key**: `id`

**Unique Constraints**:
- `email` (required untuk login)

**Relationships**:
- 1:1 dengan RiskProfile
- 1:N dengan Portfolio (user bisa punya banyak portfolio)
- 1:N dengan FinancialGoal

**Design Notes**:
- Minimal attributes untuk MVP (no phone, address, birth_date)
- Email sebagai natural identifier untuk login
- Password harus di-hash dengan BCrypt (minimum 10 rounds)
- created_at/updated_at untuk audit trail

**Sample Data**:
```
id: 1
email: john.doe@email.com
password_hash: $2b$10$xyz...
full_name: John Doe
created_at: 2026-06-22 10:00:00
updated_at: 2026-06-22 10:00:00
```

---

### 4.2 Entity 2: RISK_PROFILE

**Purpose**: Menyimpan hasil risk assessment pengguna untuk portfolio recommendation

**Attributes**:
- `id` - Identifier unik
- `user_id` - Reference ke user (FK, UNIQUE)
- `risk_level` - Risk level: LOW / MEDIUM / HIGH
- `time_horizon_years` - Investment timeline (contoh: 3, 5, 10)
- `investment_goal_type` - Tipe goal: Retirement, Education, Property, etc.
- `risk_score` - Numeric score dari questionnaire (0-100)
- `assessment_data` - JSON raw answers dari questionnaire
- `created_at` - Timestamp assessment
- `updated_at` - Timestamp update

**Primary Key**: `id`

**Foreign Key**: `user_id` ‚Üí user.id (UNIQUE constraint - 1:1 relationship)

**Relationships**:
- N:1 dengan User (belongs to)
- Influencing data untuk Portfolio recommendation

**Design Notes**:
- 1 user = 1 risk profile (UNIQUE constraint on user_id)
- Risk level digunakan untuk rules-based recommendation
- JSON column untuk flexibility (questions bisa berubah)
- Bisa di-update kalau user redo assessment

**Sample Data**:
```
id: 1
user_id: 1
risk_level: MEDIUM
time_horizon_years: 5
investment_goal_type: Retirement
risk_score: 65
assessment_data: {
  "questions": [
    {"id": 1, "answer": "A"},
    {"id": 2, "answer": "B"}
  ]
}
created_at: 2026-06-22 10:30:00
updated_at: 2026-06-22 10:30:00
```

---

### 4.3 Entity 3: PORTFOLIO

**Purpose**: Menyimpan portfolio investasi user (user bisa punya multiple portfolios)

**Attributes**:
- `id` - Identifier unik portfolio
- `user_id` - Reference ke user (FK)
- `portfolio_name` - Nama portfolio yang diberi user
- `risk_level` - Risk level portfolio: LOW / MEDIUM / HIGH
- `expected_return_percentage` - Expected annual return
- `recommendation_text` - Penjelasan/rekomendasi untuk user
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update

**Primary Key**: `id`

**Foreign Key**: `user_id` ‚Üí user.id

**Relationships**:
- N:1 dengan User (many portfolios per user)
- M:N dengan Asset melalui PortfolioAsset (portfolio contains many assets)

**Design Notes**:
- **User bisa punya multiple portfolios** (flexible strategy)
- portfolio_name untuk distinguish antar portfolios
- No "active" flag di MVP (semua portfolio equal status)
- total_value bisa calculated on-demand dari PortfolioAsset
- No hard limit jumlah portfolio per user

**Use Case Multiple Portfolios**:
```
User 1:
- Portfolio "Conservative Retirement" (70% bonds, 20% stocks, 10% cash)
- Portfolio "Aggressive Growth" (80% stocks, 15% bonds, 5% cash)
- Portfolio "Balanced Fund" (50% stocks, 40% bonds, 10% cash)
```

**Sample Data**:
```
id: 1
user_id: 1
portfolio_name: Conservative Retirement
risk_level: LOW
expected_return_percentage: 4.5
recommendation_text: "Portfolio dengan risiko rendah cocok untuk near-term retirement"
created_at: 2026-06-22 10:45:00
updated_at: 2026-06-22 10:45:00
```

---

### 4.4 Entity 4: ASSET

**Purpose**: Master data aset investasi yang tersedia untuk dialokasikan ke portfolio

**Attributes**:
- `id` - Identifier unik
- `asset_name` - Nama asset (contoh: "Vanguard S&P 500 ETF")
- `asset_type` - Tipe: STOCK / BOND / CASH / MUTUAL_FUND / ETF
- `asset_code` - Ticker/code (contoh: "VOO", "AGG")
- `description` - Deskripsi asset
- `current_price` - Harga saat ini (STATIC untuk MVP)
- `expected_annual_return` - Historical average return
- `risk_category` - Kategori risiko: LOW / MEDIUM / HIGH
- `is_active` - Flag enable/disable asset
- `created_at` - Timestamp
- `updated_at` - Timestamp

**Primary Key**: `id`

**Unique Constraints**:
- `asset_code` (ticker harus unique)

**Relationships**:
- M:N dengan Portfolio melalui PortfolioAsset

**Design Notes**:
- Master data (seeded saat aplikasi setup)
- current_price **STATIC** untuk MVP (no real-time market data)
- risk_category untuk filtering saat recommendation
- is_active untuk soft delete (bukan hard delete)

**Sample Data**:
```
id: 1
asset_name: Vanguard S&P 500 ETF
asset_type: ETF
asset_code: VOO
description: Tracks S&P 500 index
current_price: 400000
expected_annual_return: 10.0
risk_category: HIGH
is_active: true
created_at: 2026-06-01 00:00:00
updated_at: 2026-06-01 00:00:00
```


---

### 4.5 Entity 5: PORTFOLIO_ASSET (Join Table)

**Purpose**: Relasi many-to-many antara Portfolio dan Asset dengan allocation percentage

**Attributes**:
- `id` - Identifier unik
- `portfolio_id` - Reference ke Portfolio (FK)
- `asset_id` - Reference ke Asset (FK)
- `allocation_percentage` - Persentase alokasi (contoh: 50.00)
- `allocated_amount` - Jumlah uang dialokasikan (optional, calculated)
- `created_at` - Timestamp
- `updated_at` - Timestamp

**Primary Key**: `id`

**Foreign Keys**:
- `portfolio_id` ? portfolio.id
- `asset_id` ? asset.id

**Unique Constraints**:
- (portfolio_id, asset_id) - Satu asset hanya bisa sekali per portfolio

**Relationships**:
- N:1 dengan Portfolio (many allocations belong to one portfolio)
- N:1 dengan Asset (many allocations reference one asset)

**Design Notes**:
- **Join table dengan business data** (allocation_percentage)
- Normalized design (bukan JSON column) untuk better queryability
- Unique constraint prevent duplicate asset dalam satu portfolio
- allocated_amount optional (bisa calculate: total_value * percentage)
- SUM(allocation_percentage) per portfolio harus = 100%

**Example Data**:
```
Portfolio 1 (Conservative):
id: 1, portfolio_id: 1, asset_id: 1 (VOO), allocation_percentage: 20.00
id: 2, portfolio_id: 1, asset_id: 2 (AGG), allocation_percentage: 70.00
id: 3, portfolio_id: 1, asset_id: 3 (CASH), allocation_percentage: 10.00

Portfolio 2 (Aggressive):
id: 4, portfolio_id: 2, asset_id: 1 (VOO), allocation_percentage: 80.00
id: 5, portfolio_id: 2, asset_id: 2 (AGG), allocation_percentage: 15.00
id: 6, portfolio_id: 2, asset_id: 3 (CASH), allocation_percentage: 5.00
```

**Query Patterns**:
```
-- Get portfolio composition
SELECT a.asset_name, pa.allocation_percentage
FROM portfolio_asset pa
JOIN asset a ON pa.asset_id = a.id
WHERE pa.portfolio_id = ?

-- Validate total allocation = 100%
SELECT SUM(allocation_percentage) as total
FROM portfolio_asset
WHERE portfolio_id = ?
-- Expected: 100.00

-- Find portfolios containing specific asset
SELECT p.portfolio_name, pa.allocation_percentage
FROM portfolio p
JOIN portfolio_asset pa ON p.id = pa.portfolio_id
WHERE pa.asset_id = ?
```

---

### 4.6 Entity 6: FINANCIAL_GOAL

**Purpose**: Tujuan keuangan user dengan progress tracking (calculated runtime)

**Attributes**:
- `id` - Identifier unik
- `user_id` - Reference ke user (FK)
- `goal_name` - Nama goal (contoh: "House Down Payment")
- `target_amount` - Target jumlah uang
- `target_date` - Target tanggal completion
- `category` - Kategori: RETIREMENT / EDUCATION / PROPERTY / EMERGENCY / OTHER
- `current_savings` - Current saved amount
- `monthly_contribution` - Monthly savings rate
- `created_at` - Timestamp
- `updated_at` - Timestamp

**CALCULATED FIELDS (NOT STORED - Runtime Calculation)**:
- `current_progress_percentage` = (current_savings / target_amount) * 100
- `status` = ON_TRACK / AT_RISK / OFF_TRACK
- `projected_completion_date` = NOW() + months_to_target
- `months_to_target` = (target_amount - current_savings) / monthly_contribution

**Primary Key**: `id`

**Foreign Key**: `user_id` ? user.id

**Relationships**:
- N:1 dengan User (many goals per user)
- **NO direct relationship dengan Portfolio** (per keputusan final)

**Design Notes**:
- Goal **tidak terhubung ke Portfolio** (independent)
- Progress **calculated runtime** (tidak disimpan) untuk always fresh data
- No historical tracking di MVP (Phase 2+ feature)
- Status calculated berdasarkan projected vs target date
- Insights generated on-demand (tidak disimpan di database)

**Progress Calculation Logic**:
```
current_progress_percentage = (current_savings / target_amount) * 100

months_to_target = (target_amount - current_savings) / monthly_contribution

projected_completion_date = NOW() + months_to_target months

IF projected_completion_date <= target_date:
  status = ON_TRACK
ELSE IF projected_completion_date <= target_date + 6 months:
  status = AT_RISK
ELSE:
  status = OFF_TRACK
```

**Sample Data**:
```
id: 1
user_id: 1
goal_name: House Down Payment
target_amount: 500000000
target_date: 2030-12-31
category: PROPERTY
current_savings: 50000000
monthly_contribution: 5000000
created_at: 2026-06-22 11:00:00
updated_at: 2026-06-22 11:00:00

-- Calculated at runtime:
current_progress_percentage: 10.00
months_to_target: 90
projected_completion_date: 2033-12-22
status: OFF_TRACK (projected > target + 6 months)
```

---

## 5. ?? PRIMARY KEY DAN FOREIGN KEY

### 5.1 Primary Key Summary

| Entity | Primary Key | Type | Notes |
|--------|-------------|------|-------|
| user | id | Auto-increment | Surrogate key |
| risk_profile | id | Auto-increment | Surrogate key |
| portfolio | id | Auto-increment | Surrogate key |
| asset | id | Auto-increment | Surrogate key |
| portfolio_asset | id | Auto-increment | Surrogate key |
| financial_goal | id | Auto-increment | Surrogate key |

**Design Decision**: Semua entities menggunakan **surrogate key** (id auto-increment)

**Alasan**:
- Consistency across all tables
- No dependency on business data (email, asset_code bisa berubah)
- Better join performance (integer vs string)
- Standard practice di Spring Boot JPA

---

### 5.2 Foreign Key Relationships

#### **Foreign Key 1: risk_profile.user_id ? user.id**

**Relationship**: 1:1 (One-to-One)

**Constraint**: UNIQUE on risk_profile.user_id

**Cascade Behavior**:
- ON DELETE CASCADE (delete risk_profile jika user deleted)
- ON UPDATE CASCADE (update jika user.id changed - unlikely)

**Business Logic**:
- Satu user hanya punya satu risk profile
- Risk profile tidak bisa exist tanpa user

---

#### **Foreign Key 2: portfolio.user_id ? user.id**

**Relationship**: 1:N (One-to-Many)

**Constraint**: NO UNIQUE (user bisa punya banyak portfolio)

**Cascade Behavior**:
- ON DELETE CASCADE (delete semua portfolios jika user deleted)
- ON UPDATE CASCADE

**Business Logic**:
- User bisa punya multiple portfolios
- Portfolio tidak bisa exist tanpa user

---

#### **Foreign Key 3: portfolio_asset.portfolio_id ? portfolio.id**

**Relationship**: N:1 (Many-to-One)

**Constraint**: Part of UNIQUE(portfolio_id, asset_id)

**Cascade Behavior**:
- ON DELETE CASCADE (delete allocations jika portfolio deleted)
- ON UPDATE CASCADE

**Business Logic**:
- Portfolio contains many asset allocations
- Allocation tidak bisa exist tanpa portfolio

---

#### **Foreign Key 4: portfolio_asset.asset_id ? asset.id**

**Relationship**: N:1 (Many-to-One)

**Constraint**: Part of UNIQUE(portfolio_id, asset_id)

**Cascade Behavior**:
- ON DELETE RESTRICT (prevent delete asset jika masih ada allocations)
- ON UPDATE CASCADE

**Business Logic**:
- Asset bisa referenced di many portfolio allocations
- Master data asset harus protected (tidak bisa delete sembarangan)

---

#### **Foreign Key 5: financial_goal.user_id ? user.id**

**Relationship**: 1:N (One-to-Many)

**Constraint**: NO UNIQUE (user bisa punya banyak goals)

**Cascade Behavior**:
- ON DELETE CASCADE (delete semua goals jika user deleted)
- ON UPDATE CASCADE

**Business Logic**:
- User bisa punya multiple financial goals
- Goal tidak bisa exist tanpa user

---

### 5.3 Foreign Key Summary Table

| FK Name | From Table | From Column | To Table | To Column | Cardinality | Cascade Delete |
|---------|------------|-------------|----------|-----------|-------------|----------------|
| FK_risk_profile_user | risk_profile | user_id | user | id | 1:1 | CASCADE |
| FK_portfolio_user | portfolio | user_id | user | id | 1:N | CASCADE |
| FK_portfolio_asset_portfolio | portfolio_asset | portfolio_id | portfolio | id | N:1 | CASCADE |
| FK_portfolio_asset_asset | portfolio_asset | asset_id | asset | id | N:1 | RESTRICT |
| FK_financial_goal_user | financial_goal | user_id | user | id | 1:N | CASCADE |

---

## 6. ?? CARDINALITY SELURUH RELASI

### 6.1 Complete Cardinality Matrix

| Entity 1 | Cardinality | Entity 2 | Via Join Table | Alasan |
|----------|-------------|----------|----------------|--------|
| user | 1:1 | risk_profile | No | 1 user = 1 risk profile (UNIQUE) |
| user | 1:N | portfolio | No | User bisa punya banyak portfolio |
| user | 1:N | financial_goal | No | User bisa punya banyak goals |
| portfolio | M:N | asset | Yes (portfolio_asset) | Portfolio contains many assets, asset di many portfolios |
| financial_goal | NONE | portfolio | No | **No relationship** - independent |


### 6.2 Cardinality Diagram

```
user (1) ?----------? (1) risk_profile     [One-to-One]
user (1) ?----------? (N) portfolio        [One-to-Many]
user (1) ?----------? (N) financial_goal   [One-to-Many]

portfolio (M) ?------? (N) asset           [Many-to-Many via portfolio_asset]
                ¶
                ¶ JOIN TABLE
                ?
        portfolio_asset
        (portfolio_id, asset_id, allocation_percentage)

financial_goal  ?  portfolio               [No Relationship]
```

---

## 7. ?? PENJELASAN ALASAN SETIAP RELASI

### 7.1 Relasi 1: User ? RiskProfile (1:1)

**Cardinality**: One-to-One

**Diagram**:
```
user (1) ?------- user_id (UNIQUE) -----? (1) risk_profile
```

**Alasan Business**:
- Risk profile adalah foundational assessment untuk portfolio recommendation
- User hanya perlu 1 profile untuk generate recommendations
- Jika user redo assessment ? update existing profile (bukan create new)
- Simplicity: No ambiguity mana profile yang "current"

**Alasan Technical**:
- UNIQUE constraint pada risk_profile.user_id enforce 1:1 relationship
- Simple query: `SELECT * FROM risk_profile WHERE user_id = ?`
- Foreign key dengan CASCADE delete (jika user deleted, risk_profile ikut deleted)

**Query Example**:
```
-- Get user dengan risk profile
SELECT u.*, rp.risk_level, rp.time_horizon_years
FROM user u
LEFT JOIN risk_profile rp ON u.id = rp.user_id
WHERE u.id = ?
```

**Trade-offs**:
- ? Tidak bisa track historical risk profile changes
- ? Acceptable untuk MVP - historical tracking adalah Level 2 feature
- ? Simpler data model, easier to understand

---

### 7.2 Relasi 2: User ? Portfolio (1:N)

**Cardinality**: One-to-Many

**Diagram**:
```
user (1) ?------- user_id -----? (N) portfolio
```

**Alasan Business**:
- **User flexibility**: User bisa experiment dengan different investment strategies
- Multiple portfolios untuk different risk tolerances (Conservative, Balanced, Aggressive)
- Multiple portfolios untuk different time horizons (Short-term, Long-term)
- User bisa create, compare, dan choose portfolio yang cocok
- No limit berapa portfolio per user di MVP

**Alasan Technical**:
- Simple foreign key: portfolio.user_id ? user.id (NO UNIQUE constraint)
- Easy to query all portfolios: `WHERE user_id = ?`
- No "active" flag needed - semua portfolio equal status
- CASCADE delete: jika user deleted, semua portfolios ikut deleted

**Use Case Example**:
```
User John:
- Portfolio 1: "Conservative Retirement" (70% bonds, 20% stocks, 10% cash)
- Portfolio 2: "Aggressive Growth" (80% stocks, 15% bonds, 5% cash)
- Portfolio 3: "Balanced Education Fund" (50% stocks, 40% bonds, 10% cash)
```

**Query Example**:
```
-- Get all portfolios untuk user
SELECT * FROM portfolio WHERE user_id = ? ORDER BY created_at DESC

-- Count portfolios per user
SELECT user_id, COUNT(*) as portfolio_count
FROM portfolio
GROUP BY user_id
```

**Trade-offs**:
- ? Flexibility untuk user experimentation
- ? Support future features (portfolio comparison, backtesting)
- ? Dashboard complexity (show which portfolio?) ? Solve dengan sorting atau user selection
- ? Better than 1:1 relationship untuk learning & real-world scenarios

---

### 7.3 Relasi 3: Portfolio ? Asset (M:N via PortfolioAsset)

**Cardinality**: Many-to-Many dengan Join Table

**Diagram**:
```
portfolio (M) ?------? (N) asset
                ¶
                ¶ via portfolio_asset
                ¶ (portfolio_id, asset_id, allocation_percentage)
```

**Alasan Business**:
- **Portfolio composition**: Satu portfolio contains banyak assets (stocks, bonds, cash)
- **Asset reusability**: Satu asset (contoh: VOO) bisa ada di banyak portfolios
- **Different allocations**: Portfolio A: 20% VOO, Portfolio B: 80% VOO
- **Business data**: allocation_percentage adalah core business data (harus disimpan)

**Alasan Technical**:
- **JOIN TABLE NECESSARY** karena ada attribute tambahan (allocation_percentage)
- Normalized design (bukan JSON column) ? better queryability
- UNIQUE constraint (portfolio_id, asset_id) prevent duplicate asset dalam portfolio
- Cascade behavior: DELETE portfolio ? delete allocations, RESTRICT delete asset

**Why NOT JSON Column**:
- ? JSON: Hard to query, aggregate, validate
- ? Join Table: Easy to query, update, validate SUM = 100%
- ? Join Table: Better for learning relational database concepts

**Query Examples**:
```
-- Get portfolio composition
SELECT a.asset_name, a.asset_type, pa.allocation_percentage
FROM portfolio_asset pa
JOIN asset a ON pa.asset_id = a.id
WHERE pa.portfolio_id = ?
ORDER BY pa.allocation_percentage DESC

-- Validate total allocation = 100%
SELECT portfolio_id, SUM(allocation_percentage) as total_allocation
FROM portfolio_asset
GROUP BY portfolio_id
HAVING total_allocation != 100.00

-- Find portfolios containing specific asset
SELECT p.portfolio_name, p.user_id, pa.allocation_percentage
FROM portfolio p
JOIN portfolio_asset pa ON p.id = pa.portfolio_id
WHERE pa.asset_id = ?
ORDER BY pa.allocation_percentage DESC

-- Calculate portfolio total value
SELECT p.id, p.portfolio_name,
       SUM(pa.allocation_percentage * a.current_price) / 100 as estimated_value
FROM portfolio p
JOIN portfolio_asset pa ON p.id = pa.portfolio_id
JOIN asset a ON pa.asset_id = a.id
WHERE p.id = ?
GROUP BY p.id, p.portfolio_name
```

**Trade-offs**:
- ? Queryable, updateable, normalized
- ? Support complex analytics queries
- ? Data integrity enforced (FK constraints)
- ? Sedikit lebih complex daripada JSON (tapi worth it untuk learning)

---

### 7.4 Relasi 4: User ? FinancialGoal (1:N)

**Cardinality**: One-to-Many

**Diagram**:
```
user (1) ?------- user_id -----? (N) financial_goal
```

**Alasan Business**:
- User naturally punya multiple financial goals (retirement, education, property, emergency)
- Each goal independent dengan timeline & target amount sendiri
- Goals adalah "why" user invest (motivation tracking)
- No limit jumlah goals per user

**Alasan Technical**:
- Simple foreign key: financial_goal.user_id ? user.id
- Easy to query all goals: `WHERE user_id = ?`
- Progress calculated at runtime (no separate table)
- CASCADE delete: jika user deleted, semua goals ikut deleted

**Query Examples**:
```
-- Get all goals untuk user
SELECT * FROM financial_goal WHERE user_id = ? ORDER BY target_date ASC

-- Get goals by category
SELECT * FROM financial_goal
WHERE user_id = ? AND category = 'RETIREMENT'

-- Get goals summary (dengan calculated fields di application layer)
SELECT goal_name, target_amount, current_savings, monthly_contribution,
       (current_savings / target_amount * 100) as progress_percentage
FROM financial_goal
WHERE user_id = ?
```

**Trade-offs**:
- ? Simple relationship, easy to understand
- ? Goals independent dari portfolio (flexibility)
- ? No direct link ke portfolio ? cannot track "which portfolio funds which goal"
- ? Acceptable untuk MVP

---

### 7.5 Relasi 5: FinancialGoal ? Portfolio (NO RELATIONSHIP)

**Keputusan**: Goal dan Portfolio **TIDAK terhubung** di MVP

**Diagram**:
```
financial_goal     portfolio
       ?  NO FOREIGN KEY  ?
```

**Alasan Business**:
- **Separation of concerns**: Goal = financial planning target, Portfolio = investment strategy
- User bisa punya goal tanpa portfolio (just savings tracking)
- User bisa punya portfolio tanpa specific goal (general investment)
- Linking adds complexity untuk MVP - not essential

**Alasan Technical**:
- Simpler queries (no JOIN between goal & portfolio)
- Dashboard aggregation easier (show all goals, show all portfolios separately)
- Progress calculation independent dari portfolio performance
- No foreign key constraint needed

**Alternative Design (NOT Implemented)**:
```
-- Jika ada relationship (Level 2+):
goal_portfolio (join table)
- goal_id ? financial_goal.id
- portfolio_id ? portfolio.id
- contribution_percentage (berapa % dari portfolio untuk goal ini)
```

**Trade-offs**:
- ? Cannot answer: "Which portfolio is funding this goal?"
- ? Cannot track: "Goal progress based on portfolio Y performance"
- ? Acceptable untuk MVP - advanced goal-portfolio tracking adalah Level 2 feature
- ? Simpler MVP implementation

**Future Enhancement (Level 2)**:
- Add goal_portfolio join table (M:N relationship)
- Track which portfolios contribute to which goals
- Calculate goal progress based on portfolio performance
- More sophisticated financial planning


---

## 8. ?? ASCII ERD DIAGRAM

### 8.1 Conceptual Entity Relationship Diagram

```
+--------------------------------------------------------------------------+
¶                   WEALTH MANAGEMENT SYSTEM - ERD                          ¶
¶                      Conceptual Database Design                           ¶
¶                              Level 1 (MVP)                                ¶
+--------------------------------------------------------------------------+


                            +-----------------+
                            ¶      USER       ¶
                            +-----------------¶
                            ¶ PK: id          ¶
                            ¶    email (U)    ¶
                            ¶    pwd_hash     ¶
                            ¶    full_name    ¶
                            ¶    created_at   ¶
                            ¶    updated_at   ¶
                            +-----------------+
                                     ¶
                    +----------------+----------------+
                    ¶                ¶                ¶
              1:1 (U)              1:N              1:N
                    ¶                ¶                ¶
        +-----------?------+    +----?----------+  +-?----------------+
        ¶  RISK_PROFILE    ¶    ¶   PORTFOLIO   ¶  ¶ FINANCIAL_GOAL   ¶
        +------------------¶    +---------------¶  +------------------¶
        ¶ PK: id           ¶    ¶ PK: id        ¶  ¶ PK: id           ¶
        ¶ FK: user_id (U)  ¶    ¶ FK: user_id   ¶  ¶ FK: user_id      ¶
        ¶    risk_level    ¶    ¶    name       ¶  ¶    name          ¶
        ¶    time_horizon  ¶    ¶    risk_level ¶  ¶    target_amount ¶
        ¶    goal_type     ¶    ¶    exp_return ¶  ¶    target_date   ¶
        ¶    risk_score    ¶    ¶    created_at ¶  ¶    category      ¶
        ¶    assessment    ¶    ¶    updated_at ¶  ¶    curr_savings  ¶
        ¶    created_at    ¶    +---------------+  ¶    monthly_$     ¶
        ¶    updated_at    ¶             ¶         ¶    created_at    ¶
        +------------------+             ¶         ¶    updated_at    ¶
                                    M:N ¶         +------------------+
                                         ¶
                        +----------------?-----------------+
                        ¶   PORTFOLIO_ASSET (Join Table)   ¶
                        +--------------------------------¶
                        ¶ PK: id                         ¶
                        ¶ FK: portfolio_id               ¶
                        ¶ FK: asset_id                   ¶
                        ¶    allocation_percentage       ¶
                        ¶    allocated_amount (opt)      ¶
                        ¶    created_at                  ¶
                        ¶    updated_at                  ¶
                        +---------------------------------+
                                     ¶
                                     ¶ N:1
                                     ¶
                        +------------?----------+
                        ¶      ASSET           ¶
                        +----------------------¶
                        ¶ PK: id               ¶
                        ¶    name              ¶
                        ¶    type              ¶
                        ¶    code (U)          ¶
                        ¶    description       ¶
                        ¶    current_price     ¶
                        ¶    exp_annual_ret    ¶
                        ¶    risk_category     ¶
                        ¶    is_active         ¶
                        ¶    created_at        ¶
                        ¶    updated_at        ¶
                        +----------------------+


LEGEND:
-----------  : Foreign Key relationship
PK           : Primary Key
FK           : Foreign Key
(U)          : UNIQUE constraint
1:1          : One-to-One
1:N          : One-to-Many
M:N          : Many-to-Many
?--------?   : Relationship line (? = parent, ? = child)
```

### 8.2 Relationship Summary

`
RELATIONSHIPS:

1. User (1) ------- (1) RiskProfile
   +- FK: risk_profile.user_id
   +- Constraint: UNIQUE (1:1 enforcement)
   +- Cascade: DELETE

2. User (1) ------- (N) Portfolio
   +- FK: portfolio.user_id
   +- Cascade: DELETE

3. User (1) ------- (N) FinancialGoal
   +- FK: financial_goal.user_id
   +- Cascade: DELETE

4. Portfolio (M) ---- (N) Asset (via PortfolioAsset)
   +- FK: portfolio_asset.portfolio_id ? portfolio.id (Cascade DELETE)
   +- FK: portfolio_asset.asset_id ? asset.id (Restrict DELETE)

5. FinancialGoal ? Portfolio
   +- NO RELATIONSHIP (independent)
`

### 8.3 Entity Connection Map

`
                        USER
                         ¶
             +-----------+-----------+
             ¶           ¶           ¶
        creates    assesses    tracks
             ¶           ¶           ¶
             ?           ?           ?
         PORTFOLIO  RISK_PROFILE  FINANCIAL_GOAL
             ¶
      contains many
             ¶
             ?
      PORTFOLIO_ASSET ?---- references ----? ASSET
                                          (master data)
`

---

## 9. ?? DESIGN DECISIONS

### 9.1 Multiple Portfolios per User (1:N vs 1:1)

**Decision**: User dapat memiliki **banyak portfolio** (1:N relationship)

**Rationale**:
- **Flexibility**: User bisa experiment dengan different investment strategies
- **Learning Value**: Better representation of real-world scenarios
- **Use Cases**:
  - Conservative portfolio untuk near-term goals
  - Aggressive portfolio untuk long-term growth
  - Different portfolios untuk different life stages
- **No Complexity**: Just simple foreign key, no additional complexity

**Trade-offs**:
- ? Better than 1:1 untuk real-world scenarios
- ? Dashboard might show multiple portfolios (need to handle in UI)
- ? Future feature: portfolio comparison

**Why NOT 1:1 (Original ARCHITECTURE.md)**:
- ? Too restrictive untuk user experimentation
- ? Doesn't reflect real wealth management practices
- ? Limited learning value

---

### 9.2 Portfolio ? Asset: Join Table vs JSON Column

**Decision**: Use **normalized join table** (portfolio_asset) dengan allocation_percentage

**Rationale**:
- **Queryability**: Easy to query, aggregate, validate
- **Data Integrity**: UNIQUE constraint prevent duplicates
- **Normalization**: 3NF compliance
- **Calculation Support**: Easy to validate SUM = 100%
- **Learning Value**: Demonstrates M:N relationships with data attributes

**Join Table Attributes**:
- portfolio_id (FK)
- asset_id (FK)
- allocation_percentage (business data)
- allocated_amount (optional, calculated)

**Why NOT JSON Column**:
- ? Hard to query (JSON_SEARCH, JSON_EXTRACT)
- ? Hard to validate total allocation
- ? Hard to aggregate (SUM allocations)
- ? Less relational database practice

**Query Examples**:
`sql
-- Easy to validate
SELECT SUM(allocation_percentage) FROM portfolio_asset
WHERE portfolio_id = ? GROUP BY portfolio_id

-- Easy to aggregate
SELECT asset_id, COUNT(*) as usage_count
FROM portfolio_asset GROUP BY asset_id

-- Easy to update
UPDATE portfolio_asset
SET allocation_percentage = 25
WHERE portfolio_id = ? AND asset_id = ?
`

---

### 9.3 No Goal-Portfolio Link

**Decision**: Financial Goal dan Portfolio **TIDAK terhubung** di MVP

**Rationale**:
- **Separation of Concerns**: Goal = planning, Portfolio = strategy
- **Simplicity**: No additional join table needed
- **Independence**: User bisa punya goal tanpa portfolio
- **MVP Focus**: Not essential untuk Level 1

**Why NOT Link**:
- ? Adds complexity untuk MVP
- ? Requires additional join table (goal_portfolio)
- ? Not essential untuk core MVP features

**When to Add (Level 2+)**:
- Track "which portfolio funds which goal"
- Calculate goal progress based on portfolio performance
- Advanced financial planning features

---

### 9.4 Calculated Fields (Runtime, Not Persisted)

**Decision**: Goal progress dan status **calculated at runtime**, not stored in database

**Calculated Fields**:
- current_progress_percentage
- status (ON_TRACK/AT_RISK/OFF_TRACK)
- projected_completion_date
- months_to_target

**Rationale**:
- **Always Fresh**: Reflects latest data setiap saat
- **Simpler Schema**: No goal_progress history table
- **Performance**: Calculation sangat lightweight (milliseconds)
- **Data Integrity**: Single source of truth (goal data)

**Calculation Location**: Application layer (Spring Boot Service)

`java
// GoalService.java - calculateProgress()
double progress = (currentSavings / targetAmount) * 100;
int monthsToTarget = (targetAmount - currentSavings) / monthlySavings;
LocalDate projectedDate = LocalDate.now().plusMonths(monthsToTarget);
String status = (projectedDate <= targetDate) ? "ON_TRACK" : "OFF_TRACK";
`

**Why NOT Persisted**:
- ? Would need goal_progress history table
- ? Redundant data (can be calculated)
- ? History tracking adalah Level 2 feature

---

### 9.5 Static Asset Pricing

**Decision**: Asset current_price adalah **STATIC field**, bukan dari real-time API

**Rationale**:
- **MVP Focus**: Wealth Management adalah planning-focused, bukan trading platform
- **Simplicity**: No external API dependencies
- **Reliability**: No API rate limiting, uptime concerns
- **Testing**: Reproducible scenarios untuk testing
- **Learning**: Focus on core architecture, not market data integration

**Update Strategy**:
- Manual update by admin (weekly/monthly)
- No real-time price sync
- Static seed data sufficient untuk MVP

**When to Add (Level 2+)**:
- Real-time market data integration
- Historical price tracking
- Portfolio performance calculation


---

### 9.6 Surrogate Keys (Auto-increment ID)

**Decision**: Semua entities menggunakan **surrogate key** (id auto-increment)

**Rationale**:
- **Consistency**: All tables follow same pattern
- **Independence**: No dependency on business data
- **Performance**: Integer joins faster than string/composite keys
- **Flexibility**: Business keys (email, asset_code) bisa berubah
- **JPA Standard**: Default pattern untuk Spring Boot JPA entities

**Why NOT Natural Keys**:
- ? Email bisa berubah (user update email)
- ? Asset_code bisa berubah (ticker renaming)
- ? Composite keys lebih complex untuk joins

---

### 9.7 Cascade Delete Behavior

**Decision**: Cascade delete untuk **user-owned entities**, restrict untuk **master data**

**Cascade Rules**:
```
User deleted:
  ? CASCADE: Delete risk_profile
  ? CASCADE: Delete portfolios
  ? CASCADE: Delete financial_goals
  
Portfolio deleted:
  ? CASCADE: Delete portfolio_assets

Asset deleted:
  ? RESTRICT: Prevent delete if referenced in portfolio_assets
```

**Rationale**:
- User-owned data harus ikut terhapus (data privacy)
- Master data (assets) harus protected (prevent accidental delete)
- Business rule: Cannot delete asset if still in use

---

## 10. ?? NORMALIZATION CONSIDERATIONS

### 10.1 Target Normalization Level

**Target**: **3rd Normal Form (3NF)** untuk MVP

**Definition**:
- **1NF**: Atomic values, no repeating groups
- **2NF**: No partial dependencies on composite keys
- **3NF**: No transitive dependencies (non-key ? non-key)

---

### 10.2 Normalization Assessment per Entity

#### **Entity: user**

? **1NF**: All columns atomic
- No multi-valued attributes
- Each column contains single value

? **2NF**: No partial dependencies
- Single primary key (id)
- All attributes fully dependent on id

? **3NF**: No transitive dependencies
- email, password_hash, full_name directly depend on id
- No non-key attribute depends on another non-key attribute

**Conclusion**: **Complies with 3NF**

---

#### **Entity: risk_profile**

? **1NF**: All columns atomic except assessment_data (JSON - acceptable)

? **2NF**: No partial dependencies
- Single primary key (id)
- All attributes depend on id

? **3NF**: No transitive dependencies
- risk_level calculated dari risk_score (acceptable - derived attribute)
- No problematic transitive dependencies

**Conclusion**: **Complies with 3NF**

**Note**: JSON column (assessment_data) adalah acceptable untuk flexibility

---

#### **Entity: portfolio**

? **1NF**: All columns atomic

? **2NF**: No partial dependencies
- Single primary key (id)

? **3NF**: No transitive dependencies
- All attributes directly depend on portfolio id
- user_id adalah foreign key (acceptable)

**Conclusion**: **Complies with 3NF**

---

#### **Entity: asset**

? **1NF**: All columns atomic

? **2NF**: No partial dependencies

? **3NF**: No transitive dependencies
- expected_annual_return independent dari risk_category
- current_price independent dari other attributes

**Conclusion**: **Complies with 3NF**

---

#### **Entity: portfolio_asset**

? **1NF**: All columns atomic

? **2NF**: No partial dependencies
- Single primary key (id)
- Composite UNIQUE (portfolio_id, asset_id)

? **3NF**: No transitive dependencies
- allocation_percentage directly represents relationship
- allocated_amount adalah calculated field (optional)

**Conclusion**: **Complies with 3NF**

**Note**: Join table dengan business data (allocation_percentage) adalah proper normalized design

---

#### **Entity: financial_goal**

? **1NF**: All columns atomic

? **2NF**: No partial dependencies

? **3NF**: No transitive dependencies
- current_savings, monthly_contribution independent attributes
- target_amount, target_date independent attributes

**Calculated Fields (NOT STORED)**:
- current_progress_percentage
- status
- projected_completion_date

**Conclusion**: **Complies with 3NF**

**Note**: Calculated fields NOT persisted = proper normalization

---

### 10.3 Denormalization Decisions

**No Denormalization di MVP** - All entities properly normalized

**Potential Denormalization (NOT Implemented)**:
- ? Store portfolio.total_value ? Calculate on-demand
- ? Store goal.current_progress ? Calculate at runtime
- ? Cache aggregate data ? Not needed untuk MVP scale

**Reason**: Proper normalization is priority untuk learning project

---

### 10.4 Data Redundancy Assessment

**Intentional Redundancy** (Acceptable):
- portfolio.risk_level bisa derived dari user.risk_profile
  - Reason: Portfolio bisa punya risk level berbeda dari user profile
  - Not true redundancy - independent attribute

**No Problematic Redundancy Found**

---

## 11. ?? FUTURE EXTENSIONS (LEVEL 2 & 3)

### 11.1 Level 2 Features (Professional Enhancement)

#### **Enhancement 1: Historical Tracking**

**New Entities**:
```
goal_progress_history
- id (PK)
- goal_id (FK)
- progress_percentage
- status
- recorded_at

portfolio_value_history
- id (PK)
- portfolio_id (FK)
- total_value
- recorded_at
```

**Purpose**: Track progress changes over time

---

#### **Enhancement 2: Goal-Portfolio Linking**

**New Entity**:
```
goal_portfolio
- id (PK)
- goal_id (FK)
- portfolio_id (FK)
- contribution_percentage
- UNIQUE(goal_id, portfolio_id)
```

**Purpose**: Track which portfolios fund which goals

**Query Example**:
```
-- Get portfolios contributing to goal
SELECT p.*, gp.contribution_percentage
FROM portfolio p
JOIN goal_portfolio gp ON p.id = gp.portfolio_id
WHERE gp.goal_id = ?
```

---

#### **Enhancement 3: Transaction Tracking**

**New Entity**:
```
transaction
- id (PK)
- user_id (FK)
- transaction_type (DEPOSIT/WITHDRAWAL/REBALANCE)
- amount
- transaction_date
- description
- portfolio_id (FK, optional)
- goal_id (FK, optional)
```

**Purpose**: Track cash flow, deposits, withdrawals

---

#### **Enhancement 4: Real-time Asset Pricing**

**Modified Entity**:
```
asset_price_history
- id (PK)
- asset_id (FK)
- price
- price_date
- source (API_PROVIDER)
```

**Purpose**: Track historical prices, calculate real performance

---

### 11.2 Level 3 Features (Enterprise Vision)

#### **Enhancement 1: User Activity Tracking**

**New Entity**:
```
user_activity_log
- id (PK)
- user_id (FK)
- activity_type
- activity_data (JSON)
- ip_address
- created_at
```

**Purpose**: Analytics, audit trail

---

#### **Enhancement 2: Social Features**

**New Entities**:
```
portfolio_sharing
- id (PK)
- portfolio_id (FK)
- is_public (boolean)
- share_token (unique)

portfolio_comparison
- id (PK)
- user_id (FK)
- compared_portfolios (JSON array of portfolio_ids)
- created_at
```

**Purpose**: Share portfolios, compare with others

---

#### **Enhancement 3: Advanced Risk Metrics**

**New Entity**:
```
portfolio_metrics
- id (PK)
- portfolio_id (FK)
- sharpe_ratio
- volatility
- beta
- alpha
- calculated_at
```

**Purpose**: Professional-grade analytics

---

### 11.3 Migration Path from Level 1 to Level 2+

**Step 1**: Add new tables tanpa modify existing
- Create new entities (goal_progress_history, transaction, etc.)
- Existing data tetap intact

**Step 2**: Add foreign keys ke existing tables
- ALTER TABLE untuk add columns (optional, nullable)
- Backfill historical data if needed

**Step 3**: Update application logic
- Service layer update untuk support new features
- Backward compatibility maintained

**No Breaking Changes**: Existing Level 1 features tetap functional

---

## 12. ?? APPENDIX

### 12.1 Glossary

| Term | Definition |
|------|------------|
| Surrogate Key | Artificial primary key (auto-increment id) |
| Natural Key | Business data as primary key (email, code) |
| Cascade Delete | Delete child records when parent deleted |
| Join Table | Table representing M:N relationship |
| Calculated Field | Derived value, not stored in database |
| Denormalization | Intentional redundancy untuk performance |
| 3NF | Third Normal Form - no transitive dependencies |

---

### 12.2 Related Documents

- **PROJECT_PLAN.md** - Master project blueprint
- **ARCHITECTURE.md** - High-level system architecture
- **DECISIONS.md** - Architecture decision records
- **API_SPECIFICATION.md** - REST API documentation (Phase 2.2)
- **DEVELOPMENT_GUIDE.md** - Setup instructions (Phase 4)

---

### 12.3 Changes from ARCHITECTURE.md

| Aspect | ARCHITECTURE.md | DATABASE_DESIGN.md | Reason |
|--------|-----------------|-------------------|--------|
| User-Portfolio | 1:1 | **1:N** | User flexibility, real-world scenarios |
| Portfolio-Asset | JSON column | **Join Table** | Normalization, queryability |
| Allocation Storage | JSON field | **portfolio_asset table** | Better data integrity |
| Total Tables | 5 tables | **6 tables** | Added portfolio_asset join table |

**Rationale**: Keputusan final dari Phase 3.1 lebih normalized dan flexible

---

### 12.4 Summary Statistics

| Metric | Count | Notes |
|--------|-------|-------|
| Total Entities | 6 | Core MVP entities |
| Total Relationships | 5 | Including 1 M:N |
| Foreign Keys | 5 | All properly constrained |
| Unique Constraints | 4 | email, asset_code, user_id (risk_profile), composite (portfolio_asset) |
| Normalization Level | 3NF | Fully normalized |
| JSON Columns | 1 | assessment_data only (for flexibility) |

---

## 13. ? VALIDATION CHECKLIST

**Database Design Quality**:
- ? All entities clearly defined
- ? Primary keys identified
- ? Foreign keys with proper cascade behavior
- ? Cardinality documented
- ? Relationships explained with business logic
- ? 3NF compliance verified
- ? No redundant data (except intentional)
- ? Query patterns considered

**MVP Scope**:
- ? Supports all Level 1 features
- ? No unnecessary complexity
- ? Clear extension path to Level 2+
- ? Learning-friendly design

**Documentation**:
- ? ASCII ERD provided
- ? Design decisions documented
- ? Sample data provided
- ? Query examples included

---

**Document Version**: 1.0  
**Last Updated**: 22 Juni 2026  
**Phase**: Phase 3.1 - Conceptual Database Design  
**Status**: ? Completed  
**Next Phase**: Phase 3.2 - Physical Database Design (SQL Schema)

---

**END OF DOCUMENT**

