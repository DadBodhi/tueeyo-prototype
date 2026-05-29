# Tueeyo Platform Specification

**Version:** 2.1  
**Date:** March 14, 2026  
**Status:** Conceptual / Pre-development  
**Previous Version:** 2.0 (March 12, 2026)

**Revision Notes (v2.1):**
- Teacher value proposition reframed — communication and student reach is primary hook; videos are secondary and a student acquisition mechanism
- Phase 3 renamed and rewritten — "Teacher Claiming & Communication" replaces "Teacher Claiming & Videos"
- Messaging repositioned — individual messaging is a community feature (all tiers); group messaging by attendee list requires claiming (free); bulk tools and templates are Plus/Pro
- Photo and video uploads added with full privacy model — face detection, blur-by-default, user confirmation, reputation nudges
- Photo/video uploads initially restricted to Plus/Pro for quality control; rolls out to Free tier once stable
- "Danced with" replaced with "connected with" throughout — display label is configurable per activity type
- Financial projections replaced with lean scenario as primary
- Tier feature tables updated to reflect messaging and upload structure
- Phase 5 social features updated — photos/videos included with privacy model, "No Photos/Videos Initially" note removed
- Phase 6 photo sharing section replaced with full privacy model detail

**Revision Notes (v2.0):**
- Updated tier structure (Free/Plus/Pro with universal access)
- Custom subdomain as core Plus tier feature
- Revised launch strategy (organic growth vs. beta school)
- Multi-role upgrade paths (teachers, DJs, photographers, promoters)
- Featured event system for Free tier
- Payment processing moved to Plus tier

---

## About This Document

This specification outlines a comprehensive platform for dance communities, designed to solve the problems created by Facebook's decline as a useful community tool while adding dance-specific features that generic platforms don't provide.

**Background:**
The creator previously taught salsa and ran salsa4dancersleeds.co.uk, a community events directory for the Leeds dance scene. During that time, they envisioned a more integrated platform that would combine event discovery, bookings, payments, and social features - essentially what Facebook used to do well, but purpose-built for dancers.

This document captures that vision in detail, including the system architecture, business model, features, revenue projections, and implementation strategy.

**Current Status:**
This is a conceptual specification, not an active project. It's being shared because:
- The idea is well thought-through and documented
- Someone with the right skills and circumstances might want to build it
- The dance community could benefit from this existing
- Ideas are more valuable when shared than when they sit in a drawer

**What We're Looking For:**
- **Feedback** from dance community members: Would you actually use this?
- **Technical perspectives**: What are we missing or getting wrong?
- **Potential collaborators**: If you have the skills and drive to build this, let's talk
- **Validation**: Does this solve real problems or are we designing for a world that doesn't exist?

**Terms:**
This document is shared openly. If you want to build something based on this spec:
- Please credit the original thinking
- Let us know what you're building (we'd love to see it)
- Consider involving us as advisors if it goes anywhere (but no obligation)
- Feel free to adapt/improve - this isn't gospel

**Contact:**
If you want to discuss this further: salsa4dancersleeds@gmail.com

**Name Origin:**
Tueeyo = "Tú y yo" (Spanish: "You and me") - capturing the partner dance and community connection at the heart of the platform.

---

## Executive Summary

### The Opportunity

The dance community, particularly salsa and Latin dance scenes, faces a critical infrastructure problem. Facebook - once the primary organizing platform - has degraded to the point where dancers struggle to discover classes, coordinate events, and maintain community connections. Generic platforms like Eventbrite and Meetup lack dance-specific features and charge high fees without understanding the nuances of recurring classes, skill levels, and the social nature of partner dancing.

**Tueeyo** is a purpose-built platform for dancers that combines event discovery, professional web presence, payment handling, and community features. It solves the organizational chaos created by Facebook's decline while adding value that generic platforms cannot provide.

### The Solution

Tueeyo provides value for multiple dance community roles:

**For Students/Dancers:**
- Discover classes by style, level, location, teacher
- Check-in to build attendance history and reputation
- Connect with dance partners ("connected with" feature)
- Access class routine videos (requires check-in)
- Pay for classes through unified wallet (optional)
- Review classes with verified attendance

**For Teachers:**
- Free tier: Claim events, message students by attendee group, track attendance, upload videos to main class
- The primary value is communication — for the first time, teachers can reach their own students reliably without collecting phone numbers or email addresses. Every check-in builds the contact list automatically.
- Plus tier (£20/month): Professional website (name.tueeyo.uk) + payment processing
- Sell class packages and memberships
- Analytics on retention and revenue
- Build professional brand and reputation

**For DJs, Photographers, Event Promoters:**
- Same tier structure applies to all roles
- Professional subdomain for any dance-related business
- Booking and payment handling
- Portfolio/showcase features
- Business analytics

**For the Community:**
- Reliable, up-to-date event information
- Social connections and media sharing
- Verified reviews and recommendations
- "By dancers, for dancers" ethos

### Business Model

**Revenue Streams:**

1. **Tiered Subscriptions** (Primary Revenue)
   - Free: £0/month (up to 6 events, 1 featured with full features)
   - Plus: £20/month (professional subdomain + payment processing + full features)
   - Pro: £50/month (multi-person management, for schools/organizations)

2. **Transaction Fees** (Secondary Revenue)
   - 3% of payments processed through platform (Plus/Pro tiers only)
   - Gradually increasing to 5% over 24 months
   - Applied to class payments, bookings, ticket sales

3. **Future Revenue**
   - Affiliate marketing (dance shoes, apparel)
   - Premium analytics/tools
   - Marketplace fees (if implemented)

### Launch Strategy (Organic Growth)

**Unlike traditional platforms, Tueeyo launches student-first:**

**Phase 1 (Months 1-2): Public Directory**
- Build events calendar (like salsa4dancersleeds, but better)
- Manually populate Leeds events
- Users can add events (moderated)
- SEO attracts students looking for classes

**Phase 2 (Months 3-4): Check-In Gamification**
- Students create accounts to check-in
- Build attendance history, earn badges
- Connect with other dancers
- Social features unlock
- **Students engaged before teachers even join**

**Phase 3 (Month 4-5): Teacher Claiming & Communication**
- Teachers see students checking into their events
- "Claim this event" feature
- Claimed event → group messaging to attendees by class
- Teachers can cancel, update, announce to their students for the first time
- Video upload available on featured event (Free tier) — shared via subdomain URL as student acquisition tool
- **Viral loop:** Teachers share magik-mike.tueeyo.uk → students join to access gated content
- **Teachers recruit students organically**

**Phase 4 (Months 6-7): Plus Tier Launch**
- Teachers with growing classes want professional features
- Custom subdomain (yourname.tueeyo.uk) + payment processing
- £20/month + 3% fee
- Launch to 2-3 early adopters with heavy support

**Phase 5 (Months 8+): Network Effects**
- Students use wallet at multiple schools
- Teachers upgrade to accept wallet payments
- DJs, photographers, promoters see value
- Organic growth across all user types

**No beta school required. Students come first, everyone else follows.**

### Financial Projections (5-Year, Revised)

**Year 1 (Leeds Focus):**
- Subscriptions: ~£60/month avg (3 Plus by Dec)
- Transactions: ~£50/month avg
- Annual Revenue: **~£1,300**
- Net: -£10,000 (development + infrastructure)

**Year 2 (West Yorkshire):**
- Subscriptions: £300/month (15 Plus)
- Transactions: £350/month
- Annual Revenue: **~£7,800**
- Net: Break-even to small profit

**Year 5 (UK National, 60% penetration in key cities):**
- Subscriptions: £1,000/month (40 Plus, 5 Pro)
- Transactions: £1,500/month (£50k GMV)
- Annual Revenue: **~£30,000**
- Net: £10-15k profit (lean operations)

**Note:** Lower than transaction-only model but more realistic and diversified.

### Investment Needed

**Bootstrap Option (Recommended):**
- £5-10k personal investment or small angel
- Build yourself with Claude Code (if technical)
- Or hire part-time developer
- Prove concept in Leeds before raising more

**Seed Round (If scaling faster):**
- £50-75k for full-time development + 12 months runway
- Build MVP, launch in West Yorkshire
- Prove traction before Series A

**This is a lifestyle business / regional play, not VC-scale opportunity.**

### Why Now?

1. **Facebook's Decline:** Dancers actively seeking alternatives
2. **AI Technology:** Face detection, content moderation now affordable
3. **Payment Infrastructure:** Stripe makes payment handling trivial
4. **Mobile-First Culture:** Dancers expect app-based solutions
5. **Post-COVID Rebuild:** Dance scene reorganizing, needs new infrastructure
6. **Creator Economy:** People comfortable paying for professional tools (subdomains, payments)

---

## Product Vision & Core Philosophy

### What Tueeyo Is

**The operating system for dance communities** - the infrastructure layer that enables dancers to discover, participate, connect, and thrive.

We're not just a booking platform. We're building the social fabric that holds dance communities together in the post-Facebook era.

### Core Principles

**1. Community-First, Not Algorithm-First**
- Chronological feeds, not engagement-optimized chaos
- Transparent search rankings
- What's useful, not what's viral

**2. Privacy-Protective by Default**
- Users control their visibility
- AI-assisted privacy (when media features added)
- No data mining or advertising business model

**3. Fair Economics**
- Low fees (3-5% vs. Eventbrite's 8%+)
- Free tier genuinely free (not crippled freemium)
- Subscription unlocks value, doesn't hold features hostage

**4. Multi-Role Fluidity**
- One account, multiple roles (student + teacher + DJ)
- Any role can upgrade to Plus/Pro
- Platform supports your whole dance life

**5. Teacher/Creator Incentivization**
- They maintain their own content (platform self-populates)
- Professional tools make them look good
- Revenue share aligns incentives

**6. Organic Growth > Forced Adoption**
- No mandates, no exclusivity
- Value delivered at every tier
- Network effects drive natural adoption

---

## User Roles & Tier Structure

### Universal Account System

**Every user has ONE account** with potentially multiple roles:
- Student/Dancer (everyone starts here)
- Teacher
- DJ
- Photographer
- Performer
- Event Organizer/Promoter
- Venue Manager

**Roles are tags, not separate account types.** Sarah can be Student + Teacher + DJ simultaneously.

### Tier Structure (Universal Access)

**Any user, regardless of role, can access any tier:**

---

#### Free Tier (£0/month)

**Limits:**
- Up to 6 events per month (create or claim)
- 1 "featured" activity with full video features
- Basic profile: tueeyo.uk/[role]/your-name
- No payment processing
- No custom subdomain
- No photo/video uploads (initially — rolls out to Free tier once Plus/Pro launch is stable)

**Messaging (all Free tier users):**
- Individual messaging with any platform user
- Group messaging to attendees of claimed events (requires claiming)
- ❌ No bulk messaging tools, scheduling, or templates (Plus/Pro only)

**Full Features on Featured Activity:**
- Video upload (YouTube link)
- Post updates and announcements
- Analytics for that activity

**Basic Features on Other Activities:**
- Event listing (visible on platform)
- Check-in tracking
- Attendee lists
- QR code generation
- ❌ No video uploads
- ❌ No updates/posts

**Who Uses Free Tier:**
- Students (discovering events, checking in, connecting)
- Hobby teachers (1 class per week — communicate with students, basic tracking)
- Amateur DJs (trying platform)
- New photographers (building portfolio)
- Anyone testing the platform

**Value Proposition:**
"Join the dance community free. Discover events, track your journey, connect with dancers, and reach your students directly. Upgrade when you're ready to go professional."

---

#### Plus Tier (£20/month + 3% transaction fee)

**Limits:**
- Up to 20 events per month
- Full features on ALL activities
- Custom subdomain enabled
- Payment processing enabled

**Key Features:**

**1. Professional Web Presence:**
- Custom subdomain: **yourname.tueeyo.uk**
- Fully customizable landing page:
  - Custom header image
  - Bio and teaching philosophy
  - Video gallery
  - Student testimonials/reviews
  - Social media links
  - Branded colors
- Professional email forwarding: hello@yourname.tueeyo.uk
- SEO optimized (Google indexes your page)
- Mobile responsive

**2. Payment Processing:**
- **For Teachers:**
  - Students pay through app
  - Sell class packages (10 classes for £70)
  - Sell memberships (£30/month unlimited)
  - Automatic weekly payouts
- **For DJs:**
  - Booking fees
  - Get paid for gigs through platform
- **For Photographers:**
  - Session bookings
  - Photo package sales
- **For Promoters:**
  - Ticket sales (3% fee vs Eventbrite's 8%)
  - Pre-event payments
- **For All:**
  - Detailed payment records (tax time)
  - No-show protection (pre-booking)
  - Automatic invoicing

**3. Advanced Features:**
- Analytics dashboard (retention, revenue, trends)
- Waitlist management (when capacity full)
- Automated email reminders
- Bulk messaging tools, scheduling, templates
- Higher search ranking on platform
- "Verified [Role]" badge
- Promotional tools (discount codes, referrals)

**4. Photo & Video Uploads:**
- Upload photos and videos to events
- Full privacy controls and face detection tools
- Photo analytics (views, engagement)
- Tagging tools
- Videos gated by check-in (attendees only, or wider sharing)

**5. Unlimited Content:**
- Upload videos to all events/activities
- Post unlimited updates
- Media galleries

**Who Uses Plus Tier:**
- Professional teachers (2+ classes)
- Working DJs (regular bookings)
- Professional photographers
- Event promoters/organizers
- Anyone earning money from dance

**Value Proposition:**
"Your professional dance business website + payment handling for £20/month. Worth it if you get 1 extra booking or save 1 hour per week."

---

#### Pro Tier (£50/month + 3% transaction fee)

**For multi-person organizations:**

**Limits:**
- Unlimited events
- Unlimited features
- Organization subdomain: schoolname.tueeyo.uk

**Key Features:**

**1. Multi-Person Management:**
- Add multiple people to organization
- Sub-accounts with permissions:
  - Teachers can edit their class descriptions
  - Can't change times/prices (admin controls)
  - Can message their students
  - Can upload to their classes
- Consolidated dashboard
- Organization-wide analytics

**2. Organization Branding:**
- School/organization subdomain
- Unified brand across all teachers/events
- Shared media library
- Organization bio and story

**3. Advanced Management:**
- Teacher performance metrics
- Revenue by teacher/event
- Student flow between classes
- Retention analytics by teacher
- Bulk operations (messaging, scheduling)

**4. Financial Tools:**
- Consolidated payment dashboard
- Split payments (organization vs. teacher)
- Automated payroll/splits
- Tax reporting across organization

**Who Uses Pro Tier:**
- Dance schools (3+ teachers)
- Event promotion companies
- DJ collectives
- Performance groups
- Photography studios

**Value Proposition:**
"Manage your whole organization from one dashboard. Professional branding + payment handling + team analytics for £50/month."

---

### Example User Journeys by Role

#### Student Journey

**Month 1 (Free, Always):**
- Creates account to check into classes
- Builds attendance history
- Earns badges (10 classes, 50 classes, etc.)
- Connects with dance partners ("connected with")
- Watches class routine videos
- Follows favorite teachers/DJs

**Never needs to upgrade** - all student features are free.

**Optional:** If student also teaches/DJs, can upgrade for those activities.

---

#### Teacher Journey

**Month 1 (Free Tier):**
- Claims Monday beginner class (featured event)
- Uploads routine videos weekly
- Messages Monday students
- Sees attendance tracking

**Month 2:**
- Adds Wednesday improvers class
- Can only upload videos to Monday (featured event)
- Wednesday students ask: "Where's the video?"
- Teacher frustrated by limitation

**Month 3 (Upgrades to Plus):**
- Wants professional page: maria-salsa.tueeyo.uk
- Enables payment processing
- Now uploads videos to both classes
- Students can pay through app
- Sells 10-class packages (£70)
- **5 students buy packages = £350 upfront**
- Plus tier already paid for itself

**Month 6:**
- Custom page on Instagram bio
- 12 new students from Instagram
- Weekly automatic payouts
- Detailed analytics show Wednesday retention lower
- Adjusts teaching approach, retention improves

**Plus tier value realized:**
- Professional branding brings students
- Payment convenience increases revenue
- Analytics improve teaching effectiveness

---

#### DJ Journey

**Month 1 (Free Tier):**
- Creates DJ profile
- Links to SoundCloud mixes
- Gets tagged when DJing at events
- Basic listing in DJ directory

**Month 2:**
- Gets booking inquiry through platform
- Realizes wants professional presence
- Upgrades to Plus

**Month 3 (Plus Tier):**
- Professional page: djname.tueeyo.uk
- Shows: upcoming gigs, past events, mixes
- Event promoters can book and pay
- 3% fee on bookings
- **Books 4 gigs × £150 = £600**
- Platform takes £18 in fees
- Plus £20 subscription = £38 total cost
- **Net: £562 (vs. managing bookings via WhatsApp)**

**Plus tier value:**
- Professional brand
- Easier booking process
- Payment handling
- Portfolio showcase

---

#### Photographer Journey

**Month 1 (Free Tier):**
- Uploads photos to events attended
- Tags dancers (they approve/decline)
- Basic portfolio

**Month 2 (Upgrades to Plus):**
- Professional page: emma-photography.tueeyo.uk
- Offers session bookings (£80/session)
- Dancers can book and pay through site
- **Books 5 sessions = £400**
- Platform takes £12 in fees
- Plus £20 subscription = £32 cost
- **Net: £368**

**Plus tier value:**
- Booking system
- Payment handling
- Professional portfolio
- Integrated into dance community

---

#### Event Promoter Journey

**Month 1 (Free Tier):**
- Creates monthly salsa social events
- Students discover and check-in
- Free promotion on platform

**Month 2:**
- Event growing (50+ attendees)
- Wants to pre-sell tickets
- Wants professional event page
- Upgrades to Plus

**Month 3 (Plus Tier):**
- Event page: leeds-salsa-social.tueeyo.uk
- Pre-sells tickets (£8 each)
- **Sells 50 tickets = £400**
- Platform takes 3% = £12
- Plus £20 subscription = £32 cost
- **Net: £368 (vs. Eventbrite: £400 - £32 fees - £0 subscription = £368)**

**But Tueeyo also provides:**
- Attendee management
- Check-in system
- Photo galleries
- Community features

**Plus tier value:**
- Cheaper than Eventbrite
- Better integrated features
- Professional branding

---

### Tier Comparison Matrix

| Feature | Free | Plus | Pro |
|---------|------|------|-----|
| **Basics** |
| Events per month | 6 | 20 | Unlimited |
| Featured activities (full features) | 1 | All | All |
| Profile URL | tueeyo.uk/role/name | **yourname.tueeyo.uk** | **orgname.tueeyo.uk** |
| Check-in tracking | ✅ | ✅ | ✅ |
| Social features | ✅ | ✅ | ✅ |
| **Content** |
| Video uploads | Featured only | All events | All events |
| Photo galleries | Featured only | All events | All events |
| Messaging | Featured only | All followers | All + bulk |
| Post updates | Featured only | Unlimited | Unlimited |
| **Professional** |
| Custom subdomain | ❌ | ✅ | ✅ |
| Customizable landing page | ❌ | ✅ | ✅ |
| Professional email | ❌ | ✅ | ✅ |
| Branded colors/design | ❌ | ✅ | ✅ |
| **Payments** |
| Accept payments | ❌ | ✅ (3% fee) | ✅ (3% fee) |
| Class packages | ❌ | ✅ | ✅ |
| Memberships | ❌ | ✅ | ✅ |
| Automatic payouts | ❌ | ✅ Weekly | ✅ Weekly |
| **Analytics** |
| Basic stats | ✅ | ✅ | ✅ |
| Advanced analytics | ❌ | ✅ | ✅ |
| Revenue tracking | ❌ | ✅ | ✅ Consolidated |
| Retention insights | ❌ | ✅ | ✅ By teacher |
| **Management** |
| Sub-accounts | ❌ | ❌ | ✅ |
| Permissions | ❌ | ❌ | ✅ |
| Bulk operations | ❌ | ❌ | ✅ |
| Organization dashboard | ❌ | ❌ | ✅ |
| **Platform** |
| Search ranking | Standard | Higher | Highest |
| Verified badge | ❌ | ✅ | ✅ |
| Waitlist management | ❌ | ✅ | ✅ |
| Promotional tools | ❌ | ✅ | ✅ |
| **Cost** |
| Monthly fee | £0 | £20 | £50 |
| Transaction fee | N/A | 3% | 3% |

---

## Core Features (Detailed)

### Phase 1: Public Directory (Months 1-2)

**Goal:** Better events calendar than Facebook

**Features:**

**1. Event Discovery (Public, No Login Required):**
- Browse all dance events in region
- Search by:
  - Style (Salsa, Bachata, Kizomba, etc.)
  - Level (Beginner, Improver, Intermediate, Advanced)
  - Day of week
  - Time of day
  - Location/venue
  - Teacher/school/organizer
  - Price range
- Filter and sort results
- Map view (see events near you)
- Calendar view (week/month)
- "Today's events" quick view

**2. Event Detail Pages:**
- Event title and description
- Date, time, venue (with map)
- Style and level
- Price
- Teacher/organizer profile links
- Number of check-ins (social proof)
- Reviews (if available)
- "Add to calendar" button
- Share buttons (social media)

**3. User-Generated Events:**
- **Any logged-in user can create events**
- Simple form:
  - Title, description
  - Venue (select existing or add new)
  - Date/time
  - Recurring? (weekly, etc.)
  - Style, level
  - Price (display only, not bookable yet)
- Moderation queue for new events
- You (admin) approve/edit/reject
- Prevents spam, maintains quality

**4. Venue Management:**
- Venue database:
  - Name, address, city
  - Coordinates (for map)
  - Capacity (optional)
  - Facilities (parking, bar, accessible, etc.)
  - Photos
- Users can suggest new venues
- Admin approves

**Value Delivered:**
- Dancers find classes easily (better than Facebook)
- SEO brings organic traffic ("salsa classes Leeds")
- Community-maintained (users add events)
- Always up-to-date

**Technical Implementation:**
- Next.js for SSR (SEO-friendly)
- PostgreSQL for data
- Google Maps API for maps
- Algolia or PostgreSQL FTS for search

**Deliverable:** Public events directory live, users discovering and adding events

---

### Phase 2: Check-Ins & Attendance (Months 3-4)

**Goal:** Gamify attendance, build social graph

**Features:**

**1. User Accounts:**
- Register with email/password
- Or social login (Google, Facebook)
- Profile creation:
  - Name, photo, bio
  - City/location
  - Roles (student, teacher, DJ, etc.)
  - Dance styles interested in

**2. QR Code Check-Ins:**
- **Teacher flow:**
  - Claim an event (or create it)
  - Generate QR code for event
  - Display QR at class (on phone or printed)
- **Student flow:**
  - Open Tueeyo app
  - Scan QR code (or manual entry)
  - "Checked in to Monday Salsa - Beginner!"
  - Attendance recorded

**3. Location-Based Check-In (Optional):**
- Alternative to QR: use GPS
- If at venue location (geofence) during event time
- Tap "Check-in to this event"
- Prevents fake check-ins from home

**4. Manual Check-In (Teachers):**
- Teacher can add students manually
- For cash payers who forgot to scan
- Or students without smartphones

**5. Attendance Tracking:**
- Personal attendance history
- "You've attended 47 classes"
- By style: "15 Salsa, 8 Bachata, 24 Kizomba"
- By venue, by teacher
- Streak tracking: "5 weeks in a row!"

**6. Reputation System:**
- Reputation score based on:
  - Total check-ins
  - Consistency (weekly attendance)
  - Variety (different styles/venues)
  - Longevity (months active)
  - Reviews written (helpful contributions)
- Displayed on profile
- Unlocks features:
  - 5 check-ins: Can write reviews
  - 10 check-ins: Can award "best dance" badges
  - 25 check-ins: Advanced features

**7. Badges & Achievements:**
- Milestone badges:
  - "First Class" (1 check-in)
  - "Getting Started" (5 check-ins)
  - "Regular" (25 check-ins)
  - "Dedicated Dancer" (50 check-ins)
  - "Legend" (100 check-ins)
- Style-specific:
  - "Salsa Explorer" (10 salsa classes)
  - "Bachata Enthusiast" (10 bachata classes)
- Venue variety:
  - "City Explorer" (5 different venues)
- Displayed on profile, shareable

**Value Delivered:**
- Students motivated to check-in (gamification)
- Attendance data for students (track progress)
- Attendance data for teachers (who's regular, who's lapsing)
- Social proof (see who else attended)
- Reputation system prevents spam/fake reviews

**Technical Implementation:**
- QR code generation (simple library)
- Geolocation API (HTML5)
- Database: bookings table (check-in records)
- Badge system (achievements logic)

**Deliverable:** Students checking in regularly, building engagement before any payment features

---

### Phase 3: Teacher Claiming & Communication (Months 4-5)

**Goal:** Teachers engage — communication first, viral loop begins

**The core insight:** Teachers currently have no reliable way to reach their own students. No email list, no phone numbers, no WhatsApp group for everyone. Students show up, pay cash, and leave. A cancelled class means posting on Facebook and hoping the algorithm shows it. Tueeyo solves this automatically — every student who checks in has implicitly opted into communications from that teacher. The contact list builds itself.

**Features:**

**1. Event Claiming:**
- Events exist (created by admin, users, or the teacher themselves)
- Event shows: "15 people checked in this month"
- Teacher creates account (or already has one as a dancer)
- Searches for their events
- "Is this your event? Claim it"
- Admin approval (verify they own it)
- Teacher now owns event and has access to attendee group

**2. Teacher Dashboard:**
- See all owned events
- Attendance stats per event
- Recent check-ins
- Student engagement trends

**3. Group Messaging by Attendee List (Free Tier):**
- Claimed event → named group of real attendees formed automatically
- Teacher can message the whole group: "Class cancelled tonight — venue issue"
- Or message by recency: "Everyone who attended in the last 4 weeks"
- Students notified via app and email
- **This is the aha moment** — teacher reaches students they had no prior way to contact

**4. Video Upload (Featured Event — Free Tier):**
- Teacher chooses 1 "featured event"
- Pastes YouTube link (filmed at end of class — students film it anyway)
- Video appears on event page
- Only visible to users who checked into that event
- Teacher shares subdomain URL (e.g. magik-mike.tueeyo.uk) via WhatsApp/Instagram
- Students not on platform follow link → video gated behind check-in → they join
- **This is the student acquisition mechanism** — not the teacher acquisition mechanism

**5. Teacher Promotion:**
- Teacher posts in WhatsApp group or Instagram:
  - "Routine video is on my Tueeyo page — magik-mike.tueeyo.uk 👉 check in to watch"
- Students who aren't on platform follow the link
- Students join to access content
- Students check in next class
- **Student viral loop activated via subdomain URL**

**Value Delivered:**
- Teachers reach their own students reliably for the first time
- Cancellations, venue changes, workshop announcements — all solvable instantly
- Video hosting as bonus value
- Students recruited organically through shared URL

**Technical Implementation:**
- Event claiming flow + admin approval
- Group messaging (push notifications + email)
- YouTube embed (simple iframe)
- Access control (check booking table)
- Subdomain routing (wildcard DNS)

**Deliverable:** Teachers claiming events, messaging students, sharing subdomain URLs; students joining to access content

---

### Phase 4: Plus Tier (Months 6-7)

**Goal:** Monetization begins, professional features

**Features:**

**1. Custom Subdomain System:**

**Setup:**
- User upgrades to Plus
- Chooses subdomain: "maria-salsa.tueeyo.uk"
- System checks availability
- DNS wildcard handles routing
- Instant activation

**Landing Page Builder:**
- Drag-and-drop or template-based
- Sections:
  - Hero (header image, name, tagline)
  - About (bio, teaching philosophy)
  - Events (upcoming classes/gigs)
  - Video gallery
  - Reviews/testimonials
  - Contact/booking
- Customization:
  - Upload images
  - Choose accent color
  - Add social links
  - Custom text sections
- Live preview
- Mobile responsive automatically

**Teacher Example: maria-salsa.tueeyo.uk**
```
Header: [Photo of Maria dancing]
"Maria Rodriguez - Salsa & Bachata Teacher"
"Specializing in Cuban style and musicality"

About Me:
"I've been teaching salsa for 8 years..."

Upcoming Classes:
- Monday Salsa Beginners - 7pm, Salsa Soul
- Wednesday Bachata Improvers - 8pm, Dance Fusion
[Book Now buttons]

Video Gallery:
[Thumbnails of class routines, performances]

Student Reviews:
★★★★★ "Maria is an amazing teacher..." - Sarah

Contact: hello@maria-salsa.tueeyo.uk
[Instagram] [Facebook]
```

**2. Payment Processing:**

**Wallet System:**
- Students pre-load wallet with real currency, receive round-number credits at a small discount
  - Example: Pay £48, receive £50 tueeyobucks
  - Example: Pay £95, receive £100 tueeyobucks
  - Exact discount levels to be confirmed — may vary seasonally or by promotion
- Wallet balance used across all Plus tier teachers/providers
- Encourages pre-loading (sunk cost effect, convenience)

**Payment Flow:**
- Student checks in to class (QR scan)
- If class requires payment:
  - "Pay £8 for this class"
  - Options: Wallet balance or card (GPay/Apple Pay/Stripe)
  - If wallet: instant deduction
  - If card: Stripe checkout
- Booking created (status: paid)
- Teacher sees payment in dashboard
- Weekly payout to teacher's bank

**Class Packages:**
- Teacher sets up: "10 classes for £70"
- Student buys package
- Package credits stored in database
- Each check-in deducts 1 credit
- When credits run out, prompted to buy more

**Memberships:**
- Teacher sets up: "£30/month unlimited"
- Student subscribes (Stripe recurring)
- Monthly charge to card
- Unlimited check-ins to that teacher's classes
- Can cancel anytime

**Transaction Fees:**
- 3% deducted from teacher's portion
- Example: Student pays £8 → Teacher gets £7.76, platform gets £0.24
- Fee increases 0.5% every 6 months (communicated transparently)
- Caps at 5%

**Payout System:**
- Teachers accumulate balance in platform
- Weekly automatic payout to bank (ACH/bank transfer)
- Or cash out manually anytime
- Payment records for taxes

**3. Advanced Analytics (Plus Tier):**

**Dashboard for Teachers:**
- Revenue tracking:
  - This week: £240
  - This month: £960
  - This year: £8,400
  - Trends graph
- Attendance tracking:
  - Average per class: 15 students
  - Regular attendees: 12 (80%)
  - New students: 3
  - Lapsed students: 2 (haven't attended in 3 weeks)
- Retention analytics:
  - 4-week retention: 85%
  - 12-week retention: 60%
  - At-risk students (attendance declining)
- Revenue per student:
  - Top 10 students (by spend)
  - Average: £32/month
- Class comparison:
  - Monday class: 15 avg students, £120/week
  - Wednesday class: 12 avg students, £96/week

**Actionable Insights:**
- "Sarah hasn't attended in 2 weeks. Send re-engagement email?"
- "Wednesday class fills to only 80% capacity. Consider different time?"
- "Students who buy packages have 40% better retention. Promote packages more."

**4. Waitlist Management:**
- Teacher sets class capacity: 15 students
- 16th student tries to book
- "Class full. Join waitlist?"
- When someone cancels, waitlist auto-notified
- First person gets 2-hour claim window
- Then moves to next person

**Value Delivered:**
- Professional web presence (worth £500-2000 if built custom)
- Payment automation (saves hours per week)
- Revenue boost (packages/memberships increase spending)
- Analytics drive better decisions

**Technical Implementation:**
- Wildcard DNS: *.tueeyo.uk
- Subdomain routing in app
- Stripe integration (payments, subscriptions, payouts)
- Wallet system (database balance tracking)
- Analytics calculations (database queries + caching)

**Deliverable:** Plus tier live, 2-3 teachers using it successfully, making money

---

### Phase 5: Social Features (Months 8-9)

**Goal:** Increase engagement, retention, and community depth

**Features:**

**1. "Connected With" Connections:**
- After checking into event, prompt: "Who did you connect with?"
- Search for other attendees
- Mark as "connected with" — mutual connection created
- Display label is configurable per activity type ("danced with", "trained with", "ran with", "danced alongside", "danced against")
- Displayed on profile: "Connected with 23 people"
- See mutual connections: "You both connected with Sarah"

**2. Following:**
- Follow teachers, DJs, photographers, other students
- Activity feed shows:
  - "[Teacher] uploaded new video"
  - "[DJ] playing at Friday social"
  - "[Student] checked into Advanced class"
  - "[Friend] connected with 5 new people this week"

**3. Activity Feed:**
- Personalised, chronological feed (no algorithm manipulation)
- Check-ins from people you follow
- Upcoming events they're attending
- New videos from teachers you follow
- Achievements/badges earned
- Connections formed

**4. Simple Text Posts:**
- Short updates, tagged to events or people
- "Had an amazing time at Monday class!"
- "Looking for a dance partner for Friday social"
- Likes and comments

**5. Direct Messaging (all tiers):**
- 1-to-1 messages between any users
- Simple chat interface
- Notifications

**6. Event-Based Groups (Optional):**
- Auto-created for each event
- Only visible to attendees
- Ephemeral (disappears after event date)
- Teacher can post announcements
- Students can coordinate

**7. Photo & Video Sharing (Plus/Pro initially, Free tier when stable):**

*See full privacy model below.*

**Upload:**
- Anyone with upload access can add photos/videos to events they attended
- Tagged to the event automatically

**Privacy model — Photos:**
- On upload, face detection runs automatically
- Recognised faces (registered users) → blurred until they confirm
- Unrecognised faces (no account, or not matched) → blurred permanently until they join and claim
- Tagged users notified and must separately confirm before their real face is visible
- Tagging and face confirmation are independent steps
- Wider sharing beyond event attendees requires confirmation from photographer and people appearing in photo
- Users can set default in settings:
  - "Always show my face" — skips confirmation step
  - "Always blur my face" — overrides even confirmed photos

**Privacy model — Videos:**
- Same upload and face detection mechanics
- Default is shareable (opt-out rather than opt-in) — videos are typically created for sharing
- User can change default to "always require my confirmation" in settings

**Blur approach:**
- Standard blur (not AI face replacement) — familiar, honest, technically reliable
- Users understand their face is there but protected

**Reputation nudges:**
- Small reputation points for appearing in a photo and making it public
- Small reputation points for correct tagging
- Gentle incentive, not coercive

**Rollout plan:**
- Phase 1: Plus/Pro upload access only — iron out bugs, validate privacy controls
- Phase 2: Open to Free tier once stable

**Value Delivered:**
- Rich community memory — events documented and searchable
- Privacy respected by default — nobody surprised to find their face public
- Reputation system rewards participation
- Photographers have a natural home for their work

**Technical Implementation:**
- Face detection API (e.g. AWS Rekognition or similar)
- Blur processing on upload
- Notification system for face confirmations
- Sharing permission model (photographer + subjects)
- Connections table (relationships)
- Activity feed (chronological)
- Messaging (websockets or polling)

**Deliverable:** Active social network with photos/videos, privacy controls working, students returning regularly

---

### Phase 6: Refinement (Months 10-12)

**Goal:** Polish, stability, growth

**Features to Add Based on Feedback:**

**1. Reviews System:**
- Verified reviews (must have attended)
- Star rating (1-5)
- Difficulty rating (vs. stated level)
- Text review
- Teacher can respond
- Moderation for abuse
- Helpful/not helpful voting

**2. Waitlist Enhancements:**
- Automatic notifications
- Predictive (based on no-show rates)
- Priority waitlist (members first)

**3. Email Automation:**
- Teacher can schedule emails:
  - "Class tomorrow reminder"
  - "You missed 2 weeks, come back!"
  - "Special workshop this weekend"
- Pre-written templates
- Scheduled sends

**4. Free Tier Photo/Video Upload Rollout:**
- Once Plus/Pro photo/video upload is stable and privacy controls proven
- Open upload access to Free tier users
- Basic tools (no analytics, no bulk tagging)
- Same privacy model applies

**5. Performance Optimization:**
- Database query optimization
- Caching (Redis)
- Image optimization (CDN)
- Code splitting
- Lazy loading

**6. Bug Fixes:**
- Based on user reports
- Payment edge cases
- Mobile browser issues
- Cross-browser testing

**7. Feature Polish:**
- Better onboarding flow
- Improved search
- Faster loading
- Cleaner UI
- Accessibility improvements

**Don't Overbuild:**
- Only add features users actually request
- No feature creep
- Keep it simple

**Deliverable:** Stable platform, growing organically, no critical bugs

---

## Revenue Model (Detailed)

### Subscription Revenue

**Free Tier:**
- £0/month
- Purpose: User acquisition, trial
- Conversion target: 10-15% upgrade to Plus

**Plus Tier:**
- £20/month
- Target: Professional users (teachers, DJs, photographers, promoters)
- Typical customer: 2+ events per week OR earning money from dance

**Pro Tier:**
- £50/month
- Target: Organizations (schools, promotion companies, collectives)
- Typical customer: 3+ people, 10+ events per week

**Projections:**

**Year 1:**
- Free tier: 200 users
- Plus tier: 3 users (months 7-12 avg)
- Pro tier: 0
- Subscription revenue: £60/month avg = **£360/year** (half-year)

**Year 2:**
- Free tier: 500 users
- Plus tier: 15 users
- Pro tier: 1 user
- Subscription revenue: (15×£20)+(1×£50) = £350/month = **£4,200/year**

**Year 5:**
- Free tier: 2,000 users
- Plus tier: 40 users
- Pro tier: 5 users
- Subscription revenue: (40×£20)+(5×£50) = £1,050/month = **£12,600/year**

---

### Transaction Fee Revenue

**Fee Structure:**
- Launch: 3%
- Month 6: 3.5%
- Year 2: 4%
- Year 3: 4.5%
- Year 4: 5% (cap)

**Applied to:**
- Class payments
- Package purchases
- Membership subscriptions
- Event ticket sales
- DJ booking fees
- Photography session fees
- Any payment through platform

**Deducted from:**
- Seller's portion (teacher, DJ, photographer, etc.)
- Not added on top for buyer

**Example:**
- Student pays £8 for class
- Platform fee: £8 × 3.5% = £0.28
- Teacher receives: £8 - £0.28 = £7.72

**Projections:**

**Year 1:**
- GMV (Gross Merchandise Value): £1,500/month avg (months 7-12)
- Avg fee: 3.25%
- Transaction revenue: £49/month avg = **£294/year** (half-year)

**Year 2:**
- GMV: £10,000/month
- Avg fee: 4%
- Transaction revenue: £400/month = **£4,800/year**

**Year 5:**
- GMV: £40,000/month
- Avg fee: 5%
- Transaction revenue: £2,000/month = **£24,000/year**

---

### Total Revenue Projections (Lean Operations)

| Year | Subscriptions | Transactions | **Total** | **Net Profit** |
|------|--------------|--------------|-----------|----------------|
| 1 | £240 | £188 | **£428** | -£5,072 |
| 2 | £3,000 | £2,074 | **£5,074** | -£3,426 |
| 3 | £6,480 | £7,776 | **£14,256** | -£3,744 |
| 4 | £12,600 | £21,600 | **£34,200** | **+£13,700** |
| 5 | £21,600 | £43,560 | **£65,160** | **+£41,660** |

**Lean operations assumed throughout** — part-time contract development, no full-time hires until profitability. Founder draws no salary Years 1–3. Cash profitable from Year 4, cumulative break-even at Year 4 on ~£12,000 total investment.

See Business Plan v2.1 for full cost breakdown and assumptions.

---

### Cost Structure

**Year 1:**
- Development: £5,000 (part-time or self-built)
- Hosting: £600 (Render.com)
- Stripe fees: £100
- Domain/SSL: £50
- Tools: £200
- **Total: £6,000**

**Year 2:**
- Part-time developer: £15,000
- Hosting: £1,200
- Stripe fees: £500
- Marketing: £2,000
- Tools/services: £500
- Legal/accounting: £1,000
- **Total: £20,000**

**Year 5:**
- Developer: £45,000
- Community manager: £25,000
- Hosting: £3,000
- Stripe fees: £2,000
- Marketing: £5,000
- Tools/services: £1,500
- Legal/accounting: £2,000
- **Total: £83,500**

**Break-even: Year 3**

---

## Technical Architecture

### Technology Stack

**Frontend:**
- Next.js 14+ (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Vercel (hosting - free tier initially)

**Backend:**
- Next.js API routes (serverless functions)
- PostgreSQL 14+ (database)
- Prisma (ORM)
- Render.com or Railway (database hosting)

**Third-Party Services:**
- Stripe (payments, subscriptions, payouts)
- Cloudflare (DNS, CDN, SSL)
- SendGrid (transactional emails - later)
- Google Maps API (maps, geocoding)
- (Optional) Mux.com (video hosting - Plus tier)

**Development:**
- Git + GitHub (version control)
- GitHub Actions (CI/CD)
- Claude Code (AI-assisted development)

**Why This Stack:**
- Modern, performant, scalable
- Low cost (free tiers for early stage)
- Easy to hire for (popular technologies)
- Well-documented
- Fast development iteration

---

### Database Schema

**See separate document:** `tueeyo-database-schema-v2.0.md`

**Key tables:**
- users (with tier, custom_subdomain, featured_activity_id)
- events
- bookings (check-ins)
- payments
- wallet_balances, wallet_transactions
- schools (Pro tier organizations)
- connections (social graph)
- reviews
- tier_limits (configurable tier rules)

**Notable changes from v1.0:**
- Added tier tracking to users
- Added custom_subdomain field
- Added featured_activity_id for Free tier
- Added tier_limits table for flexible rules

---

### Infrastructure & Deployment

**Development:**
- Local PostgreSQL
- Local Next.js dev server
- ngrok for webhook testing (Stripe)

**Staging:**
- Render.com (or Railway)
- Separate database
- Connected to GitHub (auto-deploy on push)

**Production:**
- Render.com (or Railway)
- Managed PostgreSQL (daily backups)
- Cloudflare (CDN, DDoS protection)
- Monitoring: Sentry (error tracking)
- Uptime monitoring: UptimeRobot

**Scaling Path:**
- Start: Single server + database (~£50/month)
- Growth: Add read replicas (~£100/month)
- Scale: Multiple servers, Redis cache (~£250/month)
- National: Consider DigitalOcean or AWS (~£500+/month)

**Don't prematurely optimize.** Start simple, scale when needed.

---

## Go-to-Market Strategy

### Not a Beta School Partnership

**Original plan was:**
- Recruit beta school upfront
- Heavy support, exclusive deal
- School recruits students
- Platform launches with user base

**Why that won't work:**
- Hard to convince school without proof
- You're not currently teaching (no natural partnership)
- Chicken-and-egg problem
- High pressure, high stakes

### Organic Growth Strategy

**Better approach: Students first, teachers follow**

---

#### Phase 1: Public Directory Launch (Months 1-2)

**You populate initial content:**
- Manually add Leeds dance events
- All major schools, teachers, venues
- 30-50 events to start
- Research social media, websites, Facebook

**Soft launch to students:**
- Share in Leeds dance Facebook groups
- "New events calendar for Leeds dancers"
- Better than Facebook (chronological, searchable, complete)
- No account needed to browse

**Enable user-generated events:**
- Logged-in users can add events
- You moderate and approve
- Community helps maintain calendar
- Less work for you over time

**Success metrics:**
- 50+ events in calendar
- 500+ page views per week
- 10+ user-submitted events
- SEO traffic begins ("salsa classes Leeds")

---

#### Phase 2: Check-In Launch (Months 3-4)

**Add gamification layer:**
- Announce: "Track your dance journey!"
- Create account to check-in
- Earn badges, build reputation
- See who else attended

**Marketing:**
- Post in dance groups
- "Check-in to classes, earn badges!"
- Gamification appeals to dancers
- Social proof (see friends' check-ins)

**No payment yet:**
- Students don't need to convince teachers
- They just check-in to classes they're already attending
- Builds habit and data

**Success metrics:**
- 100+ student accounts
- 50+ check-ins per week
- 20+ students with 5+ check-ins (engaged users)
- Users checking into multiple schools (cross-pollination)

---

#### Phase 3: Teacher Claiming & Videos (Month 5)

**Teachers notice students checking in:**
- "12 people checked into my Monday class this month"
- "I should claim this and see who's coming"

**Outreach to progressive teachers:**
- Identify teachers whose classes have most check-ins
- Direct message: 
  - "Hey [Teacher], students are checking into your classes on Tueeyo"
  - "Want to claim your events and upload routine videos for them?"
  - "It's free, takes 5 minutes"

**Teacher uploads first video:**
- Films routine after class
- Uploads to YouTube (unlisted)
- Pastes link into Tueeyo
- Students can watch (if they checked in)

**Teacher promotes in WhatsApp/Facebook:**
- "This week's routine is on Tueeyo!"
- "Check-in at class to access 👉 [link]"

**Students create accounts to watch:**
- Existing students check-in
- New students discover platform
- Students at other schools check-in too
- Network effects begin

**Success metrics:**
- 3-5 teachers claimed events
- 2+ teachers uploading videos regularly
- 200+ student accounts (doubled from Phase 2)
- 100+ check-ins per week (doubled)
- Students checking in specifically to access videos

---

#### Phase 4: Plus Tier Soft Launch (Months 6-7)

**Approach early adopter teachers:**
- Teachers actively uploading videos
- Teachers with 2+ classes
- Teachers expressing interest in payment features

**The pitch:**
```
Hey [Teacher],

Your classes are doing great on Tueeyo - 50+ students 
have checked in over the past 2 months!

We've just launched Plus tier with two big features:

1. Your own professional website: maria-salsa.tueeyo.uk
   - Fully customizable landing page
   - Show your classes, videos, reviews
   - Share one link everywhere (Instagram, Facebook, cards)

2. Easy payment handling:
   - Students pay through the app
   - You get paid automatically each week
   - Sell class packages (10 for £70) and memberships
   - 3% fee (vs Eventbrite's 8%)

£20/month + 3% per booking

Want to try it free for 30 days? I'll help you set it up.
```

**Heavy onboarding support:**
- Video call to set up
- Help customize their page
- Test payment flow together
- Troubleshoot issues immediately
- Weekly check-ins

**Goal: 2-3 successful Plus tier teachers**

**Success metrics:**
- 2+ teachers upgrade to Plus
- They actually use features (not just subscribed)
- They process payments through platform (£500+ GMV)
- They're happy (NPS 8+)
- 80%+ retention after free trial

---

#### Phase 5: Network Effects (Months 8-12)

**Students have wallet balances:**
- Used wallet at School A
- Now want to use same wallet at School B
- Ask School B teacher: "Do you take Tueeyo payment?"

**Teachers see competitors' Plus pages:**
- Teacher A has professional maria-salsa.tueeyo.uk
- Teacher B still just on Free tier
- Teacher B feels FOMO
- Teacher B upgrades

**DJs, photographers, promoters notice:**
- "Teachers have professional pages..."
- "I want djname.tueeyo.uk for my bookings"
- They upgrade too

**Organic growth accelerates:**
- More Plus tier → more GMV → more transaction fees
- Students cross-pollinate between schools
- Teachers recruit each other (word of mouth)
- Platform becomes expected standard

**Success metrics:**
- 10+ Plus tier users
- 5+ schools using platform
- 500+ active students
- £5,000+ GMV per month
- 90%+ Plus tier retention
- Break-even on operating costs

---

### Marketing Tactics

**SEO (Organic Search):**
- Content: Class listings indexed by Google
- Keywords: "salsa classes Leeds", "bachata lessons Leeds"
- Local SEO: Google Business profiles for schools
- Backlinks: Ask schools to link from their sites

**Social Media:**
- Presence: Instagram, Facebook, TikTok
- Content: Student success stories, teacher spotlights
- User-generated: Encourage students to share check-ins
- Viral: "I've connected with 50 people!" badges shareable

**Community Engagement:**
- Attend events (build relationships)
- Sponsor competitions/workshops (brand visibility)
- Partner with venues (cross-promotion)

**Word of Mouth:**
- Referral bonuses (£5 credit for referring friend)
- Teacher incentives (free month Plus for bringing 3 teachers)
- Student evangelism (badges for sharing)

**Partnerships:**
- Dance shoe shops (cross-promotion)
- Fitness studios (complementary audience)
- Travel companies (dance holiday packages)

**Content Marketing:**
- Blog: "How to Choose a Salsa Class"
- Videos: "Beginner's Guide to Partner Dancing"
- Guides: "Leeds Salsa Scene Overview"
- SEO traffic → platform awareness

**Paid Advertising (Later, if needed):**
- Facebook/Instagram ads (targeting dancers, fitness enthusiasts)
- Google Ads (search terms: "dance classes near me")
- Retargeting (people who visited but didn't sign up)

**Start with organic, add paid only if needed.**

---

## Competitive Analysis

### Direct Competitors

**Facebook Events/Groups:**
- **Market share:** 70%+ of dance event promotion
- **Our advantages:**
  - No algorithm (chronological, reliable)
  - Dance-specific features (styles, levels, check-ins)
  - Better search and filtering
  - Professional tools for teachers (Plus tier)
  - Payment integration
- **Their advantages:**
  - Ubiquitous, everyone already there
  - Free for everyone
  - Network effects (all your friends)
- **Strategy:** Position as "what Facebook used to be" + dance-specific upgrades

**Eventbrite:**
- **Market share:** 15-20% of paid dance events
- **Pricing:** 2-5% + £0.59-0.99 per ticket (effectively 8-10% for £8 class)
- **Our advantages:**
  - Lower fees (3-5% vs 8-10%)
  - Designed for recurring classes (not just one-offs)
  - Social/community features
  - Dance-specific
- **Their advantages:**
  - Trusted brand
  - Professional, established
  - Better reporting (initially - until we catch up)
- **Strategy:** Undercut on price, exceed on features

**Meetup:**
- **Market share:** 5-10% of dance groups
- **Pricing:** $15-45/month for organizers
- **Our advantages:**
  - Free tier for small teachers
  - Integrated payments (they don't have this)
  - Dance-specific features
  - Revenue share model (not flat fee)
- **Their advantages:**
  - Established community platform
  - Group management features
- **Strategy:** Better for professional teachers, cheaper for small teachers

**DanceBug / Similar Directories:**
- **Market share:** <5%, declining
- **Our advantages:**
  - Full platform vs passive directory
  - Modern UX/UI
  - Social features
  - Payment integration
  - Mobile app (eventually)
- **Their advantages:**
  - Comprehensive listings (initially)
  - SEO authority (established)
- **Strategy:** Better in every way, just need adoption

### Indirect Competitors

**WhatsApp/Telegram Groups:**
- **Usage:** 60%+ for class communication
- **Relationship:** Complementary, not competitive
- **Strategy:** Tueeyo for structure/payments, WhatsApp for chat

**Instagram:**
- **Usage:** Promotional, discovery
- **Relationship:** Complementary (use Instagram to drive to Tueeyo)
- **Strategy:** Tueeyo pages shareable on Instagram bio

### Competitive Moats

Once established, Tueeyo creates defensibility through:

**1. Network Effects:**
- More students → more valuable to teachers
- More teachers → more valuable to students
- More payment users → more pressure on non-adopters
- Hard to leave once your community is there

**2. Data Moat:**
- Attendance history
- Reviews and ratings
- Connections ("connected with")
- Can't take this data to competitors

**3. Habit Formation:**
- Students check Tueeyo first for events
- Teachers upload videos here
- Routine and muscle memory

**4. Switching Costs:**
- Invested time customizing Plus tier page
- Payment integration set up
- Student base already here
- Reputation built up

**5. Brand Recognition:**
- "The platform for dancers"
- First-mover in region
- Community-trusted

---

## Risk Analysis

### Key Risks

**1. Low Adoption (HIGH RISK)**
- **Risk:** Students don't create accounts, teachers don't claim events
- **Mitigation:**
  - Start with useful directory (value without account)
  - Gamification (badges, reputation) hooks students
  - Teacher videos create pull demand
  - Free tier removes barrier to entry
  - Organic growth strategy (no forced adoption)
- **Validation:** Phase 2 check-in metrics tell us if students engage

**2. Payment Adoption Failure (MEDIUM RISK)**
- **Risk:** Teachers don't upgrade to Plus, students don't use wallet
- **Mitigation:**
  - Plus tier valuable beyond payments (subdomain!)
  - Free tier demonstrates value before paywall
  - Low fees (3% vs 8%) competitive
  - Packages/memberships drive revenue per student
  - Not dependent on 100% payment adoption (multi-revenue model)

**3. Technical Execution (MEDIUM-HIGH RISK)**
- **Risk:** Solo builder with ADHD struggles to finish
- **Mitigation:**
  - 2-week prototype test (validate you can build)
  - Phase gates (decision points to continue or stop)
  - Claude Code assistance (AI pair programming)
  - Could pivot to partner/hire if prototype succeeds
  - Document everything (handoff-ready if needed)
- **This is real:** Executive function challenges are the biggest risk

**4. Market Size Too Small (LOW-MEDIUM RISK)**
- **Risk:** Not enough dancers in Leeds to sustain
- **Mitigation:**
  - Conservative estimates (9,000 UK dancers realistic)
  - Expand to other dance styles (bachata, kizomba, etc.)
  - Expand geographically (other UK cities)
  - Multi-role (teachers, DJs, photographers, promoters)
  - International expansion possible (Ireland, Spain, US)

**5. Competition Response (LOW RISK)**
- **Risk:** Facebook improves, Eventbrite adds dance features
- **Mitigation:**
  - First-mover advantage in niche
  - Network effects create moat
  - Dance-specific hard to replicate generically
  - Close community relationships
  - Rapid iteration based on feedback

**6. Economic Downturn (MEDIUM RISK)**
- **Risk:** Recession reduces dance class spending
- **Mitigation:**
  - Dance classes affordable (£8 vs gym £40/month)
  - Social + exercise combo resilient
  - Platform doesn't depend on spending growth
  - Free tier keeps users engaged even if not paying
  - Subscription model more predictable than pure transaction

### Success Criteria & Kill Criteria

**After 2 Weeks (Prototype):**
- **Continue if:** Working directory + event creation, still excited, enjoyed building
- **Stop if:** Can't build with Claude Code, hated the process, overwhelming

**After 4 Months (Directory + Check-ins):**
- **Continue if:** 100+ students, 50+ weekly check-ins, 3+ teachers engaged
- **Stop if:** <50 students, <10 weekly check-ins, no teacher interest

**After 9 Months (Plus Tier Launch):**
- **Continue if:** 3+ Plus tier users, £200+ monthly revenue, stable platform
- **Stop if:** <2 Plus tier users, <£100 monthly revenue, users churning

**After 12 Months:**
- **Success:** 10+ teachers, 500+ students, 5+ Plus tier, £500+/month revenue
- **Partial Success:** 5+ teachers, 200+ students, 3+ Plus tier, £200+/month - iterate
- **Failure:** <5 teachers, <100 students, <2 Plus tier, <£100/month - reassess or abandon

**Be willing to kill it.** Not every idea needs to be built. Data will tell you.

---

## Open Questions & Future Considerations

### Open Questions

**Technical:**
- [ ] Best subdomain management approach (DNS provider)?
- [ ] Direct video upload (Mux) or stick with YouTube?
- [ ] Native mobile apps eventually or web-only?
- [ ] How to handle multi-currency if international expansion?

**Product:**
- [ ] Add photo sharing (simple, no AI) or skip entirely?
- [ ] Reviews: How to prevent review bombing or gaming?
- [ ] School/teacher relationship: Strict or loose coupling?
- [ ] Should Free tier get analytics (basic) or keep Plus-only?

**Business:**
- [ ] Raise money or bootstrap?
- [ ] Subscription price testing (is £20 optimal or try £15/£25)?
- [ ] Transaction fee ceiling (5% or could go higher)?
- [ ] International pricing (adjust for local markets)?

**Market:**
- [ ] Expand to other dance styles when? (tango, swing, ballroom)
- [ ] Partner with dance federations/organizations?
- [ ] B2B opportunity (white-label for dance schools)?

### Future Features (Post-Launch)

**Media:**
- Simple photo sharing (no AI privacy initially)
- Video galleries (not just class routines)
- AI privacy controls (later, if demanded and revenue justifies)

**Advanced Social:**
- Group chats (class-specific, event-specific)
- Forums/discussion boards
- Dance partner matching
- Event RSVPs with social planning

**Teacher Tools:**
- Curriculum planning
- Student progress tracking
- Automated grading/feedback
- AI-generated class plans

**Marketplace:**
- Sell dance shoes, apparel
- Affiliate links (commission on sales)
- Used item marketplace

**Platform Extensions:**
- Mobile apps (iOS, Android)
- API for integrations
- Widgets (embed calendar on school websites)
- White-label (schools can brand their own)

**Music:**
- Spotify/Apple Music integration
- Playlist sharing by DJs
- Music recommendations
- If resources allow: License music catalog (Fania Records dream - £30M)

**Only add features users request. Don't overbuild.**

---

## Conclusion

Tueeyo addresses a genuine need in the dance community with a technically feasible solution and realistic business model. The organic growth strategy (students first, teachers follow) solves the chicken-and-egg problem that killed the original beta school approach.

**Key Innovations:**
1. **Teacher video uploads** create viral loop (students check-in to access)
2. **Custom subdomain** as Plus tier hook (professional web presence)
3. **Multi-role universal tiers** (anyone can upgrade)
4. **Free tier with real value** (not crippled freemium)
5. **Organic growth** (no forced adoption, natural network effects)

**Realistic Assessment:**
- This is a lifestyle business, not a VC-scale startup
- £30-40k annual revenue realistic at UK national scale
- But: low costs = profitable with small team
- Genuine value to community
- Defensible through network effects

**Critical Success Factors:**
1. **Execution:** Can you actually build this? (2-week prototype answers)
2. **Student engagement:** Will students check-in? (Phase 2 metrics answer)
3. **Teacher video adoption:** Will teachers upload videos? (Phase 3 answers)
4. **Plus tier value:** Will teachers pay £20/month? (Phase 4 answers)

**Next Steps:**
1. **Decide:** Build yourself, find partner, or wait?
2. **If building:** 2-week prototype test
3. **If successful:** Phase 1 (directory) → Phase 2 (check-ins) → iterate

The documents exist. The plan is sound. The decision is yours.

---

**Document Version:** 2.0  
**Date:** March 12, 2026  
**Changes from v1.0:**
- Complete tier structure revision (Free/Plus/Pro)
- Custom subdomain as core Plus feature
- Multi-role universal access
- Organic growth strategy (vs beta school)
- Featured event system for Free tier
- Realistic revenue projections
- Payment moved to Plus tier
- Removed complex AI features from MVP

**See Also:**
- Database Schema v2.0
- Business Plan v2.0
- Project Plan v2.0

---

*"By dancers, for dancers."*
