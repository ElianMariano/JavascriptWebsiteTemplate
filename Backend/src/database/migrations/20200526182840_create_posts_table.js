/*
    Basic posts informations without content data.
    The actual data will be referencing the post table
    and will store every paragraph of the post.
*/

exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table){
        table.string('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('title').notNullable();
        table.string('url').notNullable();
        
        table.string('post_category').notNullable();
        table.foreign('post_category').references('category').inTable('categories');
        table.datetime('date', {precision: 6}).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
