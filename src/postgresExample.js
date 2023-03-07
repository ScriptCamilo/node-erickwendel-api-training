// npm install sequelize pg-hstore pg
const Sequelize = require('sequelize');

const driver = new Sequelize(
  'heroes',
  'scriptcamilo',
  'mysecretpassword',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
  }
);

async function main() {
  const Heroes = driver.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    power: {
      type: Sequelize.STRING,
      required: true,
    }
  }, {
    tableName: 'TB_HEROES',
    freezeTableName: false,
    timestamps: false,
  });

  await Heroes.sync();

  const result = await Heroes.findAll({
    raw: true,
  });

  console.log('result', result);
}

main();
