const connection = require('../../src/database/connection');
const request = require('supertest');
const app = require('../../src/app');

describe('Categories', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it ('should be able to request an array of categories', async () => {
        const response = await request(app)
                        .get('/categories-profile');

        expect(response.body).toHaveProperty('categories');
    });

    it('should be able to create a new category', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password');

        response = await request(app)
                        .post('/categories-create')
                        .send({
                            name: 'username',
                            category: 'category'
                        })
                        .auth(response.body.auth);

        expect(response.body).not.toHaveProperty('error');
    });

    it('should be able to edit a category', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password');
        
        response = await request(app)
                        .post('/categories-create')
                        .send({
                            name: 'username',
                            category: 'category'
                        })
                        .auth(response.body.auth);

        response = await request(app)
                        .post('/categories-edit')
                        .send({
                            name: 'username',
                            category: 'category',
                            new_category: 'new category'
                        })
                        .auth(response.body.auth);

        expect(response.body).not.toHaveProperty('error');
    });

    it('should be able to delete a category', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'username',
                            email: 'email@email.com'
                        })
                        .set('Password', 'password');
        
        response = await request(app)
                        .post('/categories-create')
                        .send({
                            name: 'username',
                            category: 'category'
                        })
                        .auth(response.body.auth);

        response = await request(app)
                        .delete('/categoies-delete')
                        .send({
                            name: 'username',
                            category: 'category',
                            new_category: 'new category'
                        })
                        .auth(response.body.auth);

        expect(response.body).not.toHaveProperty('error');
    });
});