module.exports = {
  name: 'RoastArena',
  slug: 'roast-arena',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './mobile/assets/icon.png',
  userInterfaceStyle: 'dark',
  splash: {
    image: './mobile/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.roastarena.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './mobile/assets/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    package: 'com.roastarena.app',
  },
  web: {
    favicon: './mobile/assets/favicon.png',
  },
  plugins: ['expo-router'],
  scheme: 'roastarena',
  extra: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}
