module.exports = {
    categories_profile: function(req, res){
        console.log("Categories profile");
        res.send({'categories': 'Categories profile'});
    },

    categories_create: function(req, res){
        console.log("Categories create");
        res.send({'categories': 'Categories create'});
    },

    categories_edit: function(req, res){
        console.log("Categories edit");
        res.send({'categories': 'Categories edit'});
    },

    categories_delete: function(req, res){
        console.log("Categories delete");
        res.send({'categories': 'Categories delete'});
    }
}