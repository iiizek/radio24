import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { XIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import usePostersStore from '../stores/PostersStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const poster = () => {
	const router = useRouter();
	const { lastPoster, markPosterAsSeen } = usePostersStore();

	const handleClose = async () => {
		if (lastPoster) {
			await markPosterAsSeen(lastPoster.id);
			router.back();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{
						uri: `${process.env.EXPO_PUBLIC_ADMIN_URL}/assets/${lastPoster?.poster_image}`,
					}}
					onError={() => router.replace('/')}
				/>
			</View>

			<View
				style={{
					position: 'absolute',
					bottom: 8,
					width: '100%',
					paddingHorizontal: 8,
				}}
			>
				<TouchableOpacity onPress={handleClose} activeOpacity={0.5}>
					<View style={styles.closeButton}>
						<Text style={styles.closeButtonText}>Отлично! Продолжим 🚀</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default poster;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors['brand-950'],
		width: '100%',
		height: '100%',
	},

	imageContainer: {
		width: '100%',
		height: '100%',
		flex: 1,
	},

	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	closeButton: {
		zIndex: 100,
		backgroundColor: Colors['brand-800'],
		padding: 12,
		borderRadius: 8,
		width: '100%',
	},

	closeButtonText: {
		textAlign: 'center',
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: Colors['theme-50'],
	},
});
