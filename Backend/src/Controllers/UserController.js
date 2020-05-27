module.exports = {
    login: function (req, res){
        console.log("Login");
        return res.send({
            'auth': 'newid',
        });
    },

    logout: function (req, res){
        console.log("Log out");
        return res.send({
            'logout': true,
        });
    },

    sign_up: function (req, res){
        console.log("Sign in");
        return res.send({'auth': 'id'});
    },
}