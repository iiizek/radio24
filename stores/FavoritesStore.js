import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { create } from 'zustand';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import theme from '../utils/colorScheme';

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

		Toast.show('Поток добавлен в избранное ❤️', {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			backgroundColor:
				theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
			textStyle: { fontFamily: Fonts.regular },
		});
	},
	removeFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		const updatedFavorites = parsedFavorites.filter(
			(favorite) => favorite.listen_url !== stream.listen_url
		);
		await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		set({ favorites: updatedFavorites });

		Toast.show('Поток удален из избранного 💔', {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			backgroundColor:
				theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
			textStyle: { fontFamily: Fonts.regular },
		});
	},
}));

export default useFavoritesStore;
