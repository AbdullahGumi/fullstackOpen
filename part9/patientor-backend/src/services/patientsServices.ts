import patientsData from '../data/patients';

import { NonSensitivePatientEntry } from '../types';

// const diagnoses: Array<Diagnose> = patientsData;

const getPatients = (): NonSensitivePatientEntry[] => {
	  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export default { getPatients };