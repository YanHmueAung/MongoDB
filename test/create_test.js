const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        //assert(1 + 1 === 2);
        const joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => {
                //has joe been saved successfully?
                assert(!joe.isNew);
                done()
            })
    })
})