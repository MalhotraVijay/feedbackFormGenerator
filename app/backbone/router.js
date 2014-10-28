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
    
    
    initialize: function(options){
        //for the default url the form will be added to the DOM
        console.log(options.formElementCollection);
        
        this.formElementCollection = options.formElementCollection;
        
        this.formElementCollection.bind('remove', this.updateDebug, this);
        this.formElementCollection.bind('updateAll', this.updateDebug, this);
        
        this.index();
    },
    
    updateDebug : function(){
        
        console.log(this);
        //Can remove this code and ADD some where to remove redundancy
         //call the view for the collection
        var formElementCollectionView = new app.Views.FormElementCollectionView({ collection : this.formElementCollection });
        
        var formHTML = formElementCollectionView.render().el;
        //add the form to the html
        $('#feedbackForm').html(formHTML);

        //add the form text to the html
        var formHtmlCode = $('#feebackFormHtmlContainer').html();
        formHtmlCode = formHtmlCode.replace(/<a href="#" class="delete btn btn-small btn-danger">X<\/a>/g,'')
        $('#htmlTemplate').text(formHtmlCode);

    },

    addElement: function () {
        this.currentView = new app.Views.FormIndexView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },

    liveView: function () {
        this.currentView = new app.Views.FormLiveListView();
        $('#primaryTemplate').html(this.currentView.render().el);
    },
    
    index: function () {
        //get the currentView and add that to the viewport
        
        this.currentView = new app.Views.FormIndexView({}); 
        
        //this will be called on the click of add button
//        $('#primaryTemplate').html(this.currentView.render().el);
        
        $('#formHTMLEditContainer').html(this.currentView.render().el);
        
        //add few default elements to the form
        this.currentView.addDefault();
    }



});