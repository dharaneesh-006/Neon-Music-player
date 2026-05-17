import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { logger } from '../utils/logger';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import QueueScreen from '../screens/QueueScreen';
import {View, Text, Pressable} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
      id="MainStack"
    >
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Queue" component={QueueScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent() {
  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{color: '#fff', fontSize: 18, marginBottom: 20, fontWeight: '700'}}>
        Neon Music
      </Text>
      <Pressable onPress={() => logger.debug('Offline Library pressed')}>
        <Text style={{color: '#ccc', paddingVertical: 10}}>Offline Library</Text>
      </Pressable>
      <Pressable onPress={() => logger.debug('Online Library pressed')}>
        <Text style={{color: '#ccc', paddingVertical: 10}}>Online Library</Text>
      </Pressable>
      <Pressable onPress={() => logger.debug('Settings pressed')}>
        <Text style={{color: '#ccc', paddingVertical: 10}}>Settings</Text>
      </Pressable>
      <Pressable onPress={() => logger.debug('About pressed')}>
        <Text style={{color: '#ccc', paddingVertical: 10}}>About</Text>
      </Pressable>
    </View>
  );
}

export default function AppNavigator() {
  const navigationRef = React.useRef(null);

  const onNavigationStateChange = (state: any) => {
    logger.debug('Navigation state changed', {
      routeName: state?.routes[0]?.name,
    });
  };

  return (
    <NavigationContainer 
      ref={navigationRef}
      onStateChange={onNavigationStateChange}
    >
      <Drawer.Navigator
        id="DrawerNavigator"
        drawerContent={() => <CustomDrawerContent />}
        screenOptions={{headerShown: false}}
      >
        <Drawer.Screen name="Home" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
