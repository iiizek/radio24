import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';

import DrawerModal from '../components/DrawerModal';

import { ChevronLeft, InfoIcon } from 'lucide-react-native';

import usePlayerStore from '../stores/PlayerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { currentStreamInfo } from '../constants/Data';

import theme from '../utils/colorScheme';
import PlayerControls from '../components/PlayerControlls';
import CurrentStreamInfoItems from '../components/CurrentStreamInfoItems';

const modal = () => {
	const navigation = useNavigation();
	const [modalInfo, setModalInfo] = useState(currentStreamInfo);

	const { currentStream, isChosen, songCover } = usePlayerStore();
	const coverUrl = isChosen
		? `${process.env.EXPO_PUBLIC_ADMIN_URL}/assets/${currentStream?.stream_cover}`
		: null;

	useEffect(() => {
		if (isChosen) {
			setModalInfo({
				Название: currentStream?.server_name,
				Описание: currentStream?.server_description,
				Артист: currentStream?.artist,
				Трек: currentStream?.title,
				Жанр: currentStream?.genre,
				Битрейт: currentStream?.bitrate,
				'Stream URL': currentStream?.stream_url,
				Формат: currentStream?.server_type,
			});
		}
	}, [currentStream]);

	const modalImage = !coverUrl
		? require('../assets/radio24.png')
		: {
				uri: songCover || coverUrl,
		  };

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.backButton}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.goBack()}
					>
						<ChevronLeft size={48} color={Colors['brand-800']} />
					</TouchableOpacity>
				</View>

				<DrawerModal
					icon={<InfoIcon size={48} color={Colors['brand-800']} />}
					name={'О потоке'}
					data={modalInfo}
				>
					<CurrentStreamInfoItems data={modalInfo} />
				</DrawerModal>
			</View>

			<View style={styles.content}>
				<View style={styles.coverWrapper}>
					<Image style={styles.cover} source={modalImage} />
				</View>
				<View style={styles.infoWrapper}>
					<Text style={styles.streamTitle}>
						{isChosen ? currentStream.server_name : 'Поток не выбран'}
					</Text>
					<Text style={styles.trackTitle}>
						{isChosen
							? `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
									currentStream?.title
							  }`
							: 'Выбирайте и слушайте!'}
					</Text>
				</View>
			</View>

			<PlayerControls />
		</View>
	);
};

export default modal;

const styles = StyleSheet.create({
	container: {
		backgroundColor:
			theme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
		flex: 1,
		justifyContent: 'space-between',
		gap: 32,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	backButton: {
		overflow: 'hidden',
		borderRadius: 9999,
	},

	content: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		gap: 32,
	},

	coverWrapper: {
		width: 360,
		height: 360,
		borderRadius: 12,
	},

	cover: {
		width: 360,
		height: 360,
		resizeMode: 'contain',
		borderRadius: 12,
	},

	infoWrapper: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},

	streamTitle: {
		fontFamily: Fonts.bold,
		fontSize: 28,
		textAlign: 'center',
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},

	trackTitle: {
		fontFamily: Fonts.regular,
		fontSize: 20,
		textAlign: 'center',
		color: theme === 'dark' ? Colors['theme-400'] : Colors['theme-600'],
		paddingHorizontal: 16,
	},
});
