import {
	StyleSheet,
	View,
	TouchableNativeFeedback,
	TouchableOpacity,
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
		pauseStream,
		songCover,
		playStream,
		isLoading,
	} = usePlayerStore();
	const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

	const togglePlayPause = () => {
		if (currentStream?.stream_url) {
			if (isPlaying) {
				pauseStream();
			} else {
				if (isLoading) return;
				playStream(currentStream.stream_url);
			}
		}
	};

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
		(favorite) => favorite.listen_url === currentStream?.listen_url
	);

	return (
		<Link asChild href='/modal'>
			<TouchableNativeFeedback>
				<View style={styles.container}>
					<View style={styles.startContainer}>
						<StreamItemImage cover={itemImage} width={56} height={56} />
						<StreamItemInfo name={itemName} description={itemDescription} />
					</View>

					<View style={styles.endContainer}>
						<TouchableOpacity
							onPress={
								isFavorite
									? () => removeFavorite(currentStream)
									: () => addFavorite(currentStream)
							}
							activeOpacity={0.5}
						>
							{isFavorite ? (
								<HeartIcon
									strokeWidth={2.5}
									color={Colors['brand-800']}
									size={30}
									fill={Colors['brand-800']}
								/>
							) : (
								<HeartIcon strokeWidth={2.5} color={iconColor} size={30} />
							)}
						</TouchableOpacity>

						<TouchableOpacity onPress={togglePlayPause} activeOpacity={0.5}>
							{isPlaying ? (
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
		paddingBlock: 10,
		paddingInline: 16,
		gap: 16,
		boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2);',
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
