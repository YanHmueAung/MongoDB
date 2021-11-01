const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Global Promise is a ES6 syntax for node
//declaring to use other Promises than mongoose Promise Library

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Error', error);
        });

})

//done tell the mocha when everything is done
beforeEach((done) => {
    //console.log(mongoose.connection.collections)
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        //Ready to run the next test!
        comments.drop(() => {
            blogposts.drop(() => {
                done();

            })
        })
    });
})