app.Views.FormIndexView = Backbone.View.extend({

    className: 'row',

    initialize: function () {},

    render: function () {
        this.$el.html($("#formBuilderTemplate").html());
        return this;
    },

});


_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

app.Views.FormElementAddView = Backbone.View.extend({

    tagName: 'div',
    className: 'form-element',

    templates: {
       inputBoxtemplate : _.template($("#inputBoxtemplate").html()),
       textAreatemplate : _.template($("#textAreatemplate").html()),
       checkBoxtemplate : _.template($("#checkBoxtemplate").html()),
       radioButtontemplate : _.template($("#radioButtontemplate").html()),
       listBoxtemplate : _.template($("#listBoxtemplate").html())
    },

    initialize: function () {
        console.log('view initialized', this.model);
        
        console.log(this.render().el);
    },

    render: function () {
        
        var formElement = this.model;
        
        var templateName = this.checkForType(formElement);
        
        this.$el.html(this.templates[templateName](this.model.toJSON()));
        return this;
    },
    
    checkForType: function(formElement){
        
        var fieldType = formElement.get('fieldType');
        if(fieldType == 'inputBox'){
            return 'inputBoxtemplate';
        }else if(fieldType == 'textArea'){
            return 'textAreatemplate';
        }else if(fieldType == 'checkBox'){
            return 'checkBoxtemplate';
        }else if(fieldType == 'radioButton'){
            return 'radioButtontemplate';
        }else if(fieldType == 'listBox'){
            return 'listBoxtemplate';
        }
    }
    
    
    
});


app.Views.FormElementCollectionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-container',
    initialize: function () {
        console.log('Collection initialized');
    },
    render: function () {

    }

});





app.Views.FormLiveListView = Backbone.View.extend({

    className: 'row',

    initialize: function () {},

    render: function () {
        this.$el.html($("#liveViewTemplate").html());
        return this;
    },

});

//
//var formElementView = new app.Views.FormElementAddView();
//console.log(formElementView);