import express from 'express';
import { radioStreamController } from './controllers/radioStreamController.js';

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// Подключаем контроллер маршрутов
app.use('/api/radio-streams', radioStreamController);

app.listen(PORT, () => {
	console.log(`Промежуточный сервер запущен на порту ${PORT}`);
});

export default app;
