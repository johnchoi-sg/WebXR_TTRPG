# iOS Setup Guide with Variant Launch

This app uses [Variant Launch](https://launch.variant3d.com/docs/) to enable WebXR on iOS devices.

## How It Works

Variant Launch provides a WebXR polyfill for iOS that allows your AR experience to run on Safari and iOS devices. When an iOS user visits your site, they'll be prompted to open the experience in the Variant Launch Viewer app, which provides full WebXR support.

## Requirements

- **iOS 14.5 or later**
- **Safari browser** (or Variant Launch Viewer app)
- **Internet connection** for first-time setup

## For iOS Users

### First Time Setup

1. **Visit the site** on your iOS device:
   - Production: `https://johnchoi-sg.github.io/WebXR_TTRPG/`
   - Or scan the QR code from your Variant Launch dashboard

2. **Install Variant Launch Viewer** (if prompted):
   - You'll see a prompt to install the Variant Launch Viewer app
   - Tap "Install" or "Open in App Store"
   - Install the free Variant Launch Viewer app
   - Return to your site

3. **Launch AR Experience**:
   - Tap "START AR" button
   - Grant camera permissions when prompted
   - Point at a flat surface and tap to place objects

### Subsequent Visits

After the first setup, the experience will automatically open in the Variant Launch Viewer when you visit the URL.

## For Developers

### Authorized Domains

Your Variant Launch project has these authorized domains:
- `johnchoi-sg.github.io` (production)
- `192.168.x.x` (local network testing)
- `localhost` (local development)

### Testing on iOS

#### Option 1: Use Production URL
The easiest way to test is to deploy to GitHub Pages and access via:
`https://johnchoi-sg.github.io/WebXR_TTRPG/`

#### Option 2: Local Testing (Requires SSL)
For local development on iOS, you need HTTPS:

1. **Generate SSL certificate** (one-time setup):
   ```bash
   # Install mkcert
   choco install mkcert  # Windows
   # or
   brew install mkcert   # Mac
   
   # Generate certificate
   mkcert -install
   mkcert localhost 192.168.x.x
   ```

2. **Update vite.config.js**:
   ```javascript
   import { defineConfig } from 'vite';
   import fs from 'fs';
   
   export default defineConfig({
     server: {
       host: true,
       port: 3000,
       https: {
         key: fs.readFileSync('./localhost+1-key.pem'),
         cert: fs.readFileSync('./localhost+1.pem'),
       },
     },
   });
   ```

3. **Add your local IP** to Variant Launch authorized domains:
   - Go to: https://launch.variant3d.com/
   - Add your local IP (e.g., `192.168.7.114`)

4. **Access from iOS**:
   - Visit `https://YOUR_LOCAL_IP:3000`

### SDK Integration

The Variant Launch SDK is already integrated in `index.html`:

```html
<script src="https://launchar.app/sdk/v1?key=QThcf5w5xXfLziijsLzTXBbQIqLomAB8&redirect=true"></script>
```

This script:
- Detects iOS devices
- Provides WebXR polyfill
- Handles automatic redirect to Launch Viewer
- Enables `navigator.xr` API on iOS

### Launch URLs and QR Codes

Variant Launch provides special URLs that automatically open in the viewer:

**Your Launch URL:**
`https://johnchoi-sg.github.io/WebXR_TTRPG/`

You can also generate QR codes from the [Variant Launch dashboard](https://launch.variant3d.com/) that users can scan to instantly launch the AR experience.

## Troubleshooting

### "No camera feed visible"
- Make sure you granted camera permissions
- Try closing and reopening the Launch Viewer app
- Check that your iOS version is 14.5 or later

### "Domain not authorized"
- Make sure your domain is added to the authorized domains list in your Variant Launch dashboard
- For local testing, add your local IP address

### "AR not starting"
- Ensure you have good lighting
- Point at a flat, textured surface
- Move your device slowly to help iOS detect surfaces

### "App keeps redirecting"
If you're stuck in a redirect loop:
- Clear Safari cache and cookies
- Reinstall the Variant Launch Viewer app
- Make sure the `redirect=true` parameter is in the SDK script

## Resources

- [Variant Launch Documentation](https://launch.variant3d.com/docs/)
- [Variant Launch Dashboard](https://launch.variant3d.com/)
- [WebXR Device API](https://immersiveweb.dev/)
- [iOS Launch Viewer App](https://apps.apple.com/app/variant-launch/id1607993266)

## Usage Limits

Your Variant Launch plan includes:
- **3000 launches per month** (Developer plan)
- Unlimited authorized domains
- Full WebXR API support

Monitor your usage at: https://launch.variant3d.com/

## Support

For Variant Launch specific issues:
- Email: [email protected]
- Discord: [Variant Launch Discord](https://discord.gg/variant3d)

For general WebXR issues, see the main README.md
