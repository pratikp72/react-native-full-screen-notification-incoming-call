import { assignStylesValue } from '@expo/config-plugins/build/android/Styles';
import {
  type ConfigPlugin,
  AndroidConfig,
  withAndroidManifest,
  withAndroidStyles,
} from '@expo/config-plugins';

import type { ManifestApplication } from '@expo/config-plugins/build/android/Manifest';

const addManifestActivity = (
  app: AndroidConfig.Manifest.ManifestApplication,
  newActivity: AndroidConfig.Manifest.ManifestActivity
) => {
  if (!Array.isArray(app.activity)) app.activity = [];

  if (
    !app.activity.find(
      (item) => item.$['android:name'] === newActivity.$['android:name']
    )
  ) {
    app.activity.push(newActivity);
  }
};

const addManifestService = (
  app: AndroidConfig.Manifest.ManifestApplication,
  newService: NonNullable<ManifestApplication['service']>[number]
) => {
  if (!Array.isArray(app.service)) app.service = [];

  if (
    !app.service.find(
      (item) => item.$['android:name'] === newService.$['android:name']
    )
  ) {
    app.service.push(newService);
  }
};

type Props =
  | {
      statusBarColor: string;
    }
  | undefined;

const withFullScreenNotificationIncomingCall: ConfigPlugin<Props> = (
  config,
  props
) => {
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.CALL_PHONE',
    'android.permission.DISABLE_KEYGUARD',
    'android.permission.FOREGROUND_SERVICE',
    'android.permission.FOREGROUND_SERVICE_PHONE_CALL',
    'android.permission.MANAGE_OWN_CALLS',
    'android.permission.POST_NOTIFICATIONS',
    'android.permission.USE_FULL_SCREEN_INTENT',
    'android.permission.VIBRATE',
    'android.permission.WAKE_LOCK',
  ]);

  config = withAndroidStyles(config, (innerConfig) => {
    innerConfig.modResults = assignStylesValue(innerConfig.modResults, {
      add: true,
      parent: {
        name: 'incomingCall',
        parent: 'Theme.AppCompat.Light.NoActionBar',
      },
      name: 'colorPrimaryDark',
      value: props?.statusBarColor ?? '#000000',
    });
    return innerConfig;
  });

  config = withAndroidManifest(config, (innerConfig) => {
    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(
      innerConfig.modResults
    );

    addManifestActivity(app, {
      $: {
        'android:name':
          'com.reactnativefullscreennotificationincomingcall.IncomingCallActivity',
        'android:theme': '@style/incomingCall',
        'android:launchMode': 'singleTask',
        'android:excludeFromRecents': 'true',
        'android:exported': 'false',
        'android:showWhenLocked': 'true',
        'android:turnScreenOn': 'true',
      },
    });

    addManifestActivity(app, {
      $: {
        'android:name':
          'com.reactnativefullscreennotificationincomingcall.NotificationReceiverActivity',
        'android:theme': '@style/incomingCall',
        'android:launchMode': 'singleTask',
        'android:excludeFromRecents': 'true',
        'android:exported': 'false',
        'android:showWhenLocked': 'true',
        'android:turnScreenOn': 'true',
      },
    });

    addManifestService(app, {
      $: {
        'android:name':
          'com.reactnativefullscreennotificationincomingcall.IncomingCallService',
        'android:enabled': 'true',
        // @ts-ignore
        'android:stopWithTask': 'false',
        'android:foregroundServiceType': 'phoneCall',
        'android:exported': 'false',
      },
    });

    return innerConfig;
  });
  return config;
};

export default withFullScreenNotificationIncomingCall;
