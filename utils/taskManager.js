import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { sendNotification } from './notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../constants/Environments';

const FETCH_POSTERS_TASK = 'FETCH_POSTERS_TASK';

const loadLastPostersId = async () => {
	const storedIds = await AsyncStorage.getItem('lastPostersId');
	return storedIds ? JSON.parse(storedIds) : [];
};

const saveLastPostersId = async (ids) => {
	await AsyncStorage.setItem('lastPostersId', JSON.stringify(ids));
};

const fetchPosters = async () => {
	console.log('-- ЗАПУСК ФОНОВОЙ ЗАДАЧИ --');
	try {
		const response = await fetch(`${API_URL}/api/posters`);
		const posters = await response.json();

		let lastPostersId = await loadLastPostersId();

		if (posters.length > 0) {
			for (const poster of posters) {
				if (!lastPostersId.includes(poster.id)) {
					lastPostersId.push(poster.id);

					// Сохраняем обновленный список
					await saveLastPostersId(lastPostersId);

					await sendNotification(poster.title, poster.body);
					break;
				}
			}
		}

		return BackgroundFetch.BackgroundFetchResult.NewData;
	} catch (error) {
		console.error('Error fetching posters:', error);
		return BackgroundFetch.BackgroundFetchResult.Failed;
	}
};

TaskManager.defineTask(FETCH_POSTERS_TASK, async () => {
	console.log('-- ФОНОВАЯ ЗАДАЧА ВЫЗВАНА --');
	return fetchPosters();
});

// Функция для запуска фоновой задачи
export const startBackgroundFetch = async () => {
	console.log('Запуск фоновой задачи');
	const status = await BackgroundFetch.getStatusAsync();
	console.log('Статус фоновой задачи:', status);

	if (status == 3) {
		console.log('Регистрация фоновой задачи');
		await BackgroundFetch.registerTaskAsync(FETCH_POSTERS_TASK, {
			minimumInterval: 60 * 1, // Интервал в секундах
			stopOnTerminate: false, // Не останавливать при завершении приложения
			startOnBoot: true, // Запускать при перезагрузке устройства
		});

		console.log('Фоновая задача зарегистрирована✨');

		const registeredTasks = await TaskManager.getRegisteredTasksAsync();
		console.log('Зарегистрированные задачи:', registeredTasks);
		const status = await BackgroundFetch.getStatusAsync();
		console.log('Статус фоновой задачи:', status);
	} else {
		console.error('Background fetch не поддерживается');
	}
};

// Остановка фоновой задачи
export const stopBackgroundFetch = async () => {
	await BackgroundFetch.unregisterTaskAsync(FETCH_POSTERS_TASK);
	console.log('Фоновая задача остановлена');
};
