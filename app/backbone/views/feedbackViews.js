app.CustomerIndexView = Backbone.View.extend({
    
    className: 'row',
    
    initialize: function(){
    },
    
    render: function(){
        this.$el.html($("#addCustomerTemplate").html());
        return this;
    },

});

app.CustomerNewView = Backbone.View.extend({

});


app.CustomerListView = Backbone.View.extend({
    
    className: 'row',
    
    initialize: function(){
    },
    
    render: function(){
        this.$el.html($("#listCustomerTemplate").html());
        return this;
    },

});


var customerView = new app.CustomerNewView();
console.log(customerView);