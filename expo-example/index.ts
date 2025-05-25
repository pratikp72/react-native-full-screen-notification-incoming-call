import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';

import App from '../example/src/App';
import CustomIncomingCall from '../example/src/CustomIncomingCall';
import { IncomingCallAppName } from '../example/src/constants';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

AppRegistry.registerComponent(IncomingCallAppName, () => CustomIncomingCall);
