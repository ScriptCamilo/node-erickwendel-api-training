const Commander = require('commander');
const Database = require('./database');
const Hero = require('./hero');

async function main() {
  Commander
    .version('v1')
    .option('-n, --name [value]', "Hero's name")
    .option('-p, --power [value]', "Hero's power")
    .option('-i, --id [value]', "Hero's id")

    .option('-c, --create', 'Create new hero')
    .option('-l, --list', 'List Heros')
    .option('-r, --remove', 'Remove hero by id')
    .option('-u, --update [value]', 'Update value by id')
    .parse(process.argv)

    const hero = new Hero(Commander);

    try {
      const { _optionValues: options } = Commander;

      if (options.create) {
        const result = await Database.setHero(hero);
        if (!result) {
          console.error('Hero was not created!');
          return;
        }
        console.log('Hero created with success!');
      }

      if (options.list) {
        const result = await Database.list();
        console.log(result);
        return;
      }

      if (options.remove) {
        const result = await Database.remove(hero.id);
        if (!result) {
          console.error('Failed to remove hero!');
          return;
        }
        console.log('Hero removed with success!')
      }

      if (options.update) {
        const id = Number(options.update);
        const data = JSON.stringify(hero);
        const heroToUpdate = JSON.parse(data);
        const result = await Database.update(id, heroToUpdate);

        if (!result) {
          console.error('Failed to update hero!');
          return;
        }
        console.log('Hero updated with success!')
      }
    } catch (error) {
      console.error('Err', error);
    }
}

main();
