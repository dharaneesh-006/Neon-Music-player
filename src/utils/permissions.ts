import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { logger } from './logger';

export async function requestAudioPermission(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      logger.debug('Requesting Android audio permission');
      
      // Try for newer API (Android 13+) first
      let permission: any = PERMISSIONS.ANDROID.READ_MEDIA_AUDIO;
      
      // Check if available, fallback to older permission
      try {
        const status = await check(permission);
        if (status === RESULTS.UNAVAILABLE) {
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }
      } catch (e) {
        logger.warn('Permission check failed, falling back', e);
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }

      const status = await check(permission);
      
      if (status === RESULTS.GRANTED) {
        logger.info('Audio permission already granted');
        return true;
      }

      if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          logger.info('Audio permission granted by user');
          return true;
        } else {
          logger.warn('Audio permission denied by user', {status: result});
          return false;
        }
      }

      return false;
    }

    // iOS passes permissions through app.json plist
    logger.debug('iOS permissions handled through build config');
    return true;
  } catch (e) {
    logger.error('Error requesting audio permission', e);
    return false;
  }
}

export async function requestAllPermissions(): Promise<{[key: string]: boolean}> {
  try {
    const audioPermission = await requestAudioPermission();
    
    return {
      audio: audioPermission,
    };
  } catch (e) {
    logger.error('Error requesting all permissions', e);
    return {
      audio: false,
    };
  }
}

