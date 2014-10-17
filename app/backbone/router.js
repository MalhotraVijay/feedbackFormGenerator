window.app = window.app || {};


app.mainRoutes = Backbone.Router.extend({
    routes: {
        "feedback/add": "create",
        "feedback/livePromo": "listAll",
    },
    
    initialize: function(){
        this.index();
    },

    create: function () {
        this.currentView = new app.CustomerIndexView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },

    listAll: function () {
        this.currentView = new app.CustomerListView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },
    
    index: function () {
        //get the currentView and add that to the viewport
        
        this.currentView = new app.CustomerIndexView({});    
        $('#primaryTemplate').html(this.currentView.render().el);
    }



});