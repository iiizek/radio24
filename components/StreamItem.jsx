import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Toast from 'react-native-root-toast';
import React, { memo, useState, useEffect } from 'react';

import StreamItemImage from './StreamItemImage';
import StreamItemInfo from './StreamItemInfo';

import usePlayerStore from '../stores/PlayerStore';
import useStreamsStore from '../stores/StreamsStore';

const StreamItem = memo(({ cover, name, description, id }) => {
	const {
		setIsChosen,
		setCurrentStream,
		playStream,
		setSongCover,
		pauseStream,
		currentStream,
		isPlaying,
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

	const togglePlayPause = () => {
		if (currentStream?.stream_url) {
			if (isPlaying) {
				pauseStream();
			} else {
				if (isLoading) return;
				playStream(currentStream.stream_url);
			}
		}
	};

	return (
		<TouchableNativeFeedback
			onPress={isChosen ? togglePlayPause : handleChooseStream}
		>
			<View style={styles.container}>
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

	startContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		gap: 12,
		width: '100%',
	},
});
