import TrackPlayer, {Capability} from 'react-native-track-player';
import { logger } from './utils/logger';

let isSetup = false;

export async function setupTrackPlayer() {
  if (isSetup) {
    logger.debug('TrackPlayer already setup');
    return;
  }

  try {
    logger.info('Setting up TrackPlayer...');
    
    // Setup player
    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    isSetup = true;
    logger.info('TrackPlayer setup completed successfully');
  } catch (e) {
    logger.error('TrackPlayer setup error', e);
  }
}

export async function addTracksToQueue(tracks: any[]) {
  try {
    await TrackPlayer.add(tracks);
    logger.info(`Added ${tracks.length} tracks to queue`);
  } catch (e) {
    logger.error('Failed to add tracks to queue', e);
  }
}

export async function playTrack() {
  try {
    await TrackPlayer.play();
    logger.debug('Playing track');
  } catch (e) {
    logger.error('Failed to play track', e);
  }
}

export async function pauseTrack() {
  try {
    await TrackPlayer.pause();
    logger.debug('Paused track');
  } catch (e) {
    logger.error('Failed to pause track', e);
  }
}

export async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
    logger.debug('Skipped to next track');
  } catch (e) {
    logger.error('Failed to skip to next track', e);
  }
}

export async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
    logger.debug('Skipped to previous track');
  } catch (e) {
    logger.error('Failed to skip to previous track', e);
  }
}

export default TrackPlayer;
