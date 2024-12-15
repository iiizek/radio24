import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import theme from '../utils/colorScheme';

const StreamItemInfo = memo(({ name, description }) => {
	return (
		<View style={styles.infoContainer}>
			<Text style={styles.streamTitle} numberOfLines={1}>
				{name}
			</Text>
			<View style={styles.descWrapper}>
				<Text style={styles.streamDescription} numberOfLines={1}>
					{description}
				</Text>
			</View>
		</View>
	);
});

export default StreamItemInfo;

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 4,
		overflow: 'hidden',
		width: '100%',
	},

	descWrapper: {
		width: '100%',
	},

	streamTitle: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},

	streamDescription: {
		fontSize: 16,
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-400'] : Colors['theme-600'],
		overflow: 'hidden',
	},
});
