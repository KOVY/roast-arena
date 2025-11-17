# Qwen Knowledge Base for RoastArena

## Project Overview

RoastArena is a multi-platform AI-powered roast battle platform where users create, share, and compete in humorous roast challenges. The application features real-time interactions, AI-generated roasts, pizzeria partnerships, and monetization opportunities.

### Key Features
- AI roast generation with multiple styles (playful, savage, sarcastic, wholesome)
- Echo chain functionality (threaded responses)
- User profiles with rankings and stats
- Pizzeria-sponsored challenges with real rewards
- Multi-language and multi-currency support
- Subscription tiers and virtual gifting
- Stripe payment integration

## Tech Stack

### Frontend
- **Web**: Next.js 14 (App Router), React, TypeScript
- **Mobile**: React Native, Expo
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Hooks, Supabase Realtime

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Serverless Functions**: Supabase Edge Functions (Deno)
- **AI Integration**: Grok API
- **Payment Processing**: Stripe

### DevOps & Testing
- **Testing Framework**: Vitest, React Testing Library
- **Linting & Formatting**: ESLint, Prettier
- **Hosting**: Vercel (web), Expo (mobile)

## Project Structure

```
roast-arena/
├── web/                    # Next.js web application
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utilities and integrations
│   └── styles/           # Global styles
│
├── mobile/                # React Native mobile app
│   ├── app/              # Expo Router screens
│   ├── components/       # RN components
│   └── lib/             # Mobile utilities
│
├── backend/              # Supabase Edge Functions
│   └── functions/        # Serverless functions
│
├── shared/               # Shared code (web + mobile)
│   ├── constants/       # Shared constants
│   ├── types/           # TypeScript types
│   └── utils/           # Shared utilities
│
├── tests/                # Test suites
├── docs/                 # Documentation
├── supabase/            # Database migrations
├── supabase-migrations/ # Additional database migrations
└── Qwen_Database_Schema.md # Detailed database schema documentation
```

## Key Architecture Details

### Shared Codebase
The `shared/` directory contains:
- **Types**: Interfaces for User, Roast, and Pizzeria entities used across platforms
- **Constants**: Supported languages, currencies, and their mappings
- **Utils**: Locale handling, currency formatting, and AI prompting utilities

### Internationalization & Localization
- Supported locales: cs-czk, de-eur, en-usd, sk-eur, pl-pln
- Language codes: en-US, cs-CZ, de-DE, ru-RU
- Currency codes: USD, EUR, CZK, RUB
- URL prefixes combine language and currency (e.g., 'cs-czk', 'de-eur')
- Middleware handles locale detection and redirects
- Database tables for locale-specific pricing and supported locales
- Pricing varies by locale with different credit packages and their prices
- Helper functions for locale operations (get_default_locale, get_locale_by_prefix)
- Locale preferences stored per user

### Gift System
The application implements a complex gift system with:
- Gift catalog with different rarities (common, rare, epic, legendary)
- Credit-based gifting where users purchase and store gifts in a virtual warehouse
- 60/40 revenue split (60% to creator, 40% to platform) with precise calculation in smallest currency units
- Gift transactions with detailed tracking of platform and creator shares
- Atomic gift sending function to ensure data consistency
- User warehouse system tracking quantity of each gift type owned
- Withdrawal system for creators to transfer earnings to bank accounts

### AI Roast Generation
Four roast styles with different system prompts:
- Playful: Light-hearted and fun
- Savage: No holds barred, brutal
- Sarcastic: Witty and sarcastic
- Wholesome: Compliments disguised as roasts

## User Experience & Design

### Design System (Halo Design)
- Primary colors: Halo Orange (#ff6b35), Halo Gold (#f7931e), Halo Pink (#c73866), Accent Teal (#4ecdc4)
- Glass morphism UI with animated halo effects
- Responsive design with mobile-first approach
- Dark mode as default user interface style

### Monetization Strategy
- **Subscription Tiers**: Free ($0), Pro ($4.99), Creator ($14.99)
- **Virtual Gifting**: Users send gifts to creators with 60/40 revenue split (60% to creator, 40% to platform)
- **Credit Purchases**: In-app purchases for virtual credits to buy gifts
- **Pizzeria Partnerships**: Challenge hosting packages ($0, $99, custom)
- **Premium Features**: One-time purchases and consumables
- **Withdrawals**: Creator earnings withdrawal to bank accounts
- **Advertising**: Native ads on free tier

## Backend Architecture

### Edge Functions
- `ai-roast`: Proxies requests to Grok AI API
- `analytics`: Tracks usage metrics
- `pizzeria-tracker`: Manages pizzeria challenge stats
- `stripe-webhook`: Handles payment processing events

### Database Schema
The database schema is comprehensive and includes:
- **users**: Extended Supabase auth with locale, currency, credits, earnings, and Stripe integration
- **roasts**: Content with engagement metrics (likes, echoes, gifts, views)
- **echoes**: Threaded responses with parent-child relationships
- **gifts_catalog**: Catalog of available virtual gifts with rarity and credit values
- **user_gifts**: Individual user warehouses tracking gift quantities
- **gift_transactions**: Detailed records of all gift exchanges with revenue splits
- **transactions**: Financial transactions (purchases, withdrawals, subscriptions)
- **withdrawals**: Creator withdrawal requests to bank accounts
- **challenges**: Daily, weekly, and special challenges with reward systems
- **user_challenges**: Individual progress tracking on challenges
- **pizzeria_partners**: Business partner locations with geolocation
- **pizzeria_checkins**: Location-based check-in system with credit rewards

### Complex Database Features
- Row Level Security (RLS) policies for data protection
- Custom functions for atomic operations (send_gift, increment_credits)
- Auto-updating timestamps with triggers
- Leaderboard view for rankings
- Detailed transaction tracking with Stripe integration

## Testing Strategy

- Unit tests using Vitest and React Testing Library
- Component tests for both web and mobile
- Shared utility tests in `tests/shared/`
- Mocked environment variables for testing
- Coverage tracking with multiple reporters

## Special Considerations

### AI Function Issues
The `ai-roast/index.ts` function has a syntax issue that needs to be addressed. This function is critical for AI-powered roast generation.

### Pizzeria Integration
The platform is designed with pizzeria partnerships as a core monetization strategy, with dedicated onboarding documentation and tracking systems.

### Performance Requirements
- Real-time features require efficient state management
- AI generation needs caching and rate limiting
- Multi-platform sync requires careful data consistency
- Complex database operations need performance optimization with proper indexing

## Environment Variables
The application requires various keys for:
- Supabase (URL, anon key, service role key)
- Stripe (secret and publishable keys)
- Grok API key
- App URL configuration

## Future Development Notes

- There's a planned transition from the current syntax error in the AI function
- Analytics and data tracking for business intelligence
- International expansion mentioned in roadmap
- NFT integration and live event features for future quarters
- The database schema is documented in detail in Qwen_Database_Schema.md