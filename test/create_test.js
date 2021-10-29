const assert = require('assert');
const User = require('../src/user');
describe('Creating records', () => {
    it('saves a user', () => {
        //assert(1 + 1 === 2);
        const joe = new User({
            name: 'Joe'
        });
        joe.save();
    })
})//done tell the mocha when everything is done
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //Ready to run the next test!
        done();
    });
})