
exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table){
        table.string('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('category').notNullable();
        table.datetime('date', {precision: 6}).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
