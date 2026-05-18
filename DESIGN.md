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
- Top margin buffer: desktop pages (`.layout`) utilize a `100px` top padding gutter to ensure floating fixed header elements sit perfectly in the margins on page load without covering content or page titles.
- Dark theme by default.
- Responsive: hides sidebar on mobile viewports.

---

## Premium Design & Interactive System (Implemented May 2026)

### 1. Global Floating Sticky Capsule Navigation
- **Desktop Viewports (`> 600px`)**: The `.nav-main` header is rendered as a floating capsule sticky dock centered at the top of the viewport:
  - CSS: `position: fixed; top: 24px; left: 50%; transform: translateX(-50%); z-index: 1000;`
  - Styled as a high-fidelity capsule pill with a 16px backdrop blur filter and semi-transparent theme-sensitive backgrounds (Dark: `rgba(17, 17, 24, 0.75)`, Light: `rgba(242, 239, 233, 0.85)`).
  - Icon colors use theme-sensitive custom property tokens: SKY BLUE (`--icon-projects`), AMBER GOLD (`--icon-job`), MINT GREEN (`--icon-writing`), PURPLE (`--icon-github`), BLUE (`--icon-linkedin`).
- **Mobile Viewports (`< 600px`)**: Automatically transitions to a fixed hamburger menu toggler button on the top-left of the screen, which slides open a full-screen glassmorphic drawer overlay.

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

