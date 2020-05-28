module.exports = {
    async post_profile(req, res){
        console.log("Post profile");
        return res.send({
            post: 'Post profile'
        });
    },

    async post_create(req, res){
        console.log("Post create");
        return res.send({
            title: 'Post create'
        });
    },

    async post_show(req, res){
        console.log("Post show");
        return res.send({
            title: 'Post show'
        });
    },

    async post_edit(req, res){
        console.log("Post edit");
        return res.send({post: 'Post edit'});
    },

    async post_search(req, res){
        console.log("Post search");
        return res.send({post: 'Post search'});
    },

    async post_delete(req, res){
        console.log("Post delete");
        return res.send({'post': 'Post delete'});
    }
}