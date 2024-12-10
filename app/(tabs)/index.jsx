import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

import useStreamsStore from '../../stores/StreamsStore';
import usePlayerStore from '../../stores/PlayerStore';
import useFavoritesStore from '../../stores/FavoritesStore';

import socket from '../../utils/socket';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import theme from '../../utils/colorScheme';
import StreamItem from '../../components/StreamItem';
import CurrentStream from '../../components/CurrentStream';

const HomeScreen = () => {
	const { streams, setStreams } = useStreamsStore();
	const { currentStream, setCurrentStream, setSongCover } = usePlayerStore();
	const { getFavoritesFromStorage } = useFavoritesStore();

	const fetchSongCover = async () => {
		if (currentStream) {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/api/track-cover?artist=${currentStream.artist}&title=${currentStream.title}`
			);
			const data = await response.json();
			setSongCover(data.coverUrl);
		} else {
			setSongCover(null);
		}
	};

	useEffect(() => {
		socket.connect();

		socket.on('radio-streams', (data) => {
			setStreams(data);
			getFavoritesFromStorage();

			const updatedStream = data.find(
				(stream) => stream.listen_url === currentStream?.listen_url
			);
			setCurrentStream(updatedStream);
			fetchSongCover();
		});

		return () => {
			socket.off('radio-streams');
		};
	}, [currentStream]);

	return (
		<View style={styles.container}>
			{streams ? (
				<FlatList
					style={styles.flatList}
					data={streams}
					renderItem={({ item, index }) => (
						<StreamItem
							id={item.listen_url}
							cover={item.stream_cover}
							name={item.server_name}
							description={item.server_description}
							index={index}
						/>
					)}
					keyExtractor={(item) => item.listen_url}
				/>
			) : (
				<View style={styles.attention}>
					<ActivityIndicator size={64} color={Colors['brand-800']} />
				</View>
			)}
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
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	attentionTitle: {
		fontSize: 24,
		fontFamily: Fonts.bold,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
		textAlign: 'center',
	},

	attentionText: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
		textAlign: 'center',
	},
});

export default HomeScreen;
