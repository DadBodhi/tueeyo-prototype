# TUEEYO — MASTER REFERENCE v2.1
_March 14 2026 | Conceptual/Pre-investment | All documents combined and deduplicated_

---

## 1. PRODUCT OVERVIEW

**Tueeyo** ("Tú y yo" — You and me) is a purpose-built platform for dance communities. Replaces Facebook (declining, algorithm unreliable) and Eventbrite (8-10% fees, no community, generic). Combines event discovery + teacher communication + payments + social graph.

**Positioning:** "The operating system for dance communities." Community-first (chronological feeds, no algorithm), privacy-protective by default, fair economics, no external advertisers (community-promoted events only).

**Beachhead:** Leeds Latin dance → UK → international → Phase 3: non-dance (yoga, martial arts, running clubs — same engine, configurable activity types, architecture designed for this)

---

## 2. ACCOUNT & ROLE STRUCTURE

One account per user. **Roles are tags:** student | teacher | DJ | photographer | performer | organizer | venue_manager. Everyone starts as a dancer. Teacher is an advanced form of dancer — their student history and reputation are visible before they teach their first class. Any role can upgrade to any tier.

---

## 3. TIERS

| Tier | Price | Events/mo | Subdomain | Messaging | Photo/video upload | Payments | Analytics |
|------|-------|-----------|-----------|-----------|-------------------|----------|-----------|
| Free | £0 | 6 | tueeyo.uk/role/name | Individual (all) + group by attendees (claimed events) | ❌ initially → rolls out when stable | ❌ | Basic |
| Plus | £20 + 3% tx | 20 | yourname.tueeyo.uk | + bulk tools/templates/scheduling | ✅ with privacy controls | ✅ | Advanced |
| Pro | £50 + 3% tx | Unlimited | orgname.tueeyo.uk | + org-wide bulk | ✅ | ✅ consolidated | By teacher |

**Free tier detail:** 1 featured activity gets full features (video upload via YouTube, updates, post analytics). Other activities: listing + check-in tracking + QR only. Individual messaging open to all. Group messaging by attendee list requires claiming (free).

**Plus tier adds:** yourname.tueeyo.uk (customizable: hero/about/events/gallery/reviews/contact, accent color, CTA, professional email). Payment processing (classes, packages, memberships, tickets, DJ/photo bookings). Weekly auto-payouts via Stripe. Analytics (revenue, attendance, retention, at-risk students). Waitlist, automated reminders, promotional tools, verified badge.

**Pro tier adds:** orgname.tueeyo.uk, sub-accounts with granular permissions, consolidated dashboard, revenue by teacher/event, payment splits, automated payroll.

---

## 4. REVENUE MODEL

1. **Subscriptions (primary):** Plus £20/mo, Pro £50/mo. Target 10-15% Free→Plus conversion.
2. **Transaction fees (secondary):** 3% launch → 3.5% M12 → 4% Y2 → 4.5% Y3 → 5% cap Y4+. Loss-leading at 3% intentional (covers ~Stripe cost ~1.5%+20p/tx). Builds lock-in before increasing. Disclosed upfront in ToS.
3. **Wallet (tueeyobucks):** Students pay less cash for round-number credits (e.g. £48→£50, £95→£100). Exact rates TBD, may vary seasonally. Wallet works cross-school. Platform earns float + drives pre-loading. At international expansion: tueeyobucks tied to local currencies, cross-currency transfer supported.
4. **Future:** Promoted events (community members only), affiliates, marketplace.

---

## 5. MARKET

**Two-axis growth model:**
- Axis 1 (geographic): Leeds → UK cities → Ireland/Spain/US Latin scenes
- Axis 2 (style): Latin → partner dance → all class-based dance → Phase 3 non-dance

| Market tier | Community | UK regulars | Launch |
|-------------|-----------|-------------|--------|
| Beachhead | Latin (salsa/bachata/kizomba) | ~18,000 | Y1-2 |
| Adjacent | Partner dance (tango/ceroc/swing) | ~40,000 | Y2-3 |
| Broader | All class-based dance | 100,000+ | Y4+ |

**Total addressable (tiers 1-2): ~55-60k UK regulars.** Leeds salsa Facebook group: 5,200 members, ~200 daily viewers → ~400-600 genuinely active Leeds Latin dancers.

**Style overlap:** ~70% salsa/bachata/kizomba cross-pollination, ~20% into tango, ~10-15% into ceroc. Activating Leeds salsa captures most of Leeds Latin community without separate targeting.

**Community flywheel (scene = primary growth unit):**
Super nodes (multi-class regulars) check in → platform looks active → teachers claim + message students → students check in more consistently → teachers upgrade to Plus → wallet spreads across schools → scene hits critical mass → next city/style activates faster. Each scene restarts flywheel.

**Major events as accelerators:** Calle Ocho Leeds ~200-300 (multi-city draw), Blackpool salsa ~700 (national). Single event → 50-150 new users from 5-10 cities. Recurring, not one-off.

---

## 6. USER JOURNEYS

### Reputation (universal)
One unified score across all roles. Inputs: check-ins, consistency (streaks), variety (styles/venues), reviews written, connections made. Role-specific additions: teachers gain rep from student check-ins + retention; DJs from bookings; photographers from sessions. Start simple — review with real data.

### The aha moment (all teacher paths)
> "I now have a way to reach my own students — organised by class, building itself automatically, without collecting a single phone number."

### The video path (student acquisition, not teacher acquisition)
Teacher already on platform → films end-of-class routine (already happens on phones) → uploads + shares subdomain URL → off-platform students follow link → video gated behind check-in → they join. Subdomain URL is the front door for incoming students.

### Path A: Aspiring teacher (dancer → teacher)
Already on platform → creates event (owns it, no claiming) → invites personal network (on-platform: notification; off-platform: shareable link — **platform grows sideways**) → students check in (social pressure of friend/teacher relationship) → teacher gains rep per check-in → attendee group forms automatically → aha moment. Upgrade triggers: analytics/payments/subdomain as classes grow.

### Path B: Established teacher (external → platform)
Discovers via student or finds class already listed with check-ins → claims event (admin verifies) → immediately has attendee group → sends first group message → **aha moment is immediate and surprising**. Same upgrade triggers.

### Path C/D: Promoter / DJ+Photographer — to be developed

### Path E: Reluctant adopter
Required by school. Don't optimise for; don't block. Aha moment can still happen organically.

### Upgrade path
Dancer → aspiring teacher (creates event, invites network) → free tier teacher (claiming, group messaging) → Plus teacher (subdomain, payments, analytics) → Pro (multi-user org)

### Three viral loop mechanisms
1. Teacher messages students → students check in to stay connected
2. Aspiring teacher invites network → off-platform friends join
3. Teacher shares subdomain URL → off-platform students join to access gated video

---

## 7. GO-TO-MARKET (6 phases, student-first)

| Phase | Months | Goal | Gate metric |
|-------|--------|------|------------|
| 1 | 1-2 | Public directory (Leeds) | 50+ events, 500+ page views/wk |
| 2 | 3-4 | Check-in gamification | 100+ students, 50+ check-ins/wk |
| 3 | 4-5 | Teacher claiming + communication | 3+ claimed, all sent ≥1 group message, 2+ sharing subdomain URL |
| 4 | 6-7 | Plus tier soft launch | 2+ Plus, £500+ GMV, 80%+ trial→paid |
| 5 | 8+ | Network effects | 10+ Plus, 500+ students |
| 6 | 10-12 | Refinement + public launch | No critical bugs, 300+ users post-launch |

**Phase 3 is load-bearing.** Teacher pain = no way to reach students. Claiming auto-builds contact list. First group message = aha moment. Videos secondary. If <2 teachers claiming + messaging → seriously consider stopping.

---

## 8. BUILD PHASES (DETAILED)

### Phase 1: Public Directory
- Event discovery (no login): search by style/level/day/location/teacher/price, map view, calendar view
- User-generated events (moderated queue), venue database
- SEO: Next.js SSR, schema.org JSON-LD, sitemap.xml, OG tags
- Manually seed 30-50 Leeds events

### Phase 2: Check-Ins
- Accounts: email/password or social login
- QR check-ins (HMAC-signed: event_id + timestamp) + GPS fallback + manual teacher entry
- Attendance history by style/venue/teacher, streaks
- Reputation: check-ins + consistency + variety + reviews + connections
- Badges: 1/5/25/50/100 check-ins, style-specific, venue variety. Unlocks: 5→reviews, 10→award badges, 25→advanced

### Phase 3: Teacher Claiming & Communication
- Claiming: teacher submits claim → admin verifies → owns event + attendee group
- Group messaging (Free): POST /api/events/[id]/message → filter by recency → push+email. Rate limit: 1 broadcast/event/24h
- Video upload (featured event, Free): YouTube URL → gated by check-in. Teacher shares subdomain URL as student acquisition
- Dashboard: owned events, attendance stats, message history
- Subdomain share panel: pre-written WhatsApp/Instagram/Facebook templates
- Claim prompt: "Claim to message your students directly"

### Phase 4: Plus Tier
- Wildcard DNS *.tueeyo.uk (Cloudflare) + subdomain routing middleware
- Custom page builder: sections (hero/about/events/gallery/reviews/contact), live preview, DOMPurify sanitization
- Stripe: subscriptions + webhooks (subscription.created/updated/deleted, invoice events) → update users.tier
- Wallet: POST /api/wallet/topup → wallet_transaction → wallet_balances trigger
- Class packages + memberships (Stripe recurring)
- Analytics dashboard, waitlist (capacity limit, auto-notify, 2hr claim window)

### Phase 5: Social Features
- "Connected with": post-check-in prompt → select attendees → mutual connection. Display label configurable per activity type.
- Following, chronological activity feed (no algorithm)
- 1-to-1 messaging (all tiers), event-based ephemeral groups
- **Photo/video sharing (Plus/Pro initially → Free tier when stable):**
  - Upload tagged to event, visible to event attendees
  - Face detection on upload (AWS Rekognition or similar)
  - Photos: known faces blurred until confirmed; unknown faces blurred until user joins+claims. Tagging and face confirmation are independent. Wider sharing requires photographer + subjects. Settings: "always show" / "always blur".
  - Videos: default shareable (opt-out). Same detection mechanics.
  - Blur approach: standard blur (not AI face replacement) — familiar, honest
  - Reputation nudges: small points for appearing publicly + correct tagging

### Phase 6: Refinement
- Verified reviews (attendance required), difficulty rating, teacher response
- Email automation with templates, waitlist enhancements
- Free tier photo/video upload rollout
- Performance: Redis caching, CDN, query optimisation
- Legal: ToS, Privacy Policy (GDPR), cookie notice

---

## 9. DATABASE SCHEMA (PostgreSQL 14+)

### Design principles
- Single users table, roles = array tags
- Tier enforcement via tier_limits table (data-driven)
- All monetary values in pence (INTEGER)
- JSONB for flexible config
- PostGIS for location
- Soft deletes on key tables
- wallet_transactions is immutable (never UPDATE/DELETE)
- connection_type = 'connected_with' (display label configurable per activity)
- styles table user-configurable + AI dedup; Phase 3 ready (add yoga/judo = insert rows, no code changes)
- Currency defaults GBP; at intl expansion tueeyobucks tied to local currencies

### Core tables

**users**
```
id UUID PK | email VARCHAR(255) UNIQUE | email_verified BOOL | password_hash VARCHAR(255)
display_name VARCHAR(100) | bio TEXT | profile_image_url TEXT | header_image_url TEXT
city VARCHAR(100) | country VARCHAR(100) DEFAULT 'UK' | location GEOGRAPHY(POINT)
roles VARCHAR(50)[]  -- ['student','teacher','dj',...]
tier VARCHAR(20) DEFAULT 'free'  -- free|plus|pro
tier_started_at TIMESTAMP | custom_subdomain VARCHAR(50) UNIQUE
featured_activity_id UUID  -- Free tier: 1 event gets full features
monthly_event_count INT | last_event_count_reset DATE
subscription_id UUID | stripe_customer_id VARCHAR(100) UNIQUE
preferences JSONB | page_settings JSONB  -- subdomain page config
total_checkins INT | reputation_score INT
is_verified/is_active/is_banned BOOL | created_at/updated_at/last_login_at/deleted_at
```

**tier_limits**
```
tier VARCHAR(20) PK | max_events_per_month INT (NULL=unlimited)
featured_activities_count INT  -- Free:1, Plus/Pro:-1
custom_subdomain_allowed/payment_processing_allowed/advanced_analytics BOOL
waitlist_management/automated_emails/bulk_operations/multi_user_management BOOL
price_monthly_gbp DECIMAL(10,2) | transaction_fee_percent DECIMAL(5,2)
```
Seed: free(6,1,false,false,false,£0,0%), plus(20,-1,true,true,true,£20,3%), pro(null,-1,true,true,true,£50,3%)

**events**
```
id UUID PK | created_by_user_id/claimed_by_user_id UUID | school_id UUID
title VARCHAR(200) | description TEXT
event_type VARCHAR(50)  -- class|social|workshop|congress|performance|other
style_id/level_id/venue_id UUID
start_datetime/end_datetime TIMESTAMP | duration_minutes INT | timezone VARCHAR(50)
is_recurring BOOL | recurrence_rule_id/parent_event_id UUID
capacity INT | current_bookings INT | waitlist_enabled BOOL
price_gbp DECIMAL(10,2)  -- rename 'price' at intl expansion
currency VARCHAR(3) DEFAULT 'GBP' | price_type VARCHAR(50) | requires_booking/requires_payment BOOL
video_url TEXT  -- YouTube URL
video_visible_to VARCHAR(20) DEFAULT 'attendees'  -- public|attendees|subscribers
allow_checkin BOOL | checkin_opens_hours_before/checkin_closes_hours_after INT
status VARCHAR(50)  -- draft|active|cancelled|completed|full
moderation_status VARCHAR(50)  -- pending|approved|rejected|flagged
total_checkins INT | average_rating DECIMAL(3,2) | slug VARCHAR(255) UNIQUE
created_at/updated_at/deleted_at TIMESTAMP
```

**bookings**
```
id UUID PK | event_id/user_id UUID
booking_type VARCHAR(50)  -- checkin|prebooking|manual|package|membership
status VARCHAR(50)  -- pending|confirmed|attended|cancelled|no_show
checked_in_at TIMESTAMP | checkin_method VARCHAR(50)  -- qr_code|location|manual_teacher|manual_admin
checkin_location GEOGRAPHY(POINT)
payment_id UUID | price_paid DECIMAL(10,2)
class_package_id/membership_id UUID
cancelled_at/cancelled_by/cancellation_reason | refund_issued BOOL
```

**payments**
```
id UUID PK | user_id/recipient_user_id/school_id/event_id/booking_id UUID
payment_type VARCHAR(50)  -- wallet_topup|class_payment|package_purchase|membership_payment|dj_booking|photo_session|ticket_sale|payout|refund|fee
amount_total/amount_net/platform_fee/stripe_fee INT (pence)
currency VARCHAR(3) DEFAULT 'GBP' | payment_method VARCHAR(50)
stripe_payment_intent_id/charge_id/refund_id/payout_id VARCHAR(255)
wallet_transaction_id UUID
status VARCHAR(50)  -- pending|completed|failed|refunded|disputed
metadata JSONB | invoice_number VARCHAR(50) UNIQUE
created_at/updated_at/completed_at/failed_at/refunded_at TIMESTAMP
```

**wallet_balances** (snapshot — wallet_transactions is source of truth)
```
user_id UUID PK | balance_pence INT DEFAULT 0 (CONSTRAINT >= 0) | currency VARCHAR(3)
total_topups_pence/total_spent_pence/total_bonus_pence INT
last_transaction_at TIMESTAMP | last_transaction_id UUID
```

**wallet_transactions** (IMMUTABLE)
```
id UUID PK | user_id UUID
transaction_type VARCHAR(50)  -- topup|bonus|payment|refund|admin_adjustment|expiry
amount_pence INT (positive=credit, negative=debit) | balance_after_pence INT
payment_id/booking_id UUID | description TEXT | metadata JSONB | created_at TIMESTAMP
```
Trigger: AFTER INSERT → updates wallet_balances

**connections**
```
id UUID PK | from_user_id/to_user_id UUID
connection_type VARCHAR(50)  -- follow|connected_with|blocked
event_id UUID  -- context for connected_with
is_mutual BOOL | is_active BOOL | created_at TIMESTAMP
UNIQUE(from_user_id, to_user_id, connection_type)
```

**schools** (Pro tier)
```
id UUID PK | name VARCHAR(200) | school_type VARCHAR(50)
logo_url/header_image_url TEXT | custom_subdomain VARCHAR(50) UNIQUE | page_settings JSONB
owner_user_id UUID | tier VARCHAR(20) DEFAULT 'pro' | subscription_id UUID
city/country/email/phone/website_url | social_links JSONB | settings JSONB
```

**school_members**
```
school_id/user_id UUID | role VARCHAR(50)  -- owner|admin|teacher|assistant|dj|staff
permissions JSONB | payment_split_percent DECIMAL(5,2) | is_active BOOL
UNIQUE(school_id, user_id)
```

**reviews**
```
reviewer_user_id/event_id/teacher_user_id UUID
rating INT (1-5) | difficulty_rating INT (1-5)  -- vs stated level
review_text TEXT | booking_id UUID (REQUIRED — verified attendance)
teacher_response TEXT | moderation_status VARCHAR(50)
UNIQUE(reviewer_user_id, event_id)
```

### Supporting tables
- **styles:** id/name/slug/parent_style_id/display_order/is_active. Seed: Salsa/Bachata/Kizomba/Zouk/Merengue/Cumbia/Cha Cha/Mambo/Son/Rueda + sub-styles (On1/On2/Cuban Salsa)
- **levels:** id/name/slug/level_number/display_order. Seed: Absolute Beginner(1)/Beginner(2)/Improver(3)/Intermediate(4)/Intermediate+(5)/Advanced(6)/All Levels(0)
- **subscriptions:** stripe_subscription_id UNIQUE, status (active|past_due|cancelled|unpaid|trialing), current_period_start/end, trial_end, cancelled_at
- **event_recurrence:** frequency/interval/days_of_week[]/week_of_month/day_of_month/end_date/occurrence_count
- **badges:** name/slug/badge_type/criteria JSONB/rarity. Seed: First Class(1)/Getting Started(5)/Regular(25)/Dedicated(50)/Legend(100)/Salsa Explorer(10 salsa)/City Explorer(5 venues)
- **user_badges:** user_id/badge_id/earned_at/earned_via_event_id. UNIQUE(user_id, badge_id)
- **user_roles_detail:** user_id/role/role-specific fields (teaching_since, specialties[], djing_since, music_styles[], photography_since, etc.) UNIQUE(user_id, role)
- **notifications:** user_id/notification_type/title/message/action_url/related_entity/is_read/sent_via_email
- **messages:** from_user_id/to_user_id/message_text/thread_id/parent_message_id/is_read/deleted_by_sender/deleted_by_recipient

### Key triggers/functions
- `update_updated_at_column()` — all tables with updated_at
- `update_wallet_balance()` — AFTER INSERT on wallet_transactions → updates wallet_balances
- `update_event_stats()` — AFTER INSERT/UPDATE/DELETE on bookings → updates events.total_checkins + current_bookings

---

## 10. TECH STACK

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 14+, TypeScript, Tailwind CSS |
| Hosting (frontend) | Vercel |
| Backend | Next.js API routes (serverless) |
| Database | PostgreSQL 14+ with PostGIS |
| ORM | Prisma |
| DB hosting | Render.com or Railway |
| DNS/CDN/SSL | Cloudflare (wildcard *.tueeyo.uk) |
| Payments | Stripe (subscriptions, payouts, webhooks) |
| Email | SendGrid |
| Maps | Google Maps API |
| Face detection | AWS Rekognition or similar |
| Error tracking | Sentry |
| Uptime | UptimeRobot |
| Dev tools | GitHub, Claude Code |

**Scaling path:** Single DB (0-1k users) → read replicas (1-10k) → Redis cache (10-50k) → sharding by region (50k+)

---

## 11. PROJECT PLAN

### Agent roles (Claude Code multi-agent)

| Agent | Domain |
|-------|--------|
| Architect | Design decisions, coordination, weekly review |
| Backend | PostgreSQL, API, auth, tier enforcement, payments |
| Frontend | React, Tailwind, UX |
| Integration | Stripe, subdomain routing, email, QR |
| Testing | Unit+integration tests, tier validation |
| Security | SQL injection, XSS/CSRF, auth bypass, GDPR |
| DevOps | Hosting, CI/CD, wildcard DNS, monitoring |
| Bug Elimination | Reproduce→root cause→fix→verify→regression |

All agents reference schema v2.1. Lead agent designated per session.

### Timeline

| Phase | Weeks | Key deliverables | Gate |
|-------|-------|-----------------|------|
| 0: Prototype | 1-2 | Working event API + public pages | Built + enjoyed + showed up → all 3 YES |
| 1: Directory | 3-6 | Events + search + SEO + user events | 50+ events, 500+ views/wk |
| 2: Check-ins | 7-10 | QR + attendance + badges + reputation | 100+ students, 50+ check-ins/wk |
| 3: Teacher comms | 11-14 | Claiming + group messaging + video | 3+ claimed, all messaged, 2+ sharing URL |
| 4: Plus tier | 15-18 | Subdomain + Stripe + wallet + payments | 2+ Plus, £500+ GMV, 80%+ conversion |
| 5: Social | 19-22 | Connections + feed + messaging + photos | 50+ connections, 100+ follows |
| 6: Launch | 23-24 | Bug fixes + perf + legal + public launch | 300+ users post-launch |

### ADHD optimisation
- Daily: 2-3hr morning focus block (hardest task) → 1-2hr afternoon (test+fix) → 30min evening (plan tomorrow)
- Commit every 90min (WIP commits fine). Format: `[Add|Fix|WIP|Test|Refactor]: <50 chars`
- 2-week sprints: Week 1 build, Week 2 refine+test+demo someone real
- 30-min bug timer → escalate to Bug Agent if not fixed
- IDEAS.md for shiny objects. If stuck: ask Architect "one 15-min step only"
- Git: main (prod) ← develop (daily) ← feature/[name]

---

## 12. FINANCIALS

### 5-year projections (lean operations — primary scenario)
Founder builds, part-time contract dev, no salaries until profitable.

| Yr | Scenes | Users | Plus | Pro | Revenue | Costs | Net | Cumulative |
|----|--------|-------|------|-----|---------|-------|-----|------------|
| 1* | 1 | 200 | 2 | 0 | £428 | £5,500 | -£5,072 | -£5,072 |
| 2 | 4-6 | 600 | 10 | 1 | £5,074 | £8,500 | -£3,426 | -£8,498 |
| 3 | 10-15 | 1,500 | 22 | 2 | £14,256 | £18,000 | -£3,744 | -£12,242 |
| 4 | 20-30 | 3,000 | 40 | 5 | £34,200 | £20,500 | +£13,700 | +£1,458 |
| 5 | 35-45 | 5,500 | 70 | 8 | £65,160 | £23,500 | +£41,660 | +£43,118 |

*Y1: Plus/payments launch M7 (half-year)

### Revenue breakdown (Y5)
- Subscriptions: £21,600 (70×£20 + 8×£50 = £1,800/mo)
- Transactions: £43,560 (£43,560/mo GMV × 5%)
- Split: 33% sub / 67% tx

### Costs breakdown (Y5)
Hosting £5k + Part-time dev £12k + Marketing £3k + Legal/admin £1.5k + Contingency £2k = £23.5k

### Key notes
- Break-even Y4. Total cash investment to break-even ~£12-15k.
- Hidden cost: founder draws no salary Y1-3. Opportunity cost ~£30-35k/yr ≈ £100k real economic cost.
- Fee schedule: 3%→3.5%→4%→4.5%→5% cap. Stripe ~1.5%+20p/tx means 3% is near-cost intentionally.
- Upside not modelled: international, marketplace/affiliates, Phase 3 non-dance.

### Profitability milestones

| Milestone | Target | Validates |
|-----------|--------|-----------|
| 100+ Leeds check-ins | Month 4 | Student engagement, flywheel |
| 2+ Plus tier | Month 7 | Willingness to pay |
| First non-Leeds scene | Month 10 | Geographic flywheel |
| Operating cost break-even | Month 18 | Lean model |
| Cash profitable | Year 4 | Business sustainability |

---

## 13. COMPETITIVE POSITION & RISKS

**Competition:**
- Facebook: unreliable algorithm, no dance features, no payments → "what Facebook used to be + dance tools"
- Eventbrite: 8-10% fees vs 3-5%, no community, not for recurring classes
- Meetup: flat fee, no payments, generic
- **Moat:** network effects (attendance data + connections non-transferable), habit formation, switching costs (custom page + payment setup + student list)

**Risks:**

| Risk | Prob | Impact | Mitigation |
|------|------|--------|-----------|
| Founder burnout/ADHD | High | High | 2-week prototype test, phase gates, accountability |
| Technical execution | Med-High | High | Prototype first, Claude Code, hire/partner fallback |
| Low adoption | Med | High | Free tier value, communication hook, organic |
| Payment adoption failure | Med | High | Subdomain value standalone, low fees, multi-revenue |
| Market size | Low | Med | 55-60k addressable, two-axis model |
| Economic downturn | Med | Med | £8 class vs £40 gym, free tier retains |
| Competition | Low | Med | Niche first-mover, community trust |

---

## 14. SUCCESS CRITERIA & EXIT

| Milestone | Target |
|-----------|--------|
| Y1 min viable | 200 users, 5+ Plus, £500+ MRR, stable platform |
| Y2 strong | 500 users, 15+ Plus, £1,500+ MRR, 2nd city |
| Y5 exceptional | 5,500 users, 35-45 scenes, 70+ Plus, £43k+ profit |

**Exit (most likely):** Lifestyle business £30-50k annual profit, no exit. Acquisition range £60k-£5M depending on scale and traction.

**First step:** 2-week prototype test. Continue only if: built it + enjoyed it + showed up consistently.
