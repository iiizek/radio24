import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

import { XIcon } from 'lucide-react-native';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import theme from '../utils/colorScheme';

const DrawerModal = ({ name, children, icon }) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<TouchableOpacity
				onPress={() => setModalVisible(!modalVisible)}
				activeOpacity={0.5}
			>
				{icon}
			</TouchableOpacity>

			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View
					style={styles.darkBackground}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>{name}</Text>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<XIcon
									strokeWidth={2.5}
									size={42}
									color={Colors['brand-800']}
								/>
							</TouchableOpacity>
						</View>

						{children}
					</View>
				</View>
			</Modal>
		</>
	);
};

export default DrawerModal;

const styles = StyleSheet.create({
	darkBackground: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	modalContainer: {
		backgroundColor:
			theme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
		width: '100%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},

	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingInline: 16,
		paddingBlock: 16,
	},

	modalTitle: {
		fontSize: 24,
		fontFamily: Fonts.bold,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},
});
