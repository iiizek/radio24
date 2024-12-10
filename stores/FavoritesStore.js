import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import Toast from 'react-native-root-toast';
import toastConfig from '../constants/ToastConfig';

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

		Toast.show('Поток добавлен в избранное ❤️', toastConfig);
	},
	removeFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		const updatedFavorites = parsedFavorites.filter(
			(favorite) => favorite.listen_url !== stream.listen_url
		);
		await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		set({ favorites: updatedFavorites });

		Toast.show('Поток удален из избранного 💔', toastConfig);
	},
}));

export default useFavoritesStore;
