const { getPeople } = require('./service');

Array.prototype.myFilter = function (callback) {
  const list = [];
  for (i in this) {
    const result = callback(this[i], i, this);
    if (!result) continue;
    list.push(this[i]);
  }
  return list;
}

async function main() {
  try {
    const { results } = await getPeople('a');

    console.time('filter');
    const larsFamily = results.filter(item => {
      const result = item.name.toLowerCase().indexOf('lars') !== -1;
      return result;
    });
    console.timeEnd('filter');

    console.time('myFilter');
    const larsFamilyMyFilter = results.myFilter((item) => {
      const result = item.name.toLowerCase().indexOf('lars') !== -1;
      return result;
    });
    console.timeEnd('myFilter');

    const names = larsFamily.map(person => person.name);
    const namesMyFilter = larsFamilyMyFilter.map(person => person.name);
    console.log(names);
    console.log(namesMyFilter);
  } catch (error) {
    console.error(error);
  }
};

main();
