import patientsData from '../data/patients';

import { NonSensitivePatientEntry, NewPatientEntry } from '../types';

// const diagnoses: Array<Diagnose> = patientsData;

const getPatients = (): NonSensitivePatientEntry[] => {
	  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
  ): NewPatientEntry => {

  const newPatientEntry = {
    id: Math.floor(Math.random() * 100000).toString(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  }

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };