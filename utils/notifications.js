import * as Notifications from 'expo-notifications';

// Настраиваем поведение уведомлений
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const requestNotificationsPermission = async () => {
	const { status } = await Notifications.requestPermissionsAsync();

	if (status === 'granted') {
		console.log('Разрешение на уведомления предоставлено');
		return true;
	} else {
		console.log('Разрешение на уведомления отклонено');
		return false;
	}
};

// Функция отправки уведомления
export const sendNotification = async (title, body) => {
	console.log('Точка входа в функцию отправки уведомления');
	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
		},
		trigger: null,
	});
	console.log('Уведомление отправлено');
};
