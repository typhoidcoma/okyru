# Okyru

Okyru is a desk-break timer app that keeps you moving throughout the day. Set a timer, pick your exercises, and get to work. When the timer ends, it's time to get up and move — check off each exercise as you complete it, then the timer resets for the next round.

![Okyru App](./src/assets/logos/logo.png)

## How It Works

1. **Pick your exercises** in the Settings screen (25 exercises to choose from).
2. **Set your timer** (1–30 minutes) — this is your work period.
3. **Start the timer** and get back to work.
4. **Timer ends** — time to move! The app shows your exercise checklist.
5. **Do each exercise** and check it off in the app.
6. **Next round** — the timer resets and the loop continues.

Each session is saved automatically. View your daily and weekly stats to track your progress.

## Features

- Circular countdown timer with animated progress ring
- 25 exercise icons with multi-select in Settings
- Exercise checklist modal when timer completes
- Automatic session saving with daily/weekly stats
- Splash screen with Rive animation
- FlatDark themed UI with gradient backgrounds

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
