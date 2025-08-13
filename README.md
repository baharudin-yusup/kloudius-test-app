# KloudiusTestApp

A modern React Native authentication boilerplate featuring a clean UI, modular feature-based architecture, and production-ready patterns.

  

-----

## ✨ Demo

A quick look at the user authentication flow, from the landing screen to the user profile.

https://github.com/user-attachments/assets/3763b797-1e93-411c-b65e-858cbb2925d6

## Overview

KloudiusTestApp is a React Native application designed to serve as a high-quality template for a production-style authentication flow. It demonstrates a modern UI, a scalable feature-based architecture, and best practices for state management and navigation in a mobile app.

## 🎯 Features

  - **🔐 Authentication**

      - Login & Register forms with real-time, client-side validation.
      - Smooth bottom sheet UI for forms with keyboard-aware handling.
      - "Try Demo Account" button for instant access with pre-filled credentials.
      - Visual password strength indicator during registration.

  - **🧭 Navigation**

      - Conditional stack navigator: `AuthStack` for unauthenticated users and `MainTabs` for logged-in users.
      - Bottom tab navigator for the main app interface (Home & Profile).

  - **👤 User Profile**

      - View current user details.
      - Seamlessly edit and save full name.
      - Secure logout functionality.

  - **🎨 Theming & UI**

      - Centralized design system (`lightTheme`) with tokens for colors, spacing, typography, and shadows.
      - A library of reusable base components (`Button`, `TextInput`) and composite components (`TabSelector`, `PasswordStrengthIndicator`, `Checkbox`).

  - **🛠️ Services & Storage**

      - Mock authentication service that mimics a real backend API.
      - Type-safe `AsyncStorage` wrapper for reliable local data persistence.

## 💻 Tech Stack

  - **Core**: [React Native](https://reactnative.dev/) `0.80` & [React](https://react.dev/) `19`
  - **Navigation**: [React Navigation 7](https://reactnavigation.org/) (Stack & Bottom Tabs)
  - **UI**: [Gorhom Bottom Sheet](https://gorhom.github.io/react-native-bottom-sheet/)
  - **Local Storage**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
  - **Tooling**: TypeScript, ESLint, Prettier

## 📂 Project Structure

The `src` directory is organized by feature, promoting scalability and separation of concerns.

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components (primitives and composites)
├── config/          # Centralized theme, constants, and configuration
├── features/        # Feature-based modules (the core of the app)
│   ├── auth/        # Authentication screens, hooks, services, types
│   ├── home/        # Home screen module
│   └── profile/     # Profile screen module
├── navigation/      # Navigators, routes, and helpers
├── providers/       # Global context providers (e.g., AuthProvider)
└── utils/           # Shared utilities (storage, validation helpers)
```

## 🚀 Getting Started

### Prerequisites

  - [Node.js](https://nodejs.org/) `>= 18`
  - A correctly configured React Native development environment for your OS.
      - Follow the **official setup guide**: [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### 🛠️ Installation & Setup

1.  **Clone the repository and install dependencies:**

    ```sh
    git clone https://github.com/your-username/KloudiusTestApp.git
    cd KloudiusTestApp
    npm install
    ```

2.  **Install iOS Dependencies (iOS only):**

    ```sh
    cd ios
    bundle install
    bundle exec pod install
    cd ..
    ```

3.  **Start the Metro bundler:**

    ```sh
    npm start
    ```

4.  **Run the application on your target platform:**

    ```sh
    # For Android
    npm run android

    # For iOS
    npm run ios
    ```

## 👨‍💻 Demo Account

For quick access, use the "Try Demo Account" button on the login screen, or enter the credentials manually:

  - **Email**: `demo@example.com`
  - **Password**: `password123`

## 🧠 Architectural Principles

  - **Modularity**: Code is organized into features (`src/features/*`), making it easy to add, remove, or modify parts of the application independently.
  - **Centralized Design**: The `lightTheme` object in `src/config/theme.ts` is the single source of truth for all design tokens. Avoid hard-coded styles.
  - **Barrel Exports**: Index files (`index.ts`) are used extensively to simplify import statements and create clean module entry points.
  - **Service Abstraction**: Functionality like local storage is wrapped in a dedicated service (`storageService`) to provide a consistent, type-safe API and make it easily replaceable.