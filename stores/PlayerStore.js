import { create } from 'zustand';
import { Audio } from 'expo-av';
import { safelyRunOnUI } from '../utils/safeRun';

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

		if (audioInstance) {
			set({ isLoading: true });
			await audioInstance.unloadAsync();
			set({ audioInstance: null });
		}

		try {
			const { sound } = await Audio.Sound.createAsync(
				{ uri: streamUrl },
				{ shouldPlay: true }
			);
			set({ audioInstance: sound, isPlaying: true, isLoading: false });
		} catch (error) {
			console.error('Ошибка при создании потока:', error);
		}
	},

	pauseStream: async () => {
		const { audioInstance } = get();
		if (audioInstance) {
			await audioInstance.pauseAsync();
			set({ isPlaying: false });
		}
	},
}));

export default usePlayerStore;
