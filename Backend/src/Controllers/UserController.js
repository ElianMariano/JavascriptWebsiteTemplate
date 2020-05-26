module.exports = {
    sessions: function (req, res){
        console.log("Session");
        res.send({'id': 'newid'});
    },

    sign_in: function (req, res){
        console.log("Sign in");
        res.send({'id': 'new user'});
    }
}