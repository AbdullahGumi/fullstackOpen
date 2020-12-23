import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, _res) => {
	const { query } = _req;

	if(!query.weight || !query.height) {
		_res.status(400).json({ message: 'missing parameter' });
	}

	if(isNaN(Number(query.weight)) || isNaN(Number(query.height))) {
		_res.status(400).json({ message: 'malforamatted parameters' });
	}

	const bmi = calculateBmi(Number(query.height), Number(query.weight));
	_res.status(201).json({ weight: query.weight, height: query.height, bmi  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});