# Wealth Management System - Physical Database Design
## Phase 3.2 - Level 1 (MVP)

**Document Version**: 1.0  
**Created**: 22 Juni 2026  
**Phase**: Phase 3.2 - Physical Database Design  
**Scope**: Level 1 (MVP) - Individual Learning Project  
**Database**: MySQL 8.0+  
**Charset**: utf8mb4_unicode_ci  
**Storage Engine**: InnoDB

---

## 1. 📋 OVERVIEW PHYSICAL DESIGN

### 1.1 Tujuan Physical Database Design

Physical database design mengkonversi desain konseptual menjadi spesifikasi database yang siap diimplementasikan dengan fokus pada:

1. **MySQL 8.0+ Optimization**
   - Data types sesuai MySQL standards
   - InnoDB storage engine features
   - utf8mb4 character set (full UTF-8 support)
   - Native JSON support

2. **Spring Boot JPA Integration**
   - Column naming cocok dengan JPA conventions
   - Auto-increment primary keys
   - Foreign key relationships mapped ke @ManyToOne, @OneToMany
   - Audit fields dengan JPA @CreatedDate, @LastModifiedDate

3. **Performance & Scalability**
   - Index strategy untuk common queries
   - DECIMAL untuk financial precision
   - ENUM untuk type-safe values
   - Efficient storage dengan proper data types

4. **Maintainability**
   - Clear naming conventions
   - Consistent column ordering
   - Standard audit fields
   - Self-documenting structure

### 1.2 Technology Stack

- **Database**: MySQL 8.0+
- **Storage Engine**: InnoDB (ACID compliance, foreign key support, row-level locking)
- **Character Set**: utf8mb4 (full Unicode support, emojis)
- **Collation**: utf8mb4_unicode_ci (case-insensitive, accent-insensitive)
- **ORM**: Spring Boot JPA / Hibernate

### 1.3 Design Principles

- ✅ **Plural table names** (users, portfolios) - REST API convention
- ✅ **snake_case** untuk tables dan columns
- ✅ **BIGINT primary keys** - future-proof
- ✅ **DECIMAL untuk money** - exact precision
- ✅ **ENUM untuk fixed values** - type safety
- ✅ **No soft delete** - hard delete untuk MVP
- ✅ **Application-level validation** - simpler untuk MVP
- ✅ **Standard audit fields** - created_at, updated_at

---

## 2. 📐 NAMING CONVENTIONS

### 2.1 Table Naming Convention

**Pattern**: Plural, lowercase, snake_case

```
✅ CORRECT:
users
risk_profiles
portfolios
assets
portfolio_assets
financial_goals

❌ INCORRECT:
User (singular)
riskProfile (camelCase)
PORTFOLIO (uppercase)
portfolio-asset (kebab-case)
```

**Rationale**:
- Plural form aligns dengan REST API resources (/api/users, /api/portfolios)
- Lowercase prevents case-sensitivity issues across platforms
- snake_case adalah MySQL standard

---

### 2.2 Column Naming Convention

**Pattern**: Lowercase, snake_case, descriptive

```
✅ CORRECT:
id
user_id
email
password_hash
full_name
created_at
allocation_percentage

❌ INCORRECT:
ID (uppercase)
userId (camelCase)
pwd (abbreviation)
name (not descriptive)
createdAt (camelCase)
```

**Special Patterns**:
- Primary key: `id`
- Foreign key: `{referenced_table}_id` (contoh: user_id, portfolio_id)
- Boolean: `is_{adjective}` (contoh: is_active)
- Timestamps: `{action}_at` (contoh: created_at, updated_at)

---

### 2.3 Index Naming Convention

**Pattern**: `idx_{table}_{column(s)}`

```
idx_users_email
idx_portfolios_user_id
idx_financial_goals_target_date
idx_portfolio_assets_portfolio_id
```

**Unique Index Pattern**: `uk_{table}_{column}`

```
uk_users_email
uk_assets_asset_code
uk_risk_profiles_user_id
```

---

### 2.4 Foreign Key Naming Convention

**Pattern**: `fk_{from_table}_{to_table}`

```
fk_risk_profiles_users
fk_portfolios_users
fk_portfolio_assets_portfolios
fk_portfolio_assets_assets
fk_financial_goals_users
```

---

## 3. 🗃️ PHYSICAL TABLE SPECIFICATIONS

### 3.1 Table: users

**Purpose**: User authentication dan profile management

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User email untuk login |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| full_name | VARCHAR(255) | NOT NULL | User full name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX uk_users_email (email)

**Storage Estimates**:
- Row size: ~800 bytes (variable)
- 10,000 users: ~8 MB
- 1,000,000 users: ~800 MB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;
    
    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Alasan Data Type**:
- **BIGINT**: Support 2^63 users (9,223,372,036,854,775,807) - future-proof
- **VARCHAR(255)**: Standard email length (RFC 5321 max 254 chars) + buffer
- **VARCHAR(255)**: BCrypt hash = 60 chars, buffer untuk future algorithms
- **TIMESTAMP**: Auto-managed timestamps, timezone-aware

---

### 3.2 Table: risk_profiles

**Purpose**: Risk assessment results untuk portfolio recommendation

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| user_id | BIGINT | FOREIGN KEY, NOT NULL, UNIQUE | Reference to users (1:1) |
| risk_level | ENUM('LOW','MEDIUM','HIGH') | NOT NULL | Calculated risk level |
| time_horizon_years | INT | NOT NULL | Investment timeline in years |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX uk_risk_profiles_user_id (user_id) - Enforce 1:1 relationship
- INDEX idx_risk_profiles_risk_level (risk_level) - Filter by risk level

**Foreign Keys**:
- fk_risk_profiles_users: user_id → users.id
  - ON DELETE CASCADE (delete risk profile saat user deleted)
  - ON UPDATE CASCADE

**Storage Estimates**:
- Row size: ~50 bytes (fixed)
- 10,000 profiles: ~500 KB
- 1,000,000 profiles: ~50 MB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "risk_profiles")
public class RiskProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 10)
    private RiskLevel riskLevel;
    
    @Column(name = "time_horizon_years", nullable = false)
    private Integer timeHorizonYears;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Alasan Data Type**:
- **ENUM('LOW','MEDIUM','HIGH')**: Type-safe, storage-efficient (1 byte), better than VARCHAR
- **INT**: Sufficient untuk years (32-bit signed: -2 billion to +2 billion)
- **UNIQUE constraint on user_id**: Enforce 1:1 relationship di database level

**Simplification Notes**:
- ❌ Removed: investment_goal_type, risk_score, assessment_data (JSON)
- ✅ Reason: MVP simplicity, fokus pada core attributes
- ✅ Can add back di Level 2 jika needed


---

### 3.3 Table: portfolios

**Purpose**: Portfolio investasi user (banyak per user)

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| user_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to users |
| portfolio_name | VARCHAR(100) | NOT NULL | User-defined portfolio name |
| portfolio_type | VARCHAR(50) | NOT NULL | Portfolio classification |
| risk_level | ENUM('LOW','MEDIUM','HIGH') | NOT NULL | Portfolio risk category |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- INDEX idx_portfolios_user_id (user_id) - Query all portfolios per user
- INDEX idx_portfolios_created_at (created_at) - Sort by creation date

**Foreign Keys**:
- fk_portfolios_users: user_id ? users.id
  - ON DELETE CASCADE
  - ON UPDATE CASCADE

**Storage Estimates**:
- Row size: ~200 bytes
- 100,000 portfolios: ~20 MB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "portfolios")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "portfolio_name", nullable = false, length = 100)
    private String portfolioName;
    
    @Column(name = "portfolio_type", nullable = false, length = 50)
    private String portfolioType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 10)
    private RiskLevel riskLevel;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Alasan Data Type**:
- **VARCHAR(100)**: Portfolio name typically <100 chars
- **VARCHAR(50)**: Portfolio type (e.g., "Conservative", "Growth")
- **No expected_return**: Calculated from asset allocations at runtime
- **No recommendation_text**: Simplified dari konseptual design

---

### 3.4 Table: assets

**Purpose**: Master data aset investasi available untuk allocation

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| asset_name | VARCHAR(255) | NOT NULL | Full asset name |
| asset_type | ENUM('STOCK','BOND','CASH','MUTUAL_FUND','ETF') | NOT NULL | Asset classification |
| description | TEXT | NULL | Detailed asset description |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- INDEX idx_assets_asset_type (asset_type) - Filter by type

**Storage Estimates**:
- Row size: ~400 bytes (with description)
- 100 assets: ~40 KB
- 1,000 assets: ~400 KB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "asset_name", nullable = false, length = 255)
    private String assetName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "asset_type", nullable = false, length = 20)
    private AssetType assetType;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Alasan Data Type**:
- **ENUM**: Type-safe, efficient (1-2 bytes)
- **TEXT**: Unlimited description length
- **Removed fields**: asset_code, current_price, expected_annual_return, risk_category, is_active (simplified MVP)

**Simplification Notes**:
- ? asset_code (ticker) - simplified
- ? current_price - removed (static pricing not needed MVP)
- ? expected_annual_return - removed
- ? risk_category - removed
- ? is_active - no soft delete untuk MVP

---

### 3.5 Table: portfolio_assets

**Purpose**: Join table untuk M:N relationship antara portfolios dan assets dengan allocation

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| portfolio_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to portfolio |
| asset_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to asset |
| allocation_percentage | DECIMAL(5,2) | NOT NULL | Asset allocation % (0-100) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX uk_portfolio_assets (portfolio_id, asset_id) - Prevent duplicate allocations
- INDEX idx_portfolio_assets_portfolio_id (portfolio_id) - Query portfolio composition
- INDEX idx_portfolio_assets_asset_id (asset_id) - Track asset usage

**Foreign Keys**:
- fk_portfolio_assets_portfolios: portfolio_id ? portfolios.id
  - ON DELETE CASCADE
  - ON UPDATE CASCADE
- fk_portfolio_assets_assets: asset_id ? assets.id
  - ON DELETE RESTRICT (prevent delete asset if used)
  - ON UPDATE CASCADE

**Constraints**:
- UNIQUE (portfolio_id, asset_id) - one asset per portfolio only once
- allocation_percentage validation di application layer (0-100)

**Storage Estimates**:
- Row size: ~50 bytes
- 10,000 allocations: ~500 KB
- 100,000 allocations: ~5 MB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "portfolio_assets", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"portfolio_id", "asset_id"}))
public class PortfolioAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;
    
    @Column(name = "allocation_percentage", nullable = false, precision = 5, scale = 2)
    private BigDecimal allocationPercentage;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Alasan Data Type**:
- **DECIMAL(5,2)**: Exact percentage precision (0.00-999.99)
  - Avoid floating point rounding errors
  - Financial applications require exact decimal arithmetic
- **UNIQUE constraint**: Enforce business rule (one asset per portfolio)
- **Removed fields**: allocated_amount (calculated at runtime)


---

### 3.6 Table: financial_goals

**Purpose**: User financial goals dengan progress tracking (calculated at runtime)

**Columns**:

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| user_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to users |
| goal_name | VARCHAR(255) | NOT NULL | User-defined goal name |
| target_amount | DECIMAL(15,2) | NOT NULL | Target amount dalam IDR |
| target_date | DATE | NOT NULL | Goal deadline |
| category | ENUM('RETIREMENT','EDUCATION','PROPERTY','EMERGENCY','OTHER') | NOT NULL | Goal classification |
| current_savings | DECIMAL(15,2) | NOT NULL, DEFAULT 0 | Current saved amount |
| monthly_contribution | DECIMAL(15,2) | NOT NULL, DEFAULT 0 | Monthly savings rate |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes**:
- PRIMARY KEY (id)
- INDEX idx_financial_goals_user_id (user_id) - Query user's goals
- INDEX idx_financial_goals_category (category) - Filter by category
- INDEX idx_financial_goals_target_date (target_date) - Sort by deadline

**Foreign Keys**:
- fk_financial_goals_users: user_id ? users.id
  - ON DELETE CASCADE
  - ON UPDATE CASCADE

**Storage Estimates**:
- Row size: ~150 bytes
- 100,000 goals: ~15 MB

**JPA Entity Mapping**:
```java
@Entity
@Table(name = "financial_goals")
public class FinancialGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "goal_name", nullable = false, length = 255)
    private String goalName;
    
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;
    
    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 15)
    private GoalCategory category;
    
    @Column(name = "current_savings", nullable = false, precision = 15, scale = 2)
    private BigDecimal currentSavings = BigDecimal.ZERO;
    
    @Column(name = "monthly_contribution", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyContribution = BigDecimal.ZERO;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // Calculated fields (NOT stored in database)
    @Transient
    public Double getCurrentProgressPercentage() {
        return currentSavings.divide(targetAmount, 4, RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(100)).doubleValue();
    }
    
    @Transient
    public Integer getMonthsToTarget() {
        if (monthlyContribution.compareTo(BigDecimal.ZERO) == 0) return null;
        return targetAmount.subtract(currentSavings)
            .divide(monthlyContribution, 0, RoundingMode.UP).intValue();
    }
}
```

**Alasan Data Type**:
- **DECIMAL(15,2)**: IDR amounts up to 999 trillion dengan 2 decimal places
- **DATE**: Only date needed (no time component)
- **ENUM**: Fixed categories, type-safe
- **DEFAULT 0**: Initialize financial amounts to zero

**Calculated Fields (NOT STORED)**:
- current_progress_percentage = (current_savings / target_amount) * 100
- months_to_target = (target_amount - current_savings) / monthly_contribution
- projected_completion_date = NOW() + months_to_target
- status = ON_TRACK / AT_RISK / OFF_TRACK

**Rationale**: Always calculate at runtime untuk fresh data, no separate goal_progress table

---

## 4. ?? DATA TYPE STANDARDS

### 4.1 Integer Types

| Type | Size | Range | Use Case |
|------|------|-------|----------|
| BIGINT | 8 bytes | -2^63 to 2^63-1 | Primary keys, foreign keys (future-proof) |
| INT | 4 bytes | -2^31 to 2^31-1 | Counts, years (time_horizon_years) |

**Rationale**:
- BIGINT untuk IDs: Support billions of records
- INT untuk business integers: Sufficient range untuk MVP

---

### 4.2 String Types

| Type | Max Length | Use Case |
|------|------------|----------|
| VARCHAR(50) | 50 chars | Short identifiers (portfolio_type) |
| VARCHAR(100) | 100 chars | Names (portfolio_name) |
| VARCHAR(255) | 255 chars | Standard text (email, full_name, goal_name, asset_name) |
| TEXT | 64 KB | Long descriptions (asset description) |

**Rationale**:
- VARCHAR dengan explicit length: Optimize storage dan index efficiency
- TEXT untuk unlimited content
- utf8mb4: 4 bytes per character maximum

**Character Set**: utf8mb4
- Full Unicode support (including emojis)
- Backward compatible dengan utf8
- Standard untuk modern applications

---

### 4.3 Decimal Types

| Type | Precision | Use Case |
|------|-----------|----------|
| DECIMAL(15,2) | 15 digits, 2 decimals | IDR amounts (max 999,999,999,999,999.99) |
| DECIMAL(5,2) | 5 digits, 2 decimals | Percentages (0.00 - 999.99%) |

**Rationale**:
- **DECIMAL bukan FLOAT/DOUBLE**: Financial applications require EXACT precision
- FLOAT/DOUBLE have rounding errors (0.1 + 0.2 != 0.3)
- DECIMAL stores as exact decimal values

**Example**:
```
WRONG: price FLOAT -> 1000.50 might store as 1000.499999
RIGHT: price DECIMAL(15,2) -> exactly 1000.50
```

---

### 4.4 ENUM Types

**Usage**: Fixed value sets dengan type safety

```sql
risk_level ENUM('LOW','MEDIUM','HIGH')
asset_type ENUM('STOCK','BOND','CASH','MUTUAL_FUND','ETF')
category ENUM('RETIREMENT','EDUCATION','PROPERTY','EMERGENCY','OTHER')
```

**Benefits**:
- Type-safe at database level
- Storage efficient (1-2 bytes)
- Self-documenting schema
- Prevents invalid values

**Trade-offs**:
- Schema change required untuk add values
- Acceptable untuk MVP (fixed domains)

---

### 4.5 Date/Time Types

| Type | Format | Use Case |
|------|--------|----------|
| DATE | YYYY-MM-DD | target_date (no time component) |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | created_at, updated_at (auto-managed) |

**TIMESTAMP Features**:
- DEFAULT CURRENT_TIMESTAMP: Auto-set on insert
- ON UPDATE CURRENT_TIMESTAMP: Auto-update on modify
- Timezone-aware (stores UTC internally)

---

## 5. ?? INDEX DESIGN

### 5.1 Index Strategy

**Primary Indexes** (Automatic):
- All PRIMARY KEY columns automatically indexed
- Clustered index pada InnoDB

**Foreign Key Indexes** (Recommended):
- All foreign key columns should be indexed
- Improves JOIN performance
- Required untuk FK constraint efficiency

**Query Performance Indexes**:
- Columns frequently used dalam WHERE clauses
- Columns used untuk sorting (ORDER BY)
- Columns used untuk grouping (GROUP BY)

---

### 5.2 Index per Table

#### **users**
```sql
PRIMARY KEY (id)                    -- Clustered index
UNIQUE INDEX uk_users_email (email) -- Login queries
```

**Query Pattern**:
```sql
-- Login query (uses uk_users_email)
SELECT * FROM users WHERE email = ?

-- PK lookup (uses PRIMARY KEY)
SELECT * FROM users WHERE id = ?
```

---

#### **risk_profiles**
```sql
PRIMARY KEY (id)
UNIQUE INDEX uk_risk_profiles_user_id (user_id) -- Enforce 1:1, fast lookup
INDEX idx_risk_profiles_risk_level (risk_level) -- Filter queries
```

**Query Pattern**:
```sql
-- Get user's risk profile (uses uk_risk_profiles_user_id)
SELECT * FROM risk_profiles WHERE user_id = ?

-- Filter by risk level (uses idx_risk_profiles_risk_level)
SELECT * FROM risk_profiles WHERE risk_level = 'HIGH'
```

---

#### **portfolios**
```sql
PRIMARY KEY (id)
INDEX idx_portfolios_user_id (user_id)          -- User's portfolios
INDEX idx_portfolios_created_at (created_at)    -- Sort by date
```

**Query Pattern**:
```sql
-- Get all portfolios for user (uses idx_portfolios_user_id)
SELECT * FROM portfolios WHERE user_id = ? ORDER BY created_at DESC
```

---

#### **assets**
```sql
PRIMARY KEY (id)
INDEX idx_assets_asset_type (asset_type) -- Filter by type
```

**Query Pattern**:
```sql
-- Get all stocks (uses idx_assets_asset_type)
SELECT * FROM assets WHERE asset_type = 'STOCK'
```

---

#### **portfolio_assets**
```sql
PRIMARY KEY (id)
UNIQUE INDEX uk_portfolio_assets (portfolio_id, asset_id)  -- Composite unique
INDEX idx_portfolio_assets_portfolio_id (portfolio_id)     -- Portfolio lookup
INDEX idx_portfolio_assets_asset_id (asset_id)             -- Asset usage
```

**Query Pattern**:
```sql
-- Get portfolio composition (uses idx_portfolio_assets_portfolio_id)
SELECT pa.*, a.asset_name 
FROM portfolio_assets pa
JOIN assets a ON pa.asset_id = a.id
WHERE pa.portfolio_id = ?

-- Find portfolios using asset (uses idx_portfolio_assets_asset_id)
SELECT p.*, pa.allocation_percentage
FROM portfolios p
JOIN portfolio_assets pa ON p.id = pa.portfolio_id
WHERE pa.asset_id = ?
```


#### **financial_goals**
```sql
PRIMARY KEY (id)
INDEX idx_financial_goals_user_id (user_id)          -- User's goals
INDEX idx_financial_goals_category (category)        -- Filter by category
INDEX idx_financial_goals_target_date (target_date)  -- Sort by deadline
```

**Query Pattern**:
```sql
-- Get all goals for user (uses idx_financial_goals_user_id)
SELECT * FROM financial_goals WHERE user_id = ? ORDER BY target_date ASC

-- Get goals by category (uses idx_financial_goals_category)
SELECT * FROM financial_goals WHERE user_id = ? AND category = 'RETIREMENT'

-- Goals ending soon (uses idx_financial_goals_target_date)
SELECT * FROM financial_goals WHERE target_date < DATE_ADD(NOW(), INTERVAL 6 MONTH)
```

---

### 5.3 Index Performance Considerations

**When to Add Index**:
- ? Foreign key columns (always)
- ? Columns frequently in WHERE clause
- ? Columns used for JOIN conditions
- ? Columns used for ORDER BY / GROUP BY
- ? UNIQUE constraints (automatic index)

**When NOT to Add Index**:
- ? Tables dengan very few rows (<1000)
- ? Columns dengan low cardinality (e.g., boolean)
- ? Columns rarely queried
- ? Small tables yang fully scanned anyway

**Trade-offs**:
- ? Faster SELECT queries
- ? Slower INSERT/UPDATE/DELETE (index maintenance overhead)
- ? Additional storage space (10-20% per index)

**MVP Strategy**: Index only for known query patterns, add more later if needed

---

## 6. ?? CONSTRAINT DESIGN

### 6.1 Primary Key Constraints

**All Tables**: BIGINT AUTO_INCREMENT PRIMARY KEY

```sql
id BIGINT PRIMARY KEY AUTO_INCREMENT
```

**Benefits**:
- Unique identifier untuk setiap row
- Clustered index (InnoDB): Physical row ordering
- Auto-increment: No manual ID management
- BIGINT: Future-proof (2^63 records)

---

### 6.2 Foreign Key Constraints

**Complete FK Mapping**:

| FK Name | From Table | Column | To Table | Column | On Delete | On Update |
|---------|------------|--------|----------|--------|-----------|-----------|
| fk_risk_profiles_users | risk_profiles | user_id | users | id | CASCADE | CASCADE |
| fk_portfolios_users | portfolios | user_id | users | id | CASCADE | CASCADE |
| fk_portfolio_assets_portfolios | portfolio_assets | portfolio_id | portfolios | id | CASCADE | CASCADE |
| fk_portfolio_assets_assets | portfolio_assets | asset_id | assets | id | RESTRICT | CASCADE |
| fk_financial_goals_users | financial_goals | user_id | users | id | CASCADE | CASCADE |

**Cascade Behavior Rationale**:

**ON DELETE CASCADE** (User-owned data):
- Delete user ? delete risk_profiles, portfolios, financial_goals
- Delete portfolio ? delete portfolio_assets
- **Reason**: User data privacy, cleanup orphaned records

**ON DELETE RESTRICT** (Master data):
- Cannot delete asset if referenced dalam portfolio_assets
- **Reason**: Protect master data integrity

**ON UPDATE CASCADE** (All FKs):
- Update parent ID ? auto-update child references
- **Reason**: Maintain referential integrity (unlikely scenario tapi safe)

---

### 6.3 UNIQUE Constraints

```sql
-- users
UNIQUE (email)

-- risk_profiles
UNIQUE (user_id)  -- Enforce 1:1 relationship

-- portfolio_assets
UNIQUE (portfolio_id, asset_id)  -- One asset per portfolio
```

**Rationale**:
- **email**: Natural unique identifier untuk login
- **user_id di risk_profiles**: Database-level 1:1 enforcement
- **Composite unique**: Business rule enforcement (no duplicate allocations)

---

### 6.4 NOT NULL Constraints

**Strategy**: All columns NOT NULL except truly optional fields

**NOT NULL Columns**:
- All primary keys
- All foreign keys (relationships are mandatory)
- All business-critical fields (email, password_hash, goal_name, etc.)
- All ENUM columns (type must be specified)
- All financial amounts (target_amount, but allow 0 dengan DEFAULT)

**NULL Allowed**:
- description (TEXT) - optional detail
- No other fields allow NULL dalam MVP

**Rationale**:
- Prevent incomplete data
- Clear business logic (required vs optional)
- Avoid NULL handling complexity

---

### 6.5 DEFAULT Constraints

```sql
-- Audit fields (all tables)
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

-- Financial amounts (financial_goals)
current_savings DECIMAL(15,2) NOT NULL DEFAULT 0
monthly_contribution DECIMAL(15,2) NOT NULL DEFAULT 0
```

**Rationale**:
- **Timestamps**: Auto-managed, no application code needed
- **Financial defaults**: Initialize to 0 (explicit starting point)

---

### 6.6 CHECK Constraints (Application-Level)

**Note**: MySQL 8.0.16+ supports CHECK constraints, tapi kita validate di **application layer** untuk MVP

**Validation Rules** (Application-level):
```java
// AllocationPercentage: 0-100
@Min(0)
@Max(100)
private BigDecimal allocationPercentage;

// Portfolio total allocation = 100%
public void validateTotalAllocation(List<PortfolioAsset> allocations) {
    BigDecimal total = allocations.stream()
        .map(PortfolioAsset::getAllocationPercentage)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
    if (total.compareTo(BigDecimal.valueOf(100)) != 0) {
        throw new ValidationException("Total allocation must equal 100%");
    }
}

// Target date in future
@FutureOrPresent
private LocalDate targetDate;

// Positive amounts
@PositiveOrZero
private BigDecimal targetAmount;
```

**Rationale**: Simpler untuk MVP, easier to modify business rules

---

## 7. ?? AUDIT FIELDS

### 7.1 Standard Audit Pattern

**All Tables Include**:
```sql
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### 7.2 Audit Field Benefits

**created_at**:
- Track record creation time
- Sort by newest/oldest
- Data lifecycle analysis
- Debugging (when was this created?)

**updated_at**:
- Track last modification
- Detect stale data
- Sync/refresh logic
- Audit trail

### 7.3 MySQL Auto-Management

```sql
-- On INSERT:
created_at ? Set to CURRENT_TIMESTAMP automatically
updated_at ? Set to CURRENT_TIMESTAMP automatically

-- On UPDATE:
created_at ? Unchanged (updatable = false)
updated_at ? Auto-updated to CURRENT_TIMESTAMP
```

**No application code needed** - MySQL handles automatically!

---

### 7.4 JPA Integration

```java
@Entity
public abstract class BaseEntity {
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}

@Entity
@Table(name = "users")
public class User extends BaseEntity {
    // Inherits created_at and updated_at
}
```

**With Spring Data JPA Auditing**:
```java
@Configuration
@EnableJpaAuditing
public class JpaConfig {
    // Enables @CreatedDate and @LastModifiedDate
}
```

---

### 7.5 Audit Fields NOT Included

**Excluded for MVP**:
- ? created_by (user_id who created record)
- ? updated_by (user_id who updated record)

**Rationale**:
- Single user context per session (JWT authentication)
- Not critical untuk MVP
- Can add later jika needed (ALTER TABLE)

---

## 8. ?? FOREIGN KEY RELATIONSHIPS

### 8.1 Complete Relationship Diagram

```
users (1) ------------------? (1) risk_profiles
  �                               FK: user_id (UNIQUE)
  �                               ON DELETE CASCADE
  �
  +-------------------------? (N) portfolios
  �                               FK: user_id
  �                               ON DELETE CASCADE
  �
  +-------------------------? (N) financial_goals
                                  FK: user_id
                                  ON DELETE CASCADE

portfolios (M) --------------? (N) assets
           �                      via portfolio_assets
           �
           +-? portfolio_assets ?-+
               FK: portfolio_id (CASCADE)
               FK: asset_id (RESTRICT)
```

### 8.2 Foreign Key Summary

**Total FKs**: 5 foreign key relationships

**Cardinality**:
- 1:1 ? users:risk_profiles (UNIQUE constraint)
- 1:N ? users:portfolios
- 1:N ? users:financial_goals
- M:N ? portfolios:assets (via portfolio_assets)

**Cascade Strategy**:
- User deleted ? Cascade delete owned data (profiles, portfolios, goals)
- Portfolio deleted ? Cascade delete allocations
- Asset deleted ? Restrict (protect master data)


---

## 9. ?? STORAGE ESTIMATES & CAPACITY PLANNING

### 9.1 Row Size Calculation

| Table | Fixed Columns | Avg Row Size | Notes |
|-------|---------------|--------------|-------|
| users | id, email, password_hash, full_name, created_at, updated_at | ~800 bytes | Variable (email length) |
| risk_profiles | All small fields | ~50 bytes | ENUM = 1 byte each |
| portfolios | Mix of VARCHAR & ENUM | ~200 bytes | portfolio_name, portfolio_type variable |
| assets | VARCHAR & ENUM | ~400 bytes | description = TEXT |
| portfolio_assets | Integers & DECIMAL | ~50 bytes | Small fixed-size row |
| financial_goals | Mix of DECIMAL & ENUM | ~150 bytes | Multiple DECIMAL fields |

### 9.2 Growth Projections (MVP - Year 1)

| Users | Risk Profiles | Portfolios | Assets | Allocations | Goals | Total Size |
|-------|---------------|-----------|--------|-------------|-------|-----------|
| 1,000 | 1,000 | 5,000 | 50 | 50,000 | 10,000 | ~100 MB |
| 10,000 | 10,000 | 50,000 | 50 | 500,000 | 100,000 | ~1 GB |
| 100,000 | 100,000 | 500,000 | 50 | 5,000,000 | 1,000,000 | ~10 GB |

**Assumptions**:
- Average 5 portfolios per user
- Average 10 assets per portfolio (50,000 allocations for 10,000 portfolios)
- Average 10 goals per user
- Asset master data = 50 assets (static)

### 9.3 Performance Targets

**Query Performance** (MVP expectations):
- Login query: <50ms
- Get user portfolios: <100ms
- Get portfolio composition: <100ms
- Get user goals: <100ms
- Dashboard aggregation: <500ms

**Index Strategy Achievement**:
- ? Proper indexes ensure <100ms for typical queries
- ? With 1GB data, queries should stay fast
- ? At 10GB scale, may need query optimization / sharding

---

## 10. ?? JPA ENTITY MAPPING REFERENCE

### 10.1 Key Annotations

**Entity Identification**:
```java
@Entity              // Mark as persistable
@Table(name = "...")  // Specify table name
```

**Primary Key**:
```java
@Id                                    // Primary key
@GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
```

**Relationships**:
```java
@OneToOne                              // 1:1
@OneToMany                             // 1:N
@ManyToOne                             // N:1
@ManyToMany                            // M:N (requires join table)
```

**Column Mapping**:
```java
@Column(
    name = "column_name",              // Column name
    nullable = false,                  // NOT NULL
    unique = true,                     // UNIQUE
    length = 255,                      // VARCHAR length
    precision = 15, scale = 2          // DECIMAL(15,2)
)
```

**Temporal Fields**:
```java
@CreatedDate                           // @Column name="created_at"
@LastModifiedDate                      // @Column name="updated_at"
```

**Enums**:
```java
@Enumerated(EnumType.STRING)           // Store as VARCHAR
@Column(length = 20)
private RiskLevel riskLevel;
```

### 10.2 Example: User Entity

```java
@Entity
@Table(name = "users")
@Data  // Lombok: generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;
    
    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private RiskProfile riskProfile;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Portfolio> portfolios = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FinancialGoal> goals = new ArrayList<>();
}
```

### 10.3 Example: Portfolio Entity (M:N via Join Table)

```java
@Entity
@Table(name = "portfolios")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "portfolio_name", nullable = false, length = 100)
    private String portfolioName;
    
    @Column(name = "portfolio_type", nullable = false, length = 50)
    private String portfolioType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 10)
    private RiskLevel riskLevel;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // M:N relationship via PortfolioAsset
    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioAsset> assets = new ArrayList<>();
}
```

---

## 11. ?? MIGRATION TO SQL SCRIPTS

### 11.1 Next Steps (Phase 3.3)

**This Conceptual & Physical Design phase is complete.**

**Next: Physical SQL Implementation** (Phase 3.3)

**SQL Scripts to Create**:
1. **CREATE_TABLES.sql** - DDL untuk all tables
2. **CREATE_INDEXES.sql** - Index creation scripts
3. **CREATE_CONSTRAINTS.sql** - FK constraints
4. **SEED_DATA.sql** - Initial asset data
5. **MIGRATIONS/** - Flyway/Liquibase migration files

### 11.2 Database Initialization Strategy

**Approach: Flyway (recommended untuk MVP)**

```
src/main/resources/db/migration/
+-- V1__Create_users_table.sql
+-- V2__Create_risk_profiles_table.sql
+-- V3__Create_portfolios_table.sql
+-- V4__Create_assets_table.sql
+-- V5__Create_portfolio_assets_table.sql
+-- V6__Create_financial_goals_table.sql
+-- V7__Create_indexes.sql
+-- V8__Seed_initial_assets.sql
```

**Spring Boot Configuration**:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wealth_management
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=validate  # Validate schema, not create
spring.flyway.enabled=true               # Enable Flyway
```

---

## 12. ?? APPENDIX

### 12.1 Database Simplifications from Conceptual Design

| Entity | Conceptual | Physical | Reason |
|--------|-----------|----------|--------|
| RiskProfile | 6 columns | 4 columns | MVP simplification |
| Asset | 10 columns | 4 columns | No pricing, no activity tracking |
| Portfolio | 7 columns | 5 columns | Simplified recommendation |

### 12.2 Related Documentation

- **PROJECT_PLAN.md** - Master project blueprint
- **ARCHITECTURE.md** - System architecture design
- **DATABASE_DESIGN.md** - Conceptual database design
- **PHYSICAL_DATABASE.md** - This document (physical design)

### 12.3 MySQL 8.0+ Features Used

- ? **Native JSON** - Not used in MVP (simplified design)
- ? **ENUM** - Type-safe fixed values
- ? **Generated Columns** - Not used (runtime calculation)
- ? **CHECK Constraints** - Not used (application validation)
- ? **Window Functions** - Can use for analytics (Phase 2+)
- ? **Common Table Expressions (CTE)** - Can use untuk complex queries

### 12.4 Performance Optimization Path

**MVP Priority**: Correctness over optimization

**Phase 2+ Optimizations**:
1. Query profiling & analysis
2. Add covering indexes
3. Query rewriting untuk slow queries
4. Connection pooling (HikariCP)
5. Caching layer (Redis)
6. Sharding strategy (jika scale besar)

---

## 13. ? VALIDATION CHECKLIST

**Physical Database Design Completeness**:
- ? All 6 tables fully specified
- ? All columns with data types determined
- ? All constraints defined (PK, FK, UNIQUE, NOT NULL)
- ? All indexes identified
- ? Foreign key relationships with cascade behavior
- ? Audit fields standardized
- ? Naming conventions consistent

**Spring Boot JPA Integration**:
- ? Entity mapping guidelines provided
- ? Annotation examples included
- ? Relationship handling documented
- ? Audit field integration shown

**MVP Ready**:
- ? Design supports all Level 1 features
- ? Performance adequate untuk MVP scale
- ? Clear migration path to SQL
- ? Prepared untuk Phase 3.3 (SQL implementation)

---

**Document Version**: 1.0  
**Last Updated**: 22 Juni 2026  
**Phase**: Phase 3.2 - Physical Database Design  
**Status**: ? Completed  
**Next Phase**: Phase 3.3 - SQL Schema Implementation

---

**END OF DOCUMENT**

