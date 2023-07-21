import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useEnsureAuthorized } from './hooks/system';
import { useLastSteps } from './hooks/activities';
import { minutesBefore } from './helpers/functions';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const isAuthorized = useEnsureAuthorized();
  const steps = useLastSteps(minutesBefore(24 * 60));

  if (!isAuthorized) {
    return (
      <Text>You need to sign in to your Google account to use this app.</Text>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Steps: {steps}</Text>
    </SafeAreaView>
  );
}

export default App;
