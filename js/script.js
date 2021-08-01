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
        case "":
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
        case "":
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

//total topping price
function toppingsPrice(allToppingSelected) {
    numberOfTopping = allToppingSelected.length;
    return numberOfTopping * 75
} 

//total pizza price
function totalPizzaPrice(sizePrice,crustPrice,totalToppingPrice) {
    return sizePrice + crustPrice + totalToppingPrice;
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
        
        pizzaSizePrice = pSize(pizzaSize);
        pizzaCrustPrice = pCrust(pizzaCrust);
        pizzaToppingPrice = toppingsPrice(pizzaToppings);

        if((typeof pizzaSizePrice == 'undefined') || (typeof pizzaCrustPrice == 'undefined')) {
            $("button.addToCart").show();
            $("#general-infor").show();
            $("customer-choice").hide();
            alert("Kindly select all the fields!");
            //$("#order-form")[0].reset();
        }
        else {
            $("button.addToCart").hide();
            $("#general-infor").hide();
            $("div.customer-choice").slideDown(1000);
        }

        pizzaTotalPrice = totalPizzaPrice(pizzaSizePrice, pizzaCrustPrice, pizzaToppingPrice);
        let checkoutTotalPrice = 0;
        checkoutTotalPrice = checkoutTotalPrice + pizzaTotalPrice;


        // alert(pizzaSizePrice);
        // alert(pizzaCrustPrice);
        // alert(pizzaToppingPrice);
        // alert(pizzaTotalPrice);
        

        //post to cart
        $("#pizza-name").html(pizzaName);
        $("#pizza-size").html(pizzaSize+" @"+pizzaSizePrice);
        $("#pizza-crust").html(pizzaCrust+" @"+pizzaCrustPrice);
        $("#pizza-topping").html(pizzaToppings.join(", ")+" @"+pizzaToppingPrice);
        $("#all-total").html("Ksh. "+pizzaTotalPrice);

        //Add pizza buton
        $("button.extra-pizza").click(function(){
            let pizzaName = $(".pizzaName option:selected").val();
            let pizzaSize = $(".pizzaSize option:selected").val();
            let pizzaCrust = $(".pizzaCrust option:selected").val();
            let pizzaToppings =[];
            $.each($("input[name = 'pizzaTopping']:checked"), function(){
                pizzaToppings.push($(this).val());
            });
            
            pizzaSizePrice = pSize(pizzaSize);
            pizzaCrustPrice = pCrust(pizzaCrust);
            pizzaToppingPrice = toppingsPrice(pizzaToppings);
            pizzaTotalPrice = totalPizzaPrice(pizzaSizePrice, pizzaCrustPrice, pizzaToppingPrice);
            checkoutTotalPrice = checkoutTotalPrice + pizzaTotalPrice;

            //constructor for new pizza
            var newPizza = new getPizza(pizzaName, pizzaSize, pizzaCrust, pizzaToppings, pizzaTotalPrice);

            //post new pizza to table
           
            $("#customer-orders").append('<tr><td id="pizza-name">'+newPizza.name +'</td><td id="pizza-size">' + newPizza.size + '</td><td id="pizza-crust">'+newPizza.crust + '</td><td id="pizza-topping">'+newPizza.topping+'</td><td id="all-total">'+newPizza.total+'</td></tr>');
            alert(newPizza);

        });





    });
});