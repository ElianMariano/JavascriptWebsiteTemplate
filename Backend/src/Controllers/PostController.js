module.exports = {
    post_profile: function (req, res){
        console.log("Post profile");
        return res.send({
            post: 'Post profile'
        });
    },

    post_create: function (req, res){
        console.log("Post create");
        return res.send({
            title: 'Post create'
        });
    },

    post_edit: function (req, res){
        console.log("Post edit");
        return res.send({post: 'Post edit'});
    },

    post_search: function (req, res){
        console.log("Post search");
        return res.send({post: 'Post search'});
    },

    post_delete: function (req, res){
        console.log("Post delete");
        return res.send({'post': 'Post delete'});
    }
}