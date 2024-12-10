import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import theme from '../utils/colorScheme';
const CurrentStreamInfoItems = ({ data }) => {
	return (
		<View style={styles.modalBody}>
			{Object.entries(data).map(([key, val], i) => (
				<View style={styles.modalItem} key={i}>
					<Text style={styles.modalItemTitle}>{key}</Text>
					<Text style={styles.modalItemValue}>{val}</Text>
				</View>
			))}
		</View>
	);
};

export default CurrentStreamInfoItems;

const styles = StyleSheet.create({
	modalBody: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingInline: 16,
		paddingBlock: 16,
	},

	modalItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		paddingBlock: 12,
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

	modalItemValue: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-400'] : Colors['theme-600'],
		flex: 1,
		textAlign: 'right',
		overflow: 'hidden',
	},
});
