const axios = require('axios');
const URL = 'https://swapi.dev/api/people';

async function getPeople(name) {
  const url = `${URL}/?search=${name}&format=json`;
  const response = await axios.get(url);
  console.log(response.data.results);
  return response.data;
}

getPeople('r2-d2');

module.exports = {
  getPeople,
};
