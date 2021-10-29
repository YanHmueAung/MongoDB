const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => console.log('God to go!'))
    .on('error', (error) => {
        console.warn('Error', error);
    });