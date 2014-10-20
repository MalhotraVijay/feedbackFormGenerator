window.app = window.app || {
    Models : {},
    Views : {},
    Collections: {}
};


app.mainRoutes = Backbone.Router.extend({
    routes: {
        "feedback/add": "addElement",
        "feedback/livePromo": "liveView",
    },
    
    
    initialize: function(){
        //for the default url the form will be added to the DOM
        this.index();
    },

    addElement: function () {
        this.currentView = new app.FormIndexView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },

    liveView: function () {
        this.currentView = new app.FormLiveListView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },
    
    index: function () {
        //get the currentView and add that to the viewport
        
        this.currentView = new app.FormIndexView({});    
        $('#primaryTemplate').html(this.currentView.render().el);
    }



});