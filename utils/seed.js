const connection = require('../config/connection');
const {User, Thought} = require('../models-schemas');
const {usernames, thoughtsArray, getRandomItem} =  require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('ayo we connected');

    await User.deleteMany({});
    await Thought.deleteMany({});
    // await User.findOneAndDelete({ username: null })
    const users = []; //array to store user objects in
    const filteredUsernames = usernames.filter(username => username !== null);
    // // // will pull all usernames from username array and to add name/email based on name, and put empty array inside for thoughts
    for (i = 0; i < filteredUsernames.length; i++) {
        const userName = filteredUsernames[i];
        // console.log(userName);
        const user = {username: userName, email: `${filteredUsernames[i]}@gmail.com`, thoughts: [], };
        users.push(user);
    }
    await users.shift();
    
    // console.log(User({userName: null}));
    await User.collection.insertMany(users);

    // const filteredThoughts = thoughtsArray.filter(thought => thought !== null);

    // for (i =0; i < filteredThoughts.length; i++) {
    //     const thought = filteredThoughts[i]; //go through every thought
    //     // console.log(thought);
    //     const thoughtUser = getRandomItem(filteredUsernames); // pick a random user for that thought
    //     const user = await User.findOne({username: `${thoughtUser}` }); // find that user in the db
    //     const newThought = { thoughtText: `${thought}`, username: `${thoughtUser}`, reactions: [] } // make a new thought for the db
    //     // console.log(user);
    //     // console.log(user.thoughts);
    //     user.thoughts.push(newThought);
    //     await Thought.create(newThought);
    //     await user.save();
    // }

    console.table(users);
//   console.table(thoughts);
  console.info('Whoa man looka them seeds 🌱🌱🌱🌱');
  process.exit(0);

})