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
});

router.get("/:id", (req, res) => {
  const patient = patientsServices.findPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;