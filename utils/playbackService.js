import TrackPlayer, { Event } from 'react-native-track-player';
import usePlayerStore from '../stores/PlayerStore';

const resumeStream = usePlayerStore.getState().resumeStream;
const pauseStream = usePlayerStore.getState().pauseStream;

export const playbackService = async function () {
	TrackPlayer.addEventListener(Event.RemotePlay, async () => resumeStream());
	TrackPlayer.addEventListener(Event.RemotePause, async () => pauseStream());
};
