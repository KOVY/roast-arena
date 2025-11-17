# RoastArena Database Schema

## Overview
Complete database schema for RoastArena including Supabase authentication, Stripe integration, credits, gifts, and withdrawals. The schema includes comprehensive tables for user management, content creation, virtual gifting, and monetary transactions.

## Tables

### 1. Users Table
The users table extends Supabase authentication with additional fields for locale, credits, earnings, and Stripe integration.

```
- id (UUID): Primary key, references auth.users(id) with cascade delete
- username (TEXT): Unique username
- email (TEXT): Unique email address
- locale (TEXT): User's preferred locale (default 'cs-CZ')
- currency (TEXT): User's preferred currency (default 'CZK')
- credits (INTEGER): Available credits, >= 0
- earnings (INTEGER): Total earnings in smallest currency units (haléře/centy)
- streak (INTEGER): Current activity streak
- total_roasts (INTEGER): Total number of roasts created
- total_echoes (INTEGER): Total number of echoes created
- total_gifts_sent (INTEGER): Total number of gifts sent
- total_gifts_received (INTEGER): Total number of gifts received
- is_premium (BOOLEAN): Premium subscription status
- premium_until (TIMESTAMP): Premium subscription expiration date
- stripe_customer_id (TEXT): Stripe customer ID
- stripe_account_id (TEXT): Stripe account ID for creators
- notifications_enabled (BOOLEAN): Notification preferences
- created_at (TIMESTAMP): Creation timestamp
- updated_at (TIMESTAMP): Update timestamp (auto-updating)
```

### 2. Roasts Table
Table for storing roast content and engagement metrics.

```
- id (UUID): Primary key, auto-generated
- user_id (UUID): References users table, cascade delete
- content (TEXT): The roast content
- style (TEXT): Roast style (e.g., playful, savage)
- ai_prompt (TEXT): Original prompt for AI generation
- image_url (TEXT): Optional image URL
- likes_count (INTEGER): Number of likes
- echoes_count (INTEGER): Number of echo responses
- gifts_count (INTEGER): Number of gifts received
- views_count (INTEGER): Number of views
- is_public (BOOLEAN): Visibility setting
- is_featured (BOOLEAN): Featured content flag
- created_at (TIMESTAMP): Creation timestamp
- updated_at (TIMESTAMP): Update timestamp (auto-updating)
```

### 3. Echoes Table
Table for threaded responses to roasts.

```
- id (UUID): Primary key, auto-generated
- roast_id (UUID): References roasts table, cascade delete
- parent_id (UUID): Self-reference for nested echoes, cascade delete
- user_id (UUID): References users table, cascade delete
- content (TEXT): Echo content
- likes_count (INTEGER): Number of likes
- gifts_count (INTEGER): Number of gifts received
- created_at (TIMESTAMP): Creation timestamp
- updated_at (TIMESTAMP): Update timestamp (auto-updating)
```

### 4. Gifts Catalog Table
Catalog of available virtual gifts for users to send each other.

```
- id (UUID): Primary key, auto-generated
- name (TEXT): Gift name
- icon (TEXT): Emoji or icon representing the gift
- rarity (TEXT): Rarity level (common, rare, epic, legendary)
- credit_value (INTEGER): Credit cost of the gift, > 0
- animation_type (TEXT): Animation effect when gift is received
- color_theme (TEXT): Color theme of the gift
- is_active (BOOLEAN): Whether the gift is available
- created_at (TIMESTAMP): Creation timestamp
```

### 5. User Gifts Table
Tracks which gifts users own in their virtual warehouse.

```
- user_id (UUID): References users table, cascade delete
- gift_id (UUID): References gifts_catalog table, cascade delete
- quantity (INTEGER): Number of this gift in user's warehouse, >= 0
- Primary key: (user_id, gift_id)
```

### 6. Gift Transactions Table
Records all gift sending transactions between users.

```
- id (UUID): Primary key, auto-generated
- sender_id (UUID): User sending the gift, cascade delete
- recipient_id (UUID): User receiving the gift, cascade delete
- roast_id (UUID): Optional reference to associated roast, set null on delete
- echo_id (UUID): Optional reference to associated echo, set null on delete
- gift_id (UUID): Reference to the gifted item, cascade delete
- value (INTEGER): Original credit value of the gift
- platform_share (INTEGER): Amount retained by platform
- creator_share (INTEGER): Amount credited to creator
- created_at (TIMESTAMP): Transaction timestamp
```

### 7. Transactions Table
Financial transactions including credit purchases, withdrawals, and subscriptions.

```
- id (UUID): Primary key, auto-generated
- user_id (UUID): References users table, cascade delete
- type (TEXT): Transaction type (credit_purchase, gift_send, gift_receive, withdrawal, subscription, refund)
- amount (INTEGER): Transaction amount in smallest currency unit
- currency (TEXT): Currency code
- stripe_session_id (TEXT): Stripe session ID
- stripe_payment_intent_id (TEXT): Stripe payment intent ID
- stripe_payout_id (TEXT): Stripe payout ID
- status (TEXT): Transaction status (pending, completed, failed, refunded)
- metadata (JSONB): Additional transaction data
- created_at (TIMESTAMP): Creation timestamp
```

### 8. Withdrawals Table
Creator withdrawal requests to transfer earnings to bank accounts.

```
- id (UUID): Primary key, auto-generated
- user_id (UUID): References users table, cascade delete
- amount (INTEGER): Withdrawal amount in smallest currency unit, > 0
- currency (TEXT): Currency code
- iban (TEXT): Bank account number (IBAN)
- bank_account_holder (TEXT): Account holder name
- stripe_payout_id (TEXT): Stripe payout ID when processed
- status (TEXT): Withdrawal status (pending, processing, completed, failed, cancelled)
- failure_reason (TEXT): Reason if withdrawal failed
- created_at (TIMESTAMP): Request timestamp
- processed_at (TIMESTAMP): Processing timestamp
- completed_at (TIMESTAMP): Completion timestamp
```

### 9. Challenges Table
Daily, weekly, and special challenges for users to participate in.

```
- id (UUID): Primary key, auto-generated
- title (TEXT): Challenge title
- description (TEXT): Challenge description
- type (TEXT): Challenge type (daily, weekly, special)
- requirement_type (TEXT): Type of requirement to complete challenge
- requirement_count (INTEGER): Number of requirements needed (default 1)
- reward_credits (INTEGER): Credit reward for completing challenge
- starts_at (TIMESTAMP): Challenge start time (default now)
- ends_at (TIMESTAMP): Challenge end time
- is_active (BOOLEAN): Whether the challenge is active
```

### 10. User Challenges Table
Tracks user progress on specific challenges.

```
- user_id (UUID): References users table, cascade delete
- challenge_id (UUID): References challenges table, cascade delete
- current_count (INTEGER): User's current progress (default 0)
- is_completed (BOOLEAN): Whether user completed the challenge
- started_at (TIMESTAMP): When user started the challenge (default now)
- completed_at (TIMESTAMP): When user completed the challenge
- Primary key: (user_id, challenge_id)
```

### 11. Pizzeria Partners Table
Database of pizzeria business partners for location-based check-ins.

```
- id (UUID): Primary key, auto-generated
- name (TEXT): Pizzeria name
- description (TEXT): Pizzeria description
- address (TEXT): Street address
- city (TEXT): City
- country (TEXT): Country
- latitude (DECIMAL): Geographic latitude coordinate
- longitude (DECIMAL): Geographic longitude coordinate
- phone (TEXT): Phone number
- website (TEXT): Website URL
- checkin_reward_credits (INTEGER): Credits rewarded for check-in (default 30)
- qr_bonus_credits (INTEGER): Bonus credits for QR code check-in (default 50)
- total_checkins (INTEGER): Total number of check-ins at this location (default 0)
- is_verified (BOOLEAN): Whether pizzeria is verified (default false)
- is_active (BOOLEAN): Whether the partner is active (default true)
- created_at (TIMESTAMP): Creation timestamp
```

### 12. Pizzeria Check-ins Table
Records of user check-ins at pizzeria partner locations.

```
- id (UUID): Primary key, auto-generated
- user_id (UUID): References users table, cascade delete
- pizzeria_id (UUID): References pizzeria_partners table, cascade delete
- credits_earned (INTEGER): Credits earned from this check-in (default 0)
- checkin_date (DATE): Date of check-in (default current date)
- created_at (TIMESTAMP): Creation timestamp
- Unique constraint: One check-in per user per pizzeria per day (user_id, pizzeria_id, checkin_date)
```

## Functions

### update_updated_at()
Auto-updating trigger function that sets the updated_at field to the current timestamp whenever a row is updated.

### increment_credits(user_id, amount)
Safely increments a user's credit balance by the specified amount.

### send_gift(sender_id, recipient_id, gift_id, roast_id, echo_id)
Atomic function to send a gift from one user to another, handling all aspects of the transaction:
- Deducts the gift from sender's warehouse
- Updates recipient's earnings based on the revenue split
- Updates sender and recipient gift counters
- Creates a gift transaction record
- Updates the associated roast or echo's gift count

## Row Level Security (RLS) Policies

The schema implements comprehensive RLS policies to ensure data security:
- Users can view all users' profiles but only update their own
- Roasts are public by default but authenticated users can create and update their own
- Users can only view their own gifts, transactions, and withdrawals
- Echoes and gift transactions follow similar access patterns

## Views

### leaderboard
A view that calculates user rankings based on total activity points, combining roasts, echoes, and gifts sent, ordered by descending point value.

## Indexes

The schema includes strategic indexes for performance optimization:
- Primary indexes on all ID columns
- Foreign key relationship indexes
- Timestamp-based indexes for time-series queries
- Specific indexes for common query patterns (featured roasts, transaction types)

## Revenue Split Model

The gift system implements a 60/40 revenue split:
- 60% of gift value goes to the content creator
- 40% of gift value retains to the platform
- This split is calculated in the send_gift function and recorded in the gift_transactions table