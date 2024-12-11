import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import { ExpoRoot } from 'expo-router';

export function App() {
	const ctx = require.context('./app');
	return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() =>
	require('./utils/trackPlayerService')
);
