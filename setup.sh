#!/bin/bash

# Neon Music Player - USB Debugging Setup Script
# This script sets up your environment for USB debugging with Expo

echo "🎵 Neon Music Player - USB Debugging Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Check if adb is installed (for Android)
if ! command -v adb &> /dev/null; then
    echo "⚠️  ADB (Android Debug Bridge) not found."
    echo "   For Android USB debugging, install Android SDK Platform Tools."
    echo "   https://developer.android.com/studio/command-line/adb"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps for USB Debugging:"
echo "=============================="
echo ""
echo "Android with USB Cable:"
echo "  1. Connect your phone via USB"
echo "  2. Enable USB Debugging in phone settings"
echo "     Settings → Developer Options → USB Debugging"
echo "  3. Run: npm run android:usb"
echo "  4. Scan QR code with Expo Go app"
echo ""
echo "iOS (macOS only):"
echo "  1. Connect your phone via USB"
echo "  2. Run: npm run ios"
echo ""
echo "WiFi Debugging (Android):"
echo "  adb tcpip 5555"
echo "  adb connect <your-device-ip>:5555"
echo "  npm run android:usb"
echo ""
echo "For more help, see USB_DEBUGGING_GUIDE.md"
echo ""
