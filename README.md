# WebXR AR TTRPG Game

A WebXR-based Augmented Reality game template for Android and iOS mobile devices, built with Three.js and Variant Launch.

## Features

- ✨ WebXR AR support for Android and iOS devices
- 📱 Mobile-optimized interface
- 🎮 Interactive object placement using hit-testing
- 🎲 Example game objects (dice) with animations
- 🔄 Real-time AR rendering with Three.js
- 🍎 iOS support via Variant Launch SDK

## Requirements

### Android
- **Android device** with ARCore support
- **Chrome** or **Edge** browser (version 90+)

### iOS
- **iOS 14.5+** device
- **Safari** browser or Variant Launch Viewer app
- Variant Launch SDK (already integrated)

### General
- **HTTPS connection** (required for WebXR)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The server will start with HTTPS enabled on port 3000.

### 3. Access on Mobile Device

#### Option A: Using Local Network (Recommended for Testing)

1. Find your computer's local IP address:
   - **Windows**: Run `ipconfig` in PowerShell
   - **Mac/Linux**: Run `ifconfig` or `ip addr`

2. On your Android device, open Chrome and navigate to:
   ```
   https://YOUR_LOCAL_IP:3000
   ```
   Example: `https://192.168.1.100:3000`

3. Accept the security warning (self-signed certificate)

#### Option B: Using ngrok or Similar Service

1. Install ngrok: https://ngrok.com/
2. Run: `ngrok http 3000`
3. Use the HTTPS URL provided by ngrok on your mobile device

#### Option C: Deploy to Production

Build and deploy to any HTTPS-enabled hosting service:

```bash
npm run build
```

Deploy the `dist/` folder to:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any other static hosting service

## How to Use

1. Open the app on your Android device
2. Grant camera permissions when prompted
3. Tap the **START AR** button
4. Point your camera at a flat surface (floor, table, etc.)
5. Wait for the green reticle to appear
6. Tap the screen to place objects
7. Objects will rotate automatically

## Project Structure

```
WebXR_TTRPG/
├── index.html          # Main HTML file
├── main.js             # Three.js application logic
├── style.css           # Styling
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Customization

### Adding New Game Objects

Edit the `createGameObject()` function in `main.js`:

```javascript
function createGameObject() {
    // Replace with your custom 3D models or geometries
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ 
        color: Math.random() * 0xffffff 
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
```

### Importing 3D Models

Install GLTFLoader:

```bash
npm install three
```

Then in `main.js`:

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('path/to/model.gltf', (gltf) => {
    scene.add(gltf.scene);
});
```

### Styling

Modify `style.css` to customize the UI appearance.

## Troubleshooting

### "AR not supported on this device"

- Ensure your Android device supports ARCore
- Check ARCore supported devices: https://developers.google.com/ar/devices
- Update Chrome to the latest version

### "WebXR not available"

- Make sure you're accessing the site via HTTPS
- Check that you're using Chrome or Edge browser
- Verify WebXR is enabled in `chrome://flags`

### Camera permission denied

- Go to Chrome Settings → Site Settings → Camera
- Allow camera access for your site

### Reticle not appearing

- Ensure good lighting conditions
- Point camera at a flat, textured surface
- Move the device slowly to help ARCore detect surfaces

## Browser Compatibility

| Browser | Android | iOS |
|---------|---------|-----|
| Chrome  | ✅ Yes  | ❌ No |
| Edge    | ✅ Yes  | ❌ No |
| Safari  | N/A     | ✅ Yes (via Variant Launch) |
| Firefox | ⚠️ Experimental | ❌ No |

**Note**: iOS support is enabled through the [Variant Launch SDK](https://launch.variant3d.com/docs/), which provides WebXR compatibility on iOS devices running iOS 14.5+.

## Resources

- [WebXR Device API](https://immersiveweb.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [WebXR Samples](https://immersive-web.github.io/webxr-samples/)

## License

MIT License - feel free to use this template for your projects!

## Next Steps

- Add game logic and mechanics
- Implement multiplayer functionality
- Add 3D character models
- Create interactive UI elements
- Add sound effects and music
- Implement save/load functionality
- Add gesture controls

Happy coding! 🎮✨
