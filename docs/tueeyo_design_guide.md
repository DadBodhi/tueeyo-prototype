web application/stitch/projects/10161489146542175177/screens/6f3149a233444a09bf03d76214dec493
# Tueeyo Design Guide

This guide defines the visual language and frontend specifications for Tueeyo, a warm, community-focused platform for dancers.

## 1. Brand Vision
Tueeyo aims to bridge the gap between artistic expression and community utility. The interface should feel "clean and uncluttered," prioritizing generous whitespace and elegant transitions to reflect the beauty of movement.

## 2. Visual Identity

### Color Palette
- **Primary (Accent):** `#9B2335` (Deep Rose-Red) - Used for primary CTAs, active states, and key highlights.
- **Background (Surface):** `#FDFAF6` (Warm Off-White) - The base canvas for all screens.
- **Surface Dim:** `#DCD9D9` - Used for subtle dividers or secondary backgrounds.
- **Text (On-Surface):** `#1A1A1A` - High-contrast black for legibility.
- **Text (Secondary):** `#4A4A4A` - For descriptions and metadata.

### Typography
- **Headings:** `Playfair Display` (Serif) - Used for page titles, event names, and expressive headers.
- **Body & Labels:** `Inter` (Sans-Serif) - Used for legibility in descriptions, form fields, and navigation.

### Shape & Elevation
- **Border Radius:** `8px` minimum for cards, buttons, and inputs.
- **Elevation:** Soft, diffused shadows for cards.
  - *Standard Card:* `shadow-[0_4px_20px_rgba(26,26,26,0.05)]`
- **Containers:** Card-based layout with generous internal padding (usually `1.5rem`).

## 3. Core Components

### Navigation
Mobile
- **Sticky Top Bar:** Tueeyo wordmark (Playfair Display) on the left, primary action or user profile on the right.
- **Sticky Bottom Nav:** multi-tab mobile navigation. Icons should be simple line-art style.

Desktop
- **Sticky Top Bar including Nav** 

### Event Cards
- **Structure:** Image (16:9 ratio) -> Metadata (Date, Time, Venue) -> Heading (Playfair Display) -> Footer (Price + CTA).
- **Styling:** White background, rounded corners (8px), soft shadow.

### Modals / Overlays
- **Interaction:** Page content should dim (backdrop-blur or dark overlay) when a modal is active.
- **Structure:** Centered card with clear "Create" (Accent) and "Cancel" (Ghost) buttons.

## 4. Technical Specifications
- **Framework Recommendation:** Tailwind CSS for utility-first styling.
- **Responsiveness:** Mobile-first design. Use container-max-width of `max-w-4xl` for desktop centering.
- **Accessibility:** Maintain high contrast between `#9B2335` and `#FDFAF6`. Ensure all interactive elements have a minimum touch target of 44x44px.

## 5. Animation Principles
- **Transitions:** Use `ease-in-out` for hover states and modal entries (200ms-300ms duration).
- **Movement:** Subtle vertical fades for new content loading to maintain the "elegant" feel.

