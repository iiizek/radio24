import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../constants/Environments';

const usePostersStore = create((set) => ({
	posters: [],
	lastPoster: null,
	seenPosters: [],

	// Инициализация состояния
	initializeStore: async () => {
		const seenPosters = await AsyncStorage.getItem('seenPosters');
		Promise.resolve(
			set({
				seenPosters: seenPosters ? JSON.parse(seenPosters) : [],
			})
		);
	},

	// Загрузка постеров с сервера
	fetchPosters: async () => {
		try {
			const response = await fetch(`${API_URL}/api/posters`);
			const posters = await response.json();

			set((state) => {
				const newPosters = posters.filter(
					(poster) => !state.seenPosters.includes(poster.id)
				);

				// Только если данные изменились
				if (JSON.stringify(state.posters) !== JSON.stringify(posters)) {
					return {
						posters,
						lastPoster:
							newPosters.length > 0 ? newPosters[newPosters.length - 1] : null,
					};
				}
				return state;
			});
		} catch (error) {
			console.error('Ошибка загрузки постеров:', error);
		}
	},

	// Сохранение просмотренного постера
	markPosterAsSeen: async (posterId) => {
		set((state) => {
			const updatedSeenPosters = [...state.seenPosters, posterId];
			AsyncStorage.setItem('seenPosters', JSON.stringify(updatedSeenPosters));
			return { seenPosters: updatedSeenPosters };
		});
	},
}));

export default usePostersStore;
