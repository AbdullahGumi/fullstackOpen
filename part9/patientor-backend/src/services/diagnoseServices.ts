import diagnosesData from '../data/diagnoses';

import { Diagnose } from '../types';

// const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
	return diagnosesData;
};

export default { getDiagnoses };