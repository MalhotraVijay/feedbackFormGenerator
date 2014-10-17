app.CustomerModel = Backbone.Model.extend({
    defaults: {
    firstName: "",
    lastName: "",
    regDate: ""
  }
    
});

app.CustomerCollection = Backbone.Collection.extend({
   model : app.CustomerModel  
});


//
var customer = new app.CustomerModel();
console.log(customer);
