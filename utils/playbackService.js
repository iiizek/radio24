import TrackPlayer, { Event } from 'react-native-track-player';
import usePlayerStore from '../stores/PlayerStore';

const resumeStream = usePlayerStore.getState().resumeStream;
const pauseStream = usePlayerStore.getState().pauseStream;
const skipStream = usePlayerStore.getState().skipStream;

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

	const onSkip = async (direction) => {
		try {
			console.log('remote skip');
			await skipStream(direction);
		} catch (error) {
			console.error('Ошибка в обработчике RemoteSkip:', error);
		}
	};

	const playListener = TrackPlayer.addEventListener(Event.RemotePlay, onPlay);
	const pauseListener = TrackPlayer.addEventListener(
		Event.RemotePause,
		onPause
	);
	const skipToNextListener = TrackPlayer.addEventListener(
		Event.RemoteNext,
		() => onSkip('next')
	);
	const skipToPreviousListener = TrackPlayer.addEventListener(
		Event.RemotePrevious,
		() => onSkip('previous')
	);

	return () => {
		playListener.remove();
		pauseListener.remove();
		skipToNextListener.remove();
		skipToPreviousListener.remove();
	};
};
