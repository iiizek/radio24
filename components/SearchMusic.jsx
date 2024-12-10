import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

import usePlayerStore from '../stores/PlayerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import theme from '../utils/colorScheme';

const SearchMusic = () => {
	const { currentStream } = usePlayerStore();
	return (
		<View style={styles.modalBody}>
			<Link
				asChild
				href={`https://music.yandex.ru/search?text=${currentStream?.artist} ${currentStream?.title}`}
			>
				<TouchableOpacity>
					<View style={styles.modalItem}>
						<Text style={styles.modalItemTitle}>Яндекс Музыка</Text>
					</View>
				</TouchableOpacity>
			</Link>

			<Link
				asChild
				href={`https://vk.com/music?q=${currentStream?.artist} ${currentStream?.title}`}
			>
				<TouchableOpacity>
					<View style={styles.modalItem}>
						<Text style={styles.modalItemTitle}>VK Музыка</Text>
					</View>
				</TouchableOpacity>
			</Link>

			<Link
				asChild
				href={`https://zvuk.com/search?query=${currentStream?.artist} ${currentStream?.title}`}
			>
				<TouchableOpacity>
					<View style={styles.modalItem}>
						<Text style={styles.modalItemTitle}>Звук</Text>
					</View>
				</TouchableOpacity>
			</Link>
		</View>
	);
};

export default SearchMusic;

const styles = StyleSheet.create({
	modalBody: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	modalItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor:
			theme === 'dark' ? Colors['theme-900'] : Colors['theme-100'],
		gap: 24,
	},

	modalItemTitle: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		color: Colors['brand-800'],
	},
});
