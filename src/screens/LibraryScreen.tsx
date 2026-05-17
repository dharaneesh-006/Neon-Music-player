import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Animated, Pressable} from 'react-native';
import {THEME} from '../theme';
import SongItem from '../components/SongItem';
import MiniPlayer from '../components/MiniPlayer';
import { logger } from '../utils/logger';

type Track = {id: string; title: string; artist?: string; path?: string; duration?: string};

function groupByAlpha(list: Track[]) {
  const map: Record<string, Track[]> = {};
  list.forEach((t) => {
    const k = (t.title || ' ').charAt(0).toUpperCase() || '#';
    const key = /[A-Z]/.test(k) ? k : '#';
    if (!map[key]) map[key] = [];
    map[key].push(t);
  });
  const sections = Object.keys(map).sort().map((k) => ({title: k, data: map[k]}));
  return sections;
}

export default function LibraryScreen({navigation}: any) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        setIsLoading(true);
        logger.info('Loading library tracks...');
        
        // Expo Go fallback sample tracks (native file scanning is disabled here)
        const sample = Array.from({length: 26}).map((_, i) => ({
          id: String(i), 
          title: String.fromCharCode(65 + i) + ' Song', 
          artist: 'Artist ' + i, 
          duration: '3:2' + (i%10)
        }));
        
        setTracks(sample);
        setSections(groupByAlpha(sample));
        logger.info(`Loaded ${sample.length} tracks`);
      } catch (error) {
        logger.error('Failed to load tracks', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTracks();
  }, []);

  function onScroll() {
    setShowScrollbar(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setShowScrollbar(false), 900);
  }

  const onSelectTrack = (track: Track) => {
    try {
      logger.debug('Track selected', {trackId: track.id, title: track.title});
      navigation.navigate('Player', {track});
    } catch (error) {
      logger.error('Failed to navigate to player', error);
    }
  };

  const onOpenDrawer = () => {
    try {
      navigation.openDrawer();
    } catch (error) {
      logger.error('Failed to open drawer', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onOpenDrawer}>
          <Text style={styles.headerButton}>☰</Text>
        </Pressable>
        <Text style={styles.title}>Neon Music Player</Text>
        <Pressable>
          <Text style={styles.headerButton}>🔍</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading library...</Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({item}) => (
            <View>
              <Text style={styles.sectionHeader}>{item.title}</Text>
              {item.data.map((t: Track) => (
                <SongItem 
                  key={t.id} 
                  title={t.title} 
                  artist={t.artist} 
                  duration={t.duration} 
                  onPress={() => onSelectTrack(t)}
                />
              ))}
            </View>
          )}
        />
      )}

      {showScrollbar && (
        <Animated.View style={styles.alphaBar} pointerEvents="none">
          <Text style={{color: '#fff', fontSize: 12}}>A B C ... Z</Text>
        </Animated.View>
      )}

      <MiniPlayer 
        title={tracks[0]?.title} 
        artist={tracks[0]?.artist} 
        onPress={() => onSelectTrack(tracks[0])} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: THEME.background},
  header: {height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16},
  title: {color: THEME.text, fontSize: 18, fontWeight: '800'},
  headerButton: {color: THEME.neonPink, fontSize: 20},
  sectionHeader: {color: '#7D7D95', paddingHorizontal: 16, paddingTop: 12, fontWeight: '700'},
  alphaBar: {position: 'absolute', right: 8, top: 120, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 8},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {color: THEME.text, fontSize: 16},
});
