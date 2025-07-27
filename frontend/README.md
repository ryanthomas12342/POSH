# POSH App - React Native

A React Native application for Prevention of Sexual Harassment (POSH) awareness and reporting.

## Features

- **Welcome Screen**: Landing page with motivational messaging
- **What is POSH**: Information about POSH and its purpose
- **Login Screen**: User authentication with 3D security illustration
- **Signup Screen**: New user registration with form validation

## Screens

1. **Welcome Screen** (`/welcome`): 
   - Motivational text: "Be Aware. Be Empowered. Be Safe."
   - "Learn About POSH" button
   - Login button
   - Create account link

2. **What is POSH** (`/what-is-posh`):
   - Definition and explanation of POSH
   - Navigation bar with icons

3. **Login Screen** (`/login`):
   - 3D security illustration
   - Username and password fields
   - Link to signup

4. **Signup Screen** (`/signup`):
   - 3D security illustration
   - Name, password, and phone number fields
   - Link to login

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your phone (for testing)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on specific platform:
   - **Expo Go (Recommended)**: Scan QR code with Expo Go app
   - iOS Simulator: `npm run ios`
   - Android Emulator: `npm run android`
   - Web: `npm run web`

### Testing with Expo Go

1. Install Expo Go on your phone from App Store/Play Store
2. Run `npm start` in the terminal
3. Scan the QR code with Expo Go app
4. The app will load directly on your device

### Troubleshooting

If you encounter errors:

1. **Clear cache and restart**:
   ```bash
   npx expo start --clear
   ```

2. **Reset Metro bundler**:
   ```bash
   npx expo start --reset-cache
   ```

3. **Check Expo Go compatibility**:
   - Ensure all dependencies are compatible with Expo Go
   - Avoid using native modules not supported by Expo Go

4. **Common issues**:
   - ENOENT errors are usually harmless and don't affect functionality
   - Shadow style warnings are cosmetic and don't break the app
   - If the app doesn't load, try restarting Expo Go app

## Project Structure

```
frontend/
├── app/
│   ├── index.tsx              # Redirects to welcome screen
│   ├── welcome.tsx            # Welcome/landing screen
│   ├── what-is-posh.tsx       # POSH information screen
│   ├── login.tsx              # Login screen
│   ├── signup.tsx             # Signup screen
│   └── _layout.tsx            # Root layout with navigation
├── components/
│   └── SecurityIllustration.tsx  # Reusable 3D illustration
├── constants/
│   └── Colors.ts              # Color definitions
└── assets/                    # Images and fonts
```

## Design Features

- **Cross-platform compatibility**: Works on both iOS and Android
- **Responsive design**: Adapts to different screen sizes
- **Platform-specific fonts**: Uses appropriate fonts for each platform
- **Safe area handling**: Properly handles device notches and status bars
- **Touch-friendly**: All interactive elements are properly sized for touch

## Navigation

The app uses Expo Router for navigation with the following flow:
- Welcome → Learn About POSH → What is POSH
- Welcome → Login → Signup
- Welcome → Create Account → Signup

## Styling

- Uses React Native StyleSheet for consistent styling
- Platform-specific adjustments for iOS and Android
- Color scheme matches the provided UI designs
- Typography uses system fonts for optimal readability

## Development

To modify the app:

1. Edit the screen files in the `app/` directory
2. Update the `SecurityIllustration` component for the 3D illustration
3. Modify colors in `constants/Colors.ts`
4. Add new screens by creating files in the `app/` directory and updating `_layout.tsx`

## Building for Production

1. Install EAS CLI:
   ```bash
   npm install -g @expo/eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build for platforms:
   ```bash
   eas build --platform ios
   eas build --platform android
   ```
