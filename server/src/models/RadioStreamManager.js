import RadioStream from './RadioStream.js';
import { decodeWithFallback } from '../utils/decoder.js';
import { fetchIcecastData } from '../services/icecastService.js';

class RadioStreamManager {
	constructor() {
		this.streams = [];
		this.icecastUrl = 'https://stream.vyshka24.ru/status-json.xsl';
		this.startUpdating();
	}

	async fetchStreams() {
		try {
			// Используем сервис для получения данных Icecast
			const icecastData = await fetchIcecastData(this.icecastUrl);

			// Обновляем потоки
			this.streams = icecastData.icestats.source.map((stream, index) => {
				const decodedTitle = stream.title
					? decodeWithFallback(Buffer.from(stream.title, 'binary'))
					: '';

				// Разделяем title на artist и track, если это возможно
				const [artist, title] = decodedTitle
					? decodedTitle.split(' - ')
					: ['Прямой', 'эфир'];

				return new RadioStream(index, stream, artist, title);
			});
		} catch (error) {
			console.error('Ошибка при запросе данных с Icecast:', error);
		}
	}

	startUpdating() {
		this.fetchStreams();
		setInterval(() => this.fetchStreams(), 5000); // Обновление данных каждые 5 секунд
	}
}

export default RadioStreamManager;
