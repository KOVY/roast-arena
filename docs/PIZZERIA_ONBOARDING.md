# Pizzeria Onboarding Guide

## Overview

RoastArena partners with pizzerias to create engagement through roast challenges. This guide outlines the onboarding process for new pizzeria partners.

## Partnership Benefits

### For Pizzerias
- **Increased Visibility**: Featured in Pizzeria Hub
- **Customer Engagement**: Interactive challenges drive foot traffic
- **Brand Awareness**: Social sharing amplifies reach
- **Performance Tracking**: Analytics dashboard shows engagement metrics

### For Users
- **Rewards**: Win free pizza, discounts, and exclusive offers
- **Community**: Connect with local businesses
- **Entertainment**: Fun challenges and competitions

## Onboarding Steps

### 1. Initial Contact
- Pizzeria expresses interest
- Sales team provides overview presentation
- Partnership terms discussion

### 2. Account Setup
- Create pizzeria profile in database
- Upload logo and branding assets
- Set location and contact information
- Configure payment/billing (if applicable)

### 3. Challenge Creation Training
- Access to pizzeria dashboard
- How to create challenges
- Best practices for engagement
- Reward structuring guidelines

### 4. First Challenge Launch
- Create inaugural challenge
- Review and approval process
- Launch promotion strategy
- Monitor early engagement

### 5. Ongoing Support
- Weekly performance reports
- Challenge optimization tips
- Community management support
- Quarterly business reviews

## Challenge Types

### 1. Roast Our Pizza
Users roast the pizzeria's signature pizza. Best roast wins free pizza.

**Example:**
```
Title: "Roast Our Margherita"
Reward: "Free large pizza"
Duration: 1 week
```

### 2. Menu Item Launch
Users create roasts for new menu items.

**Example:**
```
Title: "Roast Our New BBQ Chicken Pizza"
Reward: "50% off first order"
Duration: 2 weeks
```

### 3. Competitor Roast
Users roast competitor pizzas (light-hearted).

**Example:**
```
Title: "Why Our Pizza Beats Chain Pizza"
Reward: "$10 gift card"
Duration: 1 week
```

### 4. Community Events
Tie challenges to local events or holidays.

**Example:**
```
Title: "Holiday Special Roast"
Reward: "Free dessert with any order"
Duration: 3 days
```

## Best Practices

### Challenge Design
- **Clear Rules**: Simple, easy-to-understand requirements
- **Attractive Rewards**: Meaningful incentives (free food > discounts)
- **Reasonable Duration**: 3-14 days optimal
- **Engaging Prompts**: Fun, creative, not offensive

### Reward Guidelines
- **Valuable**: Worth user's time and effort
- **Attainable**: Not impossible to win
- **Redeemable**: Easy redemption process
- **Expiring**: Set expiration dates (30-60 days)

### Marketing Integration
- **Social Media**: Share top roasts
- **In-Store**: QR codes for easy participation
- **Email**: Notify email list about new challenges
- **Website**: Embed challenge feed

## Analytics & Reporting

### Key Metrics
- **Participation Rate**: Number of submissions
- **Engagement**: Likes, shares, comments
- **Redemption Rate**: Rewards claimed
- **Foot Traffic**: New customers from challenges
- **ROI**: Revenue impact vs. reward cost

### Dashboard Features
- Real-time submission tracking
- Top performing roasts
- User demographics
- Challenge comparison
- Export reports (CSV, PDF)

## Technical Integration

### API Endpoints
```
GET /api/pizzeria/{id} - Get pizzeria details
GET /api/pizzeria/{id}/challenges - List challenges
POST /api/pizzeria/{id}/challenges - Create challenge
GET /api/pizzeria/{id}/stats - Get analytics
```

### QR Code Generation
Each challenge gets unique QR code for easy mobile access.

### Webhook Integration
Receive notifications for:
- New challenge submissions
- Challenge completions
- Reward redemptions

## Pricing Model

### Tiers

#### Starter (Free)
- 1 active challenge at a time
- Basic analytics
- Community support

#### Professional ($99/month)
- Unlimited challenges
- Advanced analytics
- Priority support
- Custom branding

#### Enterprise (Custom)
- Multi-location support
- API access
- Dedicated account manager
- White-label options

## Legal & Compliance

### Terms of Service
- Challenge content guidelines
- Reward fulfillment obligations
- User data privacy
- Dispute resolution

### Content Moderation
- No offensive/inappropriate content
- Pizzeria can flag submissions
- RoastArena reserves right to remove content

## Support Channels

- **Email**: pizzeria-support@roastarena.com
- **Phone**: 1-800-ROAST-IT
- **Help Center**: help.roastarena.com/pizzeria
- **Community Forum**: community.roastarena.com

## Success Stories

### Case Study: Tony's Pizza, Prague
- **Challenge**: "Roast Our Chicago Style"
- **Duration**: 2 weeks
- **Submissions**: 342 roasts
- **Redemptions**: 89 rewards claimed
- **New Customers**: 67
- **ROI**: 340%

### Case Study: Berlin Pizza Co.
- **Challenge**: "Best Pizza Roast Battle"
- **Duration**: 1 month
- **Submissions**: 1,200+ roasts
- **Social Reach**: 50,000+ impressions
- **Revenue Impact**: +25% monthly sales
