import patientsData from '../data/patients';
// import patientsJson from '../data/patients.json';

import { NonSensitivePatientEntry, NewPatientEntry, Patient, Entry, NewEntry} from '../types';

let savedPatients = [...patientsData];

const getPatients = (): NonSensitivePatientEntry[] => {
	  return savedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, entries };
  });
};

const addPatient = (patient: NewPatientEntry): Patient => {

  const newPatientEntry = {...patient, id: Math.floor(Math.random() * 100000).toString(), entries: [] as Entry[]}
  savedPatients = savedPatients.concat(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: any): Patient | undefined => {
  const patientById = savedPatients.find(patient => patient.id === id);
  return patientById;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: Math.floor(Math.random() * 100000).toString() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  console.log('savedPatient:', savedPatient)
  savedPatients = savedPatients.map((p) => (p.id === savedPatient.id ? savedPatient : p));

  return savedPatient;
};

export default { getPatients, addPatient, findPatientById, addEntry };