-- =====================================================
-- Wealth Management System - Database Schema
-- Phase 3.3 - SQL Schema Implementation
-- =====================================================
-- Database: MySQL 8.0+
-- Charset: utf8mb4_unicode_ci
-- Storage Engine: InnoDB
-- Version: 1.0
-- Created: 2026-06-22
-- =====================================================

-- Set character set and collation
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- =====================================================
-- TABLE 1: users
-- =====================================================
-- Purpose: User authentication and profile management
-- Relationships: 
--   - 1:1 with risk_profiles
--   - 1:N with portfolios
--   - 1:N with financial_goals
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- User Credentials
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- User Profile
    full_name VARCHAR(255) NOT NULL,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    
    -- Indexes
    INDEX idx_users_created_at (created_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User authentication and profile data';


-- =====================================================
-- TABLE 2: risk_profiles
-- =====================================================
-- Purpose: Risk assessment results for portfolio recommendation
-- Relationships: 
--   - N:1 with users (belongs to user, 1:1 enforced by UNIQUE)
-- =====================================================

CREATE TABLE IF NOT EXISTS risk_profiles (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Foreign Key (1:1 relationship)
    user_id BIGINT NOT NULL,
    
    -- Risk Assessment Data
    risk_level ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    time_horizon_years INT NOT NULL,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    UNIQUE KEY uk_risk_profiles_user_id (user_id),
    
    -- Foreign Key
    CONSTRAINT fk_risk_profiles_users 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Indexes
    INDEX idx_risk_profiles_risk_level (risk_level)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User risk assessment profiles (1:1 with users)';


-- =====================================================
-- TABLE 3: portfolios
-- =====================================================
-- Purpose: Investment portfolios (multiple per user)
-- Relationships: 
--   - N:1 with users (many portfolios per user)
--   - M:N with assets (via portfolio_assets join table)
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolios (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Foreign Key
    user_id BIGINT NOT NULL,
    
    -- Portfolio Data
    portfolio_name VARCHAR(100) NOT NULL,
    portfolio_type VARCHAR(50) NOT NULL,
    risk_level ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    
    -- Foreign Key
    CONSTRAINT fk_portfolios_users 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Indexes
    INDEX idx_portfolios_user_id (user_id),
    INDEX idx_portfolios_risk_level (risk_level),
    INDEX idx_portfolios_created_at (created_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User investment portfolios (multiple per user)';


-- =====================================================
-- TABLE 4: assets
-- =====================================================
-- Purpose: Master data for investment assets
-- Relationships: 
--   - M:N with portfolios (via portfolio_assets)
-- =====================================================

CREATE TABLE IF NOT EXISTS assets (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Asset Data
    asset_name VARCHAR(255) NOT NULL,
    asset_type ENUM('STOCK', 'BOND', 'CASH', 'MUTUAL_FUND', 'ETF') NOT NULL,
    description TEXT,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    
    -- Indexes
    INDEX idx_assets_asset_type (asset_type),
    INDEX idx_assets_asset_name (asset_name(50))
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Master data for investment assets';


-- =====================================================
-- TABLE 5: portfolio_assets
-- =====================================================
-- Purpose: Join table for M:N relationship between portfolios and assets
-- Stores allocation percentage for each asset in portfolio
-- Relationships: 
--   - N:1 with portfolios
--   - N:1 with assets
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolio_assets (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Foreign Keys
    portfolio_id BIGINT NOT NULL,
    asset_id BIGINT NOT NULL,
    
    -- Allocation Data
    allocation_percentage DECIMAL(5,2) NOT NULL,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    UNIQUE KEY uk_portfolio_assets (portfolio_id, asset_id),
    
    -- Foreign Keys
    CONSTRAINT fk_portfolio_assets_portfolios 
        FOREIGN KEY (portfolio_id) 
        REFERENCES portfolios(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_portfolio_assets_assets 
        FOREIGN KEY (asset_id) 
        REFERENCES assets(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE,
    
    -- Indexes
    INDEX idx_portfolio_assets_portfolio_id (portfolio_id),
    INDEX idx_portfolio_assets_asset_id (asset_id)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Join table for portfolio-asset M:N relationship with allocation data';


-- =====================================================
-- TABLE 6: financial_goals
-- =====================================================
-- Purpose: User financial goals with progress tracking
-- Note: Progress calculated at runtime, not stored
-- Relationships: 
--   - N:1 with users (many goals per user)
--   - NO relationship with portfolios (independent)
-- =====================================================

CREATE TABLE IF NOT EXISTS financial_goals (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Foreign Key
    user_id BIGINT NOT NULL,
    
    -- Goal Data
    goal_name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    target_date DATE NOT NULL,
    category ENUM('RETIREMENT', 'EDUCATION', 'PROPERTY', 'EMERGENCY', 'OTHER') NOT NULL,
    
    -- Progress Tracking (stored, but recalculated)
    current_savings DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    monthly_contribution DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    PRIMARY KEY (id),
    
    -- Foreign Key
    CONSTRAINT fk_financial_goals_users 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Indexes
    INDEX idx_financial_goals_user_id (user_id),
    INDEX idx_financial_goals_category (category),
    INDEX idx_financial_goals_target_date (target_date)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User financial goals with progress tracking';


-- =====================================================
-- SCHEMA CREATION COMPLETE
-- =====================================================
-- Tables created: 6
--   1. users
--   2. risk_profiles
--   3. portfolios
--   4. assets
--   5. portfolio_assets
--   6. financial_goals
--
-- Total Foreign Keys: 5
-- Total Indexes: 15+ (including PKs and UKs)
-- Storage Engine: InnoDB
-- Character Set: utf8mb4_unicode_ci
-- =====================================================
