import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatient, toNewEntry } from "../utils";

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
	    _res.status(400).send({ error: e.message});
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

router.post("/:id/entries", (req, res) => {
  const patient = patientsServices.findPatientById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientsServices.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send({ error: e.message});
    }
  } else {
    res.status(404).send("Not Found");
  }
});

export default router;