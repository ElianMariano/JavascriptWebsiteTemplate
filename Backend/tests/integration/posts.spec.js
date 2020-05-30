const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('Posts', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new post', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password');

        response = await request(app)
                    .post('/post-create')
                    .send({
                        name: 'username',
                        title: 'post title',
                        url: 'post-url',
                        content: {},
                        category: 'category'
                    })
                    .auth(response.body.auth);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url');
        expect(response.body).not.toHaveProperty('error');
    });

    it('should be able to request a post', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'name',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password');

        response = await request(app)
                    .post('/post-create')
                    .send({
                        name: 'username',
                        title: 'post title',
                        content: {},
                        category: 'category'
                    })
                    .auth(response.body.auth);

        response = await request(app)
                    .get('/post')
                    .query({url: 'post-url'});

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('category');
    });

    it('should be able to request a array of posts', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password')

        response = await request(app)
                    .post('/post-create')
                    .send({
                        name: 'username',
                        title: 'post title',
                        url,
                        content: {},
                        category: 'category'
                    })
                    .auth(response.body.auth);

        response = await request(app)
                    .get('/post-profile')
                    .query({page: 1});
        
        expect(response.body).toHaveProperty('posts');
    });

    it('should be able to search for posts', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password')

        response = await request(app)
                    .get('/post-create')
                    .send({
                        name: 'username',
                        title: 'post title',
                        url: 'url',
                        content: {},
                        category: 'category'
                    })
                    .auth(response.body.auth);
        
        response = await request(app)
                    .get('/post-search')
                    .query({title: 'post title', category: 'category'});

        expect(response.body).toHaveProperty('posts');
    });

    it('should be able to edit the post', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'name',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password')

        response = await request(app)
                    .get('/post-create')
                    .send({
                        name: 'username',
                        title: 'post title',
                        url: 'post-url',
                        content: {},
                        category: 'category'
                    })
                    .auth(response.body.auth);
        
        response = await request(app)
                        .post('/post-edit')
                        .send({
                            name: 'username',
                            title: 'new post title',
                            url: 'post-url',
                            content: {},
                            category: 'new category'
                        })
                        .auth('authkey')
                        .query({id: 'id'});

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url');
        expect(response.body).not.toHaveProperty('error');
    });
});