# Okyru

Okyru is a React Native desk-break timer app with a custom animated splash, circular countdown timer, and settings screen for break interval configuration.

![Okyru App](./src/assets/logos/logo.png)

## Current Features

- Splash screen with Rive animation.
- Main countdown timer screen with custom circular progress UI.
- Settings screen to change timer interval (saved in AsyncStorage).
- SVG icon system and themed gradient background.

## Tech Stack

- React Native `0.73.x`
- React `18`
- TypeScript
- React Navigation (native stack)
- Jest + ESLint

## Prerequisites

- Node.js `>=18`
- npm
- React Native Android/iOS environment set up:
  https://reactnative.dev/docs/environment-setup

### Android JDK requirement

For this repo/toolchain, Android builds are expected to run with JDK 17.

PowerShell example:

```powershell
$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-17.0.2.8-hotspot'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
```

## Setup

```bash
npm install
```

## Run

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

## Quality Checks

Lint:

```bash
npm run lint
```

Tests:

```bash
npm test -- --watchAll=false
```

Type check:

```bash
npx tsc --noEmit
```

## Notes

- Release signing secrets must not be committed. Inject signing values from local machine or CI secrets.
- Some legacy/placeholder UI still exists and is being modernized incrementally.
