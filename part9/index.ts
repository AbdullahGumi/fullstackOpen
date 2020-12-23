import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (_req, _res) => {
	const { body } = _req;
	const { exercises } = body;
	let { target } = body;

	if(!target || exercises){
		return _res.status(400).json({ message: 'missing parameter' });
	}

	if(!Array.isArray(exercises)){
		return _res.status(400).json({ message: 'malformatted parameters' });
	}

  const hasMalformattedExercisesHours = exercises.some((hours) => isNaN(hours));
  target = Number(target);

  if (isNaN(target) || hasMalformattedExercisesHours) {
    return _res.status(400).json({ error: "malformatted parameters" });
  }

  return _res.json(calculateExercises(exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});