app.Views.FormIndexView = Backbone.View.extend({

    className: 'view-modal-container',
    
    events :{
       "click a.add-new-element" : "addNewElement" ,
       "click a.remove-anchor" : "removePanelElement" ,
        
    },
    
    templates : {
        formEditViewTemplate : $("#formEditViewTemplate").html()
    },

    initialize: function () {
    },

    render: function () {
        //This should be rendered on the add button call
//        this.$el.html($("#formBuilderTemplate").html());
        
        //call the template formViewEditState
        this.$el.html(this.templates.formEditViewTemplate);
        return this;
    },
    
    addDefault : function(){
        //call the addNewElement to call the init for adding new product.
        var formAddNewView = new app.Views.FormAddNewView;
        
        $("#primaryTemplate").html(formAddNewView.render().el);
        formAddNewView.addDefault();
        
    },
    
    addNewElement : function(){
        var formAddNewView = new app.Views.FormAddNewView;
        $("#primaryTemplate").html(formAddNewView.render().el);
        
        $('.form-layer').css('display','block');
        
        $('select#fieldType').change(function(){
            if($(this).val()=="checkBox"||
                $(this).val() == "radioButton" ||
                $(this).val() == "listBox"){
                var inputElement = '<input type="text" class="form-control" id="fieldValues" placeholder="Comma seperated field values" name="fieldValues">'
                $("#fieldValuesDiv").html(inputElement);
            }else{
                $("#fieldValuesDiv").html("")
            }
        });
        
        return false;
    },
    
    removePanelElement : function(ev){
        
        console.log('Remove element');
        //remove the parent element of the clicked cancle button
        $(ev.currentTarget).parent().parent().remove();
        
    }

});


app.Views.FormAddNewView = Backbone.View.extend({

    className: '',
    
    events :{
       "click #addFieldButton" : "addElement",
    },
    
    templates : {
        formAddNewTemplate : $("#formAddNewTemplate").html()
    },

    initialize: function () {
    },
    
    addDefault : function(){
        
        //adding 2 objects by default
        console.log("In the form view edit function");
        this.addElement({ formItems : {
                                id:id++,
                                fieldTitle : 'Email',
                                fieldHelp : '* Enter your Email ID',
                                fieldType : 'inputBox',
                                fieldValues : []
                            }
                        });
        
        this.addElement({ formItems : {
                                id:id++,
                                fieldTitle : 'Message',
                                fieldHelp : '* Message ',
                                fieldType : 'textArea',
                                fieldValues : []
                            }
                        });
    },

    render: function () {
        this.$el.html(this.templates.formAddNewTemplate);
        return this;
    },
    
    addElement: function(options){
        console.log("event binded");
        
        $('.form-layer').css('display','none');
        
        //check for the field values 
        var fieldValues = [];
        if($("#fieldValues").val() != undefined && $("#fieldValues").val() != ""  ){
            fieldValues = $("#fieldValues").val().split(',');
        }
        
        var fieldTitle = $("#fieldTitle").val();
        fieldTitle = fieldTitle.replace(/^\s+|\s+$/gm,'');
        //fieldTitle = fieldTitle.replace(/\s/gm,'-');
        
        var formItems = options.formItems || {
            id:id++,
            fieldTitle : fieldTitle,
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
        var formHtmlCode = $('#feebackFormHtmlContainer').html() || "";
        formHtmlCode = formHtmlCode.replace(/<a href="#" class="delete btn btn-small btn-danger pull-right">X<\/a>/g,'')
        $('#htmlTemplate').text(formHtmlCode);
        
    }

});



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
    className: 'row form-container',
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

    className: 'form-row',

    initialize: function () {},

    render: function () {
        this.$el.html($("#liveViewTemplate").html());
        return this;
    },

});

//
//var formElementView = new app.Views.FormElementAddView();
//console.log(formElementView);