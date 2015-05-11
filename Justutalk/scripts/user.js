/**
 * Created by temp on 02/05/2015.
 */

//console.log(User.password);


var userModel = kendo.observable({
    item: "gold",
    quantity: "10 grams",
    description: function(){
        return "You bought " + this.get("quantity") + " of "
            + this.get("item") ;
    }
});
//bind the view model
kendo.bind($("#userView"),userModel);