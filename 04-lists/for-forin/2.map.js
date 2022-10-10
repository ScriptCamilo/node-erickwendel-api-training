const service = require('./service');

Array.prototype.myMap = function (callback) {
  const newArrayMapped = [];
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i], i);
    newArrayMapped.push(result);
  }

  return newArrayMapped;
}

async function main() {
  try {
    const { results } = await service.getPeople('a');
    const namesForEach = [];

    console.time('forEach');
    results.forEach(item => {
      namesForEach.push(item.name);
    });
    console.timeEnd('forEach');

    console.time('map');
    const namesMap = results.map(item => item.name);
    console.timeEnd('map');

    console.time('myMap');
    const namesMyMap = results.myMap(item => item.name);
    console.timeEnd('myMap');

    console.log('NamesForEach:', namesForEach);
    console.log('NamesMap:', namesMap);
    console.log('NamesMyMap', namesMyMap);
  } catch (error) {

  }
}

main();
