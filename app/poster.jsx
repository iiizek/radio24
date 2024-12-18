import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

import usePostersStore from '../stores/PostersStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { ADMIN_URL } from '../constants/Environments';

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
			<View style={styles.blurCopyImage}>
				<Image
					style={styles.bluredImage}
					source={{
						uri: `${ADMIN_URL}/assets/${lastPoster?.poster_image}`,
					}}
					onError={() => router.replace('/')}
					blurRadius={20}
				/>
				<View style={styles.darkBackground}></View>
			</View>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{
						uri: `${ADMIN_URL}/assets/${lastPoster?.poster_image}`,
					}}
					onError={() => router.replace('/')}
				/>
			</View>

			<View
				style={{
					position: 'absolute',
					bottom: hp('2.5%'),
					width: '100%',
					paddingHorizontal: wp('4%'),
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: Colors['brand-950'],
	},

	blurCopyImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},

	bluredImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	darkBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	imageContainer: {
		position: 'absolute',
		top: hp('4.5%'),
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: wp('91.5%'),
		height: hp('81.5%'),
		flex: 1,
	},

	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 8,
	},

	closeButton: {
		zIndex: 100,
		backgroundColor: Colors['brand-800'],
		padding: wp('3%'),
		borderRadius: 8,
		width: '100%',
		zIndex: 100,
	},

	closeButtonText: {
		textAlign: 'center',
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: Colors['theme-50'],
	},
});
