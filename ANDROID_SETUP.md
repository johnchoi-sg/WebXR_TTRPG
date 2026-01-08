# Android Testing Setup Guide

## The SSL Certificate Issue

Chrome on Android is strict about HTTPS certificates. Here are your options:

## ✅ Option 1: Bypass Certificate Warning (Easiest)

1. On your Android tablet, open Chrome
2. Navigate to: `https://192.168.7.114:3000/`
3. You'll see "This site can't provide a secure connection"
4. **Type "thisisunsafe"** directly on the error page (no text box will appear, just type it)
   - This is a hidden Chrome command
   - The page will reload and work!

## ✅ Option 2: Use Chrome Flags (One-time setup)

1. On your Android tablet, open Chrome
2. Navigate to: `chrome://flags/#allow-insecure-localhost`
3. Enable "Allow invalid certificates for resources loaded from localhost"
4. Restart Chrome
5. Now access: `https://192.168.7.114:3000/`

## ✅ Option 3: Use ngrok (Best for remote testing)

1. Install ngrok: https://ngrok.com/download
2. Run in a new terminal:
   ```bash
   ngrok http 3000
   ```
3. Use the HTTPS URL provided by ngrok (e.g., `https://abc123.ngrok.io`)
4. Access this URL from your Android tablet

## ✅ Option 4: Use HTTP with Chrome Override (Development only)

**Note:** WebXR requires HTTPS, but you can test with HTTP using Chrome flags:

1. On Android Chrome, go to: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Add: `http://192.168.7.114:3000`
3. Enable the flag
4. Restart Chrome
5. Change `vite.config.js` to use `https: false`

## Current Server Info

Your dev server is running at:
- **Local:** https://localhost:3000/
- **Network:** https://192.168.7.114:3000/

## Recommended: Option 1 (Type "thisisunsafe")

This is the quickest way to test without installing additional tools!
