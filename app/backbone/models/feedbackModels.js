app.Models.FormElementModel = Backbone.Model.extend({
    defaults: {
    id :"",
    fieldTitle: "",
    fieldHelp: "",
    fieldType: "",
    fieldValues: []
  }
    
});


//Adding all the important collections
app.Collections.FormElementCollection = Backbone.Collection.extend({
   model : app.Models.FormElementModel  
});


//Initiate a model
//var formElement = new app.Models.FormElementModel();
//console.log(formElement);
