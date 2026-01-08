# WebXR AR TTRPG

A WebXR-based Augmented Reality game for Android and iOS mobile devices, built with Three.js and Variant Launch.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
WebXR_TTRPG/
├── src/                    # Source code
│   ├── main.js            # Main application logic
│   ├── config.js          # Configuration (Variant Launch toggle)
│   └── style.css          # Styles
├── public/                # Static files
│   └── index.html         # HTML entry point
├── docs/                  # Documentation
│   ├── README.md          # Full documentation
│   ├── CONFIG_GUIDE.md    # Configuration guide
│   ├── DEPLOY.md          # Deployment guide
│   ├── IOS_SETUP.md       # iOS setup instructions
│   ├── ANDROID_SETUP.md   # Android setup instructions
│   └── VARIANT_LAUNCH_INTEGRATION.md
├── dist/                  # Build output (generated)
├── .github/workflows/     # GitHub Actions
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## 🎮 Features

- ✅ WebXR AR support for Android and iOS
- ✅ iOS support via Variant Launch SDK
- ✅ Interactive object placement with hit-testing
- ✅ Mobile-optimized interface
- ✅ Configurable iOS support (save your free launches)

## 📱 Platform Support

| Platform | Browser | Status |
|----------|---------|--------|
| Android | Chrome/Edge | ✅ Native WebXR |
| iOS 14.5+ | Safari | ✅ Via Variant Launch |

## 🔧 Configuration

Toggle iOS support in `src/config.js`:

```javascript
export const config = {
  enableVariantLaunch: true,  // Set to false to disable iOS support
  variantLaunchKey: 'YOUR_KEY',
};
```

See [docs/CONFIG_GUIDE.md](docs/CONFIG_GUIDE.md) for details.

## 🌐 Deployment

**Production URL:** https://johnchoi-sg.github.io/WebXR_TTRPG/

Deploy via GitHub Actions (automatic on push to main):
```bash
git add .
git commit -m "Your changes"
git push
```

See [docs/DEPLOY.md](docs/DEPLOY.md) for more deployment options.

## 📚 Documentation

- [Full Documentation](docs/README.md)
- [Configuration Guide](docs/CONFIG_GUIDE.md)
- [Deployment Guide](docs/DEPLOY.md)
- [iOS Setup](docs/IOS_SETUP.md)
- [Android Setup](docs/ANDROID_SETUP.md)
- [Variant Launch Integration](docs/VARIANT_LAUNCH_INTEGRATION.md)

## 🛠️ Development

### Local Testing

**Android:**
```bash
npm run dev
# Access at: http://YOUR_LOCAL_IP:3000
```

**iOS (requires HTTPS):**
See [docs/IOS_SETUP.md](docs/IOS_SETUP.md) for SSL setup.

### Building

```bash
npm run build
```

Output goes to `dist/` folder.

## 📦 Dependencies

- **Three.js** - 3D graphics library
- **Vite** - Build tool and dev server
- **Variant Launch** - iOS WebXR support

## 📄 License

MIT License

## 🆘 Support

For issues or questions, see the documentation in the `docs/` folder.
