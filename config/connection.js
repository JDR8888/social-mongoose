const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.mongoose.connection;