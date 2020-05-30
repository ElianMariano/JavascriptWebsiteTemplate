const connection = require('../../src/database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async post_profile(req, res){
        const { page = 1 } = req.query;

        const [ count ] = await connection('posts').count();

        const posts = await connection('posts')
                        .limit(5)
                        .offset((page - 1)*5)
                        .select('*');

        res.set('X-Total-Count', count['count(*)']);

        return res.send(posts);
    },

    async post_create(req, res){
        const { name, title, url, content, category } = req.body;
        const auth = req.headers.authorization;
        const unique_id = generateUniqueId(8);

        let response = await connection('users')
                        .where({
                            name: name,
                            auth: auth
                        })
                        .select('id')
                        .first();
        
        if (response == undefined){
            return res.status(406).send({
                error: "User not found!"
            });
        }

        const user_id = response['id'];

        response = await connection('categories')
                        .where({
                            category: category
                        })
                        .select('*')
                        .first();

        if (response == undefined){
            return res.status(406).send({
                error: "This category does not exists!"
            });
        }

        response = await connection('posts')
                        .where('url', url)
                        .select('id')
                        .first();

        if (response != undefined){
            return res.status(400).send({
                error: "This url already exists!"
            });
        }

        await connection('posts')
                    .insert({
                        id: unique_id,
                        user_id: user_id,
                        title: title,
                        url: url,
                        content: JSON.stringify(content),
                        post_category: category,
                        date: Date.now()
                    });

        return res.send({
            id: unique_id,
            url: url
        });
    },

    async post_show(req, res){
        const { url } = req.body;

        let post = await connection('posts')
                            .where('url', url)
                            .select('*')
                            .first();

        if (post == undefined){
            return res.status(406).send({
                error: "Could not find post"
            })
        }

        return res.send(post);
    },

    async post_edit(req, res){
        const { name, title, url, content, category } = req.body;
        const { id } = req.query;
        const auth = req.headers.authorization;

        let response = await connection('users')
                        .where({
                            name: name,
                            auth: auth
                        })
                        .select('id')
                        .first();
        
        if (response == undefined){
            return res.status(406).send({
                error: "User not found!"
            });
        }

        const user_id = response['id'];

        response = await connection('categories')
                        .where('category', category)
                        .select('*')
                        .first();

        if (response == undefined){
            return res.status(406).send({
                error: "This category does not exist!"
            });
        }

        response = await connection('posts')
                        .where('id', id)
                        .select('id')
                        .first();

        if (response == undefined){
            return res.status(406).send({
                error: "This post does not exist!"
            });
        }

        await connection('posts')
                    .where('id', id)
                    .update({
                        title: title,
                        url: url,
                        content: JSON.stringify(content),
                        post_category: category
                    });

        return res.send({
            id: response['id'],
            url: url
        });
    },

    async post_search(req, res){
        const { search = '', category = '' } = req.query;

        let response;

        if (search != '' && category == ''){
            response = await connection('posts')
                        .where('title', search)
                        .select('*')
                        .first();
        }
        else if (search == '' && category != ''){
            response = await connection('categories')
                        .where('category', category)
                        .select('id')
                        .first();

            if (response == undefined && response['id'] == null){
                res.status(406).send({
                    error: "Category not found!"
                })
            }

            response = await connection('posts')
                        .where('category', category)
                        .select('*');
        }

        return res.send({posts: response});
    },

    async post_delete(req, res){
        const { name } = req.body;
        const { id } = req.query;
        const auth = req.headers.authorization;

        let response = await connection('users')
                        .where({
                            name: name,
                            auth: auth
                        })
                        .select('id')
                        .first();
        
        if (response == undefined){
            return res.status(406).send({
                error: "User not found!"
            });
        }

        response = await connection('posts')
                        .where('id', id)
                        .select('id')
                        .first();

        if (response == undefined){
            return res.status(406).send({
                error: "This post does not exist!"
            });
        }

        await connection('posts')
                    .where('id', id)
                    .delete();

        return res.status(202).send();
    }
}