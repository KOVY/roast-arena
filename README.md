# 🔥 RoastArena

AI-powered roast battle platform where users create, share, and compete in hilarious roast challenges. Built with Next.js, React Native, and Supabase.

## 🚀 Features

### Core Functionality
- **AI Roast Generation**: Powered by Grok API with multiple styles (playful, savage, sarcastic, wholesome)
- **Echo Chain**: Threaded roast responses creating conversation chains
- **User Profiles**: Track roasts, likes, and community rankings
- **Challenges Hub**: Pizzeria-sponsored roast competitions with real rewards
- **Multi-platform**: Web (PWA) and React Native mobile apps

### Key Capabilities
- Real-time roast feed with infinite scroll
- Multi-language support (EN, CS, DE, RU)
- Multi-currency support (USD, EUR, CZK, RUB)
- Stripe payment integration for premium features
- Supabase authentication and database
- Responsive design with dark mode

## 🛠 Tech Stack

### Frontend
- **Web**: Next.js 14 (App Router), React, TypeScript
- **Mobile**: React Native, Expo
- **Styling**: Tailwind CSS, Framer Motion
- **State**: React Hooks, Supabase Realtime

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Functions**: Supabase Edge Functions (Deno)
- **AI**: Grok API
- **Payments**: Stripe

### DevOps
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions (planned)
- **Hosting**: Vercel (web), Expo (mobile)

## 📁 Project Structure

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
│   ├── types/           # TypeScript types
│   ├── utils/           # Shared utilities
│   └── constants/       # Shared constants
│
├── tests/                # Test suites
├── docs/                 # Documentation
└── supabase/            # Database migrations
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)
- Grok API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/roast-arena.git
cd roast-arena
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
GROK_API_KEY=your_grok_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run database migrations**
```bash
# Install Supabase CLI
npm install -g supabase

# Run migrations
supabase db push
```

5. **Start development server**
```bash
# Web
npm run dev

# Mobile (in separate terminal)
cd mobile
npx expo start
```

## 📱 Mobile Development

### Setup
```bash
cd mobile
npm install
npx expo start
```

### Running on Device
- **iOS**: Scan QR code with Camera app
- **Android**: Scan QR code with Expo Go app

## 🧪 Testing

### Run Tests
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Test Structure
- `tests/web/` - Web component tests
- `tests/shared/` - Shared utility tests
- `tests/setup.ts` - Test configuration

## 📚 Documentation

- [Design System](./docs/DESIGN_SYSTEM.md) - UI/UX guidelines
- [Pizzeria Onboarding](./docs/PIZZERIA_ONBOARDING.md) - Partner guide
- [Monetization Strategy](./docs/MONETIZATION_v2.md) - Revenue model

## 🗄 Database Schema

### Tables
- **users** - User profiles
- **roasts** - Roast posts
- **pizzerias** - Partner businesses
- **challenges** - Roast challenges
- **gifts** - Virtual gifting
- **transactions** - Payment history

See `supabase/migrations/001_init.sql` for full schema.

## 🎨 Key Features Detail

### AI Roast Generation
Multiple AI personalities:
- **Playful**: Light-hearted fun
- **Savage**: No holds barred
- **Sarcastic**: Witty commentary
- **Wholesome**: Backhanded compliments

### Echo Chain
Like Twitter threads but for roasts:
- Reply to any roast
- Create conversation threads
- View full echo history

### Challenges
Pizzerias create roast challenges:
- Users submit roasts
- Winners get real rewards
- Trackable engagement metrics

## 🌍 Internationalization

Supported languages:
- English (en-US)
- Czech (cs-CZ)
- German (de-DE)
- Russian (ru-RU)

Supported currencies:
- USD, EUR, CZK, RUB

## 🔒 Security

- Supabase Row Level Security (RLS)
- JWT-based authentication
- API key rotation
- Input sanitization
- Rate limiting (planned)

## 🚀 Deployment

### Web (Vercel)
```bash
vercel --prod
```

### Mobile (Expo)
```bash
eas build --platform all
eas submit --platform all
```

## 📊 Analytics

Track key metrics:
- Roast creation rate
- User engagement
- Challenge participation
- Revenue (subscriptions, gifts)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

- Product: [Your Name]
- Design: [Designer Name]
- Development: [Dev Team]

## 📞 Support

- Email: support@roastarena.com
- Discord: [Coming Soon]
- Twitter: [@RoastArena](https://twitter.com/roastarena)

## 🎯 Roadmap

### Q1 2024
- [x] Core platform MVP
- [x] Web application
- [x] Mobile application
- [x] Basic testing suite
- [ ] Beta launch

### Q2 2024
- [ ] Subscription tiers
- [ ] Virtual gifting
- [ ] Advanced analytics
- [ ] Public launch

### Q3 2024
- [ ] NFT integration
- [ ] Live roast battles
- [ ] API platform
- [ ] International expansion

---

**Made with 🔥 by the RoastArena team**
