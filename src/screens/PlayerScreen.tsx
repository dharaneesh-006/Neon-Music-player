import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {THEME} from '../theme';
import { logger } from '../utils/logger';

export default function PlayerScreen({route, navigation}: any) {
  const track = route.params?.track;

  useEffect(() => {
    if (track) {
      logger.debug('PlayerScreen loaded with track', {
        trackId: track.id,
        title: track.title,
      });
    }
  }, [track]);

  const handleBack = () => {
    try {
      logger.debug('Navigating back from player');
      navigation.goBack();
    } catch (error) {
      logger.error('Failed to navigate back', error);
    }
  };

  const handlePlayPause = () => {
    logger.debug('Play/pause toggled');
    // Will be implemented with actual track player
  };

  const handleSkipPrevious = () => {
    logger.debug('Skip previous pressed');
    // Will be implemented with actual track player
  };

  const handleSkipNext = () => {
    logger.debug('Skip next pressed');
    // Will be implemented with actual track player
  };

  return (
    <View style={styles.container}>
      <Pressable style={{position: 'absolute', left: 16, top: 48, zIndex: 1}} onPress={handleBack}>
        <Text style={{color: THEME.neonPink, fontWeight: '700'}}>Back</Text>
      </Pressable>
      
      <View style={styles.center}>
        <View style={styles.art} />
        <Text style={styles.title} numberOfLines={2}>{track?.title || 'No Track'}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track?.artist || 'Unknown Artist'}</Text>
      </View>

      <View style={styles.controls}>
        <Text style={{color: '#999', fontSize: 12}}>00:00</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Pressable onPress={handleSkipPrevious}>
            <Text style={{color: THEME.neonCyan, marginHorizontal: 24, fontSize: 18}}>◄◄</Text>
          </Pressable>
          <Pressable onPress={handlePlayPause}>
            <Text style={{color: THEME.neonPink, fontSize: 32}}>▶︎</Text>
          </Pressable>
          <Pressable onPress={handleSkipNext}>
            <Text style={{color: THEME.neonCyan, marginHorizontal: 24, fontSize: 18}}>►►</Text>
          </Pressable>
        </View>
        <Text style={{color: '#999', fontSize: 12}}>{track?.duration || '03:24'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: THEME.background, paddingTop: 40},
  center: {alignItems: 'center', marginTop: 40},
  art: {width: 300, height: 300, borderRadius: 20, marginBottom: 24, backgroundColor: THEME.card},
  title: {color: THEME.text, fontSize: 22, fontWeight: '800', textAlign: 'center', paddingHorizontal: 16},
  artist: {color: '#BFC0D6', marginTop: 8, fontSize: 14},
  controls: {position: 'absolute', bottom: 120, left: 0, right: 0, alignItems: 'center'},
});
