import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import CustomIncomingCall from './src/CustomIncomingCall';
import { IncomingCallAppName } from './src/constants';

AppRegistry.registerComponent(IncomingCallAppName, () => CustomIncomingCall);
AppRegistry.registerComponent(appName, () => App);
