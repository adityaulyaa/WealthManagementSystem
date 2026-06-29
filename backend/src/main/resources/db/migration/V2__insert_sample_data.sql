-- =====================================================
-- Wealth Management System - Sample Data Migration
-- Version: 1.0 (V2)
-- =====================================================

-- 1. Insert Assets
INSERT INTO assets (asset_name, asset_type, description) VALUES 
('Vanguard S&P 500 ETF', 'ETF', 'Broad market stock index'),
('iShares Core U.S. Bonds', 'BOND', 'Core bond index'),
('Cash/Money Market', 'CASH', 'Liquid cash reserves');

-- 2. Insert Users
INSERT INTO users (email, password_hash, full_name) VALUES 
('andika@example.com', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'Andika Pratama'),
('budi@example.com', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'Budi Santoso');

-- 3. Insert Risk Profiles
INSERT INTO risk_profiles (user_id, risk_level, time_horizon_years) VALUES 
(1, 'MEDIUM', 10),
(2, 'LOW', 5);

-- 4. Insert Portfolios
INSERT INTO portfolios (user_id, portfolio_name, portfolio_type, risk_level) VALUES 
(1, 'Retirement Plan', 'INVESTMENT', 'MEDIUM');

INSERT INTO portfolio_assets (portfolio_id, asset_id, allocation_percentage) VALUES 
(1, 1, 50.00),
(1, 2, 40.00),
(1, 3, 10.00);

-- 5. Insert Financial Goals
INSERT INTO financial_goals (user_id, goal_name, target_amount, target_date, category, current_savings, monthly_contribution) VALUES 
(1, 'House Down Payment', 500000000.00, '2030-12-31', 'PROPERTY', 50000000.00, 5000000.00),
(1, 'Dana Pendidikan', 100000000.00, '2028-06-30', 'EDUCATION', 50000000.00, 2000000.00);
