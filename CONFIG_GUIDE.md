# Configuration Guide

## Variant Launch Toggle

You can enable or disable Variant Launch iOS support to save your free monthly launches.

### Location

Edit `config.js`:

```javascript
export const config = {
  // Enable Variant Launch for iOS support
  // Set to false to save your 3000 free monthly launches
  // When disabled: Only Android WebXR will work, iOS will not be supported
  enableVariantLaunch: true,  // Change to false to disable
  
  // Variant Launch SDK Key (only used if enableVariantLaunch is true)
  variantLaunchKey: 'QThcf5w5xXfLziijsLzTXBbQIqLomAB8',
};
```

## Usage

### Enable iOS Support (Default)

```javascript
enableVariantLaunch: true
```

**What happens:**
- ✅ iOS devices can use AR via Variant Launch
- ✅ Android devices work natively
- ⚠️ Uses your Variant Launch monthly quota (3000 launches/month)

**When to use:**
- Production deployments
- Testing on iOS devices
- When you want maximum compatibility

---

### Disable iOS Support (Save Launches)

```javascript
enableVariantLaunch: false
```

**What happens:**
- ❌ iOS devices will NOT work (shows error message)
- ✅ Android devices still work natively
- ✅ Saves your Variant Launch monthly quota
- ✅ No Variant Launch SDK loaded

**When to use:**
- Development/testing on Android only
- When you want to conserve your free launches
- When you don't need iOS support temporarily

---

## How It Works

1. **HTML (`index.html`):**
   - Checks `config.enableVariantLaunch`
   - Conditionally loads Variant Launch SDK script
   - Only loads if `true`

2. **JavaScript (`main.js`):**
   - Imports config
   - Skips Variant Launch event listeners if disabled
   - Shows appropriate error messages

3. **Build Process:**
   - Config is bundled with your app
   - Change takes effect after rebuild and deploy

---

## Deployment Workflow

### For Production (iOS + Android)

1. Set `enableVariantLaunch: true` in `config.js`
2. Build and deploy:
   ```bash
   npm run build
   git add .
   git commit -m "Enable iOS support"
   git push
   ```

### For Development (Android Only)

1. Set `enableVariantLaunch: false` in `config.js`
2. Build and test:
   ```bash
   npm run build
   npm run dev
   ```
3. Test on Android device at `http://YOUR_IP:3000`

### Switching Back

1. Change flag back to `true`
2. Rebuild and deploy

---

## Monitoring Usage

Check your Variant Launch usage at:
https://launch.variant3d.com/

**Your Plan:**
- 3000 launches per month (Developer plan)
- Resets monthly
- Each iOS user session = 1 launch

**Tips to Save Launches:**
- Disable during development
- Only enable for production releases
- Test on Android when possible

---

## Error Messages

### When Enabled (`true`)
- "AR not supported on this device"
- "Requires Android (ARCore) or iOS 14.5+ device"

### When Disabled (`false`)
- "AR not supported on this device"
- "Requires Android device with ARCore support"
- "(iOS support disabled in config)"

---

## Console Logs

### When Enabled
```
Variant Launch SDK enabled
Variant Launch initialized: {...}
iOS device detected - Variant Launch required
```

### When Disabled
```
Variant Launch SDK disabled - iOS support not available
Variant Launch disabled in config
```

---

## Quick Reference

| Setting | iOS | Android | Launches Used |
|---------|-----|---------|---------------|
| `true` | ✅ Works | ✅ Works | Yes (iOS only) |
| `false` | ❌ Disabled | ✅ Works | No |

---

## Notes

- Changes require rebuild (`npm run build`)
- Config is client-side (users can see it)
- Android WebXR always works regardless of setting
- Local development doesn't use Variant Launch quota
