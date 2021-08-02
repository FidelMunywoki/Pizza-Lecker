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

//prototype for price of home delivery

function homeDelivery(homeDeliveryCheckout) {
    this.homeDeliveryCheckout = homeDeliveryCheckout;
}

homeDelivery.prototype.addDeliveryCost = function () {
    return this.homeDeliveryCheckout + 200
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
           
            $(".pizzaTable").append('<tr><td id="pizza-name">'+newPizza.name +'</td><td id="pizza-size">' + newPizza.size + " @"+pizzaSizePrice +'</td><td id="pizza-crust">'+newPizza.crust +  " @"+pizzaCrustPrice + '</td><td id="pizza-topping">'+newPizza.topping+  " @"+pizzaToppingPrice +'</td><td id="all-total">'+ "Ksh. "+newPizza.total+'</td></tr>');
            

        });


        //Checkout Button
        $("button.checkout").click(function() { 
            $("button.checkout").hide();
            $("button.extra-pizza").hide();
            $("button.home-delivery").slideDown(1000);
            $("button.place-order").slideDown(1000);
            $("#extra-price").slideDown(1000);

            //TO ADD COMPLETE ORDER
            $(".pizzaTable").append('<tr><td id="all-total">'+"Total Ksh. "+checkoutTotalPrice +'</td></tr>'); 
            $("#total-pizza").append("Your Order bill is Ksh. " +checkoutTotalPrice);
        });

        //place order normal
         $("button.place-order").click(function() {
            $(".pizzaTable").hide();
            $(".customer-choice").hide();
            $('.extra-price').hide();
            $("total-pizza").hide();
            $("#normal-order").append("Your Total bill is: "+ checkoutTotalPrice+
            "<p>Thank for shopping with us Kindly collect your order at Nairobi CBD Tall park within 8hrs</p>"+
            "<p>You can still make another order to stand a chance of winning a free PIZZA TREAT DAY!!</p>");
            $(".addToCart").slideDown(1000);
            

            //empty contents
            checkoutTotalPrice = "";
            $(".pizzaName option:selected").val("");
            $(".pizzaSize option:selected").val("");
            $(".pizzaCrust option:selected").val("");
            pizzaToppings.splice(0, pizzaToppings.length);
           

           

            
        });


        //home delivery button
        $("button.home-delivery").click(function() {
            $(".pizzaTable").hide();
            $(".customer-choice").hide();
            $('.extra-price').hide();
            $(".delivery-infor").slideDown(1000);
            $("total-pizza").hide();
            $("#total-bill").slideDown(1000);
            finalPrice = new homeDelivery(checkoutTotalPrice);
            $("#total-bill").append("Your Total bill plus delivery fee is: "+ finalPrice.addDeliveryCost());
           

            
        });

        //place order button for delivery
        $("button.place-order-home").click(function(event) {
            event.preventDefault();
            let personName = $("input#your-name").val();
            let email =$("input#email").val();
            let phoneNumber =$("input#phoneNumber").val();
            let location =$("input#location").val();

            if (personName && phoneNumber && email && location != ""){
                $("#total-bill").hide();
                $(".delivery-infor").hide();
                $("#normal-order").append("Your Total bill is: "+ checkoutTotalPrice+
                "<p>Dear "+personName+ ",<p> Thank for shopping with us Kindly your order will be delivered to "+location+ " in the next 1 hour</p>"+
                "<p>You can still make another order to stand a chance of winning a free PIZZA TREAT DAY!!</p>");

                  $("input#your-name").val("");
                  $("input#email").val("");
                  $("input#phoneNumber").val("");
                  $("input#location").val("");
                 

            }
            else {
                alert("Please fill in the delivery!");

            }
        });






    });
});