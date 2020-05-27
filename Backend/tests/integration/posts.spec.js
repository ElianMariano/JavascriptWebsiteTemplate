const request = require('supertest');
const app = require('../../src/app');

describe('Posts', () => {
    it('should be able to create a new post', async () => {
        let response = await request(app)
                    .post('/post-create')
                    .send({
                        user: 'username',
                        title: 'post title',
                        content: {},
                        category: 'category'
                    });
        
        expect(response.body).toHaveProperty('title');
    });
});