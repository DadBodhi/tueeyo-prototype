# Tueeyo Database Schema

**Version:** 2.1  
**Date:** March 14, 2026  
**Database:** PostgreSQL 14+  
**Previous Version:** 2.0 (March 12, 2026)

**Revision Notes (v2.1):**
- Generalised `connection_type` — replaced hardcoded 'danced_with' with 'connected_with'; display label is configurable per activity type
- Added internationalisation notes to currency fields — tueeyobucks system to be tied to local currencies at international expansion; cross-currency transfer to be supported where location-appropriate
- Added note on styles taxonomy — user-configurable with AI-assisted deduplication; dance classification intentionally flexible
- Added generalisation notes throughout for Phase 3 expansion (non-dance activity communities)

**Revision Notes (v2.0):**
- Added tier tracking (free/plus/pro) to users table
- Added custom_subdomain field for Plus/Pro tiers
- Added featured_activity_id for Free tier limitation
- Added tier_limits table for configurable tier rules
- Added monthly_event_count tracking
- Added subscription_id foreign key
- Clarified multi-role access patterns
- Updated indexes for subdomain lookups

---

## Database Selection: PostgreSQL

**Why PostgreSQL:**
- Excellent JSON support (flexible user data, settings)
- PostGIS extension (location-based features)
- Full-text search (event/user search)
- ACID compliance (critical for payments)
- Mature, stable, well-documented
- Great performance at scale
- Free and open-source
- Supported by all major hosting providers

**Hosting Recommendations:**
- Development: Local PostgreSQL
- Staging/Production: Render.com, Railway, or Supabase
- Scale: AWS RDS or DigitalOcean Managed Database

---

## Schema Overview

### Core Tables (14)

**User & Identity:**
- users (core user accounts with tier tracking)
- user_roles_detail (extended info per role)
- sessions (authentication)

**Events & Venues:**
- events (classes, socials, workshops)
- venues (locations)
- event_recurrence (recurring event patterns)

**Bookings & Payments:**
- bookings (attendance, check-ins, reservations)
- payments (all financial transactions)
- wallet_balances (current user balances)
- wallet_transactions (wallet movement history)

**Social & Community:**
- connections (follows, "danced with" relationships)
- reviews (verified reviews of events/teachers)
- media (photos, videos - future)

**Organizations:**
- schools (Pro tier organizations)

**Platform Configuration:**
- tier_limits (configurable tier rules)

### Supporting Tables (10+)

- styles (salsa, bachata, etc.)
- levels (beginner, intermediate, etc.)
- subscriptions (Stripe subscription tracking)
- notifications
- moderation_queue
- reported_content
- badges
- user_badges
- activity_feed
- messages

---

## Core Tables (Detailed)

### users

**Purpose:** Core user accounts - students, teachers, DJs, photographers, etc.

**Design Philosophy:**
- Single table for all user types (no separate teacher/student tables)
- Roles are tags (one user can be teacher + DJ + student)
- Tier tracking (free/plus/pro) determines feature access
- Custom subdomain for Plus/Pro tiers
- Featured activity for Free tier limitations

```sql
CREATE TABLE users (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt
  
  -- Profile
  display_name VARCHAR(100) NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  header_image_url TEXT, -- For custom subdomain page
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'UK',
  location GEOGRAPHY(POINT), -- PostGIS for lat/lng
  
  -- Roles (array - user can have multiple)
  roles VARCHAR(50)[] DEFAULT ARRAY['student']::VARCHAR[],
  -- Possible values: 'student', 'teacher', 'dj', 'photographer', 
  --                  'performer', 'organizer', 'venue_manager'
  
  -- Tier Management (NEW in v2.0)
  tier VARCHAR(20) DEFAULT 'free' NOT NULL,
  -- Possible values: 'free', 'plus', 'pro'
  tier_started_at TIMESTAMP,
  custom_subdomain VARCHAR(50) UNIQUE, -- For Plus/Pro: 'maria-salsa'
  featured_activity_id UUID, -- For Free tier: which event/activity gets full features
  monthly_event_count INTEGER DEFAULT 0, -- Reset monthly, enforce tier limits
  last_event_count_reset DATE DEFAULT CURRENT_DATE,
  
  -- Subscription
  subscription_id UUID, -- Foreign key to subscriptions table
  stripe_customer_id VARCHAR(100) UNIQUE, -- Stripe customer reference
  
  -- Settings
  preferences JSONB DEFAULT '{}', -- User preferences (notifications, privacy, etc.)
  page_settings JSONB DEFAULT '{}', -- Custom subdomain page configuration
  -- Example page_settings:
  -- {
  --   "accent_color": "#FF6B6B",
  --   "bio_long": "Extended bio for subdomain page...",
  --   "teaching_philosophy": "My approach to teaching...",
  --   "social_links": {
  --     "instagram": "@maria_salsa",
  --     "facebook": "facebook.com/mariasalsa"
  --   },
  --   "cta_button": {
  --     "text": "Book Your First Class",
  --     "link": "/events/monday-beginners"
  --   }
  -- }
  
  -- Social
  total_checkins INTEGER DEFAULT 0,
  reputation_score INTEGER DEFAULT 0,
  
  -- Status
  is_verified BOOLEAN DEFAULT false, -- Email verified
  is_active BOOLEAN DEFAULT true,
  is_banned BOOLEAN DEFAULT false,
  banned_reason TEXT,
  banned_until TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  deleted_at TIMESTAMP -- Soft delete
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_users_custom_subdomain ON users(custom_subdomain) WHERE custom_subdomain IS NOT NULL;
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_roles ON users USING GIN(roles);
CREATE INDEX idx_users_location ON users USING GIST(location); -- PostGIS
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;

-- Triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Key Fields Explained:**

- **roles:** Array allows multi-role (e.g., `['student', 'teacher', 'dj']`)
- **tier:** Current subscription tier (free/plus/pro)
- **custom_subdomain:** For Plus/Pro, their chosen subdomain (e.g., 'maria-salsa')
- **featured_activity_id:** For Free tier, which event gets full features (video uploads, messaging)
- **monthly_event_count:** Tracks events created/claimed this month, enforces tier limits
- **page_settings:** JSONB for flexible custom page configuration
- **location:** PostGIS geography type for distance calculations

---

### tier_limits (NEW in v2.0)

**Purpose:** Configurable rules for each tier - makes tier logic data-driven, not hardcoded

```sql
CREATE TABLE tier_limits (
  tier VARCHAR(20) PRIMARY KEY, -- 'free', 'plus', 'pro'
  
  -- Event Limits
  max_events_per_month INTEGER, -- NULL = unlimited
  featured_activities_count INTEGER NOT NULL, -- Free: 1, Plus/Pro: unlimited (-1)
  
  -- Features
  custom_subdomain_allowed BOOLEAN DEFAULT false,
  payment_processing_allowed BOOLEAN DEFAULT false,
  advanced_analytics BOOLEAN DEFAULT false,
  waitlist_management BOOLEAN DEFAULT false,
  automated_emails BOOLEAN DEFAULT false,
  bulk_operations BOOLEAN DEFAULT false, -- Pro only
  multi_user_management BOOLEAN DEFAULT false, -- Pro only
  
  -- Pricing
  price_monthly_gbp DECIMAL(10, 2) NOT NULL,
  transaction_fee_percent DECIMAL(5, 2) DEFAULT 0.00,
  
  -- Display
  display_name VARCHAR(50) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO tier_limits (tier, max_events_per_month, featured_activities_count, 
  custom_subdomain_allowed, payment_processing_allowed, advanced_analytics,
  price_monthly_gbp, transaction_fee_percent, display_name, display_order) 
VALUES
  ('free', 6, 1, false, false, false, 0.00, 0.00, 'Free', 1),
  ('plus', 20, -1, true, true, true, 20.00, 3.00, 'Plus', 2),
  ('pro', NULL, -1, true, true, true, 50.00, 3.00, 'Pro', 3);

-- Note: featured_activities_count = -1 means unlimited
```

**Why This Table Matters:**
- Change tier limits without code deployment
- A/B test pricing easily
- Add new tiers without schema changes
- Feature flags per tier
- Transaction fee adjustments over time

---

### user_roles_detail

**Purpose:** Extended information specific to each role a user has

**Design Note:** Separate table because not all users have all roles, and role-specific data is extensive

```sql
CREATE TABLE user_roles_detail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'teacher', 'dj', 'photographer', etc.
  
  -- Teacher-specific
  teaching_since DATE,
  specialties VARCHAR(100)[], -- e.g., ['Cuban Salsa', 'On2']
  certifications JSONB, -- Array of certification objects
  experience_level VARCHAR(50), -- 'beginner_friendly', 'advanced', etc.
  
  -- DJ-specific
  djing_since DATE,
  music_styles VARCHAR(100)[], -- e.g., ['Salsa', 'Bachata', 'Timba']
  equipment_owned TEXT,
  soundcloud_url TEXT,
  mixcloud_url TEXT,
  
  -- Photographer-specific
  photography_since DATE,
  photography_styles VARCHAR(100)[], -- e.g., ['Event', 'Portrait', 'Performance']
  portfolio_url TEXT,
  camera_equipment TEXT,
  
  -- Performer-specific
  performing_since DATE,
  performance_types VARCHAR(100)[], -- e.g., ['Solo', 'Couple', 'Team']
  performance_styles VARCHAR(100)[],
  
  -- Organizer-specific
  organizing_since DATE,
  event_types VARCHAR(100)[], -- e.g., ['Socials', 'Workshops', 'Congresses']
  
  -- Common
  public_bio TEXT, -- Role-specific bio (different from user.bio)
  achievements TEXT[],
  website_url TEXT,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false, -- Role verified by admin
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES users(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, role) -- One record per user per role
);

CREATE INDEX idx_user_roles_detail_user ON user_roles_detail(user_id);
CREATE INDEX idx_user_roles_detail_role ON user_roles_detail(role);
CREATE INDEX idx_user_roles_detail_verified ON user_roles_detail(is_verified) WHERE is_verified = true;
```

---

### events

**Purpose:** Classes, socials, workshops, performances, any dance event

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Ownership
  created_by_user_id UUID NOT NULL REFERENCES users(id),
  claimed_by_user_id UUID REFERENCES users(id), -- Teacher/organizer who claimed this
  school_id UUID REFERENCES schools(id), -- If owned by a school (Pro tier)
  
  -- Basic Info
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- Classification
  event_type VARCHAR(50) DEFAULT 'class', 
  -- 'class', 'social', 'workshop', 'congress', 'performance', 'other'
  style_id UUID REFERENCES styles(id),
  level_id UUID REFERENCES levels(id),
  
  -- Location
  venue_id UUID NOT NULL REFERENCES venues(id),
  
  -- Timing
  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP,
  duration_minutes INTEGER,
  timezone VARCHAR(50) DEFAULT 'Europe/London',
  
  -- Recurrence
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule_id UUID REFERENCES event_recurrence(id),
  parent_event_id UUID REFERENCES events(id), -- If this is an instance of recurring event
  
  -- Capacity
  capacity INTEGER,
  current_bookings INTEGER DEFAULT 0,
  waitlist_enabled BOOLEAN DEFAULT false,
  
  -- Pricing
  price_gbp DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'GBP',
  -- Internationalisation note: currency defaults to GBP for Phase 1 (UK launch).
  -- At international expansion, tueeyobucks will be tied to local currencies.
  -- Cross-currency transfer to be supported where location-appropriate.
  -- Field name 'price_gbp' to be renamed 'price' at that point.
  price_type VARCHAR(50) DEFAULT 'per_class', 
  -- 'per_class', 'drop_in', 'package', 'membership', 'free'
  requires_booking BOOLEAN DEFAULT false, -- Plus tier feature
  requires_payment BOOLEAN DEFAULT false, -- Plus tier feature
  
  -- Media
  image_url TEXT,
  video_urls TEXT[], -- Class routine videos, promotional videos
  
  -- Content (Plus tier features)
  video_url TEXT, -- Main class routine video (YouTube or direct)
  video_visible_to VARCHAR(20) DEFAULT 'attendees', 
  -- 'public', 'attendees', 'subscribers' (who checked in or pre-booked)
  
  -- Settings
  allow_checkin BOOLEAN DEFAULT true,
  checkin_opens_hours_before INTEGER DEFAULT 24,
  checkin_closes_hours_after INTEGER DEFAULT 2,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  -- 'draft', 'active', 'cancelled', 'completed', 'full'
  cancellation_reason TEXT,
  
  -- Moderation
  moderation_status VARCHAR(50) DEFAULT 'approved',
  -- 'pending', 'approved', 'rejected', 'flagged'
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMP,
  moderation_notes TEXT,
  
  -- Stats
  total_checkins INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  
  -- SEO
  slug VARCHAR(255) UNIQUE, -- URL-friendly: 'monday-salsa-beginners-salsa-soul'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP -- Soft delete
);

-- Indexes
CREATE INDEX idx_events_created_by ON events(created_by_user_id);
CREATE INDEX idx_events_claimed_by ON events(claimed_by_user_id);
CREATE INDEX idx_events_school ON events(school_id);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_style ON events(style_id);
CREATE INDEX idx_events_level ON events(level_id);
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_moderation ON events(moderation_status);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_recurring ON events(is_recurring, parent_event_id);

-- Full-text search
CREATE INDEX idx_events_search ON events USING GIN(
  to_tsvector('english', title || ' ' || COALESCE(description, ''))
);
```

**Key Fields:**

- **created_by vs claimed_by:** User creates event, teacher claims ownership later
- **school_id:** Pro tier schools own events, assign teachers
- **recurrence_rule_id:** Links to recurrence pattern
- **requires_booking/payment:** Plus tier features
- **video_url:** Class routine video (gated by check-in)
- **moderation_status:** User-generated events need approval

---

### venues

**Purpose:** Physical locations where events happen

```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name VARCHAR(200) NOT NULL,
  description TEXT,
  venue_type VARCHAR(50) DEFAULT 'studio',
  -- 'studio', 'bar', 'club', 'community_center', 'outdoor', 'other'
  
  -- Location
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  postcode VARCHAR(20),
  country VARCHAR(100) DEFAULT 'UK',
  location GEOGRAPHY(POINT), -- PostGIS: lat/lng
  
  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website_url TEXT,
  
  -- Facilities
  capacity INTEGER,
  has_parking BOOLEAN DEFAULT false,
  has_bar BOOLEAN DEFAULT false,
  is_accessible BOOLEAN DEFAULT false,
  floor_type VARCHAR(50), -- 'wood', 'sprung', 'concrete', 'carpet'
  facilities JSONB, -- Flexible: changing rooms, air con, etc.
  
  -- Media
  image_urls TEXT[],
  
  -- Ownership
  managed_by_user_id UUID REFERENCES users(id),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Moderation
  moderation_status VARCHAR(50) DEFAULT 'approved',
  moderated_by UUID REFERENCES users(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_location ON venues USING GIST(location);
CREATE INDEX idx_venues_active ON venues(is_active) WHERE is_active = true;
```

---

### bookings

**Purpose:** All attendance records - check-ins, pre-bookings, reservations

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- References
  event_id UUID NOT NULL REFERENCES events(id),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Booking Type
  booking_type VARCHAR(50) DEFAULT 'checkin',
  -- 'checkin' (scanned QR), 'prebooking' (reserved spot), 
  -- 'manual' (teacher added), 'package' (from class package), 
  -- 'membership' (from subscription)
  
  -- Status
  status VARCHAR(50) DEFAULT 'confirmed',
  -- 'pending', 'confirmed', 'attended', 'cancelled', 'no_show'
  
  -- Check-in Details
  checked_in_at TIMESTAMP,
  checkin_method VARCHAR(50),
  -- 'qr_code', 'location', 'manual_teacher', 'manual_admin'
  checkin_location GEOGRAPHY(POINT), -- Where they checked in from
  
  -- Payment
  payment_id UUID REFERENCES payments(id),
  price_paid DECIMAL(10, 2),
  
  -- Package/Membership
  class_package_id UUID, -- References to class_packages table (future)
  membership_id UUID, -- References to memberships table (future)
  
  -- Cancellation
  cancelled_at TIMESTAMP,
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason TEXT,
  refund_issued BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment ON bookings(payment_id);
CREATE INDEX idx_bookings_checked_in ON bookings(checked_in_at) WHERE checked_in_at IS NOT NULL;

-- Composite for attendance queries
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_bookings_event_status ON bookings(event_id, status);
```

**Design Notes:**

- Check-in creates booking record
- Pre-booking (with payment) creates pending booking
- Attendance confirmation updates to 'attended'
- Supports both free check-ins and paid bookings

---

### payments

**Purpose:** All financial transactions - payments in, payouts out, refunds, fees

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- References
  user_id UUID NOT NULL REFERENCES users(id), -- Payer
  recipient_user_id UUID REFERENCES users(id), -- Receiver (teacher, DJ, etc.)
  school_id UUID REFERENCES schools(id), -- Or school receives
  event_id UUID REFERENCES events(id), -- Related event (if applicable)
  booking_id UUID REFERENCES bookings(id), -- Related booking (if applicable)
  
  -- Transaction Type
  payment_type VARCHAR(50) NOT NULL,
  -- 'wallet_topup', 'class_payment', 'package_purchase', 'membership_payment',
  -- 'dj_booking', 'photo_session', 'ticket_sale', 'payout', 'refund', 'fee'
  
  -- Amounts (in pence/cents)
  amount_total INTEGER NOT NULL, -- Total paid by user (pence)
  amount_net INTEGER NOT NULL, -- Amount to recipient after fees
  platform_fee INTEGER DEFAULT 0, -- Platform's cut
  stripe_fee INTEGER DEFAULT 0, -- Stripe's processing fee
  currency VARCHAR(3) DEFAULT 'GBP',
  
  -- Payment Method
  payment_method VARCHAR(50),
  -- 'wallet', 'card', 'bank_transfer', 'cash', 'other'
  
  -- Stripe Integration
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),
  stripe_payout_id VARCHAR(255),
  
  -- Wallet
  wallet_transaction_id UUID, -- Link to wallet_transactions if wallet used
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  -- 'pending', 'completed', 'failed', 'refunded', 'disputed'
  
  -- Metadata
  description TEXT,
  metadata JSONB, -- Flexible: package details, membership info, etc.
  
  -- Receipts
  receipt_url TEXT,
  invoice_number VARCHAR(50) UNIQUE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  failed_at TIMESTAMP,
  refunded_at TIMESTAMP
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_recipient ON payments(recipient_user_id);
CREATE INDEX idx_payments_school ON payments(school_id);
CREATE INDEX idx_payments_event ON payments(event_id);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_created ON payments(created_at);

-- For accounting queries
CREATE INDEX idx_payments_recipient_completed ON payments(recipient_user_id, status, completed_at) 
  WHERE status = 'completed';
```

**Key Design:**

- All monetary amounts in pence (INTEGER) avoids floating-point errors
- Tracks both sides of transaction (payer, recipient)
- Stripe IDs for reconciliation
- Platform fee tracked separately (for transparency)

---

### wallet_balances

**Purpose:** Current wallet balance for each user (snapshot table)

```sql
CREATE TABLE wallet_balances (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  balance_pence INTEGER DEFAULT 0 NOT NULL, -- Current balance in pence
  currency VARCHAR(3) DEFAULT 'GBP',
  
  -- Tracking
  total_topups_pence INTEGER DEFAULT 0, -- Lifetime top-ups
  total_spent_pence INTEGER DEFAULT 0, -- Lifetime spending
  total_bonus_pence INTEGER DEFAULT 0, -- Lifetime bonuses earned
  
  -- Last Transaction
  last_transaction_at TIMESTAMP,
  last_transaction_id UUID,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_balances_updated ON wallet_balances(updated_at);

-- Constraint: Balance cannot go negative
ALTER TABLE wallet_balances ADD CONSTRAINT check_balance_positive 
  CHECK (balance_pence >= 0);
```

**Design Note:**

- One record per user (snapshot of current state)
- wallet_transactions table has full history
- Balance updated via transactions (not directly)

---

### wallet_transactions

**Purpose:** Complete audit trail of all wallet movements

```sql
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Transaction
  transaction_type VARCHAR(50) NOT NULL,
  -- 'topup', 'bonus', 'payment', 'refund', 'admin_adjustment', 'expiry'
  
  amount_pence INTEGER NOT NULL, -- Positive = credit, Negative = debit
  balance_after_pence INTEGER NOT NULL, -- Balance after this transaction
  currency VARCHAR(3) DEFAULT 'GBP',
  
  -- Related Records
  payment_id UUID REFERENCES payments(id),
  booking_id UUID REFERENCES bookings(id),
  
  -- Description
  description TEXT NOT NULL,
  
  -- Metadata
  metadata JSONB, -- Flexible: promo codes, bonus %, etc.
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_type ON wallet_transactions(transaction_type);
CREATE INDEX idx_wallet_transactions_created ON wallet_transactions(created_at);
CREATE INDEX idx_wallet_transactions_payment ON wallet_transactions(payment_id);

-- For balance reconciliation
CREATE INDEX idx_wallet_transactions_user_created ON wallet_transactions(user_id, created_at DESC);
```

**Important:**

- Immutable (never UPDATE or DELETE)
- Full audit trail
- Use to rebuild wallet_balances if needed

---

### schools (Pro Tier Organizations)

**Purpose:** Dance schools, event companies, collectives - Pro tier multi-user entities

```sql
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name VARCHAR(200) NOT NULL,
  description TEXT,
  school_type VARCHAR(50) DEFAULT 'dance_school',
  -- 'dance_school', 'event_company', 'dj_collective', 'performance_group', 'other'
  
  -- Branding
  logo_url TEXT,
  header_image_url TEXT,
  custom_subdomain VARCHAR(50) UNIQUE, -- e.g., 'salsa-soul'
  page_settings JSONB DEFAULT '{}', -- Similar to users.page_settings
  
  -- Owner
  owner_user_id UUID NOT NULL REFERENCES users(id),
  
  -- Subscription
  tier VARCHAR(20) DEFAULT 'pro' NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Location
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'UK',
  
  -- Contact
  email VARCHAR(255),
  phone VARCHAR(50),
  website_url TEXT,
  
  -- Social
  social_links JSONB, -- Instagram, Facebook, etc.
  
  -- Settings
  settings JSONB DEFAULT '{}',
  -- Example: payment splits, default pricing, etc.
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schools_owner ON schools(owner_user_id);
CREATE INDEX idx_schools_subdomain ON schools(custom_subdomain);
CREATE INDEX idx_schools_active ON schools(is_active) WHERE is_active = true;
```

---

### school_members

**Purpose:** Teachers/staff who belong to a school (Pro tier)

```sql
CREATE TABLE school_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  role VARCHAR(50) DEFAULT 'teacher',
  -- 'owner', 'admin', 'teacher', 'assistant', 'dj', 'staff'
  
  -- Permissions
  permissions JSONB DEFAULT '{}',
  -- Example:
  -- {
  --   "can_create_events": true,
  --   "can_edit_school_events": false, -- Can only edit own
  --   "can_edit_school_profile": false,
  --   "can_manage_members": false,
  --   "can_view_financials": false,
  --   "can_message_students": true
  -- }
  
  -- Pay Splits (if school handles payments)
  payment_split_percent DECIMAL(5, 2), -- Teacher gets X% of class revenue
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  left_at TIMESTAMP,
  
  UNIQUE(school_id, user_id)
);

CREATE INDEX idx_school_members_school ON school_members(school_id);
CREATE INDEX idx_school_members_user ON school_members(user_id);
CREATE INDEX idx_school_members_active ON school_members(school_id, is_active) WHERE is_active = true;
```

---

### connections

**Purpose:** Social relationships - follows, "danced with" connections

```sql
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  connection_type VARCHAR(50) NOT NULL,
  -- 'follow', 'connected_with', 'blocked'
  -- Note: 'connected_with' replaces the original 'danced_with' for generalisation.
  -- The display label ("danced with", "trained with", "ran with", "danced alongside",
  -- "danced against") is configurable per activity type, not stored here.
  -- This allows Phase 3 expansion (yoga, martial arts, etc.) without schema changes.
  
  -- Context (for 'connected_with')
  event_id UUID REFERENCES events(id), -- Event where connection occurred
  
  -- Mutuality (for 'connected_with')
  is_mutual BOOLEAN DEFAULT false, -- Both users confirmed the connection
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(from_user_id, to_user_id, connection_type)
);

CREATE INDEX idx_connections_from ON connections(from_user_id, connection_type);
CREATE INDEX idx_connections_to ON connections(to_user_id, connection_type);
CREATE INDEX idx_connections_mutual ON connections(is_mutual) WHERE is_mutual = true;
CREATE INDEX idx_connections_event ON connections(event_id) WHERE event_id IS NOT NULL;

-- For "who connected with whom at an event" queries
CREATE INDEX idx_connections_connected_with ON connections(from_user_id, to_user_id, event_id) 
  WHERE connection_type = 'connected_with';
```

---

### reviews

**Purpose:** Event/teacher reviews (requires verified attendance)

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who and What
  reviewer_user_id UUID NOT NULL REFERENCES users(id),
  event_id UUID NOT NULL REFERENCES events(id),
  teacher_user_id UUID REFERENCES users(id), -- Reviewed teacher (if applicable)
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  -- How hard was the class vs. stated level? (1 = way easier, 5 = way harder, 3 = accurate)
  
  title VARCHAR(200),
  review_text TEXT,
  
  -- Verification
  booking_id UUID NOT NULL REFERENCES bookings(id),
  -- Must have attended to review
  
  -- Teacher Response
  teacher_response TEXT,
  teacher_responded_at TIMESTAMP,
  
  -- Helpfulness
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  
  -- Moderation
  is_flagged BOOLEAN DEFAULT false,
  flagged_reason TEXT,
  moderation_status VARCHAR(50) DEFAULT 'approved',
  -- 'pending', 'approved', 'rejected', 'hidden'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(reviewer_user_id, event_id) -- One review per user per event
);

CREATE INDEX idx_reviews_event ON reviews(event_id);
CREATE INDEX idx_reviews_teacher ON reviews(teacher_user_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_user_id);
CREATE INDEX idx_reviews_status ON reviews(moderation_status);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
```

---

## Supporting Tables

### styles

**Purpose:** Activity styles taxonomy (Salsa, Bachata, Yoga, etc.)

**Design Philosophy:** Classifying dance (and physical activities broadly) is inherently messy — communities use different names for the same thing, sub-styles overlap, and regional variations exist. The styles table is therefore intentionally flexible:

- **User-configurable:** Users and teachers can suggest new styles when creating events
- **AI-assisted deduplication:** Suggested styles are checked against existing entries to prevent near-duplicates ("Salsa Cubana" vs "Cuban Salsa")
- **Hierarchical:** Sub-styles reference a parent style (e.g. "Salsa On2" → "Salsa")
- **Phase 3 ready:** Adding "Vinyasa", "Judo", "Parkour" requires only inserting rows, no code changes

```sql
CREATE TABLE styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  
  parent_style_id UUID REFERENCES styles(id), -- For sub-styles
  -- Example: "Salsa On2" has parent "Salsa"
  
  description TEXT,
  image_url TEXT,
  
  -- Ordering
  display_order INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_styles_parent ON styles(parent_style_id);
CREATE INDEX idx_styles_active ON styles(is_active) WHERE is_active = true;

-- Seed data (examples)
INSERT INTO styles (name, slug, display_order) VALUES
  ('Salsa', 'salsa', 1),
  ('Bachata', 'bachata', 2),
  ('Kizomba', 'kizomba', 3),
  ('Zouk', 'zouk', 4),
  ('Merengue', 'merengue', 5),
  ('Cumbia', 'cumbia', 6),
  ('Cha Cha', 'cha-cha', 7),
  ('Mambo', 'mambo', 8),
  ('Son', 'son', 9),
  ('Rueda', 'rueda', 10);

-- Sub-styles
INSERT INTO styles (name, slug, parent_style_id, display_order)
SELECT 'Salsa On1', 'salsa-on1', id, 1 FROM styles WHERE slug = 'salsa'
UNION ALL
SELECT 'Salsa On2', 'salsa-on2', id, 2 FROM styles WHERE slug = 'salsa'
UNION ALL
SELECT 'Cuban Salsa', 'cuban-salsa', id, 3 FROM styles WHERE slug = 'salsa';
```

---

### levels

**Purpose:** Skill levels (Beginner, Intermediate, etc.)

```sql
CREATE TABLE levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  
  description TEXT,
  
  -- Numeric ordering
  level_number INTEGER UNIQUE, -- 1=Absolute Beginner, 2=Beginner, 3=Improver, etc.
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_levels_number ON levels(level_number);

-- Seed data
INSERT INTO levels (name, slug, level_number, display_order) VALUES
  ('Absolute Beginner', 'absolute-beginner', 1, 1),
  ('Beginner', 'beginner', 2, 2),
  ('Improver', 'improver', 3, 3),
  ('Intermediate', 'intermediate', 4, 4),
  ('Intermediate+', 'intermediate-plus', 5, 5),
  ('Advanced', 'advanced', 6, 6),
  ('All Levels', 'all-levels', 0, 7);
```

---

### subscriptions

**Purpose:** Track Stripe subscriptions (Plus/Pro tier)

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  -- One of user_id or school_id will be set
  
  tier VARCHAR(20) NOT NULL, -- 'plus' or 'pro'
  
  -- Stripe
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  stripe_price_id VARCHAR(255) NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  -- 'active', 'past_due', 'cancelled', 'unpaid', 'trialing'
  
  -- Billing
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  trial_end TIMESTAMP,
  cancelled_at TIMESTAMP,
  
  -- Pricing
  amount_pence INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  interval VARCHAR(20) DEFAULT 'month', -- 'month' or 'year'
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_school ON subscriptions(school_id);
CREATE INDEX idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

---

### event_recurrence

**Purpose:** Define recurring event patterns

```sql
CREATE TABLE event_recurrence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  frequency VARCHAR(50) NOT NULL, -- 'weekly', 'biweekly', 'monthly'
  interval INTEGER DEFAULT 1, -- Every X weeks/months
  
  -- Weekly: which days
  days_of_week INTEGER[], -- [1,3] = Monday and Wednesday
  -- 0=Sunday, 1=Monday, ..., 6=Saturday
  
  -- Monthly: which week and day
  week_of_month INTEGER, -- 1=first, 2=second, -1=last
  day_of_month INTEGER, -- Or specific date (e.g., 15th)
  
  -- End conditions
  end_date DATE,
  occurrence_count INTEGER, -- Number of occurrences before ending
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### badges

**Purpose:** Achievement badges users can earn

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  
  badge_type VARCHAR(50), -- 'attendance', 'social', 'style', 'venue', 'special'
  
  -- Earning criteria
  criteria JSONB, -- Flexible definition of how to earn
  -- Example: {"check_ins": 10, "style": "salsa"}
  
  icon_url TEXT,
  
  -- Rarity
  rarity VARCHAR(50) DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
  
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example badges
INSERT INTO badges (name, slug, badge_type, criteria, rarity) VALUES
  ('First Class', 'first-class', 'attendance', '{"check_ins": 1}', 'common'),
  ('Getting Started', 'getting-started', 'attendance', '{"check_ins": 5}', 'common'),
  ('Regular', 'regular', 'attendance', '{"check_ins": 25}', 'rare'),
  ('Dedicated', 'dedicated', 'attendance', '{"check_ins": 50}', 'rare'),
  ('Legend', 'legend', 'attendance', '{"check_ins": 100}', 'epic'),
  ('Salsa Explorer', 'salsa-explorer', 'style', '{"style": "salsa", "check_ins": 10}', 'common'),
  ('City Explorer', 'city-explorer', 'venue', '{"unique_venues": 5}', 'rare');
```

---

### user_badges

**Purpose:** Badges earned by users

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Context
  earned_via_event_id UUID REFERENCES events(id),
  
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);
CREATE INDEX idx_user_badges_earned ON user_badges(earned_at DESC);
```

---

### notifications

**Purpose:** In-app and email notifications

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  notification_type VARCHAR(50) NOT NULL,
  -- 'new_follower', 'event_reminder', 'payment_received', 
  -- 'review_posted', 'badge_earned', 'message_received', etc.
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Links
  action_url TEXT, -- Where clicking leads
  related_entity_type VARCHAR(50), -- 'event', 'user', 'booking', etc.
  related_entity_id UUID,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  
  -- Delivery
  sent_via_email BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
```

---

### messages

**Purpose:** Direct messages between users

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  message_text TEXT NOT NULL,
  
  -- Thread (future: group messages)
  thread_id UUID,
  parent_message_id UUID REFERENCES messages(id),
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  
  -- Deletion (soft delete per user)
  deleted_by_sender BOOLEAN DEFAULT false,
  deleted_by_recipient BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_from ON messages(from_user_id);
CREATE INDEX idx_messages_to ON messages(to_user_id);
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

-- For inbox queries
CREATE INDEX idx_messages_inbox ON messages(to_user_id, is_read, created_at DESC) 
  WHERE deleted_by_recipient = false;
```

---

## Helper Functions

### update_updated_at_column()

**Purpose:** Automatically update `updated_at` on row changes

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
-- (Example shown for users, apply to others similarly)
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### update_wallet_balance()

**Purpose:** Update wallet balance when transaction created

```sql
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Update wallet balance
  UPDATE wallet_balances
  SET 
    balance_pence = NEW.balance_after_pence,
    last_transaction_at = NEW.created_at,
    last_transaction_id = NEW.id,
    updated_at = CURRENT_TIMESTAMP,
    -- Update totals based on transaction type
    total_topups_pence = CASE 
      WHEN NEW.transaction_type = 'topup' THEN total_topups_pence + NEW.amount_pence
      ELSE total_topups_pence
    END,
    total_bonus_pence = CASE
      WHEN NEW.transaction_type = 'bonus' THEN total_bonus_pence + NEW.amount_pence
      ELSE total_bonus_pence
    END,
    total_spent_pence = CASE
      WHEN NEW.amount_pence < 0 THEN total_spent_pence + ABS(NEW.amount_pence)
      ELSE total_spent_pence
    END
  WHERE user_id = NEW.user_id;
  
  -- Create wallet_balance record if doesn't exist
  IF NOT FOUND THEN
    INSERT INTO wallet_balances (user_id, balance_pence, last_transaction_at, last_transaction_id)
    VALUES (NEW.user_id, NEW.balance_after_pence, NEW.created_at, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_wallet_balance
  AFTER INSERT ON wallet_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_balance();
```

---

### update_event_stats()

**Purpose:** Update event stats when bookings/reviews change

```sql
CREATE OR REPLACE FUNCTION update_event_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total check-ins
  UPDATE events
  SET 
    total_checkins = (
      SELECT COUNT(*) 
      FROM bookings 
      WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) 
        AND status = 'attended'
    ),
    current_bookings = (
      SELECT COUNT(*)
      FROM bookings
      WHERE event_id = COALESCE(NEW.event_id, OLD.event_id)
        AND status IN ('confirmed', 'attended')
    )
  WHERE id = COALESCE(NEW.event_id, OLD.event_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_event_stats_on_booking
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_event_stats();
```

---

## Indexes Strategy

### Primary Indexes (Already Shown Above)

- Foreign keys indexed
- Commonly queried fields indexed
- Unique constraints
- Composite indexes for common query patterns

### Additional Performance Indexes

```sql
-- User search
CREATE INDEX idx_users_search ON users USING GIN(
  to_tsvector('english', display_name || ' ' || COALESCE(bio, ''))
);

-- Event search with filters
CREATE INDEX idx_events_discovery ON events(status, start_datetime, style_id, level_id, city)
  WHERE deleted_at IS NULL;

-- Popular queries
CREATE INDEX idx_bookings_user_recent ON bookings(user_id, created_at DESC)
  WHERE status IN ('confirmed', 'attended');

-- Analytics queries
CREATE INDEX idx_payments_revenue ON payments(recipient_user_id, status, completed_at)
  WHERE status = 'completed';
```

---

## Security Considerations

### Row-Level Security (RLS)

**Enable for sensitive tables:**

```sql
-- Example: Users can only see their own wallet balance
ALTER TABLE wallet_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY wallet_balances_user_policy ON wallet_balances
  FOR SELECT
  USING (user_id = current_user_id());

-- Function to get current user (set by application)
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS UUID AS $$
  SELECT current_setting('app.current_user_id')::UUID;
$$ LANGUAGE SQL STABLE;
```

**Apply RLS to:**
- wallet_balances
- wallet_transactions
- payments (own payments only)
- messages
- notifications

---

### Sensitive Data

**Password hashing:**
- Use bcrypt (strength 10+)
- Never store plaintext
- Handle in application layer, not database

**PII Protection:**
- Email, phone encrypted at rest (hosting level)
- Payment data: Only store Stripe IDs, not card details
- Location: Precise only when needed

---

## Backup & Recovery

**Strategy:**

- **Daily automated backups** (Render/Railway/Supabase handles)
- **Point-in-time recovery** (retain 7-30 days)
- **Weekly manual export** (pg_dump to S3)
- **Test restore quarterly**

**Critical tables for backup:**
- users, payments, wallet_transactions (financial)
- bookings (attendance records)
- events (content)

---

## Migration Strategy

**Tool:** Prisma Migrate or raw SQL migrations

**Process:**
1. Write migration (up and down)
2. Test on local DB
3. Apply to staging
4. Validate data integrity
5. Apply to production (during low-traffic window)

**Example Migration:**

```sql
-- migrations/001_add_tier_fields.sql
BEGIN;

ALTER TABLE users ADD COLUMN tier VARCHAR(20) DEFAULT 'free' NOT NULL;
ALTER TABLE users ADD COLUMN custom_subdomain VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN featured_activity_id UUID;

CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_users_custom_subdomain ON users(custom_subdomain) 
  WHERE custom_subdomain IS NOT NULL;

COMMIT;
```

---

## Performance Optimization

### Query Optimization

**Use EXPLAIN ANALYZE:**
```sql
EXPLAIN ANALYZE
SELECT * FROM events
WHERE city = 'Leeds' AND style_id = '...' AND start_datetime > NOW()
ORDER BY start_datetime
LIMIT 20;
```

**Optimize based on results:**
- Missing indexes → Add index
- Sequential scans on large tables → Add index
- Nested loop joins → Check statistics, maybe add index

### Caching Strategy

**Application-level cache (Redis):**
- Event listings (15 min TTL)
- User profiles (5 min TTL)
- Venue info (1 hour TTL)
- Static data (styles, levels - 24 hour TTL)

**Database-level:**
- Materialized views for complex analytics
- Refresh nightly or on-demand

### Connection Pooling

**Use PgBouncer or built-in pooling:**
- Max connections: 20-50 (depends on hosting tier)
- Transaction pooling mode
- Monitor connection usage

---

## Monitoring & Alerts

**Metrics to track:**
- Query performance (slow queries > 1s)
- Connection pool usage (> 80% = scale)
- Disk space (> 80% = alert)
- Replication lag (if using replicas)
- Error rates (failed queries)

**Tools:**
- PostgreSQL logs
- Hosting provider dashboard (Render, Railway)
- Sentry (application errors)
- Grafana + Prometheus (if self-hosting)

**Alerts:**
- Database down → Immediate
- Slow queries → Daily digest
- Disk space critical → Immediate
- Failed backups → Immediate

---

## Scaling Path

**Stage 1: Single Database (0-1000 users)**
- One PostgreSQL instance
- Application server co-located
- Cost: ~£50/month

**Stage 2: Read Replicas (1000-10,000 users)**
- Primary for writes
- 1-2 replicas for reads
- Load balance read queries
- Cost: ~£150/month

**Stage 3: Caching Layer (10,000-50,000 users)**
- Add Redis for caching
- Reduce database load
- Cost: ~£250/month

**Stage 4: Sharding (50,000+ users)**
- Shard by region (Leeds, Manchester, Birmingham)
- Or by user_id hash
- Complex but necessary at scale
- Cost: ~£500+/month

**Start simple. Scale when needed, not prematurely.**

---

## Changes from v1.0

**Major additions:**
- `tier` field in users table (free/plus/pro)
- `custom_subdomain` field for Plus/Pro tiers
- `featured_activity_id` for Free tier limitation
- `tier_limits` table for configurable tier rules
- `monthly_event_count` tracking and reset mechanism
- `subscription_id` foreign key in users
- `page_settings` JSONB for subdomain customization
- Indexes for subdomain lookups
- School branding fields (custom_subdomain, page_settings)

**Clarifications:**
- Multi-role access patterns documented
- Tier enforcement strategy outlined
- Subscription tracking improved
- Payment flow from wallet emphasized

**Removed:**
- Nothing removed, only additions

---

## Conclusion

This schema supports:
- ✅ Multi-role users (student + teacher + DJ on one account)
- ✅ Tiered access (Free/Plus/Pro) with configurable limits
- ✅ Custom subdomains for Plus/Pro users
- ✅ Payment processing with wallet system
- ✅ Social features (connections, reviews, badges)
- ✅ Organizations (schools) with multi-user management
- ✅ Event discovery and check-ins
- ✅ Full financial audit trail
- ✅ Scalability from day 1 to 50,000+ users

**Next Steps:**
1. Set up PostgreSQL locally
2. Run schema creation scripts
3. Seed with test data
4. Build API on top of schema
5. Iterate based on actual usage

**This is production-ready.** All tables, relationships, indexes, and constraints are defined. Just needs implementation.

---

**Document Version:** 2.0  
**Date:** March 12, 2026  
**Database:** PostgreSQL 14+  
**ORM Recommendation:** Prisma (TypeScript) or SQLAlchemy (Python)

**See Also:**
- Platform Specification v2.0
- Business Plan v2.0
- Project Plan v2.0
