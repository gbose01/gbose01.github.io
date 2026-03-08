# Customization Guide

This portfolio is intentionally simple. Customize it by editing the HTML and CSS directly.

## Quick Start

### 1. Update Your Info

Edit `index.html`:

```html
<h1>Your Name</h1>
<p class="subtitle">Your current role / what you do</p>

<div class="bio">
    <p>Your bio here (2-3 sentences)</p>
    <p>Links to organizations, projects, etc.</p>
</div>
```

### 2. Update Navigation Links

Edit the navigation in the hero section:

```html
<nav class="nav-main">
    <a href="#projects">Projects</a>
    <a href="#blog">Blog</a>
    <a href="https://your-github-url">GitHub</a>
    <!-- Add more links as needed -->
</nav>
```

### 3. Add Your Projects

Replace the example projects in the "Projects" section:

```html
<article class="project">
    <h3><a href="https://link-to-project.com" class="link">Project Name</a></h3>
    <p>Brief description of what the project does.</p>
    <span class="meta">Tag 1 • Tag 2 • Tag 3</span>
</article>
```

### 4. Update Blog Posts

Add blog posts to the "Blog" section:

```html
<article class="blog-item">
    <div class="blog-header">
        <h3><a href="/blog/post-slug" class="link">Post Title</a></h3>
        <time datetime="2026-03-08">March 8, 2026</time>
    </div>
    <p>Brief excerpt about the post.</p>
</article>
```

### 5. Update Footer

Change email and social links:

```html
<p class="footer-email">your-email@example.com</p>
<nav class="social-links">
    <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" title="GitHub">GitHub</a>
    <!-- Add more social links -->
</nav>
```

## Styling

Edit `css/style.min.css` to adjust colors, fonts, spacing, etc.

### Main Variables to Change

```css
/* Colors */
color: #2D3748;       /* Dark text */
background: #FAFAFA;  /* Light background */
color: #4A90E2;       /* Primary blue (links) */
color: #48BB78;       /* Green (dates) */

/* Sizing */
max-width: 680px;     /* Container width */
font-size: 15px;      /* Body text */
```

### Typography

The portfolio uses the system font stack with "Inter" as the fallback:

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

To use a different font, update the `<link>` in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update the CSS:

```css
font-family: "Your Font", sans-serif;
```

## Adding a Profile Photo

1. Save your photo as `assets/profile.jpg` (optional)
2. (Currently not displayed in minimalist version, but you can add it if desired)

## Removing Sections

To remove a section (e.g., Blog), simply delete the entire `<section>` element from `index.html`.

## Testing Changes

Use Python to test locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` and refresh to see changes.

## Deployment

Commit and push your changes to GitHub. GitHub Pages will automatically deploy your portfolio.

---

The beauty of this design is its simplicity. Keep it minimal and focused on content.
