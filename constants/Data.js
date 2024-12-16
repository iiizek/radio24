import usePlayerStore from '../stores/PlayerStore';

import SpotifyIcon from '../assets/icons/SpotifyIcon.jsx';
import AppleMusicIcon from '../assets/icons/AppleMusicIcon.jsx';
import ZvukIcon from '../assets/icons/ZvukIcon.jsx';
import VkIcon from '../assets/icons/VKMusicIcon.jsx';
import YandexMusicIcon from '../assets/icons/YandexMusicIcon.jsx';

import { Colors } from './Colors.js';

const currentStream = usePlayerStore.getState().currentStream;

export const currentStreamInfo = {
	Название: '-',
	Описание: '-',
	Артист: '-',
	Трек: '-',
	Жанр: '-',
	Битрейт: '-',
	'Stream URL': '-',
	Формат: '-',
};

export const musicLinksData = [
	{
		id: 1,
		title: 'Яндекс Музыка',
		url: `https://music.yandex.ru/search?text=${currentStream?.artist} ${currentStream?.title}`,
		icon: <YandexMusicIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 2,
		title: 'VK Музыка',
		url: `https://vk.com/music?q=${currentStream?.artist} ${currentStream?.title}`,
		icon: <VkIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 3,
		title: 'Zvuk',
		url: `https://zvuk.com/search?query=${currentStream?.artist} ${currentStream?.title}`,
		icon: <ZvukIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 4,
		title: 'Spotify',
		url: `https://open.spotify.com/search/${currentStream?.artist} ${currentStream?.title}`,
		icon: <SpotifyIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 5,
		title: 'Apple Music',
		url: `https://music.apple.com/ru/search?term=${currentStream?.artist} ${currentStream?.title}`,
		icon: <AppleMusicIcon width={24} height={24} fill={Colors['brand-800']} />,
	},
];
