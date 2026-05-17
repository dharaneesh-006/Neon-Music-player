import React, { useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {THEME} from '../theme';
import { logger } from '../utils/logger';

const sample = Array.from({length: 8}).map((_, i) => ({id: String(i), title: 'Queued ' + i, artist: 'Artist'}));

export default function QueueScreen({navigation}: any) {
  useEffect(() => {
    logger.debug('QueueScreen opened');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
          logger.debug('Back pressed from queue');
          navigation?.goBack?.();
        }}>
          <Text style={styles.headerButton}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Queue</Text>
        <View style={{width: 50}} />
      </View>

      <Text style={styles.heading}>Now Playing</Text>
      <View style={styles.nowPlaying}>
        <Text style={{color: THEME.text, fontSize: 14}}>No track currently playing</Text>
      </View>
      
      <View style={{height: 20}} />
      
      <Text style={styles.heading}>Up Next</Text>
      <FlatList 
        data={sample} 
        keyExtractor={s => s.id}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <Pressable style={styles.item} onPress={() => logger.debug('Queue item pressed', {id: item.id})}>
            <Text style={{color: THEME.text, fontWeight: '500'}}>{index + 1}. {item.title}</Text>
            <Text style={{color: '#888', fontSize: 12, marginTop: 2}}>{item.artist}</Text>
          </Pressable>
        )} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: THEME.background, padding: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerButton: {
    color: THEME.neonPink,
    fontWeight: '700',
  },
  headerTitle: {
    color: THEME.text,
    fontSize: 18,
    fontWeight: '800',
  },
  heading: {color: THEME.neonPurple, fontWeight: '800', marginBottom: 8},
  nowPlaying: {height: 80, backgroundColor: THEME.card, borderRadius: 12, alignItems: 'center', justifyContent: 'center'},
  item: {padding: 12, backgroundColor: THEME.card, marginVertical: 6, borderRadius: 12}
});
