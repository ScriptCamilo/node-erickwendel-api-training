const { getPeople } = require('./service');

Array.prototype.myReduce = function (callback, initValue) {
  let finalValue = initValue ? initValue : this[0];

  for (let i = initValue ? 0 : 1; i < this.length; i++) {
    finalValue = callback(finalValue, this[i])
  }

  return finalValue;
}

async function main() {
  try {
    const { results } = await getPeople('a');

    const heights = results.map(item => parseInt(item.height));
    console.log('Heights:', heights);

    console.time('reduce');
    const total = heights.reduce((totalSum, item) => {
      return totalSum + item;
    });
    console.timeEnd('reduce');

    console.time('myReduce');
    const myReduceTotal = heights.myReduce((totalSum, item) => {
      return totalSum + item;
    });
    console.timeEnd('myReduce');

    const myList = [
      ['Script', 'Camilo'],
      ['Nodejs', 'React'],
    ]

    const myListReduce = myList.myReduce((totalList, item) => {
      return totalList.concat(item);
    }, []).join(',')

    console.log('Total:', total);
    console.log('myReduceTotal:', myReduceTotal);
    console.log('myListTotal:', myListReduce);
  } catch (error) {
    console.error(error);
  }
};

main();
