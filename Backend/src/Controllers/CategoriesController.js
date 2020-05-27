module.exports = {
    categories_profile: function(req, res){
        console.log("Categories profile");
        return res.send({'categories': 'Categories profile'});
    },

    categories_create: function(req, res){
        console.log("Categories create");
        return res.send({'categories': 'Categories create'});
    },

    categories_edit: function(req, res){
        console.log("Categories edit");
        return res.send({'categories': 'Categories edit'});
    },

    categories_delete: function(req, res){
        console.log("Categories delete");
        return res.send({'categories': 'Categories delete'});
    }
}