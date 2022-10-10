const EventEmitter = require('events');
class MyEmitter extends EventEmitter {

};

const myEmitter = new MyEmitter();
const eventName = 'user:click';

myEmitter.on(eventName, (click) => {
  console.log('The user clicked', click);
});

// myEmitter.emit(eventName, 'roll');
// myEmitter.emit(eventName, 'ok');

// let count = 0;
// setInterval(() => {
//   myEmitter.emit(eventName, 'in ok' + count++);
// }, 2000);

const stdin = process.openStdin();
stdin.addListener('data', (value) => {
  console.log(`You typed: ${value.toString().trim()}`)
});
