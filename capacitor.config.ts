
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.nutritrack.app',
  appName: 'NutriTrack',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://25a715f9-0666-4ec1-987d-b4077352119e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
