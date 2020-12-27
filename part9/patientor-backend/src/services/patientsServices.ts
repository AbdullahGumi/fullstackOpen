import patientsData from '../data/patients';
// import patientsJson from '../data/patients.json';

import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

const getPatients = (): NonSensitivePatientEntry[] => {
	  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, entries };
  });
};

const addPatient = (patient: NewPatientEntry): Patient => {

  const newPatientEntry = {...patient, id: Math.floor(Math.random() * 100000).toString(), entries: []}
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: any): Patient | undefined => {
  const patientById = patientsData.find(patient => patient.id === id);
  return patientById;
};

export default { getPatients, addPatient, findPatientById };