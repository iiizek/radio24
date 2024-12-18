import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	Animated,
	Easing,
	Pressable,
	PanResponder,
} from 'react-native';
import React, { useState, useRef } from 'react';

import { ChevronDownIcon } from 'lucide-react-native';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import theme from '../utils/colorScheme';

const DrawerModal = ({ name, children, icon }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const slideAnim = useRef(new Animated.Value(0)).current;
	const backgroundAnim = useRef(new Animated.Value(0)).current;

	const panY = useRef(new Animated.Value(0)).current;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (evt, gestureState) => {
			// Обновляем положение по вертикали
			if (gestureState.dy > 0) {
				panY.setValue(gestureState.dy);
			}
		},
		onPanResponderRelease: (evt, gestureState) => {
			if (gestureState.dy > 100) {
				// Если свайп вниз значительный, закрываем модалку
				closeModal();
			} else {
				// Возвращаем модалку обратно
				Animated.timing(panY, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}).start();
			}
		},
	});

	const openModal = () => {
		setModalVisible(true);

		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.out(Easing.exp),
				useNativeDriver: true,
			}),
			Animated.timing(backgroundAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}),
		]).start();
	};

	const closeModal = () => {
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				easing: Easing.inOut(Easing.exp),
				useNativeDriver: true,
			}),
			Animated.timing(backgroundAnim, {
				toValue: 0,
				duration: 300,
				easing: Easing.inOut(Easing.ease),
				useNativeDriver: true,
			}),
		]).start(() => {
			setModalVisible(false);
			panY.setValue(0);
		});
	};

	const slideUp = slideAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [300, 0],
	});

	const backgroundOpacity = backgroundAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	return (
		<>
			<TouchableOpacity onPress={openModal} activeOpacity={0.5}>
				{icon}
			</TouchableOpacity>

			<Modal
				animationType='none'
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<Animated.View
					style={[styles.darkBackground, { opacity: backgroundOpacity }]}
				>
					<Pressable onPress={closeModal} style={{ flex: 1, width: '100%' }} />
					<Animated.View
						{...panResponder.panHandlers}
						style={[
							styles.modalContainer,
							{ transform: [{ translateY: slideUp }, { translateY: panY }] },
						]}
					>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>{name}</Text>
							<TouchableOpacity activeOpacity={0.5} onPress={closeModal}>
								<ChevronDownIcon
									strokeWidth={2.5}
									size={36}
									color={Colors['brand-800']}
								/>
							</TouchableOpacity>
						</View>

						{children}
					</Animated.View>
				</Animated.View>
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
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},

	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	modalTitle: {
		fontSize: 24,
		fontFamily: Fonts.bold,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},
});
