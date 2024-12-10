import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import DrawerModal from './DrawerModal';
import {
	PlayIcon,
	PauseIcon,
	SkipBackIcon,
	SkipForwardIcon,
	HeartIcon,
	SearchIcon,
} from 'lucide-react-native';

import usePlayerStore from '../stores/PlayerStore';
import useStreamsStore from '../stores/StreamsStore';
import useFavoritesStore from '../stores/FavoritesStore';

import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';

import theme from '../utils/colorScheme';
import SearchMusic from './SearchMusic';

const PlayerControls = () => {
	const { streams } = useStreamsStore();
	const {
		isPlaying,
		currentStream,
		playStream,
		pauseStream,
		setSongCover,
		setCurrentStream,
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

	const handleSkip = (method) => {
		const currentIndex = streams.findIndex(
			(stream) => stream.listen_url === currentStream.listen_url
		);
		console.log(currentIndex);
		if (currentIndex === -1) return;
		switch (method) {
			case 'next':
				if (currentIndex === streams.length - 1) return;
				setSongCover(null);
				setCurrentStream(streams[currentIndex + 1]);
				playStream(streams[currentIndex + 1].stream_url);
				break;
			case 'prev':
				if (currentIndex === 0) return;
				setSongCover(null);
				setCurrentStream(streams[currentIndex - 1]);
				playStream(streams[currentIndex - 1].stream_url);
				break;
			default:
				break;
		}
	};

	const isFavorite = favorites.some(
		(stream) => stream.listen_url === currentStream?.listen_url
	);

	return (
		<View style={styles.controls}>
			<DrawerModal
				name='Найти песню'
				icon={
					<SearchIcon strokeWidth={3} size={30} color={Colors['brand-800']} />
				}
			>
				<SearchMusic />
			</DrawerModal>

			<TouchableOpacity onPress={() => handleSkip('prev')} activeOpacity={0.5}>
				<SkipBackIcon strokeWidth={2.1} size={42} color={Colors['brand-800']} />
			</TouchableOpacity>

			<View style={{ borderRadius: 9999, overflow: 'hidden' }}>
				<TouchableNativeFeedback onPress={togglePlayPause}>
					<View style={styles.playButton}>
						{isPlaying ? (
							<PauseIcon
								fill={Colors['theme-50']}
								size={42}
								color={Colors['theme-50']}
							/>
						) : (
							<PlayIcon
								fill={Colors['theme-50']}
								size={42}
								color={Colors['theme-50']}
							/>
						)}
					</View>
				</TouchableNativeFeedback>
			</View>

			<TouchableOpacity onPress={() => handleSkip('next')} activeOpacity={0.5}>
				<SkipForwardIcon
					strokeWidth={2.1}
					size={42}
					color={Colors['brand-800']}
				/>
			</TouchableOpacity>

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
						fill={Colors['brand-800']}
						strokeWidth={3}
						size={30}
						color={Colors['brand-800']}
					/>
				) : (
					<HeartIcon strokeWidth={3} size={30} color={Colors['brand-800']} />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default PlayerControls;

const styles = StyleSheet.create({
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingInline: 24,
		paddingBlock: 16,
		flex: 1,
	},

	playButton: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors['brand-800'],
		borderRadius: 9999,
	},
});
