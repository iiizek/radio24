import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './utils/playbackService';

import App from './App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);
