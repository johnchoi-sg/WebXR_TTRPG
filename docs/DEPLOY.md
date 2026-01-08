# GitHub Pages Deployment Guide

## Quick Deploy (Manual)

### Option 1: Using GitHub Desktop or Git

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Commit and push everything:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

3. **Enable GitHub Pages:**
   - Go to your repo on GitHub: `https://github.com/YOUR_USERNAME/WebXR_TTRPG`
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Wait for the action to complete (check the **Actions** tab)

4. **Access your app:**
   - URL: `https://YOUR_USERNAME.github.io/WebXR_TTRPG/`

---

## Option 2: Manual Deployment (if Actions don't work)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push to gh-pages branch:**
   ```bash
   git add dist -f
   git commit -m "Deploy"
   git subtree push --prefix dist origin gh-pages
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / (root)

---

## Troubleshooting "Stuck on Initializing"

### Check Browser Console
1. Open the deployed site on your Android
2. Open Chrome DevTools (if possible) or check desktop first
3. Look for errors in the console

### Common Issues:

1. **Wrong base path in vite.config.js:**
   - Make sure `base: '/WebXR_TTRPG/'` matches your repo name exactly

2. **HTTPS issues:**
   - GitHub Pages uses HTTPS automatically (good for WebXR!)
   - Make sure you're accessing via HTTPS

3. **WebXR not supported:**
   - Only works on Android Chrome/Edge with ARCore support
   - Won't work on desktop or iOS Safari

4. **Check if build succeeded:**
   - Look in the **Actions** tab on GitHub
   - Make sure the workflow completed successfully

---

## Testing Locally Before Deploy

```bash
npm run build
npm run preview
```

This will serve the built files locally to test before deploying.

---

## Current Configuration

- **Base URL:** `/WebXR_TTRPG/`
- **Build Output:** `dist/`
- **Auto-deploy:** Enabled via GitHub Actions (on push to main)

Your app should be available at:
**https://YOUR_USERNAME.github.io/WebXR_TTRPG/**
