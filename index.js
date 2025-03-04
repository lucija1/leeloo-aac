import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from 'react-native';
import App from './App';

// This is the proper way to register the main component
AppRegistry.registerComponent('main', () => App);

// For Expo
registerRootComponent(App);

// Additional setup for web (if needed)
if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}