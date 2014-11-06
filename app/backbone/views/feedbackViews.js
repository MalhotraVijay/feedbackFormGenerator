//setting the underscore settings for the templates to work with handlerbar cases

_.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g,
      evaluate: /\<\@(.+?)\@\>/gim
};



app.Views.FormIndexView = Backbone.View.extend({

    className: 'view-modal-container',
    
    events :{
       "click a.add-new-element" : "addNewElement" ,
       "click a.remove-anchor" : "removePanelElement" ,
        
    },
    
    templates : {
        formEditViewTemplate : $("#formEditViewTemplate").html()
    },

    initialize: function (jsonData) {
        this.jsonData = jsonData;
    },

    render: function () {
        //This should be rendered on the add button call
//        this.$el.html($("#formBuilderTemplate").html());
        
        //call the template formViewEditState
        this.$el.html(this.templates.formEditViewTemplate);
        return this;
    },
    
    addDefault : function(){
        
        //add the panel elements in the desired container
        
        var addPanelView = new app.Views.AddPanelView(this.jsonData);
        
        $("#panel-elments-container").html(addPanelView.render().el);
        
        
        //call the addNewElement to call the init for adding new product.
        var formAddNewView = new app.Views.FormAddNewView(this.jsonData);
        
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
                var inputElement = '<input type="text" class="form-control" id="fieldValues" placeholder="Comma seperated values (Ex: Male,Female)" name="fieldValues">'
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

    initialize: function (jsonData) {
        this.jsonData = jsonData;
    },
    
    addDefault : function(){
        
        //adding the default objects sent in the json created in the app router init call
        console.log("In the form view edit function", this.jsonData);
        
        var jsonData = this.jsonData;
        
        for(i=0;i<jsonData['formAllElements'].length;i++){
            
            this.addElement({
                formItems : jsonData['formAllElements'][i]
            });
        }
    },

    render: function () {
        this.$el.html(this.templates.formAddNewTemplate);
        return this;
    },
    
    addElement: function(options){
        
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
        
        $('#user_input').html(formHTML);

        //add the form text to the html
        var formHtmlCode = $('#feebackFormHtmlContainer').html() || "";
        formHtmlCode = formHtmlCode.replace(/<a href="#" class="delete btn btn-small btn-danger pull-right">X<\/a>/g,'')
        $('#htmlTemplate').text(formHtmlCode);
        
    }

});


app.Views.AddPanelView = Backbone.View.extend({
   
    className : 'panel-default',
    
    id : 'panel-elements',
    
    initialize : function(jsonData){
        this.jsonData = jsonData;
    },
    
    templates : {
        panelElementsTemplate: _.template($("#panelElementsTemplate").html()),
        panel : $("#panelElementsTemplate").html()
    },
    
    render : function(){
        console.log("Adding the div,", this.jsonData);
            
        this.$el.html(this.templates.panelElementsTemplate(this.jsonData));
        return this;
    }
    
});


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