# Deployment Guide

## GitHub Pages (Recommended)

The simplest way to deploy. No setup, no build step, no cost.

### Setup

1. Create a GitHub repository named `<your-username>.github.io`

2. Clone it locally:
```bash
git clone https://github.com/<your-username>/<your-username>.github.io.git
```

3. Copy your portfolio files to the repository:
```bash
cp -r portfolio/* <your-username>.github.io/
```

4. Commit and push:
```bash
cd <your-username>.github.io
git add .
git commit -m "Initial commit"
git push origin main
```

5. Visit `https://<your-username>.github.io` — done!

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the root of your repository:
```
your-domain.com
```

2. In your domain registrar, point your domain to GitHub's nameservers:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. GitHub Pages will automatically enable HTTPS (takes a few minutes)

## Other Hosting

### Netlify

Free tier available, automatic deployments from Git.

1. Push your code to GitHub
2. Sign up at [netlify.com](https://netlify.com)
3. Connect your GitHub repository
4. Netlify auto-deploys on every push

### Vercel

Another great option with automatic deployments.

1. Push to GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel handles the rest

### Manual Hosting

If you have a VPS or traditional web hosting:

1. Build the site locally (no build step needed)
2. FTP/SSH the files to your server
3. Point your domain to your server

## Performance Tips

✓ All files are already minified
✓ CSS is small (~3KB)
✓ JavaScript is minimal (~350 bytes)
✓ No external dependencies or frameworks
✓ Images are optional

## Updating Content

1. Edit `index.html`, CSS, or JS locally
2. Test with `python -m http.server 8000`
3. Commit and push
4. Your site updates automatically (within seconds)

---

That's it. Your portfolio is live and blazing fast.
