import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Toast from 'react-native-root-toast';
import React, { memo } from 'react';

import StreamItemImage from './StreamItemImage';
import StreamItemInfo from './StreamItemInfo';

import usePlayerStore from '../stores/PlayerStore';
import useStreamsStore from '../stores/StreamsStore';

const StreamItem = memo(({ cover, name, description, id, index }) => {
	const {
		setIsChosen,
		setIsLoading,
		setCurrentStream,
		playStream,
		setSongCover,
		togglePlayPause,
		currentStream,
		isLoading,
	} = usePlayerStore();
	const { streams } = useStreamsStore();

	const handleChooseStream = async () => {
		const currentStream = streams.find((stream) => stream.listen_url === id);
		if (!currentStream) {
			Toast.show('Поток не найден', {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
			});

			return;
		}
		if (isLoading) return;

		try {
			await setIsLoading(true);
			await setCurrentStream(currentStream);
			setIsChosen(true);
			await playStream(currentStream.stream_url);
			setIsLoading(false);
		} catch (error) {
			console.error('Ошибка при выборе потока:', error);
			setIsLoading(false);
		}
	};

	const isChosen = currentStream?.listen_url === id;

	return (
		<TouchableNativeFeedback
			onPress={isChosen && !isLoading ? togglePlayPause : handleChooseStream}
		>
			<View
				style={[
					styles.container,
					index === 0 && styles.firstItem,
					index === streams.length - 1 && styles.lastItem,
				]}
			>
				<View style={styles.startContainer}>
					<StreamItemImage id={id} cover={cover} />
					<StreamItemInfo width='80%' name={name} description={description} />
				</View>
			</View>
		</TouchableNativeFeedback>
	);
});

export default StreamItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		width: '100%',
	},

	firstItem: {
		paddingTop: 12,
	},

	lastItem: {
		paddingBottom: 12,
	},

	startContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		gap: 12,
		width: '100%',
	},
});
