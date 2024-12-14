import TrackPlayer, { Event } from 'react-native-track-player';
import usePlayerStore from '../stores/PlayerStore';

const resumeStream = usePlayerStore.getState().resumeStream;
const pauseStream = usePlayerStore.getState().pauseStream;

export const playbackService = async function () {
	const onPlay = async () => {
		try {
			console.log('remote play');
			await resumeStream();
		} catch (error) {
			console.error('Ошибка в обработчике RemotePlay:', error);
		}
	};

	const onPause = async () => {
		try {
			console.log('remote pause');
			await pauseStream();
		} catch (error) {
			console.error('Ошибка в обработчике RemotePause:', error);
		}
	};

	const playListener = TrackPlayer.addEventListener(Event.RemotePlay, onPlay);
	const pauseListener = TrackPlayer.addEventListener(
		Event.RemotePause,
		onPause
	);

	console.log('Play listener:', playListener);
	console.log('Pause listener:', pauseListener);

	return () => {
		playListener.remove();
		pauseListener.remove();
	};
};
