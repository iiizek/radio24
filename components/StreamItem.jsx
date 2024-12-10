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
		setCurrentStream,
		playStream,
		setSongCover,
		togglePlayPause,
		currentStream,
		isLoading,
	} = usePlayerStore();
	const { streams } = useStreamsStore();

	const handleChooseStream = () => {
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
		setSongCover(null);
		setCurrentStream(currentStream);
		setIsChosen(true);
		playStream(currentStream.stream_url);
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
					<StreamItemInfo name={name} description={description} />
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
		paddingInline: 12,
		paddingBlock: 6,
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
