const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('users', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new user', async () => {
        let response = await request(app)
                        .post('/sign-up')
                        .send({
                            name: 'name',
                            email: 'email@email.com',
                            password: 'password'
                        });

        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('auth');
        expect(response.body.auth).toHaveLength(20);
    });

    it('should be able to log in', async () => {
        let response = await request(app)
                        .post('/login')
                        .send({
                            name: 'username_or_email',
                            password: 'password'
                        });
        
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('auth');
        expect(response.body.auth).toHaveLength(20);
    });

    it('should be able to logout', async () => {
        let response = await request(app)
                        .post('/logout')
                        .send({
                            name: 'username'
                        })
                        .auth('auth');
        
        expect(response.body).not.toHaveProperty('error');
    });
});