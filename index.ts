import { registerRootComponent } from 'expo';

// import App from './App';
import App from './src/screens/authentication/login/login';
import HomeScreen from './src/screens/home/Home';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(HomeScreen);
