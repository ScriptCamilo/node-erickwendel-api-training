/*
TODO:
0 - Get the user
1 - Get the user phone number by Id
2 - Get the user address by Id
*/

  function getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          id: 1,
          name: 'Aladin',
          birthDate: new Date(),
        });
      }, 1000);
    });
  };

function getPhoneNumber(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        phoneNumber: '829999999',
        ddd: 82,
      });
    }, 4000);
  })
};

function getAddress(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        street: 'Dummies',
        number: 0,
      });
    }, 2000)
  });
};

async function main() {
  try {
    console.time('medida-promise');

    console.time('user');
    const user = await getUser();
    console.timeEnd('user');

    console.time('promise-all');
    const [phoneNumber, address] = await Promise.all([
      getPhoneNumber(user),
      getAddress(user),
    ]);
    console.timeEnd('promise-all');

    // console.time('phone');
    // const phoneNumber = await getPhoneNumber(user);
    // console.timeEnd('phone');

    // console.time('address');
    // const address = await getAddress(user);
    // console.timeEnd('address');

    console.log(JSON.stringify({
      user,
      phoneNumber,
      address,
    }));
    console.timeEnd('medida-promise');
  } catch (error) {
    console.error(error)
  }
}

main();

// function handleUser(error, user) {
//   if (error) {
//     console.log('Error in user');
//     return;
//   }
//   getPhoneNumber(user.id, (err, phoneNumber) => {
//     if (err) {
//       console.log('Error in phone number', err);
//       return;
//     }
//     getAddress(user.id, (e, address) => {
//       if (e) {
//         console.log('Error in address');
//         return;
//       }

//       console.log(`
//         Name: ${user.name},
//         Address: ${address.street} - ${address.number},
//         Phone number: (${phoneNumber.ddd}) ${phoneNumber.phoneNumber}
//       `)
//     })
//   });
// }

// const phoneNumber = getPhoneNumber(user.id);

// console.log(`Phone number: ${phoneNumber}`);

