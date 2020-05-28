const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');

module.exports = {
    async login (req, res){
        const { name, password } = req.body;

        const patt = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        let user = null;
        const unique_id = generateUniqueId();

        let hasEmail = false;

        if (patt.test(name)){
            await connection('users')
                    .where({email: name, password: password})
                    .update({
                        auth: unique_id
                    });

            user = await connection('users')
                    .where({email: name, password: password})
                    .select('*')
                    .first();
            
            if (user != undefined){
                hasEmail = true;
            }
        }
        else{
            await connection('users')
                    .where({name: name, password: password})
                    .update({
                        auth: unique_id
                    });
            
            user = await connection('users')
                    .where({name: name, password: password})
                    .select(['name', 'email', 'auth'])
                    .first();
        }

        if (user == null){
            return res.status(400).send({
                error: "This user does not exits!"
            });
        }

        if (hasEmail){
            return res.send({
                name: user['name'],
                auth: unique_id
            })
        }
        else{
            return res.send({
                name: name,
                auth: unique_id,
            });
        }
    },

    async logout (req, res){
        const { name } = req.body;
        const auth = req.headers.authorization;

        const user = await connection('users')
                .where({name: name, auth: auth})
                .select(['name', 'auth'])
                .first();
        
        if (user == undefined){
            return res.status(400).send({
                error: 'This user does not exist!'
            });
        }

        if (user[1] == ''){
            return res.status(400).send({
                error: 'This user is not logged in!'
            });
        }

        await connection('users')
                .where({name: name, auth: auth})
                .update({
                    auth: ''
                });

        return res.status(202).send();
    },

    async sign_up (req, res){
        const { name, email, password} = req.body;
        const unique_id = generateUniqueId();

        const user = await connection('users')
                .where({name: name})
                .select('name')
                .first();

        if (user != null && name == user){
            return res.status(400).send({
                error: 'This user alredy exists!'
            });
        }

        await connection('users')
                .insert({
                    name: name,
                    email: email,
                    password: password,
                    auth: unique_id,
                    is_admin: false
                });

        return res.send({
            name: name,
            auth: unique_id
        });
    },
}