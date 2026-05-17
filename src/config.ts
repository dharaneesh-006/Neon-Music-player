import { Platform } from 'react-native';

const isDevelopment = __DEV__;

interface AppConfig {
  isDevelopment: boolean;
  apiUrl: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableCrashReporting: boolean;
  platform: 'ios' | 'android' | 'web';
  version: string;
}

const config: AppConfig = {
  isDevelopment,
  apiUrl: isDevelopment ? 'http://localhost:8000' : 'https://api.example.com',
  logLevel: isDevelopment ? 'debug' : 'warn',
  enableCrashReporting: !isDevelopment,
  platform: Platform.OS as any,
  version: '1.0.0',
};

export function getConfig(): AppConfig {
  return config;
}

export function logConfig() {
  if (isDevelopment) {
    console.log('[CONFIG]', {
      isDevelopment: config.isDevelopment,
      platform: config.platform,
      version: config.version,
      logLevel: config.logLevel,
    });
  }
}

export default config;
