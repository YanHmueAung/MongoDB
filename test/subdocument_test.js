const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Post Title' }]
        })
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Post Title')
                done();
            })

    })
    it('Can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        })

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                return user.save();
                //in here return makes sure to save and continue to next .then
                //looks like async await and making sure it is done
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                //console.log(user)
                assert(user.posts[0].title === 'New Post')
                done();
            })
    })
    it('Can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'New title' }]
        })
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.posts.length === 0)
                done();

            })
    })
})