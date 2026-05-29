# Tueeyo MVP Development Project Plan
## Using Claude Code Multi-Agent Architecture

**Version:** 2.1  
**Date:** March 14, 2026  
**Duration:** 6 months (24 weeks)  
**Developer:** Solo founder using Claude Code  
**Approach:** Multi-agent coordination with oversight and systematic bug elimination  
**Previous Version:** 2.0 (March 12, 2026)

**Revision Notes (v2.1):**
- Phase 3 renamed to "Teacher Claiming & Communication" — messaging is primary deliverable, video upload is secondary
- Week 11 now builds claiming + group messaging together — the aha moment is immediate
- Week 12 reframed — video upload as student acquisition tool, not teacher hook
- Week 13 outreach message updated — pitches communication first, videos second
- Phase 3 decision gate updated — validation is teacher messaging, not video uploads
- In-app prompts updated — "claim to message your students" replaces "claim to upload videos"
- "Danced with" replaced with "connected with" throughout
- Schema references updated to v2.1
- Success criteria and financial figures updated to match revised projections

**Revision Notes (v2.0):**
- Updated phase structure to match organic launch strategy
- Custom subdomain build added to Phase 4
- Payment processing moved to Plus tier launch (Phase 4, not Phase 3)
- Featured event system for Free tier included
- Removed beta school onboarding, added organic growth tactics
- Multi-role considerations (teachers, DJs, photographers, promoters)
- More realistic timeline (acknowledges ADHD challenges)

---

## Executive Summary

This project plan outlines how to build the Tueeyo MVP using Claude Code's multi-agent capabilities, specifically designed for a solo founder with ADHD who thinks in systems but struggles with sustained execution.

**The Approach:**

1. **Break work into small, concrete tasks** (2-4 hour chunks, not day-long marathons)
2. **Use specialized AI agents** for different domains (backend, frontend, testing, etc.)
3. **Implement systematic oversight** to catch errors and maintain quality
4. **Build in accountability** through checkpoints and decision gates
5. **Focus on MVP scope** (no feature creep, ruthless prioritization)
6. **Accept the ADHD reality** (structure around it, not pretend it doesn't exist)

**Success Criteria:**
- Working platform deployed to production
- Students can discover events, check-in, connect with community
- Teachers can claim events, message their students, upload videos
- Plus tier functional (custom subdomain + payments)
- No critical bugs in core flows
- Completed in 6 months (or clear decision to stop)

**The Honest Assessment:**

This plan is optimistic about your ability to sustain focus for 6 months. The 2-week prototype test is critical - it tells you if you can actually do this before you commit. Phase gates let you stop gracefully if hyperfixation wanes. The multi-agent approach reduces cognitive load, but YOU still have to show up and direct the work.

**The plan exists. The tools exist. The execution is on you.**

---

## Table of Contents

1. [Claude Code Multi-Agent Architecture](#claude-code-multi-agent-architecture)
2. [Project Phases & Timeline](#project-phases--timeline)
3. [Phase 0: Prototype Test (2 Weeks)](#phase-0-prototype-test-2-weeks)
4. [Phase 1: Public Directory (Weeks 3-6)](#phase-1-public-directory-weeks-3-6)
5. [Phase 2: Check-In System (Weeks 7-10)](#phase-2-check-in-system-weeks-7-10)
6. [Phase 3: Teacher Features (Weeks 11-14)](#phase-3-teacher-features-weeks-11-14)
7. [Phase 4: Plus Tier Launch (Weeks 15-18)](#phase-4-plus-tier-launch-weeks-15-18)
8. [Phase 5: Social Features (Weeks 19-22)](#phase-5-social-features-weeks-19-22)
9. [Phase 6: Polish & Launch (Weeks 23-24)](#phase-6-polish--launch-weeks-23-24)
10. [Weekly Work Pattern (ADHD-Optimized)](#weekly-work-pattern-adhd-optimized)
11. [Multi-Agent Workflow Examples](#multi-agent-workflow-examples)
12. [Handling Common ADHD Challenges](#handling-common-adhd-challenges)
13. [Tools & Setup](#tools--setup)
14. [Success Metrics & Decision Gates](#success-metrics--decision-gates)

---

## Claude Code Multi-Agent Architecture

### Agent Roles & Specializations

**1. Architect Agent (Planning & Oversight)**
- **Purpose:** High-level design decisions, system architecture, coordination
- **When to Use:**
  - Start of each phase
  - When integrating new features
  - When solving cross-cutting concerns
  - Weekly architecture reviews
- **Prompting Pattern:**
  ```
  You are the Architect Agent for Tueeyo. Your role is to make high-level design 
  decisions. Consider: scalability, security, maintainability, alignment with 
  database schema (v2.1). Review current codebase and provide architectural 
  guidance for [specific feature/integration].
  ```

**2. Backend Agent (API & Database)**
- **Purpose:** PostgreSQL, API endpoints, business logic, authentication, tier enforcement
- **When to Use:**
  - Database migrations
  - API endpoint creation
  - Authentication/authorization
  - Payment integration (Stripe)
  - Tier limit enforcement
  - Data validation
- **Prompting Pattern:**
  ```
  You are the Backend Agent specializing in Node.js/TypeScript and PostgreSQL.
  Build [specific feature] following REST principles and the database schema v2.1.
  Include tier enforcement (free/plus/pro limits), error handling, validation, 
  and security measures. Reference tier_limits table for configurable rules.
  ```

**3. Frontend Agent (UI & UX)**
- **Purpose:** React components, pages, user flows, styling, responsive design
- **When to Use:**
  - Page creation
  - Component development
  - Form handling
  - Responsive design
  - User experience flows
- **Prompting Pattern:**
  ```
  You are the Frontend Agent specializing in React and Tailwind CSS.
  Create [specific UI component/page] that is responsive, accessible,
  and follows modern UX patterns. Match Tueeyo brand (vibrant, community-focused,
  dance-themed). Show tier badges (Free/Plus/Pro) where relevant.
  ```

**4. Integration Agent (Third-Party Services)**
- **Purpose:** Stripe, authentication, subdomain routing, email
- **When to Use:**
  - Payment processing setup (Stripe)
  - OAuth/authentication (if using)
  - Subdomain wildcard DNS/routing
  - Email service integration
  - QR code generation
- **Prompting Pattern:**
  ```
  You are the Integration Agent specializing in third-party APIs.
  Integrate [service] following best practices for error handling, retry logic,
  and security. Use environment variables for credentials. For Stripe: handle
  webhooks properly. For subdomains: implement wildcard routing.
  ```

**5. Testing Agent (Quality Assurance)**
- **Purpose:** Write tests, identify bugs, validate business logic
- **When to Use:**
  - After completing each feature
  - Before merging to main branch
  - When bugs are reported
  - End of each sprint (every 2 weeks)
- **Prompting Pattern:**
  ```
  You are the Testing Agent for Tueeyo. Review [feature/file] and:
  1. Write unit tests for critical functions (especially tier enforcement)
  2. Write integration tests for API endpoints
  3. Identify edge cases and potential bugs
  4. Test tier limits (Free: 6 events, Plus: 20 events, etc.)
  5. Suggest improvements for error handling
  ```

**6. Security Agent (Hardening & Auditing)**
- **Purpose:** Security review, vulnerability scanning, compliance
- **When to Use:**
  - After completing authentication
  - Before payment integration
  - Before custom subdomain launch (XSS risks)
  - Weekly security reviews
  - Before production deployment
- **Prompting Pattern:**
  ```
  You are the Security Agent for Tueeyo. Audit [code/feature] for:
  - SQL injection vulnerabilities
  - XSS/CSRF risks (especially in custom subdomain pages)
  - Authentication/authorization flaws (tier-based access)
  - Data exposure risks (wallet balances, payments)
  - GDPR compliance issues
  Provide specific fixes for any issues found.
  ```

**7. DevOps Agent (Deployment & Infrastructure)**
- **Purpose:** Hosting, CI/CD, monitoring, wildcard DNS for subdomains
- **When to Use:**
  - Initial infrastructure setup
  - Deployment configuration
  - Database backups
  - Monitoring setup
  - Subdomain wildcard DNS configuration
  - Performance optimization
- **Prompting Pattern:**
  ```
  You are the DevOps Agent for Tueeyo. Set up [infrastructure component]
  for production deployment on Render.com (or Railway). Focus on reliability,
  security, cost-effectiveness. Include: wildcard DNS for *.tueeyo.uk,
  SSL certificates, monitoring and alerting, database backups.
  ```

**8. Bug Elimination Agent (Systematic Debugging)**
- **Purpose:** Track down bugs, fix errors, validate fixes
- **When to Use:**
  - When errors occur
  - After testing reveals issues
  - During integration testing
  - Before each demo/milestone
- **Prompting Pattern:**
  ```
  You are the Bug Elimination Agent for Tueeyo. Debug [specific issue]:
  1. Reproduce the bug
  2. Identify root cause
  3. Propose fix
  4. Verify fix doesn't break other features (especially tier limits)
  5. Add test to prevent regression
  ```

### Lead Agent Coordination Pattern

For each work session, designate one **Lead Agent** who:
- Coordinates sub-agents
- Reviews their output
- Ensures consistency with schema v2.1 and tier structure
- Makes final integration decisions

**Example Multi-Agent Session:**
```
Lead Agent: Architect
Task: Build tier enforcement system

Session Plan:
1. Architect: Design tier enforcement approach (middleware vs per-endpoint)
2. Backend: Implement tier_limits table queries and enforcement logic
3. Security: Review for bypass vulnerabilities
4. Frontend: Add tier badges and upgrade prompts
5. Testing: Write tests for all tier limit scenarios
6. Bug Elimination: Test edge cases (hitting limits, changing tiers)
7. Lead (Architect): Review integration, approve merge
```

---

## Project Phases & Timeline

### Overview (6 Months)

| Phase | Weeks | Focus | Deliverable |
|-------|-------|-------|-------------|
| 0 | 1-2 | Prototype Test | Validate you can build this |
| 1 | 3-6 | Public Directory | Events calendar, user-generated events |
| 2 | 7-10 | Check-In System | QR codes, attendance tracking, gamification |
| 3 | 11-14 | Teacher Features | Event claiming, video uploads, Free tier limits |
| 4 | 15-18 | Plus Tier | Custom subdomains, payment processing |
| 5 | 19-22 | Social Features | Connections, activity feed, messaging |
| 6 | 23-24 | Polish & Launch | Bug fixes, performance, public launch |

**Decision Gates:**
- **End of Week 2 (Prototype):** Continue or stop?
- **End of Week 10 (Check-ins):** Students engaging? Continue or pivot?
- **End of Week 14 (Teacher videos):** Teachers uploading? Continue or pivot?
- **End of Week 18 (Plus tier):** Teachers paying? Continue or reassess?

---

## Phase 0: Prototype Test (2 Weeks)

### Goal

**Validate you can actually build this before committing 6 months.**

This is NOT about building a perfect product. This is about answering:
1. Can I use Claude Code to build web apps?
2. Do I enjoy this process?
3. Can I sustain focus for 2 weeks?

If yes to all three → proceed to Phase 1.  
If no to any → stop, find partner, or wait.

---

### Week 1: Learn & Setup

**Monday-Tuesday (4-6 hours total):**

**Environment Setup:**
- Install Node.js (v18+), PostgreSQL (v14+), Git
- Install VS Code with extensions:
  - Prettier (auto-format)
  - ESLint (catch errors)
  - Prisma (database tools)
- Create GitHub account and repository
- Initialize Next.js project:
  ```bash
  npx create-next-app@latest tueeyo-prototype
  cd tueeyo-prototype
  npm install
  ```

**Deliverable:** Development environment working, Next.js dev server runs

---

**Wednesday-Thursday (6-8 hours total):**

**Learn Next.js Basics:**
- Follow official Next.js tutorial (https://nextjs.org/learn)
- Build their sample blog
- Understand: pages, routing, API routes, styling (Tailwind)
- Don't worry about perfection, just learn the flow

**Use Claude Code as Tutor:**
- Prompt: "Explain how Next.js routing works, with examples"
- Prompt: "Show me how to create an API endpoint in Next.js"
- Prompt: "Help me debug this error: [paste error]"

**Deliverable:** Completed Next.js tutorial, understand basics

---

**Friday (2-4 hours):**

**PostgreSQL Setup:**
- Install PostgreSQL locally
- Create database: `tueeyo_dev`
- Install Prisma: `npm install prisma @prisma/client`
- Initialize Prisma: `npx prisma init`
- Create simple schema:
  ```prisma
  model Event {
    id        String   @id @default(cuid())
    title     String
    city      String
    createdAt DateTime @default(now())
  }
  ```
- Run migration: `npx prisma migrate dev`
- Test with Prisma Studio: `npx prisma studio`

**Deliverable:** Database connected, can create/view events via Prisma Studio

---

### Week 2: Build Micro-MVP

**Monday-Tuesday (6-8 hours total):**

**Backend: Event API**

Use Backend Agent:
```
Build a simple REST API for events:
- POST /api/events (create event)
- GET /api/events (list events, filter by city)
- GET /api/events/[id] (get one event)

Use Prisma with PostgreSQL. Include basic validation (title and city required).
Return proper HTTP status codes.
```

**Deliverable:** Working API endpoints, test with Postman/Thunder Client

---

**Wednesday-Thursday (6-8 hours total):**

**Frontend: Event Pages**

Use Frontend Agent:
```
Create two pages:
1. /events - List all events in a grid, filter by city dropdown
2. /events/[id] - Show event details

Use Tailwind CSS for styling. Make it look decent (not perfect).
Fetch data from the API endpoints created earlier.
```

**Deliverable:** Public pages showing events, responsive on mobile

---

**Friday (4-6 hours):**

**User-Generated Events (Stretch Goal):**

If time allows:
```
Add ability for users to create events:
- Simple form at /events/create
- Submit to POST /api/events
- Redirect to event detail page
- No authentication yet (anyone can create)
```

**Deliverable:** Users can create events via form

---

### End of Week 2: Decision Point

**Ask yourself:**

1. **Did I build it?**
   - Yes: Events API works, pages display events
   - No: Struggled significantly, didn't finish

2. **Did I enjoy it?**
   - Yes: Felt satisfying, interesting, engaging
   - No: Felt tedious, frustrating, boring

3. **Did I show up?**
   - Yes: Worked most days, maintained momentum
   - No: Avoided it, made excuses, hard to start

**Decision:**

**If 3 x YES:**
→ **CONTINUE.** You can do this. Proceed to Phase 1.

**If any NO:**
→ **STOP or PIVOT:**
- Find technical co-founder (show them your prototype)
- Hire part-time developer (you manage, they build)
- Wait for different circumstances (kids older, more time)

**Be honest with yourself.** Two weeks of data is valuable. Don't ignore it.

---

## Phase 1: Public Directory (Weeks 3-6)

### Goal

**Build a better events calendar than Facebook.**

Students can browse events without creating an account. Events are searchable, filterable, comprehensive. You manually seed initial data, users can suggest additions.

**Success Criteria:**
- 50+ events listed (Leeds area)
- Public pages indexed by Google
- 500+ page views per week
- 10+ user-submitted events

---

### Week 3: Core Event Model

**Backend: Full Event Schema**

Expand database schema:
```
Use Backend Agent:
"Implement the events table from tueeyo-database-schema-v2.0.md:
- All fields (title, description, venue_id, style_id, level_id, etc.)
- Foreign keys (venues, styles, levels)
- Create venues, styles, levels tables
- Seed data for styles and levels
- Migration + Prisma schema"
```

**Tasks:**
1. Create migrations for events, venues, styles, levels tables
2. Define Prisma schema matching database design
3. Seed styles (Salsa, Bachata, etc.) and levels (Beginner, Intermediate, etc.)
4. Create API endpoints:
   - GET /api/events (with filters: city, style, level, date)
   - GET /api/events/[id]
   - POST /api/events (create - open to all for now)
   - GET /api/venues, /api/styles, /api/levels

**Deliverable:** Full event model with filtering, venues linked

---

### Week 4: Event Discovery UI

**Frontend: Public Pages**

```
Use Frontend Agent:
"Create event discovery interface:
1. /events - List view with filters (sidebar: city, style, level, date)
2. /events/[id] - Event detail page (title, description, venue with map, 
   date/time, style, level, price, 'Add to Calendar' button)
3. Mobile responsive
4. Use Tailwind CSS, modern design
5. Loading states, empty states"
```

**Additional:**
- Integrate Google Maps API for venue locations (or simple static map)
- Filter UI (checkboxes for styles/levels, date picker)
- Search bar (text search on title/description)

**Deliverable:** Beautiful event discovery pages, works on mobile

---

### Week 5: User-Generated Events

**Authentication (Simple)**

```
Use Backend Agent:
"Implement basic email/password auth using NextAuth.js:
- Register endpoint
- Login endpoint
- Session management
- Protected routes middleware"
```

**Event Creation Form**

```
Use Frontend Agent:
"Create /events/create page (auth required):
- Form: title, description, venue (dropdown or add new), date/time, 
  style, level, price
- Recurring checkbox (weekly)
- Validation
- Submit to API
- Success → redirect to event detail"
```

**Moderation Queue (Admin)**

```
Simple admin panel at /admin/events (you only):
- List pending events (moderation_status = 'pending')
- Approve/reject buttons
- Edit before approving
```

**Deliverable:** Users can create events, you moderate, events go live

---

### Week 6: SEO & Content

**SEO Optimization**

```
Use Architect Agent:
"Optimize Tueeyo for search engines:
- Next.js metadata (title, description per page)
- Schema.org structured data for events (JSON-LD)
- Sitemap.xml generation
- robots.txt
- Open Graph tags for social sharing"
```

**Manual Content Seeding**

Your job (not Claude):
- Research Leeds dance events (Facebook, school websites, Google)
- Manually create 30-50 events in database
- Ensure variety (styles, levels, venues, days)
- Quality over quantity

**Analytics Setup**

```
Use DevOps Agent:
"Set up basic analytics:
- Google Analytics 4 (or Plausible for privacy)
- Track: page views, event views, searches
- Simple dashboard"
```

**Deliverable:** SEO-optimized, 50+ events, analytics tracking

---

### End of Week 6: Check-In

**Metrics:**
- [ ] 50+ events listed?
- [ ] Public pages live and working?
- [ ] 100+ page views (share in 1-2 Facebook groups)?
- [ ] 5+ user-submitted events?
- [ ] Still enjoying building?

**Decision:**
- Metrics good + still motivated → **Continue to Phase 2**
- Metrics poor or lost motivation → **Reassess or stop**

---

## Phase 2: Check-In System (Weeks 7-10)

### Goal

**Gamify attendance, build student engagement.**

Students create accounts to check-in at classes. Earn badges, build reputation, track progress. Teachers see who's attending. **No payment yet** - just tracking and fun.

**Success Criteria:**
- 100+ student accounts created
- 50+ check-ins per week
- 20+ students with 5+ check-ins (engaged users)
- Badges working

---

### Week 7: User Accounts & Profiles

**User Model**

```
Use Backend Agent:
"Implement users table from schema v2.1:
- All fields including tier (default 'free'), roles (array)
- Registration API (email, password, name)
- Login API (return JWT token)
- Profile API (GET/PUT /api/users/me)
- Password hashing with bcrypt"
```

**Authentication State**

```
Use Frontend Agent:
"Create auth context/provider:
- Store JWT in localStorage (or httpOnly cookie)
- Provide user object to all components
- Login/logout functions
- Protected route wrapper
- Redirect to /login if not authenticated"
```

**Profile Pages**

```
Use Frontend Agent:
"Create:
- /register - Registration form
- /login - Login form  
- /profile - User profile (view/edit name, bio, city, dance styles)
- Display user's tier badge (Free/Plus/Pro - just Free for now)"
```

**Deliverable:** Users can register, login, edit profile

---

### Week 8: QR Check-In System

**QR Code Generation**

```
Use Integration Agent:
"Implement QR code check-in:
- Generate QR code for each event (contains event_id, timestamp, HMAC signature)
- GET /api/events/[id]/qr returns QR image (PNG)
- Cache QR code (same for all users for same event)"
```

**Check-In API**

```
Use Backend Agent:
"Create check-in endpoint:
- POST /api/check-in
- Input: QR payload (scanned data)
- Verify signature (prevent fake QRs)
- Verify timestamp (24hr window)
- Check user authenticated
- Create booking record (status: 'attended', booking_type: 'checkin')
- Increment user.total_checkins
- Return success with event details"
```

**Manual Check-In (Teacher)**

```
- POST /api/events/[id]/check-in-manual (teacher only)
- Input: user email or ID
- Create booking, mark as manual_entry
- For teachers to add students who forgot to scan"
```

**Deliverable:** QR generation works, check-in API functional

---

### Week 9: Check-In UI & Scanner

**QR Display (Teachers)**

```
Use Frontend Agent:
"On event detail page (if user is event owner/claimer):
- 'Show QR Code' button
- Modal displaying large QR code
- Printable option
- Download as image"
```

**QR Scanner (Students)**

```
Use Frontend Agent:
"Create /check-in page:
- Camera permission request
- Use device camera to scan QR (use library: react-qr-reader or similar)
- Decode QR data
- Send to POST /api/check-in
- Show success message + event details
- Handle errors gracefully
- Fallback: manual code entry if camera fails"
```

**Attendance History**

```
Use Frontend Agent:
"Create /attendance page (user view):
- List all user's check-ins (past events attended)
- Group by month
- Show: event name, date, venue
- Display total check-ins count
- Show reputation score"
```

**Deliverable:** Students can scan QR and check-in, see history

---

### Week 10: Gamification

**Badges System**

```
Use Backend Agent:
"Implement badges from schema v2.1:
- badges table (seed with initial badges)
- user_badges table (track earned badges)
- Badge-earning logic (triggered on check-in):
  - Check total_checkins count
  - Award appropriate badges (5, 10, 25, 50, 100 check-ins)
  - Create user_badge record
- GET /api/users/me/badges returns earned badges"
```

**Reputation System**

```
Simple calculation:
- Base score = total_checkins × 10
- Bonus for variety (different venues, styles)
- Bonus for consistency (streaks)
- Display on profile"
```

**Badge Display**

```
Use Frontend Agent:
"Show badges on user profile:
- Grid of earned badges (icons + names)
- Locked/unlocked states (show all badges, gray out unearned)
- Progress bars ('23/25 check-ins to Regular badge')
- Shareable achievements ('I just earned the Regular badge!')"
```

**Check-In Prompts**

After check-in:
```
"Great! You just checked in to Monday Salsa.
You've now attended 6 classes total.
🎯 Next badge: 'Getting Started' at 10 check-ins!"
```

**Deliverable:** Badges working, gamification motivating

---

### End of Week 10: Decision Gate

**Metrics:**
- [ ] 100+ student accounts?
- [ ] 50+ check-ins per week?
- [ ] 20+ students with 5+ check-ins?
- [ ] Badges being earned?
- [ ] Students returning to check-in regularly?

**User Feedback:**
- Share in dance groups, ask students what they think
- Are they excited? Using it? Telling friends?

**Decision:**
- **Strong engagement (metrics hit) →** Continue to Phase 3
- **Weak engagement (metrics missed) →** Diagnose why:
  - Is check-in too hard? (simplify)
  - Do students not care? (add more value)
  - Not enough promotion? (market harder)
- **Very weak engagement (<50 users, <20 check-ins/week) →** Consider stopping

**This is the critical validation point.** If students don't engage with free features, they won't pay later.

---

## Phase 3: Teacher Claiming & Communication (Weeks 11-14)

### Goal

**Teachers claim events, message their students, activate the viral loop.**

The core insight: teachers currently have no reliable way to reach their own students. No email list, no phone numbers — students show up, pay cash, and leave. Claiming an event on Tueeyo solves this automatically. Every check-in builds the contact list. The first group message is the aha moment.

Video upload is the secondary feature here — valuable, but primarily as a student acquisition tool once teachers are already engaged.

**Success Criteria:**
- 3–5 teachers claim events
- All claimed teachers have sent at least one group message to attendees
- 2+ teachers sharing their subdomain URL externally (WhatsApp, Instagram)
- 200+ student accounts (doubled from Phase 2)
- 100+ check-ins per week (doubled)

---

### Week 11: Event Claiming + Group Messaging

**Claiming Flow**

```
Use Backend Agent:
"Implement event claiming (schema v2.1):
- Events have created_by_user_id and claimed_by_user_id
- Teacher can claim event if unclaimed or they're the creator
- PUT /api/events/[id]/claim (auth required)
- Moderation: Admin approves claim (prevent fake claims)
- Once claimed, teacher owns event (can edit, message attendees, upload videos)
- Notification to teacher when claim approved"
```

**Teacher Dashboard**

```
Use Frontend Agent:
"Create /dashboard/teacher page:
- List teacher's claimed events
- For each event: title, date, check-ins count, recent attendees
- 'Claim an Event' button → search for unclaimed events
- Quick action: 'Message attendees' button prominent on each event
- Link to upload video, view full attendee list"
```

**Group Messaging by Attendee List (Free Tier)**

```
Use Backend Agent:
"Implement group messaging for claimed events:
- GET /api/events/[id]/attendees — list of users who checked in
- POST /api/events/[id]/message — send message to all attendees
  - Input: message text, optional: filter by recency (last 4 weeks, all time)
  - Creates individual message records for each attendee
  - Push notification + email to each recipient
- This is a Free tier feature — no tier check required
- Rate limit: max 1 broadcast per event per 24 hours (prevent spam)"
```

**Messaging UI**

```
Use Frontend Agent:
"On teacher dashboard, for each claimed event:
- 'Message Attendees' button — opens compose modal
- Show recipient count: 'This will reach 18 students'
- Optional filter: 'All attendees' or 'Attended in last 4 weeks'
- Simple text compose (no formatting needed for MVP)
- Send confirmation: 'Message sent to 18 students'
- Message history: see previous broadcasts"
```

**Claim UI**

```
"On event detail page, if unclaimed:
- Banner: 'Is this your class? Claim it to message your students directly'
- Teacher clicks → submits claim request
- Admin approves → teacher sees in dashboard with attendee count

If claimed by someone else:
- Show 'Organised by [Teacher Name]' link to teacher profile"
```

**Deliverable:** Teachers can claim events and immediately message their attendee group

---

### Week 12: Video Upload (Student Acquisition Tool)

**Video Upload (YouTube Links - MVP)**

```
Use Backend Agent:
"Add video upload to events (schema v2.1):
- events.video_url field (YouTube URL)
- events.video_visible_to = 'attendees' (default)
- PUT /api/events/[id]/video (teacher only, if claimed)
- Input: YouTube URL
- Validate URL format
- Store in database"
```

**Free Tier Limitation**

```
Use Backend Agent:
"Enforce Free tier 'featured event' limitation:
- User has featured_activity_id field (one event gets full video features)
- Check tier in PUT /api/events/[id]/video:
  - If tier = 'free' AND event is not featured_activity_id:
    - Return error: 'Upgrade to Plus to upload videos to all classes'
  - If tier = 'free' AND event IS featured_activity_id: Allow
  - If tier = 'plus' or 'pro': Allow (all events)
- Provide endpoint to change featured event: POST /api/users/me/featured-activity"
```

**Video Display (Gated)**

```
Use Frontend Agent:
"On event detail page:
- If video_url exists:
  - Check if user checked into this event (query bookings table)
  - If yes: Show embedded video (YouTube iframe)
  - If no: Show 'Check in at this class to access routine video'
    with CTA button 'Learn More About Check-Ins'
- Only show upload button if user is teacher and owns event"
```

**Subdomain URL Sharing (Student Acquisition)**

```
Use Frontend Agent:
"On teacher dashboard, for claimed events:
- Show teacher's subdomain URL prominently: magik-mike.tueeyo.uk
- 'Share' button with pre-written templates:
  - WhatsApp: 'Routine video on my Tueeyo page — [URL] — check in to watch 👉'
  - Instagram bio: Copy URL button
  - Facebook: Pre-written post with screenshot prompt
- This URL is the front door for students not yet on the platform"
```

**Deliverable:** Teachers upload videos, share subdomain URLs externally, students join via shared links

---

### Week 13: Outreach & Viral Loop Activation

**Teacher Outreach (Your Job, Not Claude)**

Identify teachers whose classes have most check-ins (query database). Personal message to top 3–5:

```
"Hi [Teacher],

[X] students have checked into your Monday class on Tueeyo
over the past month.

Want to claim your event? You'll be able to message all of them
directly — really useful for cancellations, venue changes, or
workshop announcements. It's free and takes 5 minutes.

I can hop on a quick call to show you if helpful.

- [Your name]"
```

- Schedule video calls, walk them through
- First message they send to their students is the aha moment — be there for it
- Once they're hooked on messaging, show them video upload as a bonus

**In-App Teacher Prompts**

```
Use Frontend Agent:
"Add prompts to encourage claiming:
- On event detail page (if user has teacher role, event unclaimed):
  - Banner: 'Is this your class? Claim it to message your students directly'
- After user checks into 3 different classes as student:
  - Prompt: 'Are you a teacher? Claim your classes to reach your students'
- Teacher who has claimed but not yet messaged:
  - Dashboard nudge: 'You have 12 students — send them a message'"
```

**Teacher Success Stories**

- First teacher claims and messages students → document it
- "Sarah messaged her 20 students about a venue change in 30 seconds"
- Share in teacher networks (private Facebook groups, WhatsApp)

**Deliverable:** Teachers claiming, messaging students, sharing subdomain URLs; students joining via shared links

---

### Week 14: Free Tier Polish

**Featured Event Selection**

```
Use Frontend Agent:
"Create UI for Free tier teachers to choose featured event:
- On /dashboard/teacher (if tier = 'free'):
  - Show: 'Free tier: Video uploads on 1 featured class. Choose it:'
  - List claimed events with radio buttons
  - Selected event gets star icon
  - Explain: Featured event can upload videos and post updates
  - All claimed events: messaging to attendees always free
- Save selection: POST /api/users/me/featured-activity"
```

**Tier Upgrade Prompts**

```
"When Free tier teacher tries to upload video to non-featured event:
- Modal: 'Upgrade to Plus for video uploads on all your classes'
- Show Plus tier features:
  - Videos on ALL classes
  - Professional page (yourname.tueeyo.uk)
  - Payment processing
  - Advanced analytics
  - Bulk messaging tools and templates
- CTA: 'Try Plus Free for 30 Days'
- Soft sell, not pushy"
```

**Testing & Bug Fixes**

```
Use Testing Agent:
"Test all teacher flows:
- Claiming events
- Group messaging to attendees (rate limiting, delivery)
- Uploading videos (featured vs non-featured)
- Tier enforcement (Free tier limits)
- Video access gating (checked-in vs not)
- Subdomain URL routing
Write integration tests for critical paths."
```

**Deliverable:** Free tier limits working, upgrade prompts in place

---

### End of Week 14: Decision Gate

**Metrics:**
- [ ] 3+ teachers claimed events?
- [ ] All claimed teachers sent at least 1 group message?
- [ ] 2+ teachers sharing subdomain URL externally?
- [ ] 200+ student accounts?
- [ ] 100+ check-ins per week?

**Qualitative:**
- Are teachers finding messaging valuable?
- Are students joining via shared subdomain links?
- Is the communication habit forming naturally?

**Decision:**
- **Teachers messaging students, subdomain URLs being shared →** Continue to Phase 4
- **Weak teacher adoption →** Diagnose why:
  - Claiming too hard? (simplify)
  - Not aware of platform? (more outreach)
  - Messaging not feeling valuable? (investigate)
- **Very weak (<2 teachers claiming and messaging) →** Seriously consider stopping

**If teachers won't use free communication features, they won't pay for premium tools.**

---

## Phase 4: Plus Tier Launch (Weeks 15-18)

### Goal

**Monetization begins. Validate willingness to pay.**

Build custom subdomain system and payment processing. Launch Plus tier to 2-3 early adopter teachers with heavy support.

**Success Criteria:**
- 2+ teachers upgrade to Plus
- They actively use features (subdomain customized, payments enabled)
- £500+ GMV processed (validates payment feature)
- 80%+ retention after free trial
- NPS 8+ (teachers happy)

---

### Week 15: Subscription Infrastructure

**Stripe Setup**

```
Use Integration Agent:
"Set up Stripe for subscriptions:
- Create Stripe account (test mode)
- Install Stripe SDK (@stripe/stripe-js, stripe)
- Environment variables (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY)
- Create products and prices:
  - Plus Monthly: £20/month (recurring)
  - Pro Monthly: £50/month (recurring)
  - Set metadata: tier='plus' or tier='pro'
```

**Subscriptions Table**

```
Use Backend Agent:
"Implement subscriptions table from schema v2.1:
- Link to users table via subscription_id
- Stripe fields: stripe_subscription_id, stripe_customer_id, etc.
- Status tracking: active, past_due, cancelled, trialing
- Create endpoints:
  - POST /api/subscribe (create subscription, start trial)
  - POST /api/cancel-subscription
  - GET /api/subscription-status
```

**Stripe Webhooks**

```
Use Integration Agent:
"Handle Stripe webhooks:
- POST /api/webhooks/stripe (verify signature!)
- Handle events:
  - customer.subscription.created → Create subscription record
  - customer.subscription.updated → Update status, period dates
  - customer.subscription.deleted → Mark cancelled
  - invoice.payment_succeeded → Log payment
  - invoice.payment_failed → Mark past_due, email user
- Update users.tier when subscription active/cancelled"
```

**Deliverable:** Stripe subscription flow working (test mode)

---

### Week 16: Custom Subdomain System

**Wildcard DNS Setup**

```
Use DevOps Agent:
"Configure wildcard DNS for *.tueeyo.uk:
- DNS provider (Cloudflare recommended):
  - A record: *.tueeyo.uk → Server IP
  - Or CNAME: *.tueeyo.uk → tueeyo.uk
- SSL certificate (wildcard cert via Cloudflare or Let's Encrypt)
- Ensure HTTPS works for any subdomain (e.g., maria-salsa.tueeyo.uk)"
```

**Subdomain Routing**

```
Use Backend Agent:
"Implement subdomain routing:
- Middleware to detect subdomain from request hostname
- Query users table: WHERE custom_subdomain = [extracted subdomain]
- If found: Render user's custom page
- If not found: 404 or redirect to main site
- Handle edge cases: www, naked domain, invalid subdomains"
```

**Subdomain Claim**

```
Use Backend Agent:
"Create subdomain claim endpoint:
- POST /api/users/me/subdomain
- Input: desired subdomain (e.g., 'maria-salsa')
- Validation:
  - User tier is 'plus' or 'pro' (check tier_limits.custom_subdomain_allowed)
  - Subdomain available (unique)
  - Alphanumeric + hyphens only, 3-50 chars
  - Not reserved words (www, api, admin, etc.)
- Update users.custom_subdomain
- Return success with subdomain URL"
```

**Deliverable:** Wildcard DNS working, subdomains route correctly

---

### Week 17: Custom Page Builder

**Page Settings Schema**

```
Use Backend Agent:
"Implement users.page_settings JSONB field:
- Structure:
  {
    accent_color: '#FF6B6B',
    bio_long: 'Extended bio...',
    teaching_philosophy: 'My approach...',
    social_links: {instagram: '@user', facebook: '...'},
    cta_button: {text: 'Book Now', link: '/events/123'},
    sections: [
      {type: 'about', content: '...'},
      {type: 'video_gallery', videos: [...]},
      {type: 'testimonials', items: [...]}
    ]
  }
- PUT /api/users/me/page-settings (update settings)
- GET /api/users/me/page-settings (retrieve)"
```

**Custom Page Template**

```
Use Frontend Agent:
"Create custom subdomain page template (e.g., maria-salsa.tueeyo.uk):

Layout:
- Hero section:
  - Header image (from page_settings or default)
  - Profile photo
  - Name + tagline
  - Accent color overlay
- About section:
  - Bio (bio_long from page_settings)
  - Teaching philosophy
- Events section:
  - Upcoming classes (query events where claimed_by_user_id = user)
  - Display as cards with CTA buttons
- Video gallery (optional):
  - Showcase videos (class routines, performances)
- Reviews/Testimonials (if set in page_settings):
  - Display with star ratings
- Contact section:
  - Social media links
  - Email (if public)
  - CTA button (customizable)
- Footer:
  - 'Powered by Tueeyo' link
  - Privacy, terms

Mobile responsive, fast loading, SEO optimized."
```

**Page Customization UI**

```
Use Frontend Agent:
"Create /dashboard/customize-page (Plus/Pro only):
- Header: Upload header image, profile photo
- Accent color picker
- Text editor for bio, teaching philosophy
- Social links input fields
- CTA button (text + link to event or external URL)
- Section manager (add/remove/reorder sections)
- Live preview pane (shows changes in real-time)
- Save button → POST /api/users/me/page-settings
- 'View Your Page' link → opens subdomain in new tab"
```

**Deliverable:** Custom pages working, users can customize, looks professional

---

### Week 18: Payment Processing

**Wallet System**

```
Use Backend Agent:
"Implement wallet from schema v2.1:
- wallet_balances table (current balance per user)
- wallet_transactions table (audit trail)
- Endpoints:
  - POST /api/wallet/topup (Stripe Payment Intent, add bonus)
  - GET /api/wallet/balance
  - GET /api/wallet/transactions (history)
- Bonus calculation:
  - £50 → +£5 (10%)
  - £100 → +£20 (20%)
- On successful payment:
  - Create payment record
  - Create wallet_transaction (type: 'topup' + 'bonus')
  - Update wallet_balances"
```

**Class Payment**

```
Use Backend Agent:
"Implement paying for classes via wallet:
- When checking in (POST /api/check-in):
  - If event.requires_payment = true:
    - Check wallet balance >= event.price
    - Deduct from wallet
    - Create payment record (type: 'class_payment')
    - Create wallet_transaction (negative amount)
    - Create booking with payment_id
  - If insufficient balance: Error with prompt to top up
- Alternative: Pre-booking (future):
  - POST /api/bookings (reserves spot, pays upfront)
  - Check-in just confirms attendance"
```

**Packages & Memberships (Simple MVP)**

```
Use Backend Agent:
"Add class packages:
- New table: class_packages
  - teacher_user_id, title, classes_count, price, validity_days
- Student buys package:
  - POST /api/packages/[id]/purchase
  - Deduct from wallet
  - Create package_credits record (track remaining classes)
- When checking in:
  - If user has package credits: Deduct 1 credit (no wallet charge)
  - Else: Charge wallet as normal
- Teacher sets up packages in dashboard"
```

**Payment Dashboard (Teachers)**

```
Use Frontend Agent:
"Create /dashboard/payments (Plus/Pro only):
- Revenue summary: This week, this month, all time
- Recent transactions (students who paid)
- Pending payouts (balance awaiting transfer)
- Payout history
- 'Request Payout' button (triggers Stripe payout)
- Link to Stripe dashboard for detailed reports"
```

**Deliverable:** Wallet working, students can top up, pay for classes, packages functional

---

### Week 18 (Continued): Plus Tier Launch

**Early Adopter Outreach**

Your job (not Claude):
- Identify 2-3 teachers actively using platform (uploading videos, engaged)
- Personal outreach (video call or in-person):
  ```
  "Hey [Teacher], your classes are doing great on Tueeyo!
  
  We've just launched Plus tier. Two big features:
  
  1. Your own professional website: maria-salsa.tueeyo.uk
  2. Payment processing: Students pay through app, you get paid automatically
  
  £20/month + 3% on payments. Want to try it free for 60 days?
  I'll help you set it up personally."
  ```

**Onboarding Call (1 hour per teacher):**
- Walk through: Choosing subdomain, customizing page
- Help: Upload photos, write bio, add events
- Test: Payment flow end-to-end (you create test booking)
- Answer questions, troubleshoot issues
- Weekly check-in first month

**Launch Incentives:**
- 60-day free trial (vs standard 30)
- Lock in 3% fee (before increase to 3.5%)
- "Founding Member" badge on profile
- Featured in platform marketing

**Deliverable:** 2-3 teachers on Plus tier (free trial), actively using features

---

### End of Week 18: Decision Gate

**Metrics:**
- [ ] 2+ teachers upgraded to Plus?
- [ ] They customized their subdomain pages?
- [ ] Payment processing enabled and working?
- [ ] £500+ GMV processed (students actually paying)?
- [ ] Teachers happy (NPS 8+)?

**Qualitative:**
- Are teachers seeing value in Plus tier?
- Are students using wallet and payments?
- Would teachers pay £20/month after trial?

**Financial Check:**
- After free trials end (60 days), do teachers convert to paid?
- If yes (80%+ conversion) → **Strong validation, continue**
- If no (<50% conversion) → **Reassess value prop:**
  - Is £20/month too expensive? (test £15)
  - Is subdomain not valuable enough? (add more features)
  - Are payments not being used? (why? investigate)

**This is the revenue validation point.** If teachers won't pay, the business model doesn't work.

---

## Phase 5: Social Features (Weeks 19-22)

### Goal

**Increase engagement and retention with community features.**

Students connect with each other, follow teachers, see activity feed. Light social layer, not trying to replace Facebook for everything, just dance-related connections.

**Success Criteria:**
- 50+ "connected with" connections made
- 100+ users following teachers/each other
- Active activity feed (users returning daily to check)

---

### Week 19: Connections System

**"Connected With" Feature**

```
Use Backend Agent:
"Implement connections table from schema v2.1:
- connection_type: 'connected_with', 'follow', 'blocked'
- Display label configurable per activity type ('danced with', 'trained with', etc.)
- After check-in prompt:
  - 'Who did you connect with tonight?'
  - Search for other attendees (who also checked in)
  - Select users → creates mutual connections
- GET /api/users/me/connections (list connections by type)
- POST /api/connections (create connection)
- DELETE /api/connections/[id] (remove connection)"
```

**Following**

```
Use Backend Agent:
"Implement following:
- POST /api/users/[id]/follow (follow user)
- DELETE /api/users/[id]/unfollow
- GET /api/users/me/following (who I follow)
- GET /api/users/me/followers (who follows me)
- Follow counts on profiles"
```

**Connection UI**

```
Use Frontend Agent:
"Create connection features:
- After check-in: Modal 'Who did you connect with?'
  - List other attendees (avatars, names)
  - Multi-select
  - Submit → creates connections
- On user profiles: 'Follow' button
- On teacher profiles: Follower count prominently displayed
- /connections page: Grid of connected users, filterable by type"
```

**Deliverable:** Students can connect, follow, see connections

---

### Week 20: Activity Feed

**Activity Feed Backend**

```
Use Backend Agent:
"Create activity feed:
- Table: activity_feed (or generate on-the-fly from other tables)
- Activity types:
  - User checked into event
  - User connected with another user
  - Teacher uploaded video
  - User earned badge
  - Event created
- GET /api/activity (personalized feed for logged-in user)
  - Show activities from:
    - Users you follow
    - Events you're interested in (same styles)
    - Teachers you follow
  - Sort: chronological (most recent first)
  - Pagination"
```

**Activity Feed UI**

```
Use Frontend Agent:
"Create /activity page (or home page for logged-in users):
- Stream of activities (cards):
  - '[User] checked into [Event] at [Venue]'
  - '[User] is now connected with [User2]'
  - '[Teacher] uploaded new video for [Event]'
  - '[User] earned [Badge] badge!'
- Each with relevant image, link to user/event
- Infinite scroll or 'Load More' button
- Empty state: 'Follow teachers and connect with dancers to see activity'"
```

**Deliverable:** Activity feed working, personalized

---

### Week 21: Messaging (Simple)

**1-to-1 Messaging**

```
Use Backend Agent:
"Implement messages table from schema v2.1:
- Simple direct messages (1-to-1 only for MVP)
- POST /api/messages (send message)
- GET /api/messages/conversations (list conversations)
- GET /api/messages/[user_id] (thread with specific user)
- Mark as read: PUT /api/messages/[id]/read"
```

**Messaging UI**

```
Use Frontend Agent:
"Create /messages page:
- Left sidebar: List of conversations (recent, unread count)
- Right pane: Message thread (selected conversation)
- Text input at bottom, send button
- Real-time feel (polling or websockets if time allows)
- Notifications for new messages (in-app badge)"
```

**Message Prompts**

```
Add messaging CTAs:
- On user profiles: 'Send Message' button
- After 'connected with' connection: 'Say hello to [User]!'
- Use cases: Arranging practice, asking about class, etc.
```

**Deliverable:** Basic messaging working, users can DM each other

---

### Week 22: Social Polish

**Notifications**

```
Use Backend Agent:
"Implement notifications table from schema v2.1:
- Notification types:
  - New follower
  - New message
  - Someone 'connected with' you
  - Badge earned
  - Event reminder (upcoming class)
  - Teacher posted video
  - Your face appears in an uploaded photo (privacy notification)
- POST /api/notifications/mark-read/[id]
- GET /api/notifications (unread + recent)
- Email notifications (optional, via SendGrid - simple)"
```

**Notification UI**

```
Use Frontend Agent:
"Add notifications:
- Bell icon in header (badge shows unread count)
- Dropdown: Recent notifications (click to mark read, link to relevant page)
- /notifications page: Full list
- Settings: Email notification preferences (on/off per type)"
```

**User Profiles Enhanced**

```
Use Frontend Agent:
"Enhance user profiles:
- Show: 'Connected with X people', 'Checked into Y classes'
- Badge showcase (earned badges displayed)
- Activity section (recent check-ins, connections)
- Public profile: /users/[id] (others can view)
- Privacy settings (profile visible to: everyone, dancers only, connections only)"
```

**Deliverable:** Notifications working, profiles richer, platform feels social

---

### End of Week 22: Check-In

**Metrics:**
- [ ] 50+ connections made?
- [ ] 100+ users following teachers?
- [ ] Active activity feed (users checking daily)?
- [ ] Messages being sent (5+ conversations)?

**Qualitative:**
- Does the platform feel like a community?
- Are users engaging beyond just check-ins?

**If yes →** Great, platform is sticky. Continue to launch.

**If no →** Social features not critical, but nice-to-have. Still proceed to launch.

---

## Phase 6: Polish & Launch (Weeks 23-24)

### Goal

**Bug fixes, performance optimization, public launch.**

Final polish before announcing publicly. Fix all known bugs, optimize performance, prepare for growth.

**Success Criteria:**
- No critical bugs (payments work, check-ins work, subdomains work)
- Platform fast (pages load <2 seconds)
- Public announcement made, press coverage (if possible)

---

### Week 23: Bug Squashing

**Comprehensive Testing**

```
Use Testing Agent:
"Test all major flows end-to-end:
- User registration → event discovery → check-in
- Teacher registration → claim event → upload video
- Plus tier upgrade → customize page → payment processing
- Student wallet topup → book class → check-in (payment via wallet)
- Social: Follow → connections → messages
Write tests for critical paths."
```

**Bug Triage**

```
Use Bug Elimination Agent:
"Review all known bugs (GitHub issues, user reports):
- Prioritize: Critical (blocks core flow) → High → Medium → Low
- Fix critical and high bugs first
- Test fixes thoroughly
- Deploy fixes to staging, then production
- Close bugs after verification"
```

**Payment Edge Cases**

```
Test thoroughly:
- Wallet balance insufficient (error handling)
- Stripe payment fails (retry, error message)
- Webhook delay (eventual consistency)
- Race conditions (double booking)
- Refund flow (cancellation within 24hrs)
```

**Cross-Browser Testing**

```
Test on:
- Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Android
- Fix browser-specific bugs
```

**Deliverable:** All critical bugs fixed, platform stable

---

### Week 24: Performance & Launch

**Performance Optimization**

```
Use DevOps Agent:
"Optimize performance:
- Database: Add indexes for slow queries (EXPLAIN ANALYZE)
- Frontend: Code splitting, lazy loading, image optimization
- Caching: Redis for frequently accessed data (events list, user profiles)
- CDN: Serve static assets via Cloudflare
- Monitoring: Set up New Relic or similar (track slow requests)
- Target: Page load <2s on 4G connection"
```

**SEO Final Pass**

```
- Verify all pages have proper meta tags
- Sitemap.xml up to date
- Submit to Google Search Console
- Schema markup for events verified
- OpenGraph tags for social sharing
```

**Analytics & Monitoring**

```
Use DevOps Agent:
"Set up production monitoring:
- Error tracking: Sentry (catch errors in production)
- Uptime monitoring: UptimeRobot (alert if site down)
- Performance: Google PageSpeed Insights, WebPageTest
- User analytics: Plausible or Google Analytics 4
- Dashboard: View key metrics (signups, check-ins, GMV)"
```

**Legal & Privacy**

```
Not coding - you write these:
- Terms of Service (use template, customize)
- Privacy Policy (GDPR-compliant)
- Cookie notice (if using analytics)
- Add links in footer
- Contact email for support/questions
```

**Launch Announcement**

Your job:
- Prepare announcement:
  - Facebook post in Leeds dance groups
  - Instagram post (if you have account)
  - Email to teachers already using platform
  - Local press release (Leeds dance scene news)
- Messaging:
  - "Tueeyo is now live! The platform for Leeds dancers."
  - Screenshots, features, testimonials
  - CTA: Sign up, check-in to your next class
- Respond to comments, answer questions

**Soft Launch Week:**
- Day 1: Announce in 1-2 small groups (test reception)
- Day 3: If positive, announce in larger groups
- Day 5: Send email to teachers
- Day 7: Local press outreach

**Monitor Closely:**
- Server load (any crashes?)
- Error rates (Sentry alerts)
- User feedback (social media, emails)
- Sign-up rate (goal: 50+ new users in launch week)

**Deliverable:** Platform live, public, announced, stable

---

### End of Week 24: Post-Launch

**Metrics Review (1 Month After Launch):**
- Total users: Target 300+
- Active users (checked in last 30 days): Target 150+
- Teachers: Target 10+
- Plus tier: Target 3+
- Monthly revenue: Target £100+

**Decision:**
- **Metrics good, growth positive →** Continue building, iterate based on feedback
- **Metrics okay, slow growth →** Double down on marketing, improve onboarding
- **Metrics poor, no growth →** Seriously reassess:
  - Is there product-market fit?
  - Should you pivot?
  - Should you stop?

**Celebration (Important!):**

You built something. 6 months of work. Shipped a real product. That's an achievement regardless of metrics.

Take a break. Reflect. Then decide next steps.

---

## Weekly Work Pattern (ADHD-Optimized)

### Daily Structure

**Morning (2-3 hours - Peak Focus)**
- **Start ritual:** Coffee, review yesterday's progress, read today's goal (written night before)
- **Focus block:** Hardest task (new feature, complex integration)
- **Use:** Primary specialized agent (Backend, Frontend, Integration)
- **Output:** Working code for one specific task (not vague progress)
- **Checkpoint:** Commit to Git with clear message, note what works

**Afternoon (1-2 hours - Medium Focus)**
- **Testing:** Testing Agent reviews morning's work
- **Bug Fixes:** Bug Elimination Agent fixes issues found
- **Polish:** Small improvements, documentation, code cleanup
- **Output:** Tests written, bugs fixed, code ready to merge
- **Checkpoint:** Run full test suite locally, merge to main if passing

**Evening (30-60 mins - Low Focus, Optional)**
- **Review:** What did I accomplish today? (celebrate wins)
- **Plan:** Tomorrow's task (write it down concretely, specific)
- **Learn:** Read docs for tomorrow's feature (Stripe API, React patterns)
- **No Coding:** Resist urge to start new work (leads to mess, incomplete tasks)

**Avoid:**
- Marathon coding sessions (burnout risk)
- Context switching (finish one task before starting next)
- Coding when tired (bugs multiply, frustration builds)

---

### Weekly Structure

**Monday:**
- **Plan week:** Choose 2-3 features to complete this week
- **Architect Agent:** Review plan, identify risks, dependencies
- **Start Feature #1**
- **Mood:** Fresh, motivated (use this energy)

**Tuesday-Thursday:**
- **Deep work:** Build features
- **Morning:** Focus block (new code)
- **Afternoon:** Test & fix
- **Daily commits:** Track progress visually
- **Mood:** Momentum building (or waning - watch for this)

**Friday:**
- **Testing & Bug Elimination day**
- Fix issues from the week
- Run full test suite
- Deploy to staging (test environment)
- **Document:** What was built this week (README updates)
- **Plan:** Next week's tasks
- **Mood:** Tired but accomplished (or frustrated if week went poorly)

**Weekend:**
- **Take breaks** (critical for ADHD - avoid burnout)
- Optional: Light planning, reading docs, thinking about problems
- **Avoid coding** (leads to exhaustion, reduces Monday motivation)
- Hobbies, family, rest

**Honest Assessment:**

Some weeks will be 20 hours of productive work. Some will be 5. That's ADHD reality. Don't beat yourself up on bad weeks. The goal is average 15 hours/week over 6 months, not perfection every week.

---

### Sprint Structure (2-Week Cycles)

**Week 1 (Build):**
- Build new features
- Don't worry about perfection
- Get features "working" (even if rough)
- Daily commits
- Accumulate progress

**Week 2 (Refine):**
- Testing & bug fixing (Week 1 features)
- Security & performance review
- Polish UX (make it not ugly)
- Deploy to staging
- Demo/milestone (show someone, get feedback)

**Every 2 Weeks:**
- **Demo:** Show progress to someone (friend, dance teacher, mirror)
- **Accountability:** Did I ship what I planned? Why/why not?
- **Adjust:** Re-prioritize if needed (features taking longer than expected)
- **Decision gate:** Continue or reassess?

**Why 2-week sprints?**
- Long enough to build something substantial
- Short enough to maintain focus (ADHD attention span)
- Regular checkpoints (catch problems early)
- Sense of progress (demo every 2 weeks feels good)

---

## Multi-Agent Workflow Examples

### Example 1: Building Custom Subdomain System (Complex Feature)

**Session Goal:** Implement custom subdomain pages for Plus tier users

**Step 1: Planning (15 mins)**

```
Prompt to Architect Agent:
"Design the custom subdomain system for Tueeyo Plus tier:
- Users choose subdomain (e.g., maria-salsa.tueeyo.uk)
- Wildcard DNS routes to our server
- Middleware detects subdomain, loads user's custom page
- User can customize: header image, bio, accent color, events list
- Page stored in users.page_settings JSONB field
- Security: Prevent subdomain hijacking, XSS in custom content

Provide: Technical approach, database design, routing strategy, security measures."

Output: High-level design document
```

---

**Step 2: DNS & Routing (60-90 mins)**

```
Prompt to DevOps Agent:
"Set up wildcard DNS for *.tueeyo.uk on Cloudflare:
1. Create wildcard A record pointing to production server
2. Obtain wildcard SSL certificate
3. Configure Next.js to handle subdomains:
   - Middleware to extract subdomain from request hostname
   - Route logic: If subdomain exists, render custom page; else 404
4. Test: maria-test.tueeyo.uk should resolve (even if 404 for now)

Provide: DNS configuration steps, Next.js middleware code, testing procedure."

Output: DNS configured, middleware code
```

---

**Step 3: Database Schema (30 mins)**

```
Prompt to Backend Agent:
"Implement custom subdomain fields in users table:
- Add custom_subdomain VARCHAR(50) UNIQUE
- Add page_settings JSONB DEFAULT '{}'
- Create migration
- Create API endpoints:
  - POST /api/users/me/subdomain (claim subdomain)
  - PUT /api/users/me/page-settings (update page config)
  - GET /api/users/me/page-settings (retrieve)
- Validation: Subdomain available, allowed chars, tier check (Plus/Pro only)

Use schema v2.1 as reference."

Output: Migration file, API endpoints
```

---

**Step 4: Security Review (30 mins)**

```
Prompt to Security Agent:
"Audit the subdomain system for security issues:
- Subdomain hijacking: Can users claim someone else's subdomain?
- XSS: Can users inject scripts via page_settings (bio, links)?
- SSRF: Can subdomain routing be exploited?
- Rate limiting: Prevent subdomain claim spam
- Validation: Reserved subdomains (www, api, admin) blocked?

Review: DNS config, middleware code, API endpoints, page rendering.
Provide specific fixes for any issues found."

Output: Security review report, recommended fixes
```

---

**Step 5: Frontend Page Template (90-120 mins)**

```
Prompt to Frontend Agent:
"Create custom subdomain page template (e.g., maria-salsa.tueeyo.uk):

Layout:
- Hero: Header image, profile photo, name, accent color
- About: Bio (from page_settings.bio_long)
- Events: Upcoming classes (query events where claimed_by_user_id = user)
- Contact: Social links, CTA button
- Footer: 'Powered by Tueeyo'

Styling:
- Tailwind CSS, modern design
- Responsive (mobile-first)
- Accent color from page_settings.accent_color
- Fast loading (<2s)

SEO:
- Meta tags (title, description from user bio)
- OpenGraph for social sharing

Security:
- Sanitize all user content (prevent XSS)
- Use DOMPurify for HTML in bio

Provide: React component code, styling, data fetching logic."

Output: Custom page template component
```

---

**Step 6: Customization UI (90-120 mins)**

```
Prompt to Frontend Agent:
"Create /dashboard/customize-page (Plus/Pro tier only):

Features:
- Header image upload (drag-and-drop or file picker)
- Profile photo upload
- Accent color picker (with preview)
- Bio editor (rich text: bold, italic, links)
- Social links input (Instagram, Facebook, Twitter, etc.)
- CTA button config (text + link)
- Live preview pane (shows changes in real-time)
- Save button → PUT /api/users/me/page-settings

UX:
- Split screen: Editor left, preview right
- Changes update preview instantly (debounced)
- Save indicator (saving... saved!)
- Validation errors inline
- 'View Your Page' button → opens subdomain in new tab

Provide: React component with form, preview, save logic."

Output: Customization dashboard page
```

---

**Step 7: Integration Testing (45 mins)**

```
Prompt to Integration Agent:
"Test custom subdomain system end-to-end:

Test Cases:
1. User upgrades to Plus tier
2. User claims subdomain (e.g., 'test-user')
3. Verify subdomain routes correctly (test-user.tueeyo.uk loads)
4. User customizes page (changes color, bio, uploads image)
5. Changes reflect on public subdomain
6. Try to claim already-taken subdomain (should fail)
7. Free tier user tries to claim subdomain (should fail - tier check)
8. Test reserved subdomain (www, api, admin - should fail)
9. Test invalid subdomain (spaces, special chars - should fail)
10. SSL works on subdomain (HTTPS)

Document: Test results, any issues found."

Output: Test report
```

---

**Step 8: Bug Fixes (30-60 mins)**

```
Prompt to Bug Elimination Agent:
"Issues found during testing:
1. Subdomain routing fails for subdomains with hyphens
2. Accent color not applying correctly in preview
3. Bio editor allows JavaScript in links (XSS risk)

Debug and fix each issue:
1. Reproduce
2. Identify root cause
3. Implement fix
4. Verify fix works
5. Add test to prevent regression"

Output: Fixes for all issues
```

---

**Step 9: Final Review (15 mins)**

```
Prompt to Architect Agent (Lead):
"Review complete custom subdomain implementation:
- DNS + routing code
- Database schema + API endpoints
- Security audit + fixes
- Frontend template + customization UI
- Integration tests passed

Is this ready to merge and deploy?
Any concerns or improvements needed?"

Output: Approval or additional items
```

---

**Total Time:** ~8-12 hours (spread over 2-3 days)

**Outcome:** Custom subdomain system fully functional, tested, secure, deployed

---

## Handling Common ADHD Challenges

### Challenge 1: Getting Stuck / Analysis Paralysis

**Symptom:** Staring at code, not sure where to start, overwhelmed by complexity

**Solution:**

```
Prompt to Architect Agent:
"I'm stuck on [feature]. Break this down into the smallest possible first step 
(15 minutes or less). Just tell me the ONE thing to do next, with exact commands."

Example Output:
"First step: Create the database migration file for the tier_limits table.
Just the file, don't write the schema yet.
Command: npx prisma migrate dev --create-only --name add_tier_limits"
```

**Then:**
- Do that one tiny step
- Get momentum (dopamine hit from completing something)
- Ask for next step
- Repeat

**Key:** Break infinity into finite steps. Concrete > abstract.

---

### Challenge 2: Losing Track of What You Were Doing

**Symptom:** Worked on something yesterday, can't remember where you left off

**Solution (Prevention):**

End each session with:
- Git commit message: "WIP: Adding Stripe payment - webhook handler next"
- Create TODO.md file with current task:
  ```md
  ## Current Task: Stripe Webhook Handler
  - [ ] Create POST /api/webhooks/stripe endpoint
  - [ ] Verify webhook signature
  - [ ] Handle subscription.created event
  - Next: Test with Stripe CLI
  ```
- Use Git branch descriptively: `feature/stripe-subscriptions`

**Solution (Recovery):**

```
Prompt to Architect Agent:
"Review my Git history and current code state. Tell me:
1. What feature was I working on?
2. What's complete?
3. What's the next logical step?

Git log:
[paste: git log --oneline -10]

Current branch:
[paste: git branch]

Uncommitted changes:
[paste: git status]"
```

---

### Challenge 3: Feature Creep / Shiny Object Syndrome

**Symptom:** Started on Feature A, now building Feature Z that seems cool but wasn't planned

**Solution:**

Write the idea in IDEAS.md:
```md
## Future Ideas
- [ ] AI-powered class recommendations
- [ ] Video chat for virtual classes
- [ ] Marketplace for dance shoes
```

Return to original task.

**Forcing Function:**

```
At start of each week, prompt to Architect Agent:
"My plan for this week: [list 2-3 specific features with acceptance criteria]

Hold me accountable. If I ask you to build something else that's not on this list,
remind me of my plan and ask if I want to officially change priorities."
```

**Mantra:** "Ideas are cheap. Execution is expensive. Finish what you started."

---

### Challenge 4: Debugging Rabbit Holes

**Symptom:** Spent 3 hours on minor bug, still not fixed, frustration building

**Solution (Time-box):**

Set timer for 30 minutes. If not fixed by then:

```
Prompt to Bug Elimination Agent:
"I've been debugging [issue] for 30+ minutes with no success.
Error: [paste error]
What I've tried: [list attempts]

Give me a different approach:
1. What's a simpler way to fix this?
2. Is this bug actually critical? Can I defer it?
3. Should I revert my changes and try a different approach?
4. Is there a workaround that avoids the bug?"
```

**Sometimes:** The fastest "fix" is to skip the feature or implement differently.

**Remember:** Perfect is the enemy of shipped.

---

### Challenge 5: Can't Start After Break

**Symptom:** Took weekend off, now Monday feels impossible to get back into

**Solution (Ease Back In):**

Monday morning, start with **easy task** (not hardest):
- Fix minor UI bug
- Write documentation for last week's work
- Update TODO.md with this week's plan
- Review and respond to GitHub issues
- Run tests and fix failing ones

After 30-60 mins of warm-up → tackle hard task.

**Avoid:** Jumping straight into complex new feature when cold.

---

### Challenge 6: Perfectionism Paralysis

**Symptom:** Code isn't "good enough" to commit, keeps tweaking endlessly

**Solution (Force Commit):**

Rules:
- Commit every 90 minutes, even if imperfect
- Use WIP (Work In Progress) commits
- Remember: Git history can be rewritten later
- "Make it work, make it right, make it fast" - in that order

**Mantra:** "Done is better than perfect. Ship, iterate, improve."

**Release the need for perfection.** You're building an MVP, not a masterpiece. Embrace the mess.

---

## Tools & Setup

### Essential Tools

**Development:**
- **Code Editor:** VS Code
  - Extensions: Prettier, ESLint, Prisma, GitLens, Error Lens
- **Terminal:** Built-in (VS Code integrated terminal)
- **API Testing:** Thunder Client (VS Code extension) or Postman
- **Database GUI:** TablePlus (or pgAdmin, DBeaver)
- **Git GUI:** GitKraken or SourceTree (if you prefer visual over command line)

**Project Management:**
- **Tasks:** TODO.md file in repo (simple, low friction)
- **Notes:** Obsidian or Notion (optional - link ideas, decisions)
- **Time Tracking:** Toggl Track (helps see where time goes)

**Communication:**
- **Claude Code:** Your AI pair programmer (the key tool)
- **GitHub Issues:** Track bugs, features (if organized)

---

### VS Code Setup for ADHD-Friendly Development

**Extensions to Install:**

1. **Prettier** - Auto-format on save (less decisions)
2. **ESLint** - Catch errors as you type (instant feedback)
3. **Error Lens** - Show errors inline (no need to check Problems panel)
4. **GitLens** - See Git blame/history in editor (context)
5. **Thunder Client** - Test APIs without leaving editor
6. **Prisma** - Database schema autocomplete, formatting
7. **Todo Tree** - Highlights TODO/FIXME comments (visual reminders)

**Settings (File → Preferences → Settings → Edit settings.json):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.minimap.enabled": true,
  "workbench.colorTheme": "One Dark Pro", // or your preference
  "terminal.integrated.fontSize": 14,
  "git.autofetch": true,
  "git.confirmSync": false
}
```

**Why these settings?**
- Auto-format → Less cognitive load (don't think about formatting)
- Auto-fix ESLint → Catches errors early (less debugging later)
- Minimap → Visual navigation (ADHD brains like visual)
- Auto Git fetch → Stay synced (one less thing to remember)

---

### Git Workflow (ADHD-Friendly)

**Branching (Keep It Simple):**

```
main (production - deployed)
  ↑
develop (daily work - merge features here)
  ↑
feature/[name] (individual features)
```

**Rules:**
1. Never commit directly to `main`
2. Create feature branch for each new feature: `git checkout -b feature/stripe-payments`
3. Commit often (every 1-2 hours) to feature branch
4. When feature works, merge to `develop`: `git checkout develop && git merge feature/stripe-payments`
5. Deploy `develop` to staging regularly
6. Merge `develop` to `main` when ready for production

**Commit Pattern (Commit Every 90 Minutes):**

```
Good commit messages:
✅ "Add Stripe payment intent endpoint"
✅ "WIP: Custom subdomain routing - 60% done"
✅ "Fix: Check-in not updating user total"
✅ "Test: Add integration tests for wallet topup"

Avoid:
❌ "stuff"
❌ "changes"
❌ "update"
❌ "fix bug"
```

**Format:**
```
[Type]: [What you did in <50 chars]

Types: Add, Fix, WIP, Test, Refactor, Docs, Style
```

**Why commit often?**
- Saves progress (computer crash = minimal loss)
- Creates restore points (can revert if needed)
- Builds momentum (visible progress = dopamine)
- Reduces stress (work is saved)

---

### Recovering from Mistakes

**"Oh no, I broke everything":**

```bash
# See what changed
git status

# See specific changes
git diff

# Undo all uncommitted changes (NUCLEAR OPTION - use carefully)
git reset --hard HEAD

# Undo last commit but keep changes
git reset --soft HEAD~1

# Go back to specific commit
git log --oneline
git checkout [commit-hash-from-2-days-ago]

# Create new branch from that old commit
git checkout -b recovery-branch
```

**Don't panic.** Git is designed to prevent permanent loss. Almost everything is recoverable.

---

## Success Metrics & Decision Gates

### Phase-by-Phase Metrics

**Phase 0 (Week 2): Prototype**
- [ ] Working events API
- [ ] Public event pages displaying
- [ ] User can create events
- [ ] You finished in 2 weeks
- [ ] You enjoyed the process

**Decision:** Continue or stop?

---

**Phase 1 (Week 6): Public Directory**
- [ ] 50+ events listed
- [ ] 500+ page views per week
- [ ] 10+ user-submitted events
- [ ] SEO: 5+ organic search visits per day

**Decision:** Is there interest? Continue or pivot?

---

**Phase 2 (Week 10): Check-Ins**
- [ ] 100+ student accounts
- [ ] 50+ check-ins per week
- [ ] 20+ students with 5+ check-ins (engaged)
- [ ] Badges being earned

**Decision:** Are students engaged? This is CRITICAL. If no, seriously reconsider.

---

**Phase 3 (Week 14): Teacher Videos**
- [ ] 3+ teachers claimed events
- [ ] 2+ teachers uploading videos regularly
- [ ] 200+ student accounts
- [ ] 100+ check-ins per week
- [ ] Students checking in for videos

**Decision:** Is viral loop working? If yes, continue. If no, investigate why.

---

**Phase 4 (Week 18): Plus Tier**
- [ ] 2+ teachers upgraded to Plus
- [ ] Subdomain pages customized
- [ ] Payment processing enabled
- [ ] £500+ GMV processed
- [ ] Teachers happy (NPS 8+)

**Decision:** Will teachers pay? This validates business model. If no, reassess.

---

**Phase 5 (Week 22): Social**
- [ ] 50+ connections made
- [ ] 100+ users following
- [ ] Active activity feed

**Decision:** Nice-to-have, not critical. Continue regardless.

---

**Phase 6 (Week 24): Launch**
- [ ] No critical bugs
- [ ] Platform fast (<2s load)
- [ ] Public announcement made
- [ ] 50+ new users in launch week

**Decision:** Soft launch successful? Keep building.

---

### 1-Month Post-Launch (Week 28)

**Target Metrics:**
- Total users: 300+
- Active users (30 days): 150+
- Teachers: 10+
- Plus tier: 3+
- Monthly revenue: £100+

**Decision:**

**Strong Performance (80%+ of targets):**
→ Keep building, iterate based on feedback, consider raising small round to accelerate

**Moderate Performance (50-80% of targets):**
→ Continue, but focus heavily on growth and retention, improve onboarding

**Weak Performance (<50% of targets):**
→ Seriously reassess:
- Is there product-market fit?
- Should you pivot?
- Should you stop gracefully?

**Be honest with the data.** Don't ignore weak signals.

---

## Final Thoughts

### You Can Do This (Maybe)

The plan is solid. The tools exist. Claude Code can genuinely help you build this faster than you could alone.

**But:**

1. **Execution is on you.** Claude writes code, YOU show up every day.
2. **ADHD is real.** Structure helps, but won't eliminate the challenge.
3. **Most startups fail.** Even good ideas, good plans, good execution.
4. **The 2-week test matters.** Don't skip it. It's your validation.

### Honest Self-Assessment

**Before starting, ask yourself:**

- Can I commit 15-20 hours per week for 6 months?
- Can I handle frustration when things break?
- Can I celebrate small wins (not just obsess over what's not done)?
- Do I have support (partner, friend, family who understands this is hard)?
- Can I accept that this might fail (and that's okay)?

**If yes to most →** Give it a shot. The 2-week test will tell you more.

**If no to several →** Consider alternatives:
- Find technical co-founder
- Hire developer (if you can fund it)
- Wait for better circumstances
- Be okay with not doing this

### The Documents Exist

You have everything needed:
1. ✅ Product Specification v2.0 (what to build)
2. ✅ Database Schema v2.0 (data structure)
3. ✅ Business Plan v2.0 (why and how)
4. ✅ Project Plan v2.0 (step-by-step execution)

**These are valuable regardless of whether you build it:**
- Show to potential co-founder
- Hand to developer you hire
- Proof you can think through complex systems
- Learning experience (you understand product development better now)

### Permission to Stop

**If at any decision gate you realize this isn't working:**

**STOP.**

Stopping is not failure. Stopping is data-driven decision making.

Better to stop at Week 2 (cost: 20 hours) than Week 20 (cost: 200 hours + money + stress).

Sunk cost fallacy is real. "I've invested so much" is not a reason to continue a failing project.

**Knowing when to stop is a skill.** Practice it.

### Permission to Succeed

**If the 2-week test goes well, if students engage, if teachers adopt:**

**KEEP GOING.**

You might actually build something valuable. It might actually work.

Don't sabotage yourself with:
- "I'm not a real developer" (you're building it, that makes you real)
- "Someone else will do it better" (they're not doing it NOW)
- "I have ADHD, I can't sustain this" (maybe you can, maybe hyperfixation carries you)

**Give yourself permission to succeed.** It's as valid as permission to fail.

---

## Conclusion

The plan exists.

The decision is yours.

**Good luck. 🎰💃**

---

**Document Version:** 2.0  
**Date:** March 12, 2026  
**Developer:** You (with Claude Code assistance)  
**Timeline:** 6 months (24 weeks) or until decision gate says stop  
**First Step:** 2-week prototype test  
**Start Date:** [When you begin]

**See Also:**
- Platform Specification v2.0
- Database Schema v2.0
- Business Plan v2.0

---

*"The best time to plant a tree was 20 years ago. The second best time is now. But also, it's okay to decide not to plant the tree if the soil is wrong." - Ancient ADHD Proverb*
