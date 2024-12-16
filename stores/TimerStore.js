import { create } from 'zustand';
import usePlayerStore from './PlayerStore';

const useTimerStore = create((set, get) => ({
	selectedTime: null,
	timeLeft: null,
	timerInterval: null,

	// Устанавливаем время окончания таймера
	setSelectedTime: (time) => {
		const { timerInterval, startTimer } = get();

		// Сбрасываем предыдущий таймер, если он есть
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		set({
			selectedTime: time,
			timeLeft: Math.ceil((time - Date.now()) / 1000),
		});
		startTimer();
	},

	// Обновляем оставшееся время
	setTimeLeft: (time) => {
		const { timeLeft } = get();
		if (time !== timeLeft) {
			set({ timeLeft: time });
		}
	},

	// Сбрасываем таймер
	resetTimer: () => {
		const { timerInterval } = get();
		if (timerInterval) {
			clearInterval(timerInterval);
		}
		set({ selectedTime: null, timeLeft: null, timerInterval: null });
	},

	// Запускаем таймер
	startTimer: () => {
		const { selectedTime, setTimeLeft, resetTimer } = get();

		const interval = setInterval(() => {
			const remainingTime = Math.max(
				0,
				Math.ceil((selectedTime - Date.now()) / 1000)
			);

			setTimeLeft(remainingTime);

			if (remainingTime <= 0) {
				clearInterval(interval);
				usePlayerStore.getState().pauseStream();
				resetTimer();
			}
		}, 1000);

		set({ timerInterval: interval });
	},
}));

export default useTimerStore;
