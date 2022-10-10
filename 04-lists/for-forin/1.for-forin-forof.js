const service = require('./service');

async function main() {
  try {
    const { results } = await service.getPeople('a');
    const namesFor = [];
    const namesForIn = [];
    const namesForOf = [];

    console.time('for');
    for (let i = 0; i <= results.length - 1; i += 1) {
      const person = results[i];
      namesFor.push(person.name);
    }
    console.timeEnd('for');

    console.time('forIn');
    for (let i in results) {
      const person = results[i];
      namesForIn.push(person.name);
    }
    console.timeEnd('forIn');

    console.time('forOf');
    for (person of results) {
      namesForOf.push(person.name);
    }
    console.timeEnd('forOf');

    console.log('For:', namesFor);
    console.log('ForIn:', namesForIn);
    console.log('ForOf:', namesForOf);
  } catch (error) {
    console.error('Error', Error)
  }
}

main();
