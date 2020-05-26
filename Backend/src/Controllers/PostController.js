module.exports = {
    post_profile: function (req, res){
        console.log("Post profile");
        res.send({'post': 'Post profile'});
    },

    post_create: function (req, res){
        console.log("Post create");
        res.send({'post': 'Post create'});
    },

    post_edit: function (req, res){
        console.log("Post edit");
        res.send({'post': 'Post edit'});
    },

    post_delete: function (req, res){
        console.log("Post delete");
        res.send({'post': 'Post delete'});
    }
}