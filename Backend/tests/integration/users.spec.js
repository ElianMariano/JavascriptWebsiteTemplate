const request = require('supertest');
const app = require('../../src/app');

describe('users', () => {
    it('should be able to create a new user', async () => {
        let response = await request(app)
                        .post('/sign-in')
                        .send({
                            name: 'name',
                            email: 'email@email.com',
                            password: 'password'
                        });

        expect(response).toHaveProperty('name');
        
        expect(response).toHaveProperty('auth');
        expect(response.body.auth).toHaveLength(20);
    });

    it('should be able to log in', async () => {
        let response = await request(app)
                        .post('/login')
                        .send({
                            user: 'username_or_email',
                            password: 'password'
                        });
        
        expect(response).toHaveProperty('name');
        expect(response).toHaveProperty('auth');
        expect(response.body.auth).toHaveLength(20);
    });

    it('should be able to logout', async () => {
        let response = await request(app)
                        .post('/logout')
                        .send({
                            name: 'username',
                        })
                        .auth('auth');
        
        expect(response).toHaveProperty('logout');
    });
});