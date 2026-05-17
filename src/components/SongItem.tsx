import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {THEME} from '../theme';

type Props = {
  title: string;
  artist?: string;
  duration?: string;
  active?: boolean;
  onPress?: () => void;
};

export default function SongItem({title, artist, duration, active, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.container, pressed && {opacity: 0.7}]}>
      <View style={[styles.imageWrap, active && styles.activeBorder]}>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.artist}>{artist || 'Unknown Artist'}</Text>
      </View>
      <Text style={styles.duration}>{duration || '0:00'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: THEME.card,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  imageWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)'
  },
  image: {width: '100%', height: '100%'},
  placeholder: {flex: 1, backgroundColor: 'rgba(255,255,255,0.06)'},
  meta: {flex: 1},
  title: {color: THEME.text, fontSize: 15, fontWeight: '600'},
  artist: {color: '#BFC0D6', fontSize: 12, marginTop: 4},
  duration: {color: '#BBB', width: 48, textAlign: 'right'},
  activeBorder: {
    shadowColor: THEME.neonPink,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 12,
    borderColor: THEME.neonPink,
  },
});
