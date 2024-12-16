import { io } from 'socket.io-client';

import { API_URL } from '../constants/Environments';

const SOCKET_URL = API_URL;

const socket = io(SOCKET_URL, {
	transports: ['websocket'],
	reconnection: true,
	reconnectionAttempts: 5,
	timeout: 10000,
});

export default socket;
