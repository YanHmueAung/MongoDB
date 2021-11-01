const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'Js is great', content: 'Yep it is real' });
        comment = new Comment({ content: 'Voila' });
        //console.log(blogPost)
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    })

    it('saves a relation between a user and a blog Post', (done) => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then(user => {
                //console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'Js is great')
                done();
            })
    })
    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                console.log(user.blogPosts[0].comments[0].content);
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'Js is great')
                assert(user.blogPosts[0].comments[0].content === 'Voila')
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done()
            })
    })

})