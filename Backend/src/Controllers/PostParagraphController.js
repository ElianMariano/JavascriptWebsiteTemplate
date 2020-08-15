const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    // Returns data for a especific post
    async index(req, res) {
        const { post_id } = req.body;

        const paragraphs = await connection('post_paragraph')
                            .where('post_id', '=', post_id)
                            .orderBy('id')
                            .select(['paragraph_id', 'type', 'content']);

        if (paragraphs == undefined){
            return res.status(404).json({
                error: 'No paragraph for this post found'
            });
        }

        paragraphs.map((paragraph, index) => {
            return {
                id: index,
                ...paragraph
            };
        });

        return paragraphs;
    },

    async create(req, res){
        const { post_id, type, content } = req.body;
        
        if (content == undefined){
            return res.status(400).json({
                error: 'Text or image path not provided.'
            });
        }
        
        if (type != 'text' &&
            type != 'title' &&
            type != 'quote' &&
            type != 'embed' &&
            type != 'image'){
                return res.status(400).json({
                    error: 'Text type not allowed!'
                });
        }

        const post = await connection('post')
                        .where('id', '=', post_id)
                        .select('id')
                        .first();
        
        if (post['id'] == undefined){
            return res.status(406).json({
                error: 'Invalid post id.'
            });
        }

        // Generates an unique id
        const id = generateUniqueId();

        await connection('post_paragraph')
                        .insert({
                            paragraph_id: id,
                            post_id: post['id'],
                            content
                        });
    },

    async update(req, res){

    },

    async delete(req, res){

    }
}