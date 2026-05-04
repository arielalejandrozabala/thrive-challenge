Practical Exercise – Dashboard Tabs with React Query

## 🚀 Live Demo

**[View Live Demo →](https://thrive-challenge-az.vercel.app/)**

---

🧩 Goal

Build a small Next.js page that contains:
- 2 tabs
  - Characters
  - Locations
- Each tab fetches data from the Rick & Morty API  
  https://rickandmortyapi.com/documentation
- Display a simple styled card per item (no pagination required)
- Avoid unnecessary refetching when switching tabs

This exercise is meant to simulate a small feature inside a dashboard-style application.

⸻

⚙️ Technical Stack

Please use:
- Next.js (pages router)
- TypeScript
- styled-components
- Axios
- @tanstack/react-query (v5)

⸻

📄 Functional Requirements

1. Tabs
   - Two tabs: Characters and Locations
   - Switching tabs should:
     - Not reload the page
     - Not refetch data if it was already loaded

Keep the UI simple — we are not evaluating design skills.

⸻

3. Character Tab

Fetch from:

```
GET https://rickandmortyapi.com/api/character
```

Display a simple card per character showing:
- Image
- Name
- Status
- Species

⸻

3. Locations Tab

Fetch from:

```
GET https://rickandmortyapi.com/api/location
```

Display a simple card per location showing:
- Name
- Type

⸻

🎨 Styling
- Use styled-components
- Keep styles simple
- No need for responsiveness, animations, or advanced layout

⸻

🧠 What We’re Evaluating

This is not about perfection or pixel accuracy. We would like to understand your thinking and how you work.

You don’t need to overengineer the solution.

Keep it clean, readable, and maintainable.

⸻

🚫 What Is Not Required
- No pagination
- No filtering
- No authentication

⸻

📦 Deliverables

Please provide: 1. A Git repository (public or shared access) 2. A short section in this README explaining: 3. Any tradeoffs you made 4. What you would improve if this were production code

⸻

🤖 AI Usage Disclosure

You are allowed to use AI tools.

If you used any AI tool during development, please specify in this README:
- Which tool you used (e.g., ChatGPT, Copilot, etc.)
- For what purpose (e.g., scaffolding, debugging, typing interfaces, etc.)
- Why you chose to use it

We are not judging AI usage negatively.
We want transparency and to understand how you integrate tools into your workflow.

⸻

⏱ Time Expectation

Please don’t spend excessive time polishing details.
We are more interested in how you approach the problem than in a perfect final result.

⸻

💬 Notes

If any requirement is unclear, make reasonable assumptions and document them in this README.

Clarity of thinking is more important than completeness.


---


---

## 📝 Implementation & Tradeoffs

### Key Assumptions

**Pagination**: Since not required, we fetch only the first page (~20 results). Sufficient for the challenge scope.

**Rendering Strategy**: Client-Side Rendering (CSR) with React Query
- Evaluated SSR/SSG/ISR but they solve server-side caching, not client-side tab switching
- Requirement: "avoid refetch when switching tabs" → client-side caching problem
- React Query with `staleTime: Infinity` is the right tool for this job

### Architecture Highlights

- **API Layer**: Centralized in `services/api.ts` with custom `ApiError` class
- **Logging**: Custom logger ready for Sentry/DataDog integration
- **Type Safety**: Union types where it matters (`CharacterStatus`), pragmatic `string` for variable fields
- **Components**: Barrel exports, separated presentation from data-fetching
- **Accessibility**: ARIA roles, descriptive alt text, semantic HTML (no over-engineered keyboard nav)
- **Messages**: Centralized in `constants/messages.ts` (ready for i18n migration)

### What's Intentionally NOT Included

| Feature | Status | Reason |
|---------|--------|--------|
| **Testing** | ❌ | Architecture is test-ready, but tests are overkill for a challenge |
| **Performance opts** | ❌ | Dataset is small (~20 items), React Query already caches |
| **Monitoring** | ❌ | Logger is ready for Sentry/DataDog when needed |
| **i18n** | ❌ | Constants are sufficient, easy to migrate later |
| **Pagination** | ❌ | Not required per spec |
| **Memoization** | ❌ | Premature optimization for simple components |

### Production Roadmap

**Immediate** (if deploying today):
- **Error Tracking**: Sentry integration in logger
- **Testing**: Jest + React Testing Library for critical paths
- **CI/CD**: GitHub Actions for linting, type-checking, tests
- **Environment Variables**: Move API URL to `.env`

**If Scaling** (100+ items, high traffic):
- **Pagination**: Infinite scroll or "load more" functionality
- **Search & Filters**: Filter by name, status, species
- **Performance**: 
  - Virtualization for large lists (react-window)
  - Image optimization (Next.js Image component)
  - Code splitting for tabs
- **Monitoring**: DataDog/New Relic for performance metrics
- **API Caching**: Server-side caching (Next.js ISR/API routes) to reduce external API calls
- **Error Handling**: Retry logic and fallbacks for external API failures

**If Team Grows** (multiple developers):
- **Storybook**: Component documentation and visual testing
- **Husky**: Pre-commit hooks for linting and type-checking
- **Conventional Commits**: Standardize commit messages
- **ADRs**: Document architectural decisions
- **Design System**: Shared component library

---

## 🤖 AI Collaboration Process

**Tool**: Claude (Anthropic) via Kiro IDE

### Iterative Development

1. **Initial Scaffold** → Basic structure with SSR styling issues
2. **Fix Render** → Added `ServerStyleSheet`, but introduced `hasVisitedLocations` flag (code smell)
3. **Refactor** → Separated tabs into components, removed flag
4. **API Layer** → Centralized fetch logic in `services/api.ts`
5. **Error Handling** → Custom logger + `ApiError` class with user-friendly messages

### Key Decisions (Human-Driven)

- **No Generic Tab Component**: Only 2 tabs, abstraction added more complexity than value
- **No Performance Opts**: Premature optimization for small dataset
- **No Complex Keyboard Nav**: Screen readers handle it, custom handlers were over-engineering
- **Pragmatic Types**: Union types only where used in logic, not for display-only fields
- **No i18n**: Constants sufficient for challenge, easy to migrate

### Manual Adjustments

- Image sizing (300x300 square, not 200px height)
- React Query `staleTime: Infinity`
- Global styles via `createGlobalStyle` (not JSX in _document)
- Barrel exports for cleaner imports
- Cleanup: unused files, SVGs, empty folders

### What Worked Well

✅ Rapid scaffolding and boilerplate  
✅ Real-time architectural discussions  
✅ Identifying code smells early  

### Where Human Judgment Was Critical

🧠 Deciding when NOT to optimize  
🧠 Recognizing over-engineering  
🧠 Balancing pragmatism vs best practices  
🧠 Scope management for a challenge  

---

## 🏃 Getting Started

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm start        # Run production build
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── components/
│   ├── CharacterCard/      # Character display
│   ├── LocationCard/       # Location display
│   ├── CharactersTab/      # Characters data + display
│   ├── LocationsTab/       # Locations data + display
│   ├── Grid/               # Shared grid styles
│   └── Tabs/               # Tab UI components
├── constants/
│   └── messages.ts         # Centralized UI messages
├── pages/
│   ├── _app.tsx           # React Query provider
│   ├── _document.tsx      # styled-components SSR
│   └── index.tsx          # Main page with tabs
├── services/
│   ├── api.ts             # API layer + error handling
│   └── logger.ts          # Custom logging system
├── styles/
│   └── GlobalStyles.ts    # Global styles
└── types/
    └── api.ts             # TypeScript definitions
```
