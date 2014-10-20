app.FormIndexView = Backbone.View.extend({
    
    className: 'row',
    
    initialize: function(){
    },
    
    render: function(){
        this.$el.html($("#formBuilderTemplate").html());
        return this;
    },

});

app.FormElementAddView = Backbone.View.extend({
    
    
    

});


app.FormLiveListView = Backbone.View.extend({
    
    className: 'row',
    
    initialize: function(){
    },
    
    render: function(){
        this.$el.html($("#liveViewTemplate").html());
        return this;
    },

});


var formElementView = new app.FormElementAddView();
console.log(formElementView);