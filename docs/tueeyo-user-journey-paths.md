# Tueeyo — User Journey Paths
**Version:** Draft 2  
**Date:** March 2026  
**Purpose:** Reference document for updating platform spec, business plan, and project plan  
**Status:** Substantially complete — Paths C and D still to develop

---

## Core Principle

**At the base, everyone is a dancer.**

Roles (teacher, DJ, photographer, promoter) are tags applied on top of a shared dancer identity. There is no fundamental difference in profile structure between a teacher and a student — a teacher checking into another teacher's class is simply a dancer in that context. This means:

- There is no separate onboarding for teachers
- Role transitions are frictionless (add a tag, don't create a new account)
- A teacher's history as a student is visible and valuable — credibility is earned before the first class is taught
- The same person can be a student on Monday and a teacher on Wednesday with no awkwardness

---

## Reputation (Universal)

Reputation is not role-specific. It belongs to the person and is built the same way regardless of role — by participating in the community.

**Universal reputation inputs (all roles):**
- Check-ins (attending classes, events)
- Consistency (streaks, regular attendance)
- Variety (different styles, venues, teachers)
- Reviews written
- Connections made

**Role-specific reputation inputs (added on top):**
- *Teacher:* Student check-ins at their classes, student retention, class growth
- *DJ:* Bookings completed, events played, reviews from promoters/organisers
- *Photographer:* Sessions completed, portfolio quality, reviews

**One unified profile, role contributions visible underneath.** You see the whole person, not just their professional hat.

> **Implementation note:** Start simple. Review with real data before adding complexity. This feature can be adjusted or simplified if it doesn't work as expected in practice.

---

## The Aha Moment (All Teacher Paths)

Every teacher journey converges on the same realisation:

> "I now have a way to reach my own students — organised by class, building itself automatically, without me having to collect a single phone number or email address."

This is the core teacher value proposition. **Everything else (videos, professional page, payments) comes after this moment, not before it.**

---

## The Video Path (Student Acquisition Mechanism)

The class routine video is primarily a **student acquisition tool**, not a teacher acquisition tool. The sequence:

1. Teacher is already on the platform (via any path below)
2. Films the end-of-class routine — already happens naturally, students film it on their phones anyway
3. Uploads it, shares their subdomain URL (e.g. magik-mike.tueeyo.uk) in WhatsApp, Instagram bio, Facebook
4. Students not on the platform follow the link
5. They land on a professional-looking page and see the video is gated behind check-in
6. They join to access it — **platform grows through content**

The subdomain URL is the front door to the platform for many incoming students. It gets shared in class, in WhatsApp groups, and on social media. Its value extends beyond video access — it is a professional web presence worth sharing regardless.

---

## Path A: The Aspiring Teacher (Dancer → Teacher)

**Who:** A dancer already on the platform who decides to start teaching.

**Why this path matters:** These users already trust the platform, are known in the community, and actively recruit new users through personal invitation. They are also tomorrow's Plus tier customers — they will upgrade once their classes grow.

### Journey

1. **Dancer on platform**
   - Has attendance history, reputation, connections
   - Known within the local dance community
   - Credibility established before teaching begins — prospective students can see their history

2. **Decides to start teaching**
   - Creates their first event on Tueeyo directly
   - Does not need to "claim" — they own it from the start

3. **Invites their personal network**
   - Friends already on Tueeyo get a platform notification/invite
   - Friends not on Tueeyo get a shareable link
   - Off-platform friends join to RSVP or check in — **platform grows sideways through trust networks**

4. **First class happens**
   - Students check in — motivated partly by social awareness that their friend/teacher will see
   - Teacher gains reputation points for each check-in
   - Teacher naturally mentions checking in: "it helps me if you do" — no hard sell needed
   - Attendee group forms automatically

5. **Aha moment**
   - Every subsequent class adds to the group automatically
   - No data collection effort required
   - The contact list builds itself

6. **Natural upgrade triggers**
   - Classes growing → wants analytics (Plus)
   - Students asking to pay online → wants payment processing (Plus)
   - Wants a professional web presence to share → custom subdomain (Plus)

### Why this path is uniquely valuable

- **Built-in credibility:** Dance history and community standing visible before the first class
- **Active recruiter:** Pulls entire personal network toward the platform
- **Lower friction upgrade:** Already understands and trusts the platform before paying for it
- **Self-reinforcing reputation loop:** Teacher gains reputation from student check-ins; teacher gently encourages check-ins; students comply because the ask is personal and easy

---

## Path B: The Established Teacher (External → Platform)

**Who:** An existing teacher who discovers Tueeyo through their students or the wider community.

### Journey

1. **Discovery**
   - Hears about it from a student ("I checked in on Tueeyo last night")
   - Or finds their class already listed with check-ins they didn't know about
   - Curiosity or mild concern drives them to investigate

2. **Claims their event**
   - Sees real students have already checked in
   - Claims the event — admin verification confirms ownership
   - Immediately has an attendee group they didn't create

3. **Aha moment**
   - Sends their first group message to attendees
   - Reaches students they had no prior way to contact
   - Realises this solves a real problem: cancelled classes, venue changes, workshop announcements

4. **Builds the habit**
   - Every class adds more students to the group automatically
   - Communication becomes routine
   - Students check in more consistently because they know the teacher uses the platform and sees it

5. **Natural upgrade triggers**
   - Same as Path A — growth, payments, professional presence

### Key difference from Path A

The established teacher's aha moment is **immediate and surprising** — they discover an audience they didn't know they had. The aspiring teacher's aha moment is **gradual and earned** — they build their audience deliberately.

---

## Path C: The Event Organiser / Promoter

**Who:** Someone running social events, workshops, or congresses rather than regular classes.

*(To be developed — different rhythm to regular classes, ticket-based rather than class-based, larger one-off audiences)*

---

## Path D: The DJ / Photographer

**Who:** A professional service provider within the dance community.

*(To be developed — booking-focused rather than class-focused, portfolio and discovery are primary needs)*

---

## Path E: The Reluctant Adopter

**Who:** A teacher required to create a profile by their school or event organiser.

**Strategic note:** This path has no specific design value and should not be optimised for. However it should not be blocked — external pressure is a valid entry point. The risk is a low-effort profile that undermines platform quality in early stages. The mitigation is that the aha moment (student check-ins, group messaging) can still happen organically regardless of how the teacher arrived. Do not design for this path; let it take care of itself.

---

## The Upgrade Path (All User Types)

| Stage | Who | Trigger | Reward |
|-------|-----|---------|--------|
| **Dancer** | Everyone | Wants to discover events, track attendance, connect | Event discovery, attendance history, gamification, community messaging |
| **Aspiring teacher** | Ambitious dancers | Starting to teach | Creates first event, invites network, reputation from student check-ins |
| **Free tier teacher** | Any teacher | Claims or creates events | Organised attendee groups, group messaging, attendance data |
| **Plus tier teacher** | Growing professionals | Wants payments or professional presence | Custom subdomain, payment processing, advanced analytics |
| **Pro tier** | Schools / organisations | Managing multiple teachers | Multi-user dashboard, consolidated reporting |

---

## Implications for Platform Design

1. **Messaging is a community feature, not a tier feature.** Everyone can message individuals freely. Claiming an event unlocks organised group messaging by attendee list — that is the teacher-specific value, and it is available on the Free tier.

2. **Claiming is about communication first, videos second.** The platform spec and go-to-market narrative should reflect this ordering. Video upload is a valuable bonus and a student acquisition mechanism — it is not the primary hook for teacher adoption.

3. **The viral loop has three mechanisms:**
   - *Established teacher loop:* Teacher messages students → students check in to stay connected
   - *Aspiring teacher loop:* New teacher invites personal network → off-platform friends join
   - *Video loop:* Teacher shares subdomain URL → off-platform students join to access gated content

4. **Student reputation benefits the aspiring teacher.** Dance history and community connections are visible before the first class — a unique trust signal no other platform can offer.

5. **Reputation reinforces check-in behaviour naturally.** Teachers gain reputation from student check-ins, giving them a personal incentive to mention the platform at the end of class. No marketing required.

6. **Role tags, not role accounts.** The platform should make adding a teacher (or DJ, or photographer) tag to an existing account trivially easy. Never ask someone to create a separate account.

---

## Open Questions

- Are there other entry paths not captured here? *(Left open — cannot rule out additional paths at this stage)*
- Paths C (Promoter) and D (DJ/Photographer) still to be developed

---

*This document is a reference for rewriting Phase 3 of the platform spec, the teacher value proposition sections of the business plan, and the go-to-market narrative.*
