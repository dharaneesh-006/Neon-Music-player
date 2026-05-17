import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {THEME} from '../theme';

export default function MiniPlayer({title, artist, onPress}: {title?: string; artist?: string; onPress?: () => void}) {
  return (
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.image} />
      <View style={{flex: 1, marginLeft: 12}}>
        <Text style={styles.title} numberOfLines={1}>{title || 'Not Playing'}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist || ''}</Text>
      </View>
      <View style={{width: 56, alignItems: 'center'}}>
        <View style={styles.playButton} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 14,
    height: 66,
    backgroundColor: THEME.glass,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    shadowColor: THEME.neonPurple,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {width: 50, height: 50, borderRadius: 10},
  title: {color: THEME.text, fontWeight: '700'},
  artist: {color: '#BFC0D6', fontSize: 12, marginTop: 2},
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.neonCyan,
    opacity: 0.95,
  },
});
