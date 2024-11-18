import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../data/radio.db');
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Ошибка подключения к базе данных:', err);
	} else {
		console.log('Успешное подключение к базе данных SQLite');
	}
});

export default db;
