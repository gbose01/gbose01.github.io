# Gaurab Bose — Minimalist Portfolio

A minimal, text-focused portfolio. Clean, fast, and focused on content over design.

## Design Philosophy

- **Text-first**: Content is the hero, not design
- **Minimal visual noise**: Ultra-clean typography, plenty of white space
- **Fast**: No frameworks, dependencies, or complex JavaScript
- **Readable**: Focus on legibility and hierarchy
- **Responsive**: Works perfectly on mobile, tablet, and desktop

## Structure

```
portfolio/
├── index.html           # Single-page HTML (minimal ~320 lines)
├── css/
│   └── style.min.css    # Minified CSS (~3KB)
├── js/
│   └── app.min.js       # Minimal JS (~350 bytes)
└── assets/
    └── profile.jpg      # Profile photo (optional)
```

## Color Palette

- **Dark:** `#2D3748` (text)
- **Light:** `#FAFAFA` (background)
- **Primary:** `#4A90E2` (links, accents)
- **Accent:** `#48BB78` (dates, secondary)

Used sparingly for maximum impact.

## Features

- ✅ Semantic HTML
- ✅ Mobile-first responsive design
- ✅ No CSS frameworks or build tools
- ✅ Minimal JavaScript (smooth scrolling only)
- ✅ Fast load times
- ✅ GitHub Pages ready
- ✅ SEO optimized

## Sections

1. **Hero/Intro**: Name, current role, brief bio
2. **Projects**: List of notable work with descriptions
3. **Blog**: Recent articles with dates
4. **Footer**: Contact and social links

## Development

No build step needed. Just edit `index.html`, `css/style.min.css`, and `js/app.min.js` directly.

### Local Testing

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

### Customization

1. Update name, role, and bio in `index.html`
2. Add/edit projects and blog posts
3. Update social links in footer
4. Modify colors in CSS (search for color values)
5. Add profile photo to `assets/profile.jpg` if desired

## Performance

- **Minified CSS**: ~3KB
- **Minified JS**: ~350 bytes
- **Total page size**: <10KB (without images)
- **Load time**: <100ms on modern networks

## Deployment

Perfect for GitHub Pages. No configuration needed.

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Done!

---

Built with HTML, CSS, and a little JavaScript. That's it.
