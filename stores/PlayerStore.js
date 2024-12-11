// import { create } from 'zustand';
// import TrackPlayer, { Capability, State } from 'react-native-track-player';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const usePlayerStore = create((set, get) => ({
// 	isLoading: false,
// 	isPlaying: false,
// 	isChosen: false,
// 	currentStream: null,
// 	songCover: null,

// 	setIsPlaying: (value) => set({ isPlaying: value }),
// 	setIsChosen: (value) => set({ isChosen: value }),
// 	setCurrentStream: (value) => set({ currentStream: value }),
// 	setSongCover: async (value) => {
// 		const { currentStream } = get();
// 		set({ songCover: value });

// 		try {
// 			const playbackState = await TrackPlayer.getState();

// 			if (playbackState === State.Playing) {
// 				await TrackPlayer.updateNowPlayingMetadata({
// 					artwork: value
// 						? value
// 						: `${process.env.EXPO_PUBLIC_ADMIN_URL}/assets/${currentStream?.stream_cover}`,
// 				});
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при обновлении метаданных:', error);
// 		}
// 	},
// 	setIsLoading: (value) => set({ isLoading: value }),

// 	setupPlayer: async () => {
// 		try {
// 			await TrackPlayer.setupPlayer();
// 			await TrackPlayer.updateOptions({
// 				capabilities: [
// 					Capability.Play,
// 					Capability.Pause,
// 					Capability.SeekTo,
// 					Capability.SkipToNext,
// 					Capability.SkipToPrevious,
// 				],
// 				compactCapabilities: [
// 					Capability.Play,
// 					Capability.Pause,
// 					Capability.SeekTo,
// 					Capability.SkipToNext,
// 					Capability.SkipToPrevious,
// 				],
// 			});
// 			await AsyncStorage.setItem('playerSetupComplete', 'true');
// 		} catch {
// 			return;
// 		}
// 	},

// 	playStream: async (streamUrl) => {
// 		const { isPlaying, currentStream } = get();

// 		set({ isLoading: true });

// 		try {
// 			// Если поток уже играет, остановить его перед воспроизведением нового
// 			if (isPlaying && currentStream?.stream_url !== streamUrl) {
// 				await TrackPlayer.stop();
// 				set({ isPlaying: false });
// 			}

// 			// Добавить трек в очередь
// 			await TrackPlayer.reset();
// 			await TrackPlayer.add({
// 				url: streamUrl,
// 				title: `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
// 					currentStream?.title
// 				}`,
// 				artist: currentStream?.server_name,
// 				artwork: `${process.env.EXPO_PUBLIC_ADMIN_URL}/assets/${currentStream?.stream_cover}`,
// 				isLiveStream: true,
// 			});

// 			// Воспроизвести трек
// 			await TrackPlayer.play();
// 			set({
// 				isPlaying: true,
// 				isLoading: false,
// 			});
// 		} catch (error) {
// 			set({ isLoading: false });
// 			console.error('Ошибка при воспроизведении потока:', error);
// 		}
// 	},

// 	pauseStream: async () => {
// 		try {
// 			set({ isLoading: true });
// 			await TrackPlayer.pause();
// 			set({ isPlaying: false, isLoading: false });
// 		} catch (error) {
// 			console.error('Ошибка при паузе:', error);
// 			set({ isLoading: false });
// 		}
// 	},

// 	resumeStream: async () => {
// 		try {
// 			set({ isLoading: true });
// 			await TrackPlayer.play();
// 			set({ isPlaying: true, isLoading: false });
// 		} catch (error) {
// 			console.error('Ошибка при возобновлении воспроизведения:', error);
// 			set({ isLoading: false });
// 		}
// 	},

// 	togglePlayPause: async () => {
// 		const { isPlaying } = get();

// 		try {
// 			if (isPlaying) {
// 				await get().pauseStream();
// 			} else {
// 				await get().resumeStream();
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при переключении воспроизведения:', error);
// 		}
// 	},
// }));

// export default usePlayerStore;

import { create } from 'zustand';
import { Audio } from 'expo-av';

const usePlayerStore = create((set, get) => ({
	isLoading: false,
	isPlaying: false,
	isChosen: false,
	currentStream: null,
	audioInstance: null,
	songCover: null,

	setIsPlaying: (value) => set({ isPlaying: value }),
	setIsChosen: (value) => set({ isChosen: value }),
	setCurrentStream: (value) => set({ currentStream: value }),
	setSongCover: (value) => set({ songCover: value }),
	setIsLoading: (value) => set({ isLoading: value }),

	playStream: async (streamUrl) => {
		const { audioInstance } = get();

		set({ isLoading: true });

		if (audioInstance) {
			await audioInstance.unloadAsync();
			set({ audioInstance: null });
		}

		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false, // Отключаем запись
			staysActiveInBackground: true, // Фоновое воспроизведение
			playsInSilentModeIOS: true, // Игнорировать режим "Без звука"
			shouldDuckAndroid: true,
		});

		try {
			const { sound } = await Audio.Sound.createAsync(
				{ uri: streamUrl },
				{ shouldPlay: true }
			);
			set({ audioInstance: sound, isPlaying: true, isLoading: false });
		} catch (error) {
			set({ isLoading: false });
			console.error('Ошибка при создании потока:', error);
		}
	},

	pauseStream: async () => {
		const { audioInstance } = get();
		if (audioInstance) {
			set({ isLoading: true });
			await audioInstance.pauseAsync();
			set({ isPlaying: false, isLoading: false });
		}
	},

	resumeStream: async () => {
		const { audioInstance } = get();
		if (audioInstance) {
			set({ isLoading: true });

			audioInstance.setOnPlaybackStatusUpdate((status) => {
				if (status.isPlaying) {
					set({ isPlaying: true, isLoading: false });
				} else if (status.error) {
					set({ isLoading: false });
					console.error('Ошибка воспроизведения:', status.error);
				}
			});

			try {
				await audioInstance.playFromPositionAsync(0);
			} catch (error) {
				console.error('Ошибка при возобновлении:', error);
				set({ isLoading: false });
			}
		}
	},

	togglePlayPause: () => {
		const { currentStream, isPlaying, pauseStream, resumeStream } = get();
		if (!currentStream?.stream_url) return;
		if (isPlaying) {
			pauseStream();
		} else {
			resumeStream();
		}
	},
}));

export default usePlayerStore;
