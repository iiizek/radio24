import SpotifyIcon from '../assets/icons/SpotifyIcon.jsx';
import AppleMusicIcon from '../assets/icons/AppleMusicIcon.jsx';
import ZvukIcon from '../assets/icons/ZvukIcon.jsx';
import VkIcon from '../assets/icons/VKMusicIcon.jsx';
import YandexMusicIcon from '../assets/icons/YandexMusicIcon.jsx';

import { Colors } from './Colors.js';

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
		url: `https://music.yandex.ru/search?text=`,
		icon: <YandexMusicIcon width={30} height={30} fill={Colors['brand-800']} />,
	},

	{
		id: 2,
		title: 'VK Музыка',
		url: `https://vk.com/music?q=`,
		icon: <VkIcon width={30} height={30} fill={Colors['brand-800']} />,
	},

	{
		id: 3,
		title: 'Zvuk',
		url: `https://zvuk.com/search?query=`,
		icon: <ZvukIcon width={30} height={30} fill={Colors['brand-800']} />,
	},

	{
		id: 4,
		title: 'Spotify',
		url: `https://open.spotify.com/search/`,
		icon: <SpotifyIcon width={30} height={30} fill={Colors['brand-800']} />,
	},

	{
		id: 5,
		title: 'Apple Music',
		url: `https://music.apple.com/ru/search?term=`,
		icon: <AppleMusicIcon width={30} height={30} fill={Colors['brand-800']} />,
	},
];
