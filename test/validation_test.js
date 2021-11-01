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
    it('requires a user name', () => {

    })
})