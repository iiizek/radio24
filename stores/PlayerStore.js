import { create } from 'zustand';
import TrackPlayer, {
	Capability,
	AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import useStreamsStore from './StreamsStore';

import { ADMIN_URL } from '../constants/Environments';

const usePlayerStore = create((set, get) => ({
	isLoading: false,
	isPlaying: false,
	isChosen: false,
	currentStream: null,
	songCover: null,

	setIsLoading: (value) => set({ isLoading: value }),
	setIsPlaying: (value) => set({ isPlaying: value }),
	setIsChosen: (value) => set({ isChosen: value }),
	setCurrentStream: async (value) => {
		const { currentStream, songCover, isChosen } = get();
		if (JSON.stringify(currentStream) === JSON.stringify(value)) return;
		set({ currentStream: value });

		// Если поток ещё не выбран, не обновляем метаданные
		if (!isChosen) return;

		try {
			// Получаем активный трек
			const activeTrack = await TrackPlayer.getActiveTrack();

			// Проверяем, существует ли активный трек
			if (!activeTrack) {
				console.warn(
					'Активный трек отсутствует, метаданные не могут быть обновлены.'
				);
				return;
			}

			const { title, artist } = activeTrack;

			// Обновляем метаданные, если они отличаются
			if (title !== value?.title || artist !== value?.server_name) {
				await TrackPlayer.updateNowPlayingMetadata({
					title: `${value?.artist} ${value?.title ? '-' : ''} ${value?.title}`,
					artist: value?.server_name,
					artwork:
						songCover || `${ADMIN_URL}/assets/${currentStream?.stream_cover}`,
				});
			}
		} catch (error) {
			console.warn('Ошибка при обновлении метаданных:', error);
		}
	},
	setSongCover: async (value) => {
		const { currentStream, isChosen, songCover } = get();
		if (songCover === value) return;
		set({ songCover: value });

		if (!isChosen) return;

		try {
			const activeTrack = await TrackPlayer.getActiveTrack();

			// Проверяем, существует ли активный трек
			if (!activeTrack) {
				console.warn(
					'Активный трек отсутствует, метаданные не могут быть обновлены.'
				);
				return;
			}

			const { artwork } = activeTrack;
			if (artwork !== value) {
				await TrackPlayer.updateNowPlayingMetadata({
					title: `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
						currentStream?.title
					}`,
					artist: currentStream?.server_name,
					artwork:
						value || `${ADMIN_URL}/assets/${currentStream?.stream_cover}`,
				});
			}
		} catch (error) {
			console.warn('Ошибка при обновлении метаданных:', error);
		}
	},

	setupPlayer: async () => {
		try {
			await TrackPlayer.setupPlayer({
				autoHandleInterruptions: true,
			});
			await TrackPlayer.updateOptions({
				capabilities: [
					Capability.Play,
					Capability.Pause,
					Capability.SkipToNext,
					Capability.SkipToPrevious,
				],
				compactCapabilities: [Capability.Play, Capability.Pause],
				android: {
					appKilledPlaybackBehavior:
						AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
				},
			});
		} catch {
			console.warn('Player уже инициализирован');
		}
	},

	playStream: async (streamUrl) => {
		const { isPlaying, currentStream } = get();

		set({ isLoading: true });

		try {
			// Если поток уже играет, остановить его перед воспроизведением нового
			if (isPlaying && currentStream?.stream_url !== streamUrl) {
				await TrackPlayer.stop();
				set({ isPlaying: false });
			}

			// Добавить трек в очередь
			await TrackPlayer.reset();
			await TrackPlayer.add({
				url: streamUrl,
				title: `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
					currentStream?.title
				}`,
				artist: currentStream?.server_name,
				artwork: `${ADMIN_URL}/assets/${currentStream?.stream_cover}`,
				isLiveStream: true,
			});

			// Воспроизвести трек
			await TrackPlayer.play();
			set({
				isPlaying: true,
				isLoading: false,
			});
		} catch (error) {
			set({ isLoading: false });
			console.error('Ошибка при воспроизведении потока:', error);
		}
	},

	pauseStream: async () => {
		try {
			set({ isLoading: true });
			await TrackPlayer.pause();
			set({ isPlaying: false, isLoading: false });
		} catch (error) {
			console.error('Ошибка при паузе:', error);
			set({ isLoading: false });
		}
	},

	resumeStream: async () => {
		try {
			set({ isLoading: true });
			const { duration } = await TrackPlayer.getProgress();
			await TrackPlayer.seekTo(duration);
			await TrackPlayer.play();
			set({ isPlaying: true, isLoading: false });
		} catch (error) {
			console.error('Ошибка при возобновлении воспроизведения:', error);
			set({ isLoading: false });
		}
	},

	togglePlayPause: async () => {
		const { isPlaying, isChosen, isLoading } = get();

		if (!isChosen || isLoading) return;
		try {
			if (isPlaying) {
				await get().pauseStream();
			} else {
				await get().resumeStream();
			}
		} catch (error) {
			console.error('Ошибка при переключении воспроизведения:', error);
		}
	},

	skipStream: async (direction) => {
		const {
			currentStream,
			setSongCover,
			setCurrentStream,
			playStream,
			isLoading,
			setIsLoading,
		} = get();
		const streams = useStreamsStore.getState().streams;

		const currentIndex = streams.findIndex(
			(stream) => stream.listen_url === currentStream.listen_url
		);
		if (currentIndex === -1) return;

		const skipMethod = async (stream) => {
			if (isLoading) return;
			await setIsLoading(true);
			await setCurrentStream(stream);
			await playStream(stream.stream_url);
			setIsLoading(false);
		};

		switch (direction) {
			case 'next':
				if (currentIndex === streams.length - 1) {
					skipMethod(streams[0]);
				} else {
					skipMethod(streams[currentIndex + 1]);
				}

				break;
			case 'prev':
				if (currentIndex === 0) {
					skipMethod(streams[streams.length - 1]);
				} else {
					skipMethod(streams[currentIndex - 1]);
				}

				break;
			default:
				break;
		}
	},
}));

export default usePlayerStore;
