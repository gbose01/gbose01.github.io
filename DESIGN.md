# Personal Website Design Doc

> Last updated: March 2026

## Overview

Personal portfolio and blog for Gaurab Bose. Built with plain HTML/CSS, hosted on GitHub Pages.

## Structure

```
/
├── index.html          # Home page (hero + featured content)
├── projects.html       # All projects list
├── blog.html          # All blog posts list
├── css/
│   └── *.css          # Stylesheets
├── js/
│   └── *.js           # JavaScript
├── blog/
│   └── *.html         # Individual blog posts
└── projects/
    └── */             # Project-specific pages
```

## Design Decisions

### Why Plain HTML/CSS?

- No build step, no framework overhead
- Easy to edit directly
- Fast load times
- GitHub Pages native support

### Color Scheme

Uses CSS custom properties (see `css/sidebar.css`):
- `--bg`, `--bg-secondary`, `--bg-tertiary`
- `--text`, `--text-muted`
- `--accent`
- `--border`

### Layout

- Grid-template layout on desktop (`1fr 320px` main content + sticky sidebar).
- Dark theme by default.
- Responsive: hides sidebar on mobile viewports.

---

## Premium Design & Interactive System (Implemented May 2026)

### 1. Global Static Capsule Navigation
- **Desktop Viewports (`> 600px`)**: The `.nav-main` header is positioned statically directly underneath the `<p class="hero-statement">` subheader introduction container:
  - CSS: `display: inline-flex; position: relative; margin-top: 0; margin-bottom: 36px; flex-wrap: nowrap;`
  - Styled as an elegant capsule pill containing custom SVG branding icons.
  - Reverted layout paddings back to `60px 24px` (releasing extra top margin buffers) to ensure natural flow.
  - Links utilize an enforced `white-space: nowrap !important;` property to guarantee multi-word titles (such as "Day Job") sit strictly on a single line.
  - Icon colors use theme-sensitive custom property tokens: SKY BLUE (`--icon-projects`), AMBER GOLD (`--icon-job`), MINT GREEN (`--icon-writing`), PURPLE (`--icon-github`), BLUE (`--icon-linkedin`).
- **Mobile Viewports (`< 600px`)**: Automatically transitions to a fixed hamburger menu toggler button on the top-left of the screen, which slides open a full-screen glassmorphic drawer overlay.

### 1.1. Editorial Typography Credentials Layout
- Stripped away visual badge capsule chips and borders entirely to prevent shape overload with the navigation bar.
- Unified primary role (Google Search), work history (Google Cloud, Zillow, PayPal), and academic highlights (Stanford MBA, UChicago BS in Statistics & Economics) into a single, extremely punchy, high-density, and pure typographic line (`.hero-credentials`) directly beneath the navigation capsule.
- Sized text elegantly at `13px` with muted tone (`var(--text-muted)`) and fully consistent custom-styled bold separators (`.divider-dot` at `font-weight: 700`) throughout the line, letting the primary navigation dock capture 100% of visual focus.
- Fine-tuned spacing to avoid whitespace gaps on desktop and mobile: `.hero` bottom padding is reduced to `20px`, and `.hero-credentials` bottom margin is set to `0`, ensuring a perfectly balanced `76px` total vertical gap before the PROJECTS section header text begins.


### 2. Homepage Dual-Mode Project Catalog
The Projects section on the homepage features a segmented toggle control allowing visitors to swap layout modes instantly:
- **Spotlight View (Default)**: Displays visual cards of your top 5 featured projects. We optimized these card layouts to use **minimal vertical height** (padding `15px 18px`, paragraph `margin-bottom: 8px`, tag padding `2px 6px`, links `margin-top: 10px`).
- **Compact Vault View**: A terminal-directory-style grid table (`.compact-directory`) listing all 10+ projects. It features:
  - Columns: Year | Project Title | Core Technologies | Status Badge | Links.
  - Highly dense rows (`11px 16px` padding) with a glowing left-border active highlight transition on hover.
  - Allows visitors to scan the entire portfolio in less than 200px of vertical space.

### 3. Interactive Projects Database (`projects.html`)
- **Dynamic Topic Filter Pills**: Categorises portfolio items into `All`, `AI & ML`, `Developer Tools`, and `Experiments & Games`. Clicking a pill toggles visibility in the DOM instantaneously.
- **Fuzzy Instant Search**: A text input bar (`#project-search`) matching query keys against project titles, description summaries, or technology tag arrays.
- **Keyboard Shortcuts**: Supports native `/` key listener—pressing `/` from anywhere on the page automatically focuses and highlights the search bar input.
- **CSS Animations**: Toggled elements show/hide with a smooth `fadeInRow` CSS keyframe animation (`opacity` fade + `translateY` vertical slide) for maximum premium visual feel.

---

## Content Management

### Adding a New Project

1. Add entry to `projects.html` under `<div class="projects-page-list">` (Ensure you define `data-category="..."` and `data-tags="..."` attributes for search/filter compliance!).
2. Add featured entry card to `index.html` under `#projects-featured-view` (if spotlighting).
3. Add compact row block `<div class="compact-row">` to `index.html` under `#projects-compact-view` to update the compact vault directory.

### Adding a New Blog Post

1. Create `blog/YYYY-MM-DD-title.html`
2. Add entry to `blog.html` (full list)
3. Add featured entry to `index.html` (max 6, show newest first)

### Content Limits (Home Page)

- **Projects**: Show 5 most recent/featured cards in Spotlight mode. Show 10+ in the Compact Vault mode.
- **Blog**: Show 4 most recent
- "Show more" button links to dedicated page

This keeps the home page clean while allowing unlimited content.

## Navigation

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero + featured projects/blogs |
| Projects | `/projects.html` | All projects |
| Blog | `/blog.html` | All blog posts |
| Blog Post | `/blog/title.html` | Individual post |

## Future Improvements Ideas

- [x] Add search to blog/projects (Added search to projects - May 2026)
- [x] Add tag filtering (Added topic filter pills to projects - May 2026)
- [ ] Add search and tags to Blog Index
- [ ] Add RSS feed
- [x] Add dark/light mode toggle (Completed)
- [x] Add loading animations (Added scroll and fade entry animations)

