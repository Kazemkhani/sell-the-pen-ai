# Frontend Documentation - Sell The Pen AI

> AI-Powered Sales Training Platform Frontend


## 🆕 Recent Updates (November 2025)

**Major Features Added:**
1. ✅ **Proposal Crafting Page** - Tom Sant methodology-based proposal analysis
2. ✅ **Real Estate Focus** - Onboarding limited to Real Estate agents only
3. ✅ **Vapi Integration** - "Talk to Mukesh" voice AI widget
4. ✅ **First Name Greeting** - "Hello Amir" (not full name)
5. ✅ **Removed /try-now** - Streamlined to direct Recommendations flow
6. ✅ **Grayed Out Options** - Coming soon badges on unavailable features

**Current Active Features:**
- 📞 Lead Outreach (Vapi voice calls with Mukesh)
- 💼 Proposal Crafting (Tom Sant analysis demo)
- 🚧 Objection Handling (Coming Soon - grayed out)

**Demo Profile:**
- Name: Amir Kazamkhani (first name: Amir)
- Company: Nova Real Estate
- Role: Real Estate Agent (only active option)

---

## Table of Contents
- [Recent Updates](#-recent-updates-november-2025)
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Pages & User Flow](#pages--user-flow)
- [Design System](#design-system)
- [UI Components](#ui-components)
- [Features](#features)
- [Configuration](#configuration)
- [Development](#development)
- [Future Enhancements](#future-enhancements)

---

## Overview

**Sell The Pen AI** is a sales training web application designed for **Real Estate Agents** that helps them practice and improve their skills through AI-powered voice calls and proposal analysis. The platform provides:

- **Live AI voice call simulations** via Vapi with "Mukesh" AI prospect
- **Real-time feedback** based on **Mike Ferry** cold calling methodology
- **Proposal analysis** based on **Tom Sant's** "Persuasive Business Proposals" framework
- **Personalized onboarding** with 8-step psychological profiling
- **Smart recommendations** based on user challenges and goals

**Current Status:**
- ✅ Frontend: Production-ready with Vapi integration
- ✅ Proposal Crafting: Demo mode with mock analysis
- 🚧 Backend: FastAPI scaffold created, API integration pending

---

## Tech Stack

### Core Framework
- **Vite 5.4.19** - Build tool & dev server
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **React Router DOM 6.30.1** - Client-side routing

### UI & Styling
- **shadcn/ui** - Component library (Radix UI based)
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **tailwindcss-animate** - Animation utilities
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **clsx + tailwind-merge** - Class name utilities

### State & Data
- **TanStack React Query 5.83.0** - Data fetching & caching
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### Additional Libraries
- **next-themes 0.3.0** - Dark mode support
- **sonner** - Toast notifications
- **date-fns** - Date utilities
- **recharts** - Charts (installed but not yet used)

---

## Project Architecture

### Folder Structure

```
sell-pen-ai-flow/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (50+ components)
│   │   └── NavLink.tsx      # Custom NavLink wrapper
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Responsive breakpoint hook
│   │   └── use-toast.ts     # Toast notification hook
│   ├── lib/
│   │   └── utils.ts         # cn() utility for class merging
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── TryNow.tsx       # Skill selection
│   │   ├── PersonaSelection.tsx # Customer persona picker
│   │   ├── CallSimulation.tsx   # Live call interface
│   │   ├── Feedback.tsx     # Post-call analysis
│   │   └── NotFound.tsx     # 404 error page
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & design tokens
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

### Key Architectural Patterns

1. **Component-Based Architecture** - Modular, reusable components
2. **File-Based Routing** - Pages organized in `/pages` directory
3. **Design System** - CSS variables + Tailwind for consistent theming
4. **Type Safety** - Full TypeScript coverage
5. **Utility-First CSS** - Tailwind utilities + custom components
6. **Compound Components** - shadcn/ui pattern for flexible APIs

---

## Pages & User Flow

### Route Map

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Landing page (redirects to onboarding if not completed) |
| `/onboarding/basic-info` | `BasicInfo.tsx` | **NEW:** Step 1 - Name and company |
| `/onboarding/experience` | `Experience.tsx` | **NEW:** Step 2 - Experience level |
| `/onboarding/role` | `Role.tsx` | **NEW:** Step 3 - Sales role |
| `/onboarding/personality` | `Personality.tsx` | **NEW:** Step 4 - Rejection handling |
| `/onboarding/style` | `CommunicationStyle.tsx` | **NEW:** Step 5 - Communication style |
| `/onboarding/challenges` | `Challenges.tsx` | **NEW:** Step 6 - Top challenges |
| `/onboarding/learning` | `LearningStyle.tsx` | **NEW:** Step 7 - Learning preference |
| `/onboarding/goals` | `Goals.tsx` | **NEW:** Step 8 - Goals and timeline |
| `/recommendations` | `Recommendations.tsx` | **NEW:** Personalized skill recommendations |
| `/try-now` | `TryNow.tsx` | Skill area selection (with greeting) |
| `/persona-selection` | `PersonaSelection.tsx` | Choose customer persona (with greeting) |
| `/call-simulation` | `CallSimulation.tsx` | Live AI call interface (with greeting) |
| `/feedback` | `Feedback.tsx` | Post-call performance breakdown (with greeting) |
| `*` | `NotFound.tsx` | 404 error page |

### User Journey Flow

```
Landing Page (/) - ENTRY POINT
    ↓ [User clicks "Try Now"]
    ↓ If onboarding completed → /recommendations
    ↓ If onboarding NOT completed → /onboarding/basic-info
Onboarding Flow (8 steps)
    1. Basic Info → 2. Experience → 3. Role → 4. Personality
    5. Style → 6. Challenges → 7. Learning → 8. Goals
    ↓ [Complete Onboarding → Profile saved to localStorage]
Recommendations (/recommendations)
    - Shows "Hello Amir" greeting
    - Displays personalized skill recommendations with match %
    - Lead Outreach: 95% match (recommended for fear of calling)
    - Objection Handling: 85% match
    - Pitching: 70% match
    ↓ [Select recommended skill or browse all]
Skill Selection (/try-now)
    ↓ [Choose: Lead Outreach / Pitching / Objection Handling]
Persona Selection (/persona-selection)
    ↓ [Choose: Dominant & Aggressive (demo) / Analytical / Timid]
Call Simulation (/call-simulation)
    ↓ [Start Call → Live Conversation → End Call (30s auto-end)]
Feedback (/feedback)
    ↓ [View Scores → Read Analysis → Practice Again]
    ↓ [Practice Again loops back to Persona Selection]
```

### Page-by-Page Breakdown

#### 0. **Onboarding Flow** (8 Pages) - `src/pages/onboarding/`

**NEW FEATURE - November 2025**

**Purpose:** Comprehensive psychological profiling to personalize training experience

**Shared Features Across All Onboarding Pages:**
- Progress indicator (Step X of 8, percentage complete)
- Back/Continue navigation
- Consistent `OnboardingLayout` component
- Pre-filled demo values for "Amir Kazamkhani"
- Form validation before allowing Continue
- Auto-save to localStorage via `UserProfileContext`

**Page Details:**

**Step 1: BasicInfo** (`/onboarding/basic-info`)
- Name input field (default: "Amir Kazamkhani")
- Company input field (default: "Nova Real Estate")
- Privacy notice about local storage
- No back button (first step)

**Step 2: Experience** (`/onboarding/experience`)
- 4 options in 2x2 grid
- Visual: Large emoji icons
- Default selected: "Just Starting Out" (beginner)
- Options: Beginner, Intermediate, Experienced, Veteran

**Step 3: Role** (`/onboarding/role`)
- 6 + 1 options in 3-column grid
- Default selected: "SDR/BDR"
- Includes "Other" option with custom text input
- Icons for each role type

**Step 4: Personality** (`/onboarding/personality`)
- 4 options in 2x2 grid
- Assesses rejection handling
- Default selected: "It affects me deeply" (resilience score: 1)
- Each option has associated resilience score (1-4)

**Step 5: CommunicationStyle** (`/onboarding/style`)
- 4 options in 2x2 grid
- Default selected: "High-Energy & Assertive"
- Each card has title + 2 description lines

**Step 6: Challenges** (`/onboarding/challenges`)
- 8 options in 2x2 grid
- **Multi-select:** Up to 2 challenges
- Default selected: "Fear of calling", "Handling objections"
- Checkmark icon appears on selected items
- Counter shows "X more can be selected"

**Step 7: LearningStyle** (`/onboarding/learning`)
- 4 options in 2x2 grid
- Default selected: "Trial & Error"
- Determines feedback format preference

**Step 8: Goals** (`/onboarding/goals`)
- Primary goal selection (5 options in 3-column grid)
- Timeline radio group (Week/Month/Quarter/Long-term)
- Default goal: "Hit my quota"
- Default timeline: "This month"
- On completion: Calls `completeOnboarding()` and navigates to `/recommendations`

**State Management:**
```typescript
// All pages use UserProfileContext
const { profile, updateProfile, completeOnboarding } = useUserProfile();

// Example update
updateProfile({ experienceLevel: 'beginner' });
```

**Demo Profile Values:**
```typescript
{
  name: "Amir Kazamkhani",
  company: "Nova Real Estate",
  experienceLevel: "beginner",
  salesRole: "SDR",
  rejectionResponse: "deeply-affected",
  resilienceScore: 1,
  communicationStyle: "assertive",
  topChallenges: ["fear", "objections"],
  learningStyle: "trial-error",
  primaryGoal: "quota",
  timeline: "month"
}
```

---

#### 0.5. **Recommendations** - `src/pages/Recommendations.tsx`

**NEW FEATURE**

**Purpose:** Display personalized skill recommendations based on user profile

**Features:**
- Welcome header with "Profile Complete!" badge
- Personalized greeting: "Welcome, Amir!"
- Profile summary card showing key attributes
- 3 skill recommendations sorted by match percentage
- Progress bars showing match score (0-100%)
- "Highly Recommended" badge for matches ≥85%
- Click any recommendation to go to skill selection

**Match Score Algorithm:**
```typescript
// Lead Outreach
base: 70
+ 15 if "fear" in challenges
+ 10 if "gatekeepers" in challenges
+ 5 if "rapport" in challenges
+ 5 if experienceLevel === "beginner"

// Objection Handling
base: 60
+ 20 if "objections" in challenges
+ 10 if "control" in challenges
+ 5 if communicationStyle === "assertive"

// Pitching
base: 50
+ 20 if "value" in challenges
+ 10 if communicationStyle === "analytical"
+ 5 if "closing" in challenges
```

**Example Output for Amir:**
- Lead Outreach: 95% (70 + 15 + 5 + 5)
- Objection Handling: 85% (60 + 20 + 5)
- Pitching: 70% (base)

**State:**
- Reads from `useUserProfile()` context
- No local state needed

---

#### 1. **Index (Landing Page)** - `src/pages/Index.tsx`
**Purpose:** Marketing page to convert visitors (ENTRY POINT OF APP)

**NEW BEHAVIOR:**
- Always shows landing page (no auto-redirect)
- "Try Now" button dynamically links based on onboarding status:
  - If `completedOnboarding === false` → `/onboarding/basic-info`
  - If `completedOnboarding === true` → `/recommendations`
- This allows first-time users to see the value proposition before onboarding

**Sections:**
- **Hero Section**
  - Headline: "Become a Top-1% Sales Closer"
  - Subheadline: Value proposition
  - CTA button → `/try-now`
  - Gradient background animation

- **Features Section**
  - 4 feature cards in grid:
    - Live AI Sales Calls (Phone icon)
    - Real-Time Psychology Coaching (Brain icon)
    - Precision Objection Handling (Shield icon)
    - Performance Analytics (BarChart3 icon)
  - Custom `feature-cell` styling

- **Testimonials**
  - 3 testimonial cards
  - Social proof quotes
  - `premium-card` styling

- **Stats Section**
  - 4 stat cards:
    - 37% increase in close rate
    - 52% faster outreach to "yes"
    - 28K+ conversations analyzed
    - 900+ salespeople upskilled
  - `stat-card` styling

- **Final CTA**
  - "Start Your First AI Sales Call"
  - CTA button → `/try-now`

**Animations:**
- `animate-fade-in-up` on hero elements (staggered delays)
- Hover effects on cards
- Button hover with arrow translation

---

#### 2. **TryNow (Skill Selection)** - `src/pages/TryNow.tsx`
**Purpose:** Choose which sales skill to practice

**Features:**
- 3 skill option cards in grid:
  1. **Lead Outreach** (Phone icon)
     - "Master the art of first contact"
  2. **Pitching & Positioning** (Presentation icon)
     - "Communicate value with precision"
  3. **Objection Handling & Closing** (Target icon)
     - "Turn resistance into momentum"

- All cards link to `/persona-selection`
- Interactive hover states:
  - Card scale animation (`hover:scale-[1.02]`)
  - Icon background color transition
  - Button arrow translation

**State:** Currently all options lead to same flow (future: differentiated training paths)

---

#### 3. **PersonaSelection** - `src/pages/PersonaSelection.tsx`
**Purpose:** Select AI customer persona for practice

**Personas:**

1. **Dominant & Aggressive** ⚡ [ACTIVE - Demo Persona]
   - Badge: "Demo Persona"
   - Icon: Flame (destructive color)
   - Description: "Interrupts you, challenges your authority, pushes back hard"
   - Links to: `/call-simulation`
   - Special styling: `border-2 border-primary/20`

2. **Analytical & Skeptical** 🔍 [Coming Soon]
   - Badge: "Coming Soon"
   - Icon: Search
   - Description: "Asks for details, slow decision-maker, needs facts"
   - Button: Disabled
   - Opacity: 60%

3. **Timid & Uncertain** 👥 [Coming Soon]
   - Badge: "Coming Soon"
   - Icon: Users
   - Description: "Nervous, indecisive, price-sensitive"
   - Button: Disabled
   - Opacity: 60%

**Design Notes:**
- 3-column grid on desktop
- Only first persona is clickable
- Hover states on active persona only

---

#### 4. **CallSimulation** - `src/pages/CallSimulation.tsx`
**Purpose:** Live AI sales call interface

**States:**

**Pre-Call State** (initial):
- Animated phone icon with effects:
  - `animate-pulse-ring` background
  - `animate-vibrate` on icon
  - Glow effect with blur
- Heading: "Your Call Is About to Begin"
- Persona name displayed
- "Start Call" button

**Active Call State** (after clicking "Start Call"):
- **Timer Display**
  - Format: `MM:SS`
  - Large, prominent display
  - Real-time countdown from 0:00

- **Live Transcript Box**
  - Scrollable area (`max-h-64 overflow-y-auto`)
  - Message format:
    - "You:" (primary color)
    - "Prospect:" (destructive color)
  - Mock conversation data (hardcoded)

- **Waveform Visualization**
  - 20 animated bars
  - Dynamic heights (randomized)
  - Pulse animation with staggered delays
  - Visual audio feedback effect

- **Call Controls**
  - "End Call" button (destructive variant)
  - PhoneOff icon

**Auto-End Logic:**
- Call automatically ends after 30 seconds
- Navigates to `/feedback` page
- Timer cleanup on unmount

**State Management:**
```typescript
const [isCallStarted, setIsCallStarted] = useState(false);
const [callDuration, setCallDuration] = useState(0);
```

---

#### 5. **Feedback (Performance Analysis)** - `src/pages/Feedback.tsx`
**Purpose:** Detailed post-call scoring and coaching

**Score Cards Section:**

4 performance metrics displayed in grid (2 columns):

1. **Opening Score: 72/100**
   - Description: "How well you established authority + rapport"
   - Trend: Neutral (Minus icon)
   - Color: Yellow (60-79 range)

2. **Conversation Control Score: 58/100**
   - Description: "How well you navigated the aggressive persona"
   - Trend: Down (TrendingDown icon, red)
   - Color: Red (<60)

3. **Objection Handling Score: 81/100**
   - Description: "How you responded to friction"
   - Trend: Up (TrendingUp icon, green)
   - Color: Green (80+)

4. **Closing Momentum Score: 65/100**
   - Description: "How effectively you moved toward the close"
   - Trend: Neutral
   - Color: Yellow

**Score Card Features:**
- Progress bar with conditional coloring
- Trend indicators
- Staggered fade-in animations
- `premium-card` styling

**Detailed Analysis Section:**

Narrative feedback referencing:
- **Chris Voss** - "Never Split the Difference" (tactical empathy, mirroring)
- **Challenger Sale** - Teaching approach, reframing conversations
- **SPIN Selling** - Problem questions, clarifying questions
- **B2B SaaS best practices** - Calibrated questions, urgency creation

**CTA:**
- Two buttons displayed side-by-side (stacked on mobile):
  - "Choose Different Skill" (outline variant) → `/recommendations`
  - "Practice Again" (primary) → `/persona-selection`
- Rounded full buttons with arrow animation on primary button

---

#### 6. **NotFound (404)** - `src/pages/NotFound.tsx`
**Purpose:** Handle invalid routes

**Features:**
- Centered layout with muted background
- Large "404" heading
- "Oops! Page not found" message
- "Return to Home" link (underlined, primary color)
- Console error logging on mount:
  ```typescript
  console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  ```

---

## Design System

### Color Palette

**Brand Colors:**
- **Primary (Slate):** `hsl(210, 3%, 18%)` - Dark charcoal
- **Secondary (Taupe):** `hsl(28, 24%, 72%)` - Warm neutral
- **Accent (Royal):** `hsl(216, 50%, 43%)` - Rich blue

**Functional Colors:**
- **Destructive:** `hsl(0, 84.2%, 60.2%)` - Red for errors/warnings
- **Muted:** `hsl(28, 12%, 92%)` - Light backgrounds
- **Border:** `hsl(28, 15%, 88%)` - Subtle borders

**Premium Extended Palette:**
```css
--taupe: 28 24% 72%
--slate: 210 3% 18%
--royal: 216 50% 43%
--gray-50: 28 15% 98%
--gray-100: 28 15% 94%
--gray-200: 28 15% 88%
```

### Dark Mode Support

Full dark mode theme configured via `.dark` class:
- Background: `hsl(210, 3%, 18%)`
- Foreground: `hsl(0, 0%, 98%)`
- Inverted card/component colors
- Maintained contrast ratios

**Note:** Dark mode is configured but not actively used (no theme toggle in UI)

### Typography

**Font Stack:**
- Default: System font stack with antialiasing
- Headings: `font-semibold tracking-tight`

**Text Utilities:**
- `.text-balance` - Balanced text wrapping

### Custom Components Classes

Defined in `src/index.css`:

1. **`.premium-card`**
   ```css
   @apply bg-card border border-border rounded-2xl p-8 shadow-sm
          hover:shadow-md transition-shadow duration-300;
   ```
   - Used for: Feature cards, persona cards, score cards
   - 2xl rounded corners (16px)
   - Subtle shadow with hover enhancement

2. **`.feature-cell`**
   ```css
   @apply premium-card hover:border-primary/20 transition-all duration-300;
   ```
   - Extends premium-card
   - Border color change on hover

3. **`.stat-card`**
   ```css
   @apply premium-card text-center;
   ```
   - Centered content variant

### Animations

**Custom Keyframes:**

1. **`fade-in-up`**
   ```css
   0%: opacity: 0, translateY(20px)
   100%: opacity: 1, translateY(0)
   ```
   - Duration: 0.6s ease-out
   - Used for: Page content entrance

2. **`scale-in`**
   ```css
   0%: opacity: 0, scale(0.95)
   100%: opacity: 1, scale(1)
   ```
   - Duration: 0.4s ease-out
   - Used for: Call simulation active state

3. **`pulse-ring`**
   ```css
   0%, 100%: scale(1), opacity: 1
   50%: scale(1.05), opacity: 0.8
   ```
   - Duration: 2s infinite
   - Used for: Phone icon pre-call animation

4. **`vibrate`**
   ```css
   0%, 100%: translateX(0)
   25%: translateX(-2px)
   75%: translateX(2px)
   ```
   - Duration: 0.3s infinite
   - Used for: Phone icon vibration effect

**Built-in shadcn Animations:**
- `accordion-down` / `accordion-up` - For accordion components
- Standard transition utilities

### Spacing & Layout

- **Container:** Max-width 1400px (2xl breakpoint)
- **Border Radius:** Default 0.75rem (12px)
- **Section Padding:** Typically `px-6 py-24`

---

## UI Components

### shadcn/ui Components Installed

**50+ components available** from shadcn/ui (Radix UI primitives):

**Layout & Navigation:**
- Accordion, Breadcrumb, Menubar, Navigation Menu, Tabs, Sidebar

**Form Elements:**
- Button, Checkbox, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Form

**Feedback:**
- Alert, Alert Dialog, Toast, Toaster, Sonner, Progress

**Data Display:**
- Avatar, Badge, Card, Table, Chart, Tooltip, Hover Card

**Overlays:**
- Dialog, Drawer, Popover, Sheet, Context Menu, Dropdown Menu

**Miscellaneous:**
- Calendar, Carousel, Collapsible, Command, Pagination, Resizable, Scroll Area, Separator, Skeleton, Toggle, Toggle Group

### Custom Components

#### **OnboardingLayout** - `src/components/OnboardingLayout.tsx` (NEW)

Shared layout component for all onboarding pages:

**Features:**
- Progress indicator (step X of Y, percentage bar)
- Question heading with optional subtext
- Back/Continue navigation buttons
- Consistent styling and animations
- Responsive design

**Props:**
```typescript
interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  question: string;
  subtext?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  showBack?: boolean;
}
```

**Usage:**
```tsx
<OnboardingLayout
  currentStep={2}
  totalSteps={8}
  question="What's your current sales experience?"
  onBack={() => navigate("/onboarding/basic-info")}
  onNext={handleNext}
  nextDisabled={!selected}
>
  {/* Page content */}
</OnboardingLayout>
```

---

#### **UserGreeting** - `src/components/UserGreeting.tsx` (NEW)

Displays personalized greeting after onboarding completion:

**Features:**
- Shows "Hello, [Name]" in top-right corner
- Only renders if `completedOnboarding === true`
- Reads from `UserProfileContext`
- Glassmorphism design (backdrop blur)
- User icon + name display

**Usage:**
```tsx
// Added to all main pages (TryNow, PersonaSelection, CallSimulation, Feedback)
<div className="min-h-screen relative">
  <UserGreeting />
  {/* Page content */}
</div>
```

---

#### **NavLink** - `src/components/NavLink.tsx`

Enhanced React Router NavLink with className support:

```typescript
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;  // Applied when route is active
  pendingClassName?: string; // Applied during navigation
}
```

**Usage:**
```tsx
<NavLink
  to="/feedback"
  className="base-styles"
  activeClassName="font-bold"
/>
```

### Contexts

#### **UserProfileContext** - `src/contexts/UserProfileContext.tsx` (NEW)

Global state management for user profile data:

**Features:**
- Stores complete user profile from onboarding
- Persists to localStorage automatically
- Provides profile access to all components
- Type-safe with TypeScript

**API:**
```typescript
interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

// Usage in components
const { profile, updateProfile, completeOnboarding } = useUserProfile();

// Update profile
updateProfile({ experienceLevel: 'beginner' });

// Complete onboarding
completeOnboarding(); // Sets completedOnboarding = true

// Check status
if (profile.completedOnboarding) {
  // Show greeting, use recommendations, etc.
}
```

**Profile Data Structure:**
```typescript
interface UserProfile {
  // Basic info
  name: string;
  company: string;

  // Onboarding responses
  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | 'veteran';
  salesRole: 'SDR' | 'AE' | 'AM' | 'RealEstate' | 'B2BSaaS' | 'Retail' | 'Other';
  customRole?: string;
  rejectionResponse: 'deeply-affected' | 'bothered' | 'accepting' | 'thrives';
  resilienceScore: number; // 1-4
  communicationStyle: 'analytical' | 'relationship' | 'assertive' | 'patient';
  topChallenges: Challenge[]; // max 2
  learningStyle: 'trial-error' | 'guided' | 'analytical' | 'quick-wins';
  primaryGoal: 'confidence' | 'quota' | 'top-performer' | 'mastery' | 'advancement';
  timeline: 'week' | 'month' | 'quarter' | 'long-term';

  // Metadata
  createdAt: Date;
  completedOnboarding: boolean;
}
```

**Demo Profile (Amir Kazamkhani):**
```typescript
export const DEMO_PROFILE: UserProfile = {
  name: "Amir Kazamkhani",
  company: "Nova Real Estate",
  experienceLevel: "beginner",
  salesRole: "SDR",
  rejectionResponse: "deeply-affected",
  resilienceScore: 1,
  communicationStyle: "assertive",
  topChallenges: ["fear", "objections"],
  learningStyle: "trial-error",
  primaryGoal: "quota",
  timeline: "month",
  createdAt: new Date(),
  completedOnboarding: false,
};
```

---

### Hooks

#### **useIsMobile** - `src/hooks/use-mobile.tsx`

Responsive breakpoint detection:

```typescript
const MOBILE_BREAKPOINT = 768; // matches Tailwind 'md'

export function useIsMobile(): boolean {
  // Returns true if viewport width < 768px
  // Updates on window resize
}
```

#### **useToast** - `src/hooks/use-toast.ts`

Toast notification manager (shadcn/ui):

```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Your changes have been saved.",
  variant: "default", // or "destructive"
});
```

---

## Features

### ✅ Implemented Features

1. **Multi-Page SPA with Client-Side Routing**
   - React Router DOM
   - Smooth page transitions
   - Link prefetching

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)
   - Grid layouts adapt to screen size

3. **Interactive Animations**
   - Page entrance animations (fade-in-up)
   - Hover effects on interactive elements
   - Loading states
   - Waveform visualization

4. **Call Simulation System**
   - Timer functionality
   - Mock transcript display
   - Auto-end mechanism
   - State management

5. **Performance Scoring UI**
   - 4 scoring categories
   - Visual progress bars
   - Trend indicators
   - Color-coded feedback

6. **Design System**
   - CSS custom properties
   - Dark mode support (configured)
   - Consistent spacing/typography
   - Reusable component patterns

7. **Error Handling**
   - 404 page
   - Route logging
   - Catch-all route

8. **Accessibility**
   - Semantic HTML
   - Radix UI primitives (keyboard navigation, ARIA)
   - Focus management
   - Screen reader friendly

### 🔜 Not Yet Implemented

1. **Backend Integration**
   - All data is currently hardcoded/mock
   - No API calls
   - No real-time AI conversation

2. **User Authentication**
   - No login/signup
   - No user profiles
   - No session management

3. **Data Persistence**
   - No database
   - No saved sessions
   - No progress tracking

4. **Real AI Integration**
   - Call simulation is mock/scripted
   - No speech-to-text
   - No text-to-speech
   - No AI model integration

5. **Analytics Dashboard**
   - recharts installed but not used
   - No historical performance tracking
   - No progress charts

6. **Skill Area Differentiation**
   - All 3 skill paths lead to same experience
   - No customized training flows

7. **Multiple Personas**
   - Only "Dominant & Aggressive" is active
   - Other 2 personas are placeholders

8. **Dark Mode Toggle**
   - Theme system configured
   - No UI toggle implemented

---

## Configuration

### Vite Configuration - `vite.config.ts`

```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",      // IPv6 support
    port: 8080,      // Dev server port (default: 5173)
  },
  plugins: [
    react(),                              // React SWC plugin
    mode === "development" && componentTagger() // Lovable tagging
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias
    },
  },
}));
```

**Key Points:**
- Dev server runs on port **8080** (not default 5173)
- SWC compiler for faster builds
- Lovable component tagging in development mode
- `@/` alias for src imports

### TypeScript Configuration

**Main config** - `tsconfig.json`:
```json
{
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] },
  "noImplicitAny": false,
  "noUnusedParameters": false,
  "skipLibCheck": true,
  "allowJs": true,
  "noUnusedLocals": false,
  "strictNullChecks": false
}
```

**Notes:**
- Relaxed type checking (Lovable AI generated)
- Path aliases enabled
- Allows JS files

### Tailwind Configuration - `tailwind.config.ts`

- **Dark mode:** Class-based (`class` strategy)
- **Content paths:** `src/**/*.{ts,tsx}`
- **Custom colors:** Extended theme with brand colors
- **Custom animations:** 6 custom keyframe animations
- **Plugins:** tailwindcss-animate

### shadcn/ui Configuration - `components.json`

```json
{
  "style": "default",
  "tsx": true,
  "tailwind": {
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

---

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Run dev server (port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server

- **URL:** http://localhost:8080
- **Hot Module Replacement:** Enabled (instant updates)
- **Fast Refresh:** React components update without full reload
- **IPv6 support:** Configured

### Environment

- **Node.js:** Required (install via nvm recommended)
- **Package Manager:** npm
- **Browser Support:** Modern browsers (ES6+)

### File Naming Conventions

- **Components:** PascalCase (`.tsx` files)
- **Utilities:** kebab-case or camelCase (`.ts` files)
- **Styles:** kebab-case (`.css` files)
- **Pages:** PascalCase (`.tsx` files)

### Import Patterns

```typescript
// Absolute imports using @ alias
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Relative imports for same directory
import { NavLink } from "./NavLink";
```

### State Management Approach

**Current:**
- Local component state (`useState`)
- React Router for navigation state
- React Query for future API integration (configured but not used)

**No global state management** (Redux, Zustand, etc.) - not needed for current scope

---

## Future Enhancements

### High Priority

1. **Backend Integration**
   - Build API endpoints for call simulation
   - Integrate real AI models (OpenAI, Anthropic)
   - Implement speech-to-text / text-to-speech
   - Store user sessions and transcripts

2. **User Authentication**
   - Add login/signup flow
   - Implement JWT or session-based auth
   - Protected routes
   - User profiles

3. **Complete Persona System**
   - Activate "Analytical & Skeptical" persona
   - Activate "Timid & Uncertain" persona
   - Different AI prompts per persona
   - Persona-specific feedback

4. **Differentiated Skill Paths**
   - Custom training flows for each skill area
   - Skill-specific scenarios
   - Targeted feedback per skill

### Medium Priority

5. **Analytics Dashboard**
   - Use recharts for data visualization
   - Show performance over time
   - Track improvement metrics
   - Export reports

6. **Dark Mode Toggle**
   - Add theme switcher component
   - Persist user preference (localStorage)
   - Smooth theme transitions

7. **Improved Call Simulation**
   - Real-time transcript streaming
   - Voice activity detection
   - Pause/resume functionality
   - Call recording playback

8. **Enhanced Feedback**
   - Video/audio playback with annotations
   - Specific moment tagging
   - Comparative analysis (vs. top performers)
   - Actionable next steps

### Low Priority

9. **Social Features**
   - Share performance scores
   - Leaderboards
   - Community challenges
   - Peer reviews

10. **Mobile App**
    - React Native version
    - Native speech recognition
    - Offline mode

11. **Gamification**
    - Achievement badges
    - Streak tracking
    - XP/leveling system
    - Challenges

12. **Advanced Analytics**
    - AI-powered insights
    - Predictive scoring
    - Personalized recommendations
    - A/B testing of approaches

---

## File References

### Core Files

- **Entry Point:** `src/main.tsx:5`
- **App Router:** `src/App.tsx:20-29`
- **Design Tokens:** `src/index.css:10-106`
- **Utilities:** `src/lib/utils.ts:4-6`

### Pages

- **Landing:** `src/pages/Index.tsx:6-148`
- **Skill Selection:** `src/pages/TryNow.tsx:6-75`
- **Persona Picker:** `src/pages/PersonaSelection.tsx:6-82`
- **Call Simulation:** `src/pages/CallSimulation.tsx:6-139`
- **Feedback:** `src/pages/Feedback.tsx:6-124`
- **404:** `src/pages/NotFound.tsx:4-24`

### Configuration

- **Vite:** `vite.config.ts:7-18`
- **Tailwind:** `tailwind.config.ts:3-125`
- **TypeScript:** `tsconfig.json:4-15`
- **shadcn:** `components.json:2-20`

---

## Notes for Future Development

### When Integrating Backend

1. Replace hardcoded data in:
   - `CallSimulation.tsx` - transcript lines
   - `Feedback.tsx` - scores array (lines 7-32)
   - `Index.tsx` - testimonials, stats

2. Add environment variables:
   ```bash
   VITE_API_URL=https://api.example.com
   VITE_WS_URL=wss://ws.example.com
   ```

3. Use React Query for API calls:
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['callFeedback', callId],
     queryFn: () => fetchCallFeedback(callId),
   });
   ```

### When Adding Authentication

1. Create auth context provider
2. Add protected route wrapper
3. Redirect logic in `App.tsx`
4. Token storage (localStorage/cookies)
5. Refresh token handling

### When Scaling

1. Consider code splitting with lazy loading:
   ```typescript
   const Feedback = lazy(() => import('./pages/Feedback'));
   ```

2. Add error boundaries for better error handling
3. Implement loading skeletons
4. Add performance monitoring (Web Vitals)

### Accessibility Improvements

- Add skip navigation link
- Ensure color contrast ratios (WCAG AA)
- Add aria-labels to icon-only buttons
- Test with screen readers
- Keyboard navigation audit

---

## Lovable AI Integration

This project was generated using **Lovable AI** and includes:

- **lovable-tagger** plugin for component tracking
- Automatic Git commits on Lovable changes
- Project URL: https://lovable.dev/projects/db80a086-dcba-4b60-a1b5-fc8790686bde
- Synced to GitHub repository

**Editing Options:**
1. Use Lovable web interface (auto-commits)
2. Local development (manual git push)
3. GitHub Codespaces
4. Direct GitHub file editing

---

## Summary

This frontend is a **production-ready prototype** with:
- ✅ Polished UI/UX
- ✅ Responsive design
- ✅ Modern tech stack
- ✅ Scalable architecture
- ✅ Type-safe codebase
- ⚠️ Mock data only (no backend)

**Next Steps:**
1. Build backend API
2. Integrate AI models
3. Implement authentication
4. Add data persistence
5. Deploy to production

---

*Generated by Claude Code for Sell The Pen AI*
*Last Updated: November 15, 2025*
