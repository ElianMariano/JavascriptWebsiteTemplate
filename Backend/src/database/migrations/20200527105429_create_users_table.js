
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.bigInteger('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('auth', 20);
        table.boolean('is_admin').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};