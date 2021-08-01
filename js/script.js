//business logic

var price, crustPrice, toppingPrice;
let totalPrice = 0;

function getPizza( name, size, crust, topping, total ) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = totalPrice;
}


//switch size
function pSize(size){
    switch(size){
        case "0":
            price = 0
        break;
        case "small":
            price = 750
        break;
        case "medium":
            price = 950
        break;
        case "large":
            price = 1200
        break;
        default:
            console.log("No price");
    
    }
    return price
}

//switch crust

function pCrust(crust){
    switch(crust){
        case "0":
            price = 0
        break;
        case "crispy":
            price = 150
        break;
        case "gluten-free":
            price = 250
        break;
        case "stuffed":
            price = 200
        break;
        default:
            console.log("No price");
    
    }
    return price
}



















//user interface logic
$(document).ready(function() {
    //take user input after clickig the addtocart button
    $("button.addToCart").click(function(event) {
        event.preventDefault();
        let pizzaName = $(".pizzaName option:selected").val();
        let size = $(".pizzaSize option:selected").val();
        let crust = $(".pizzaCrust option:selected").val();
        let pizzaToppings =[];
        $.each($("input[name = 'pizzaTopping']:checked"), function(){
            pizzaToppings.push($(this).val());
        });
        


        pizzaSize = pSize(size);
        pizzaCrust = pCrust(crust);
        alert(pizzaToppings)
        alert(pizzaSize);
        alert(pizzaCrust);




    });
});