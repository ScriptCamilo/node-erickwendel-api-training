const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = 'herois.json';
  }

  async getFile() {
    const file = await readFileAsync(this.FILE_NAME, 'utf8');
    return JSON.parse(file.toString());
  }

  async writeFile(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async setHero(hero) {
    const data = await this.getFile();
    const id = Date.now();
    const heroWithId = {
      ...hero,
      id,
    }
    const finalData = [
      ...data,
      heroWithId,
    ]

    const result = await this.writeFile(finalData);
    return result;
  }

  async list(id) {
    const data = await this.getFile()
    const filteredData = data.filter(item => id ? item.id === id : true);
    return filteredData;
  }

  async remove(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    const data = await this.getFile();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) throw Error('User not found ');

    data.splice(index, 1);
    return await this.writeFile(data);
  }

  async update(id, changes) {
    const data = await this.getFile();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw Error('Hero not found');
    }

    const current = data[index];
    const toUpdate = {
      ...current,
      ...changes,
    }
    data.splice(index, 1);

    return await this.writeFile([
      ...data,
      toUpdate,
    ])
  }
}

module.exports = new Database();
