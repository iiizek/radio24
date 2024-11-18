import {
	getRadioStreamData,
	updateRadioStream,
} from '../services/directusService.js';
import { fetchIcecastData } from '../services/icecastService.js';
import { decodeWithFallback } from '../utils/decoder.js';

class RadioStreamManager {
	constructor() {
		this.streams = [];
		this.icecastUrl = 'https://stream.vyshka24.ru/status-json.xsl';
		this.startUpdating();
	}

	async fetchStreams() {
		try {
			// Получаем данные с Icecast
			const icecastData = await fetchIcecastData(this.icecastUrl);

			// Получаем существующие записи в Directus
			const existingStreams = await getRadioStreamData();

			this.streams = await Promise.all(
				icecastData.icestats.source.map(async (stream, index) => {
					const decodedTitle = stream.title
						? decodeWithFallback(Buffer.from(stream.title, 'binary'))
						: '';
					const [artist, title] = decodedTitle
						? decodedTitle.split(' - ')
						: ['Прямой', 'эфир'];

					// Подготовка данных для обновления
					const radioStreamData = {
						listenUrl: stream.listenurl,
						listeners: stream.listeners,
						serverUrl: stream.server_url,
						artist: artist?.trim(),
						title: title?.trim(),
					};

					// Проверяем, существует ли запись в Directus, и обновляем её
					if (existingStreams[index]) {
						await updateRadioStream(existingStreams[index].id, radioStreamData);
					} else {
						console.error(`Поток с индексом ${index} не найден в Directus`);
					}

					return radioStreamData;
				})
			);
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
