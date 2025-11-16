-- ============================================================================
-- LOCALES & CURRENCIES TABLE
-- Adds support for internationalization with locale/currency prefixes
-- ============================================================================

-- 1️⃣ SUPPORTED LOCALES & CURRENCIES
-- ============================================================================
DROP TABLE IF EXISTS supported_locales CASCADE;

CREATE TABLE supported_locales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Locale identification
  locale_code TEXT NOT NULL UNIQUE, -- e.g., 'cs', 'de', 'en'
  currency_code TEXT NOT NULL, -- e.g., 'CZK', 'EUR', 'USD'

  -- Combined prefix for URLs
  url_prefix TEXT NOT NULL UNIQUE, -- e.g., 'cs-czk', 'de-eur', 'en-usd'

  -- Display information
  locale_name TEXT NOT NULL, -- e.g., 'Čeština', 'Deutsch', 'English'
  currency_symbol TEXT NOT NULL, -- e.g., 'Kč', '€', '$'

  -- Pricing configuration
  credit_price_per_unit INTEGER NOT NULL, -- price in smallest currency unit (cents/haléře)

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,

  -- Metadata
  flag_emoji TEXT, -- e.g., '🇨🇿', '🇩🇪', '🇺🇸'

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed supported locales
INSERT INTO supported_locales (
  locale_code,
  currency_code,
  url_prefix,
  locale_name,
  currency_symbol,
  credit_price_per_unit,
  is_default,
  flag_emoji
) VALUES
  ('cs', 'CZK', 'cs-czk', 'Čeština', 'Kč', 990, TRUE, '🇨🇿'),
  ('de', 'EUR', 'de-eur', 'Deutsch', '€', 99, FALSE, '🇩🇪'),
  ('en', 'USD', 'en-usd', 'English', '$', 99, FALSE, '🇺🇸'),
  ('sk', 'EUR', 'sk-eur', 'Slovenčina', '€', 99, FALSE, '🇸🇰'),
  ('pl', 'PLN', 'pl-pln', 'Polski', 'zł', 399, FALSE, '🇵🇱');

CREATE INDEX idx_locales_url_prefix ON supported_locales(url_prefix);
CREATE INDEX idx_locales_active ON supported_locales(is_active) WHERE is_active = TRUE;

-- Ensure only one default locale
CREATE UNIQUE INDEX idx_locales_single_default
  ON supported_locales(is_default)
  WHERE is_default = TRUE;


-- 2️⃣ UPDATE USERS TABLE
-- ============================================================================
-- Add locale preference columns if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='users' AND column_name='preferred_locale_id') THEN
    ALTER TABLE users ADD COLUMN preferred_locale_id UUID REFERENCES supported_locales(id);
  END IF;
END $$;

-- Index for quick locale lookups
CREATE INDEX IF NOT EXISTS idx_users_locale ON users(preferred_locale_id);


-- 3️⃣ LOCALE-SPECIFIC PRICING
-- ============================================================================
DROP TABLE IF EXISTS locale_pricing CASCADE;

CREATE TABLE locale_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  locale_id UUID NOT NULL REFERENCES supported_locales(id) ON DELETE CASCADE,

  -- Credit packages
  package_name TEXT NOT NULL, -- e.g., 'starter', 'pro', 'ultimate'
  credits_amount INTEGER NOT NULL,
  price_amount INTEGER NOT NULL, -- in smallest currency unit

  -- Discount
  discount_percentage INTEGER DEFAULT 0,

  -- Display
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed some pricing examples
INSERT INTO locale_pricing (locale_id, package_name, credits_amount, price_amount, is_popular, display_order)
SELECT
  id,
  package_name,
  credits_amount,
  price_amount,
  is_popular,
  display_order
FROM supported_locales
CROSS JOIN (
  VALUES
    ('starter', 100, 9900, FALSE, 1),
    ('pro', 500, 39900, TRUE, 2),
    ('ultimate', 1500, 99900, FALSE, 3)
) AS packages(package_name, credits_amount, price_amount, is_popular, display_order)
WHERE supported_locales.currency_code = 'CZK';

-- Add similar for EUR
INSERT INTO locale_pricing (locale_id, package_name, credits_amount, price_amount, is_popular, display_order)
SELECT
  id,
  package_name,
  credits_amount,
  price_amount,
  is_popular,
  display_order
FROM supported_locales
CROSS JOIN (
  VALUES
    ('starter', 100, 990, FALSE, 1),
    ('pro', 500, 3990, TRUE, 2),
    ('ultimate', 1500, 9990, FALSE, 3)
) AS packages(package_name, credits_amount, price_amount, is_popular, display_order)
WHERE supported_locales.currency_code = 'EUR';

CREATE INDEX idx_locale_pricing_locale ON locale_pricing(locale_id);


-- 4️⃣ HELPER FUNCTIONS
-- ============================================================================

-- Get default locale
CREATE OR REPLACE FUNCTION get_default_locale()
RETURNS TABLE (
  id UUID,
  locale_code TEXT,
  currency_code TEXT,
  url_prefix TEXT,
  locale_name TEXT,
  currency_symbol TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sl.id,
    sl.locale_code,
    sl.currency_code,
    sl.url_prefix,
    sl.locale_name,
    sl.currency_symbol
  FROM supported_locales sl
  WHERE sl.is_default = TRUE AND sl.is_active = TRUE
  LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE;

-- Get locale by url prefix
CREATE OR REPLACE FUNCTION get_locale_by_prefix(p_prefix TEXT)
RETURNS TABLE (
  id UUID,
  locale_code TEXT,
  currency_code TEXT,
  url_prefix TEXT,
  locale_name TEXT,
  currency_symbol TEXT,
  credit_price_per_unit INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sl.id,
    sl.locale_code,
    sl.currency_code,
    sl.url_prefix,
    sl.locale_name,
    sl.currency_symbol,
    sl.credit_price_per_unit
  FROM supported_locales sl
  WHERE sl.url_prefix = p_prefix AND sl.is_active = TRUE;
END;
$$ LANGUAGE plpgsql STABLE;


-- ============================================================================
-- 🔒 ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE supported_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE locale_pricing ENABLE ROW LEVEL SECURITY;

-- Public read access for locales
CREATE POLICY "Locales are viewable by everyone"
  ON supported_locales FOR SELECT
  USING (is_active = TRUE);

-- Public read access for pricing
CREATE POLICY "Pricing is viewable by everyone"
  ON locale_pricing FOR SELECT
  USING (TRUE);


-- ============================================================================
-- ✅ LOCALE SUPPORT COMPLETE!
-- ============================================================================
