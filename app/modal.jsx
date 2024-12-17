import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, useNavigation } from 'expo-router';

import { ChevronLeft } from 'lucide-react-native';

import usePlayerStore from '../stores/PlayerStore';
import useTimerStore from '../stores/TimerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { musicLinksData } from '../constants/Data';
import { ADMIN_URL } from '../constants/Environments';

import theme from '../utils/colorScheme';
import PlayerControls from '../components/PlayerControlls';

const modal = () => {
	const navigation = useNavigation();

	const { timeLeft, selectedTime } = useTimerStore();
	const { currentStream, isChosen, songCover } = usePlayerStore();
	const coverUrl = isChosen
		? `${ADMIN_URL}/assets/${currentStream?.stream_cover}`
		: null;

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
						<ChevronLeft size={40} color={Colors['brand-800']} />
					</TouchableOpacity>
				</View>

				{selectedTime && (
					<View style={styles.timer}>
						<Text style={styles.timerText}>
							{`${
								timeLeft > 3600 ? `${Math.floor(timeLeft / 3600)} ч.` : ''
							} ${Math.floor((timeLeft % 3600) / 60)} мин. ${
								timeLeft % 60
							} сек. `}
						</Text>
					</View>
				)}

				<View style={{ width: 48, height: 48 }}></View>
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
						{isChosen && currentStream.title !== null
							? `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
									currentStream?.title
							  }`
							: 'Выбирайте и слушайте!'}
					</Text>
				</View>
			</View>

			<View style={styles.musicLinksWrapper}>
				<View style={styles.musicLinks}>
					{isChosen &&
						currentStream.title &&
						musicLinksData.map((item) => (
							<Link
								asChild
								key={item.id}
								href={`${item.url}${currentStream?.artist} ${currentStream?.title}`}
							>
								<TouchableOpacity activeOpacity={0.5}>
									<View style={styles.musicButton}>{item.icon}</View>
								</TouchableOpacity>
							</Link>
						))}
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
		gap: 24,
		height: '100%',
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

	timer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors['brand-800'],
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 8,
	},

	timerText: {
		fontFamily: Fonts.regular,
		fontSize: 16,
		color: Colors['theme-50'],
	},

	content: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		gap: 32,
	},

	coverWrapper: {
		width: '100%',
		height: 'auto',
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},

	cover: {
		width: '100%',
		height: 330,
		resizeMode: 'cover',
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
		fontSize: 24,
		textAlign: 'center',
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},

	trackTitle: {
		fontFamily: Fonts.regular,
		fontSize: 18,
		textAlign: 'center',
		color: theme === 'dark' ? Colors['theme-400'] : Colors['theme-600'],
		paddingHorizontal: 16,
	},

	musicLinksWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	musicLinks: {
		paddingHorizontal: 24,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
		flex: 0,
	},

	musicButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors['brand-800'],
		gap: 8,
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 8,
		flexShrink: 0,
		flexGrow: 0,
		minWidth: 40,
		minHeight: 40,
	},

	musicButtonText: {
		fontFamily: Fonts.regular,
		fontSize: 20,
		textAlign: 'center',
		color: Colors['brand-800'],
	},
});
