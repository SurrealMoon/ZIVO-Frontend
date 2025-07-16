# ZIVO-Frontend

This repository contains the frontend of the **ZIVO** mobile application. It is built using **React Native** with **Expo** and follows a modular architecture. It includes features like user authentication, file uploads via presigned URLs, profile management, multi-language support, and reusable component structure.

## 🚀 Features

- User login & logout
- Profile management
- File uploads (via presigned URLs)
- Multi-language support (i18n)
- File-based routing (with expo-router)
- Modular, scalable architecture

## 🛠️ Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **NativeWind** (Tailwind CSS for React Native)
- **Zustand** (or Context API) for state management
- **react-i18next** for localization
- **expo-router** for navigation
- **EAS** (Expo Application Services) configuration

## 📁 Folder Structure

```
zivo/
├── app/              # File-based routing (pages)
├── components/       # Reusable UI components
├── services/         # API layer and helper methods
├── schemas/          # Validation schemas (e.g. Zod or Yup)
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup
├── utils/            # Utility functions
├── scripts/          # CLI and automation scripts
└── assets/           # Static assets (images, icons, etc.)
```

## ⚙️ Getting Started

To run the project locally:

```bash
npm install
npx expo start
```

You can launch the project using:
- Expo Go (on your device)
- Android/iOS emulator
- Development build via EAS

## 📄 License

This project is **not open source**. All rights reserved © 2025 Mehmet Yıldırım. See [LICENSE.txt](./LICENSE.txt) for more details.
