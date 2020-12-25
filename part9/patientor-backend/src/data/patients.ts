import { Patient } from '../types';
import { toNewPatient } from "../utils.ts";
import patientsJson from "./patients.json";

const patientsData: Patient[] = patientsJson.map((object) => {
  const patient = toNewPatient(object) as Patient;
  patient.id = object.id;
  return patient;
});

export default patientsData;