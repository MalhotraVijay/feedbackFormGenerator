app.Views.FormIndexView = Backbone.View.extend({

    className: 'row',
    
    events :{
       "click #addFieldButton" : "addElement"  
    },

    initialize: function () {},

    render: function () {
        this.$el.html($("#formBuilderTemplate").html());
        return this;
    },
    
    addElement: function(){
        console.log("evnet binded");
        
        //check for the field values 
        var fieldValues = [];
        if($("#fieldValues").val() != undefined && $("#fieldValues").val() != ""  ){
            fieldValues = $("#fieldValues").val().split(',');
        }

        var formItems = {
            id:id++,
            fieldTitle : $("#fieldTitle").val(),
            fieldHelp : $("#fieldHelp").val(),
            fieldType : $("#fieldType").val(),
            fieldValues : fieldValues
        }

        //create a formelement model and update the fields
        var formElement = new app.Models.FormElementModel();
        for(element in formItems){
            formElement.set(element,formItems[element]);
        }
        
        //add to the new model everytime to the collection
        formElementCollection.add(formElement);
        console.log(formElementCollection);

        //call the view for the collection
        var formElementCollectionView = new app.Views.FormElementCollectionView({ collection : formElementCollection });
        
        var formHTML = formElementCollectionView.render().el;
        //add the form to the html
        $('#feedbackForm').html(formHTML);

        //add the form text to the html
        var formHtmlCode = $('#feebackFormHtmlContainer').html();
        formHtmlCode = formHtmlCode.replace(/<a href="#" class="delete btn btn-small btn-danger">X<\/a>/g,'')
        $('#htmlTemplate').text(formHtmlCode);
        
    }

});


//_.templateSettings = {
//    interpolate: /\{\{(.+?)\}\}/g
//};

_.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g,
      evaluate: /\<\@(.+?)\@\>/gim
};


app.Views.FormElementAddView = Backbone.View.extend({

    tagName: 'div',
    className: 'row form-element',

    templates: {
       inputBoxtemplate : _.template($("#inputBoxtemplate").html()),
       textAreatemplate : _.template($("#textAreatemplate").html()),
       checkBoxtemplate : _.template($("#checkBoxtemplate").html()),
       radioButtontemplate : _.template($("#radioButtontemplate").html()),
       listBoxtemplate : _.template($("#listBoxtemplate").html())
    },
    
    events:{
        "click a.delete": "destroy",
       
    },


    initialize: function (options) {
        this.formElementCollection = options.formElementCollection;
        console.log('Form Add Single Element initialized', this);
    },

    render: function () {
        var formElement = this.model;
        var templateName = this.checkForType(formElement);
        
        console.log(this.model.toJSON());
        
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
    },
    
    destroy: function(){
        console.log("clicked", this);
        this.formElementCollection.remove(this.model);
        this.$el.remove();
    }
    
});


app.Views.FormElementCollectionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-container',
    initialize: function (options) {
        console.log('Form View Collection initialized' , this);
        //this.render();
    },
    render: function () {
        this.collection.each(this.addOne, this);
        console.log(this.el);
        return this;
    },
    addOne : function(formElement){
        var formElementView = new app.Views.FormElementAddView({model: formElement, formElementCollection : this.collection});
        this.$el.append(formElementView.render().el);
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