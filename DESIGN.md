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

- Single column, centered content (max-width: 800px)
- Dark theme by default
- Responsive: hides sidebar on mobile

## Content Management

### Adding a New Project

1. Add entry to `projects.html` (full list)
2. Add featured entry to `index.html` (max 6, show newest first)
3. Link to GitHub repo or project page

### Adding a New Blog Post

1. Create `blog/YYYY-MM-DD-title.html`
2. Add entry to `blog.html` (full list)
3. Add featured entry to `index.html` (max 6, show newest first)

### Content Limits (Home Page)

- **Projects**: Show 6 most recent/featured
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

- [ ] Add search to blog/projects
- [ ] Add tag filtering
- [ ] Add RSS feed
- [ ] Add dark/light mode toggle
- [ ] Add loading animations
- [ ] Add more project detail pages (currently mostly GitHub links)
