import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const useFavoritesStore = create((set) => ({
	favorites: [],
	getFavoritesFromStorage: async () => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		set({ favorites: parsedFavorites });
	},
	addFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		parsedFavorites.push(stream);
		await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
		set({ favorites: parsedFavorites });
	},
	removeFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		const updatedFavorites = parsedFavorites.filter(
			(favorite) => favorite.listen_url !== stream.listen_url
		);
		await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		set({ favorites: updatedFavorites });
	},
}));

export default useFavoritesStore;
