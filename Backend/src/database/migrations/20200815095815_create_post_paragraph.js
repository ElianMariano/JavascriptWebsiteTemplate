
exports.up = function(knex) {
    return knex.schema.createTable('post_paragraph', function(table){
        // Primary key and foreign key for post
        table.increments('id').primary().notNullable();
        // Unique id
        table.string('paragraph_id').notNullable();
        table.string('post_id').notNullable();
        table.foreign('post_id').references('post_id').inTable('posts');

        // Stores the actual paragraph content and type
        table.enum('type', [
            'text',
            'title',
            'quote',
            'embed',
            'image'
        ]).notNullable();

        // Text or image content
        table.string('content').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('post_paragraph');
};
