
exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table){
        table.string('id').primary();
        table.bigInteger('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('title').notNullable();
        table.json('content').notNullable();
        table.string('post_category').notNullable();
        table.foreign('post_category').references('category').inTable('categories');
        table.datetime('date', {precision: 6}).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
