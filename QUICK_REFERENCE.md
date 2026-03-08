# Quick Reference

## File Structure

```
portfolio/
├── index.html              # Main page
├── css/style.min.css       # All styles (minified)
├── js/app.min.js           # Smooth scrolling only
├── README.md               # Overview
├── CUSTOMIZATION.md        # How to edit
├── DEPLOYMENT.md           # How to deploy
└── QUICK_REFERENCE.md      # This file
```

## Common Tasks

### Change Your Name

Edit `index.html` line 22:
```html
<h1>Your Name Here</h1>
```

### Change Your Title

Edit `index.html` line 23:
```html
<p class="subtitle">Your title or role</p>
```

### Update Social Links

Edit footer in `index.html`:
```html
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://twitter.com/yourusername">Twitter</a>
```

### Add a Project

Add to the projects section:
```html
<article class="project">
    <h3><a href="#" class="link">Project Name</a></h3>
    <p>What it does.</p>
    <span class="meta">Tech • Tags</span>
</article>
```

### Add a Blog Post

Add to the blog section:
```html
<article class="blog-item">
    <div class="blog-header">
        <h3><a href="#" class="link">Post Title</a></h3>
        <time datetime="2026-03-08">March 8, 2026</time>
    </div>
    <p>Post preview text.</p>
</article>
```

### Change Colors

Edit `css/style.min.css`:
- `#2D3748` = dark text
- `#FAFAFA` = light background
- `#4A90E2` = blue links
- `#48BB78` = green accents

### Change Container Width

Edit `css/style.min.css`:
```css
.container {
    max-width: 680px;  /* Change this */
}
```

### Add a Font

1. Add to `index.html` head:
```html
<link href="https://fonts.googleapis.com/css2?family=FontName:wght@400;600;700&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
font-family: "Font Name", sans-serif;
```

## Testing Locally

```bash
# Python 3 (recommended)
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then visit: http://localhost:8000
```

## Deployment

### GitHub Pages
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```
Visit: `https://yourusername.github.io`

### Other Hosts
See `DEPLOYMENT.md`

## Performance

Current stats:
- **HTML**: ~6.5KB
- **CSS**: ~3KB
- **JS**: ~350 bytes
- **Total**: ~10KB (no images)
- **Load time**: <100ms

## Tips

✓ Keep bios short (2-3 sentences max)
✓ Use clear project names
✓ Link to actual projects
✓ Keep blog posts in reverse chronological order
✓ Test on mobile before deploying
✓ Commit your changes often

---

That's everything you need. The portfolio is intentionally minimal — focus on content, not design.
