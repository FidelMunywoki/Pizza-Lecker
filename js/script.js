//business logic

var price, crustPrice, toppingPrice;
let totalPrice = 0;

function getPizza( name, size, crust, topping, total ) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = total;
}


//switch size
function pSize(size){
    switch(size){
        case
    }
}


















//user interface logic
$(document).ready(function() {
    //take user input after clickig the addtocart button
    $("button.addToCart").click(function(event) {
        event.preventDefault();
        let pizzaName = $(".pizzaName option:selected").val();
        let pizzaSize = $(".pizzaSize option:selected").val();
        let pizzaCrust = $(".pizzaCrust option:selected").val();
        let pizzaToppings =[];
        $.each($("input[name = 'pizzaTopping']:checked"), function(){
            pizzaToppings.push($(this).val());
        });
        console.log(pToppings);
    });
});