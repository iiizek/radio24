import express from 'express';
import RadioStreamManager from '../models/RadioStreamManager.js';

const router = express.Router();
const radioStreamManager = new RadioStreamManager();

router.get('/', (req, res) => {
	res.json({ streams: radioStreamManager.streams });
});

export const radioStreamController = router;
