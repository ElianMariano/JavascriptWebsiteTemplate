const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');

module.exports = {
    async categories_profile(req, res){
        const response = await connection('categories')
                            .select('*');

        response.map(res => {
            res.date = Date.parse(res.date);
            return res;
        })

        return res.set('X-Total-Count', response.length)
                .json({'categories': response});
    },

    async categories_create(req, res){
        const { name, category } = req.body;
        const auth = req.headers.authorization;
        const unique_id = generateUniqueId(8);

        let response = await connection('categories')
                            .where('category', category)
                            .select('category')
                            .first();

        if (response != undefined && response['category'] == category){
            return res.status(400).json({
                error: 'This category already exists!'
            });
        }

        response = await connection('users')
                            .where({
                                name: name,
                                auth: auth
                            })
                            .select('id')
                            .first();

        if (response == undefined && response['id'] == undefined){
            return res.status(406).json({
                error: 'Can not find the user!'
            });
        }

        await connection('categories')
                            .insert({
                                id: unique_id,
                                user_id: response['id'],
                                category: category,
                                date: Date.now(),
                            });

        return res.status(201).json({'category': category});
    },

    async categories_edit(req, res){
        const { name, category, new_category } = req.body;
        const auth = req.headers.authorization;

        let response = await connection('users')
                            .where({
                                name,
                                auth: auth
                            })
                            .select('id')
                            .first();

        if (response == undefined && response['id'] == undefined){
            return res.status(406).json({
                error: 'Can not find the user!'
            });
        }

        const user_id = response['id'];

        response = await connection('categories')
                            .where({
                                category: category,
                                user_id: user_id
                            })
                            .select('category')
                            .first();

        if (response == undefined && response['category'] == undefined){
            return res.status(406).json({
                error: 'This category does not exist!'
            });
        }

        response = await connection('categories')
                            .where({
                                category: category,
                                user_id: user_id
                            })
                            .update('category', new_category);

        return res.status(202).json({'category': new_category});
    },

    // TODO Test with wrong category
    async categories_delete(req, res){
        const { name, category } = req.body;
        const auth = req.headers.authorization;

        let response = await connection('users')
                            .where({
                                name: name,
                                auth: auth
                            })
                            .select('id')
                            .first();

        if (response == undefined && response['id'] == undefined){
            return res.status(406).json({
                error: 'Can not find the user!'
            });
        }

        const user_id = response['id'];

        response = await connection('categories')
                            .where({
                                category: category,
                                user_id: user_id
                            })
                            .select('category')
                            .first();

        if (response == undefined || response['category'] == undefined){
            return res.status(406).json({
                error: 'This category does not exist!'
            });
        }

        await connection('categories')
                            .where({
                                category: category,
                                user_id: user_id
                            })
                            .delete();

        return res.status(202).json({'category': category});
    }
}