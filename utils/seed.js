const connection = require('../config/connection');
const {User, Thought} = require('../models-schemas');
connection.on('error', (err) => err);

const {thoughtsArray, getRandomItem, getRandomUser} =  require('./data');

connection.once('open', async () => {
    console.log('ayo we connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
    const users = []

    for (i of thoughtsArray) {
        const thoughtText = thoughtsArray[i];
        const username = getRandomUser();

        Thought.push({
            thoughtText,
            username,
        })

    }


    await User.collection.insertMany(users);

    console.table(users);
//   console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);

})