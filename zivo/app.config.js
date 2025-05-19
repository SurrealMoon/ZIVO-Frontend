import 'dotenv/config';

export default ({ config }) => {

  return {
    ...config,
    name: 'zivo',
    slug: 'zivo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.nidaaca.zivo',
    },

    android: {
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
      ],
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.nidaaca.zivo',

      // 👇 Google Maps API Key buraya eklendi:
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-secure-store',
      'expo-maps',
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      eas: {
        projectId: '73f679f4-03cb-4026-9ea0-17aab9c54c4a',
      },
    },

    updates: {
      url: 'https://u.expo.dev/73f679f4-03cb-4026-9ea0-17aab9c54c4a',
    },

    runtimeVersion: '1.0.0',
  };
};
