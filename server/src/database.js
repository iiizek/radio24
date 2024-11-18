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

		// Создаём таблицу для хранения информации о радио-потоках
		db.run(
			`
            CREATE TABLE IF NOT EXISTS radio_streams (
                id INTEGER PRIMARY KEY,
                listenUrl TEXT,
                listeners INTEGER,
                serverUrl TEXT,
                genre TEXT,
                serverDescription TEXT,
                serverName TEXT,
                artist TEXT,
                title TEXT,
                coverUrl TEXT
            )
        `,
			(err) => {
				if (err) {
					console.error('Ошибка при создании таблицы:', err);
				} else {
					console.log('Таблица успешно создана или уже существует');
				}
			}
		);
	}
});

export default db;
