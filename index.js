import 'expo-router/entry';
import TrackPlayer from 'react-native-track-player';
import trackPlayerService from './utils/trackPlayerService';

TrackPlayer.registerPlaybackService(trackPlayerService);
