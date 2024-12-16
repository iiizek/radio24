import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

import useTimerStore from '../stores/TimerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import theme from '../utils/colorScheme';

const TimerForm = () => {
	const [showPicker, setShowPicker] = useState(false);
	const { selectedTime, timeLeft, setSelectedTime, resetTimer } =
		useTimerStore();

	// Обработчик изменения времени
	const handleTimeChange = (event, date) => {
		setShowPicker(false);

		if (date) {
			// Преобразуем выбранное время в абсолютное значение
			const now = new Date();
			const selectedDateTime = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				date.getHours(),
				date.getMinutes()
			);

			// Если выбранное время в прошлом, добавляем 1 день
			if (selectedDateTime <= now) {
				selectedDateTime.setDate(selectedDateTime.getDate() + 1);
			}

			setSelectedTime(selectedDateTime.getTime()); // Сохраняем время окончания
		}
	};

	handleShowPicker = () => {
		setShowPicker(true);
	};

	return (
		<View style={styles.container}>
			{showPicker && (
				<DateTimePicker
					value={new Date()}
					mode='time'
					is24Hour={true}
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={handleTimeChange}
				/>
			)}

			<Text style={styles.timerText}>
				{timeLeft !== null
					? `До остановки: ${
							timeLeft > 3600 ? `${Math.floor(timeLeft / 3600)} ч.` : ''
					  } ${Math.floor((timeLeft % 3600) / 60)} мин. ${timeLeft % 60} сек.`
					: 'Время отключения не установлено'}
			</Text>

			<TouchableOpacity
				activeOpacity={0.5}
				onPress={selectedTime ? resetTimer : handleShowPicker}
			>
				<View style={styles.button}>
					<Text style={styles.buttonText}>
						{selectedTime ? 'Сбросить таймер' : 'Установить таймер'}
					</Text>
				</View>
			</TouchableOpacity>
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

	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors['brand-800'],
		borderRadius: 4,
		padding: 12,
	},

	buttonText: {
		fontSize: 20,
		fontFamily: Fonts.regular,
		color: Colors['theme-50'],
		textAlign: 'center',
	},
});
