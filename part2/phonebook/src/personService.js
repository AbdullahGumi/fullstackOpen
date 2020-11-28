import axios from 'axios';
const url = '/api/persons';

const getAllPersons = () => {
	return axios.get(url);
}

const addNewPerson = (newPerson) => {
	return axios.post(url, newPerson);
}

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
}

const changeNumber = (id, newNumber) => {
  return axios.put(`${url}/${id}`, newNumber);
}

export default { getAllPersons , addNewPerson, deletePerson, changeNumber }