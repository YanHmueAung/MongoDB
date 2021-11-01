const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined })
        const validation = user.validateSync();
        console.log(validation.errors.name.properties.message);
        const message = validation.errors.name.properties.message;

        assert(message === 'Name is required')

    })
    it('requires a user\'s name longer than 2 characters', (done) => {
        const user = new User({ name: 'Al' });
        const validation = user.validateSync();
        const message = validation.errors.name.properties.message;
        assert(message === 'Name must be longer than 2 characters')
        done();
    })
    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch((valResult) => {
                console.log(valResult.errors.name.properties.message)
                const message = valResult.errors.name.properties.message;
                assert(message === 'Name must be longer than 2 characters')
                done();
            })

    })
})