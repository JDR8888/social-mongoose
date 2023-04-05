const connection = require('../config/connection');
const {User, Thought} = require('../models-schemas');
connection.on('error', (err) => err);

const {getRandomItem, 