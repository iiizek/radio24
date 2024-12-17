import {
	StyleSheet,
	View,
	TouchableNativeFeedback,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import StreamItemImage from './StreamItemImage';
import StreamItemInfo from './StreamItemInfo';

import usePlayerStore from '../stores/PlayerStore';
import useFavoritesStore from '../stores/FavoritesStore';

import { HeartIcon, PlayIcon, PauseIcon } from 'lucide-react-native';

import { Colors } from '../constants/Colors';
import theme from '../utils/colorScheme';

const CurrentStream = () => {
	const {
		currentStream,
		isChosen,
		isPlaying,
		songCover,
		togglePlayPause,
		isLoading,
	} = usePlayerStore();
	const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

	const itemImage = isChosen ? songCover || currentStream?.stream_cover : null;
	const itemName = isChosen ? currentStream?.server_name : 'Поток не выбран';
	const itemDescription = isChosen
		? `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
				currentStream?.title
		  }`
		: 'Выбирайте и слушайте!';

	const iconColor =
		theme === 'dark' ? Colors['theme-400'] : Colors['theme-600'];

	const isFavorite = favorites.some(
		(favorite) => favorite?.listen_url === currentStream?.listen_url
	);

	return (
		<Link asChild href='/modal'>
			<TouchableNativeFeedback>
				<View style={styles.container}>
					<View style={styles.startContainer}>
						<StreamItemImage cover={itemImage} width={48} height={48} />
						<StreamItemInfo name={itemName} description={itemDescription} />
					</View>

					<View style={styles.endContainer}>
						<TouchableOpacity
							onPress={
								isChosen
									? isFavorite
										? () => removeFavorite(currentStream)
										: () => addFavorite(currentStream)
									: () => {}
							}
							activeOpacity={0.5}
						>
							<HeartIcon
								strokeWidth={2.5}
								color={isFavorite ? Colors['brand-800'] : iconColor}
								size={30}
								fill={isFavorite ? Colors['brand-800'] : 'transparent'}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={togglePlayPause} activeOpacity={0.5}>
							{isLoading ? (
								<ActivityIndicator size={30} color={iconColor} />
							) : isPlaying ? (
								<PauseIcon
									strokeWidth={2.5}
									fill={iconColor}
									color={iconColor}
									size={30}
								/>
							) : (
								<PlayIcon
									strokeWidth={2.5}
									fill={iconColor}
									color={iconColor}
									size={30}
								/>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</TouchableNativeFeedback>
		</Link>
	);
};

export default CurrentStream;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 16,
		gap: 16,
		borderTopColor:
			theme === 'dark' ? Colors['theme-900'] : Colors['theme-100'],
		borderTopWidth: 2,
		width: '100%',
	},

	startContainer: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '57.5%',
	},

	endContainer: {
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
