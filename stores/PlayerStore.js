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
			await audioInstance.playFromPositionAsync(0);
			set({ isPlaying: true, isLoading: false });
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
