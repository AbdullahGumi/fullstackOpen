import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatient } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(patientsServices.getPatients());
});

router.post('/', (_req, _res) => {
	try {
		const patientToAdd = toNewPatient(_req.body);
		const newPatient = patientsServices.addPatient(patientToAdd);
		_res.json(newPatient);
	} catch(e) {
	    _res.status(400).send(e.message);
	}
})

export default router;