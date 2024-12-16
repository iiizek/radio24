import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import React, { memo } from 'react';

import { CirclePlayIcon } from 'lucide-react-native';

import { Colors } from '../constants/Colors';
import { API_URL } from '../constants/Environments';

import usePlayerStore from '../stores/PlayerStore';

const StreamItemImage = memo(
	({ id = null, cover, width = 64, height = 64 }) => {
		const { isChosen, currentStream, songCover, isPlaying, isLoading } =
			usePlayerStore();
		const coverUrl =
			String(songCover) === String(cover)
				? songCover
				: `${API_URL}/assets/${cover}`;

		return (
			<View style={[styles.imageContainer, { width, height }]}>
				<Image
					style={[styles.image, { width, height }]}
					source={cover ? { uri: coverUrl } : require('../assets/radio24.png')}
				/>
				{isChosen && currentStream?.listen_url === id && (
					<View style={styles.isChosen}>
						{isLoading ? (
							<ActivityIndicator size='large' color={Colors['theme-50']} />
						) : isPlaying ? (
							<Image
								style={styles.isChosenImage}
								source={require('../assets/audio-waves.gif')}
							/>
						) : (
							<CirclePlayIcon
								strokeWidth={1.5}
								size={48}
								color={Colors['theme-50']}
							/>
						)}
					</View>
				)}
			</View>
		);
	}
);

export default StreamItemImage;

const styles = StyleSheet.create({
	imageContainer: {
		borderRadius: 8,
		position: 'relative',
	},

	image: {
		resizeMode: 'contain',
		borderRadius: 8,
	},

	isChosen: {
		zIndex: 10,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		borderRadius: 8,
	},

	isChosenImage: {
		resizeMode: 'contain',
	},
});
