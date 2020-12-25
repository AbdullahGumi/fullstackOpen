import patientsData from '../data/patients';

import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

const getPatients = (): NonSensitivePatientEntry[] => {
	  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (patient: NewPatientEntry): Patient => {

  const newPatientEntry = {...patient, id: Math.floor(Math.random() * 100000).toString()}
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };