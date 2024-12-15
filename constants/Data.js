import usePlayerStore from '../stores/PlayerStore';

import SpotifyIcon from '../assets/icons/SpotifyIcon.jsx';
import AppleMusicIcon from '../assets/icons/AppleMusicIcon.jsx';
import ZvukIcon from '../assets/icons/ZvukIcon.jsx';
import VkIcon from '../assets/icons/VKMusicIcon.jsx';
import YandexMusicIcon from '../assets/icons/YandexMusicIcon.jsx';

import { Colors } from './Colors.js';

const title = usePlayerStore.getState().currentStream?.title;
const artist = usePlayerStore.getState().currentStream?.artist;

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
		url: `https://music.yandex.ru/search?text=${artist} ${title}`,
		icon: <YandexMusicIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 2,
		title: 'VK Музыка',
		url: `https://vk.com/music?q=${artist} ${title}`,
		icon: <VkIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 3,
		title: 'Zvuk',
		url: `https://zvuk.com/search?query=${artist} ${title}`,
		icon: <ZvukIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 4,
		title: 'Spotify',
		url: `https://open.spotify.com/search/${artist} ${title}`,
		icon: <SpotifyIcon width={24} height={24} fill={Colors['brand-800']} />,
	},

	{
		id: 5,
		title: 'Apple Music',
		url: `https://music.apple.com/ru/search?term=${artist} ${title}`,
		icon: <AppleMusicIcon width={24} height={24} fill={Colors['brand-800']} />,
	},
];
