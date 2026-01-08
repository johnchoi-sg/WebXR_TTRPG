# Variant Launch Integration Summary

## ✅ What's Been Integrated

Your WebXR AR TTRPG app now has full iOS support via [Variant Launch](https://launch.variant3d.com/docs/using-the-sdk).

### 1. SDK Integration

**Location:** `index.html` (line 9)

```html
<script src="https://launchar.app/sdk/v1?key=QThcf5w5xXfLziijsLzTXBbQIqLomAB8&redirect=true"></script>
```

**What it does:**
- Automatically detects iOS devices
- Provides WebXR polyfill for iOS
- Redirects iOS users to Variant Launch Viewer
- Enables full WebXR API support on iOS 14.5+

### 2. Event Listeners

**Location:** `main.js` (lines 15-54)

#### Initialization Event
Listens for `vlaunch-initialized` to detect when Variant Launch is ready:
```javascript
window.addEventListener('vlaunch-initialized', (event) => {
    if (event.detail.launchRequired) {
        // iOS device detected
    }
});
```

#### Tracking Quality Monitoring
Listens for `vlaunch-ar-tracking` to monitor ARKit tracking quality:
```javascript
document.addEventListener('vlaunch-ar-tracking', (event) => {
    // Handles: normal, limited-excessive-motion, limited-initializing,
    // limited-insufficient-features, limited-relocalizing, not-available
});
```

### 3. Enhanced Session Configuration

**Location:** `main.js` (lines 165-177)

```javascript
const sessionInit = {
    requiredFeatures: ['hit-test'],
    optionalFeatures: ['dom-overlay', 'anchors'],
    domOverlay: { root: document.body }
};
```

Includes:
- `hit-test` for surface detection
- `anchors` for stable object placement (iOS)
- `dom-overlay` for UI elements
- Error handling for session failures

### 4. Reference Space

Uses `local` reference space as recommended by Variant Launch:
```javascript
renderer.xr.setReferenceSpaceType('local');
```

## 🎯 How It Works

### For Android Users
1. Visit site → Chrome detects WebXR → Tap "START AR" → AR starts immediately

### For iOS Users
1. Visit site → Variant Launch SDK detects iOS
2. Auto-redirect to Launch Card (QR code page)
3. User taps "Open" → Variant Launch Viewer opens
4. User returns to site with WebXR enabled
5. Tap "START AR" → AR starts in Launch Viewer

## 📱 Supported Platforms

| Platform | Browser | Status |
|----------|---------|--------|
| Android | Chrome/Edge | ✅ Native WebXR |
| iOS 14.5+ | Safari | ✅ Via Variant Launch |
| iOS 14.5+ | Launch Viewer | ✅ Full WebXR |
| Desktop | Any | ❌ AR not available |

## 🔑 Your Configuration

**SDK Key:** `QThcf5w5xXfLziijsLzTXBbQIqLomAB8`

**Authorized Domains:**
- `johnchoi-sg.github.io` ✅
- `192.168.x.x` ✅ (local network)
- `localhost` ✅ (local dev)

**Plan Limits:**
- 3000 launches/month (Developer plan)
- Unlimited domains

**Dashboard:** https://launch.variant3d.com/

## 🚀 Testing

### Production (iOS + Android)
Visit: `https://johnchoi-sg.github.io/WebXR_TTRPG/`

### Local Testing (Android only)
```bash
npm run dev
# Visit: http://YOUR_LOCAL_IP:3000
```

### Local Testing (iOS)
Requires HTTPS - see `IOS_SETUP.md` for SSL certificate setup

## 📊 Monitoring

Check your usage at: https://launch.variant3d.com/

The dashboard shows:
- Total launches this month
- iOS launches
- Lifetime launches
- Authorized domains

## 🔍 Debugging

### Check Console Logs
The app logs Variant Launch events:
```
Variant Launch initialized: {launchRequired: true, webXRStatus: 'launch-required', ...}
iOS device detected - Variant Launch required
AR Tracking state: normal
```

### Tracking States
Monitor AR quality in console:
- `normal` - Everything working
- `limited-excessive-motion` - Move slower
- `limited-insufficient-features` - Need more detail in view
- `limited-initializing` - Starting up
- `limited-relocalizing` - Recovering tracking

## 📚 Resources

- [Variant Launch SDK Guide](https://launch.variant3d.com/docs/using-the-sdk)
- [iOS Setup Guide](./IOS_SETUP.md)
- [Android Setup Guide](./ANDROID_SETUP.md)
- [Deployment Guide](./DEPLOY.md)

## 🎮 Next Steps

1. **Deploy to GitHub Pages:**
   ```bash
   git add .
   git commit -m "Add Variant Launch iOS support"
   git push
   ```

2. **Test on iOS device:**
   - Visit your GitHub Pages URL
   - Follow Launch Viewer prompts
   - Test AR functionality

3. **Monitor usage:**
   - Check dashboard for launch counts
   - Stay within 3000 launches/month limit

4. **Customize experience:**
   - Add tracking quality UI prompts
   - Customize Launch Card appearance
   - Add game-specific features

## ⚠️ Important Notes

- **Auto-redirect enabled:** iOS users are immediately redirected to Launch Card
- **First-time setup:** Users need to install Launch Viewer app (one-time)
- **HTTPS required:** Production must use HTTPS (GitHub Pages does this automatically)
- **Domain authorization:** New domains must be added to Variant Launch dashboard

## 🆘 Support

**Variant Launch Issues:**
- Email: [email protected]
- Discord: https://discord.gg/variant3d

**General WebXR Issues:**
- See main README.md
- Check browser console for errors
