import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import useTimerStore from '../stores/TimerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import theme from '../utils/colorScheme';

const TimerForm = () => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const { selectedTime, timeLeft, setSelectedTime, resetTimer } =
		useTimerStore();

	// Показ и скрытие DateTimePicker
	const showDatePicker = () => setDatePickerVisibility(true);
	const hideDatePicker = () => setDatePickerVisibility(false);

	// Обработчик выбора времени
	const handleConfirm = (date) => {
		const now = new Date();
		let selectedDateTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			date.getHours(),
			date.getMinutes()
		);

		// Если выбранное время уже прошло, добавляем 1 день
		if (selectedDateTime <= now) {
			selectedDateTime.setDate(selectedDateTime.getDate() + 1);
		}

		setSelectedTime(selectedDateTime.getTime());
		hideDatePicker();
	};

	// Обработчик кнопок с фиксированным временем
	const handleFixedTime = (minutes) => {
		const now = new Date();
		const selectedDateTime = new Date(now.getTime() + minutes * 60000);
		setSelectedTime(selectedDateTime.getTime());
	};

	return (
		<View style={styles.container}>
			<Text style={styles.timerText}>
				{timeLeft !== null
					? `До остановки: ${
							timeLeft >= 3600 ? `${Math.floor(timeLeft / 3600)} ч.` : ''
					  } ${Math.floor((timeLeft % 3600) / 60)} мин. ${timeLeft % 60} сек.`
					: 'Время отключения не установлено'}
			</Text>

			<View style={styles.buttons}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View style={styles.buttonsGroup}>
						{[15, 30, 45, 60, 90, 120].map((minutes) => (
							<TouchableOpacity
								key={minutes}
								activeOpacity={0.5}
								onPress={() => handleFixedTime(minutes)}
							>
								<View style={styles.outlinedButton}>
									<Text style={styles.outlinedButtonText}>{minutes} мин.</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>

				<TouchableOpacity
					activeOpacity={0.5}
					onPress={selectedTime ? resetTimer : showDatePicker}
				>
					<View style={styles.button}>
						<Text style={styles.buttonText}>
							{selectedTime ? 'Сбросить таймер' : 'Открыть таймер'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			{/* Модальное окно выбора времени */}
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode='time'
				is24Hour={true}
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				confirmTextIOS='Подтвердить'
				cancelTextIOS='Отмена'
				headerTextIOS='Выберите время'
			/>
		</View>
	);
};

export default TimerForm;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: 24,
		paddingTop: 24,
		paddingBottom: 24,
		paddingHorizontal: 24,
		width: '100%',
	},

	timerText: {
		textAlign: 'center',
		fontSize: 18,
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	},

	buttons: {
		gap: 12,
		width: '100%',
	},

	buttonsGroup: {
		justifyContent: 'flex-start',
		gap: 12,
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: -12,
		//set inset shadow in horizontal
		shadowColor: theme === 'dark' ? Colors['theme-900'] : Colors['theme-100'],
		shadowOpacity: 0.5,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},

	buttonsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 12,
		width: '100%',
	},

	outlinedButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors['brand-800'],
		borderWidth: 1,
		borderRadius: 4,
		padding: 12,
	},

	outlinedButtonText: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: Colors['brand-800'],
		textAlign: 'center',
	},

	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors['brand-800'],
		borderRadius: 4,
		padding: 12,
		borderWidth: 1,
		borderColor: Colors['brand-800'],
	},

	buttonText: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: Colors['theme-50'],
		textAlign: 'center',
	},
});
