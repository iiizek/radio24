import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	ActivityIndicator,
	Text,
} from 'react-native';

import StreamItem from '../../components/StreamItem';
import CurrentStream from '../../components/CurrentStream';
import { HeartIcon } from 'lucide-react-native';

import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';
import theme from '../../utils/colorScheme';

import useFavoritesStore from '../../stores/FavoritesStore';
import useStreamsStore from '../../stores/StreamsStore';

const FavoritesScreen = () => {
	const { favorites } = useFavoritesStore();
	const { streams } = useStreamsStore();

	return (
		<View style={styles.container}>
			{!favorites.length && streams && (
				<View style={styles.attention}>
					<HeartIcon
						size={112}
						color={Colors['brand-800']}
						fill={Colors['brand-800']}
					/>
					<Text style={styles.attentionTitle}>
						Добавляйте потоки в избранное, нажимая ❤️ на экране потока
					</Text>
				</View>
			)}
			{favorites.length ? (
				<FlatList
					style={styles.flatList}
					data={favorites}
					renderItem={({ item, index }) => (
						<StreamItem
							id={item.listen_url}
							cover={item.stream_cover}
							name={item.server_name}
							description={`${item.artist} ${item.title ? '-' : ''} ${
								item.title
							}`}
							index={index}
						/>
					)}
					keyExtractor={(item) => item.listen_url}
				/>
			) : !streams ? (
				<View style={styles.attention}>
					<ActivityIndicator size={64} color={Colors['brand-800']} />
				</View>
			) : null}

			<CurrentStream />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		backgroundColor:
			theme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
	},

	flatList: {
		display: 'flex',
		flexDirection: 'column',
	},

	attention: {
		paddingHorizontal: 24,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	attentionTitle: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
		textAlign: 'center',
	},
});

export default FavoritesScreen;
