const express = require('express');
const axios = require('axios');
const iconv = require('iconv-lite');

class RadioStream {
	constructor(index, stream, artist, title) {
		this.id = index;
		this.listenUrl = stream.listenurl;
		this.listeners = stream.listeners;
		this.serverUrl = stream.server_url;
		this.genre = null;
		this.serverDescription = null;
		this.serverName = null;
		this.artist = artist?.trim();
		this.title = title?.trim();
		this.coverUrl = `URL_ОБЛОЖКИ`;
	}
}

class RadioStreamManager {
	constructor() {
		this.streams = [];
		this.icecastUrl = 'https://stream.vyshka24.ru/status-json.xsl';
		this.startUpdating();
	}

	async fetchStreams() {
		try {
			// Запрос данных с Icecast
			const response = await axios.get(this.icecastUrl, {
				responseType: 'arraybuffer',
			});
			const buffer = Buffer.from(response.data, 'binary');
			let decodedData = iconv.decode(buffer, 'utf-8');

			if (decodedData.includes('�')) {
				decodedData = iconv.decode(buffer, 'windows-1251');
			}

			//Корректировка неправильных данных с Icecast
			let correctedData = decodedData.replace(/:\s*-\s*([,}])/g, ':""$1');
			correctedData = correctedData.replace(/:\s*-\s*]/g, ':""]');

			const icecastData = JSON.parse(correctedData);

			// Обновление потоков
			this.streams = icecastData.icestats.source.map((stream, index) => {
				const decodedTitle = stream.title
					? this.decodeWithFallback(Buffer.from(stream.title, 'binary'))
					: 'Прямой эфир';

				const [artist, title] = decodedTitle
					? decodedTitle.split(' - ')
					: ['Прямой', 'эфир'];

				return new RadioStream(index, stream, artist, title);
			});
		} catch (error) {
			console.error('Ошибка при запросе данных с Icecast:', error);
		}
	}

	decodeWithFallback(buffer) {
		let text = iconv.decode(buffer, 'utf-8');
		if (text.includes('�')) {
			text = iconv.decode(buffer, 'windows-1251');
		}
		return text;
	}

	startUpdating() {
		this.fetchStreams();
		setInterval(() => this.fetchStreams(), 5000); // Обновление данных каждые 5 секунд
	}
}

// Инициализация приложения
const app = express();
const PORT = process.env.PORT || 3000;
const radioStreamManager = new RadioStreamManager();

app.get('/api/radio-streams', (req, res) => {
	res.json({ streams: radioStreamManager.streams });
});

app.listen(PORT, () => {
	console.log(`Промежуточный сервер запущен на порту ${PORT}`);
});
