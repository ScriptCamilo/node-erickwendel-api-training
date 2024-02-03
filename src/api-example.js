const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const heroSchema = require('./db/strategies/mongodb/schemas/heroSchema');

const app = new Hapi.Server({
  port: 5000,
});

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, heroSchema));

  app.route([
    {
      path: '/heroes',
      method: 'GET',
      handler: (request, head) => {
        return context.read();
      }
    }
  ]);

  await app.start();
  console.log(`Server running on ${app.info.port}`);
}

main();
