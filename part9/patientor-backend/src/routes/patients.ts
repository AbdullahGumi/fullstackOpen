import express from 'express';
import patientsServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(patientsServices.getPatients());
});

router.post('/', (_req, _res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
	const newPatient = patientsServices.addPatient(
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	);
	_res.json(newPatient);
})

export default router;