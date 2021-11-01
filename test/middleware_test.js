const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Mideleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'Js is great', content: 'Yep it is real' });
        //console.log(blogPost)
        joe.blogPosts.push(blogPost);
        // blogPost.comments.push(comment);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    })
    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                console.log('cccccc', count)
                assert(count === 0);
                done();
            })
    })

})