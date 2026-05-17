import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { setupTrackPlayer } from './src/trackPlayerService';
import { requestAllPermissions } from './src/utils/permissions';
import { logger } from './src/utils/logger';
import { logConfig } from './src/config';

function AppInitializer() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Log configuration
        logConfig();
        
        logger.info('Initializing application...');

        // Request permissions
        const permissions = await requestAllPermissions();
        logger.info('Permissions requested', permissions);

        // Setup track player
        await setupTrackPlayer();

        logger.info('Application initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize application', error);
      }
    };

    initializeApp();
  }, []);

  return <AppNavigator />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppInitializer />
        <StatusBar barStyle="light-content" />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}