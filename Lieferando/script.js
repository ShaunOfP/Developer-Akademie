let menuCard = [
    {
        'name': 'Cheeseburger',
        'description': 'mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup',
        'price': 5.60,
        'amount': 1
    },
    {
        'name': 'Pizza Salami',
        'description': 'xy',
        'price': 8.40,
        'amount': 1
    },
    {
        'name': 'Pizza Margeritha',
        'description': 'yx',
        'price': 4.20,
        'amount': 1
    },
    {
        'name': 'Salat',
        'description': 'xx',
        'price': 12.00,
        'amount': 1
    },
    {
        'name': 'Pasta',
        'description': 'yy',
        'price': 9.00,
        'amount': 1
    },
    {
        'name': 'SEPERATOR'
    },
    {
        'name': 'Cranberries',
        'description': 'mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup',
        'price': 5.60,
        'amount': 1
    },
    {
        'name': 'Steven',
        'description': 'xy',
        'price': 8.40,
        'amount': 1
    },
    {
        'name': 'Ferrari',
        'description': 'yx',
        'price': 4.20,
        'amount': 1
    },
    {
        'name': 'Karsten',
        'description': 'xx',
        'price': 12.00,
        'amount': 1
    },
    {
        'name': 'Peter',
        'description': 'yy',
        'price': 9.00,
        'amount': 1
    }
];


let orderNames = [];
let orderPrices = [];
let orderAmount = [];


renderCartCosts();


function render() {
    let menu = document.getElementById('mbody-objects');

    menu.innerHTML = '';

    for (let i = 0; i < menuCard.length; i++) {
        const foodBox = menuCard[i];

        if (foodBox['name'] == 'SEPERATOR') {
            menu.innerHTML += `<div>DAS HIER IST EIN BILD</div>`;
        }
        else {
            menu.innerHTML += `
            <div class="mbody-product">
                <div>
                    <h3>${foodBox['name']}</h3>
                    <span>${foodBox['description']}</span>
                    <p>${foodBox['price'].toFixed(2)}€</p>
                </div>
                <div class="mbody-btn">
                    <button onclick="addMenuToArray(${i})"><ion-icon name="add-outline"></ion-icon></button>
                </div>
            </div>
            `;
        }
    }
}


function addMenuToArray(index) {
    let name = menuCard[index]['name'];
    let price = menuCard[index]['price'];
    let amount = menuCard[index]['amount'];

    if (orderNames.includes(name)) {
        let place = orderNames.indexOf(name);
        
        orderAmount[place]++;
        orderPrices[place] = price * orderAmount[place];
    }
    else {
        orderNames.push(name);
        orderPrices.push(+price);
        orderAmount.push(+amount);
    }
    arrayToCart();
}


function arrayToCart() {
    let cart = document.getElementById('cart-order');

    cart.innerHTML = "";

    for (let i = 0; i < orderNames.length; i++) {
        cart.innerHTML += `
        <div class="cart-order-layout">
            <div>
                ${orderAmount[i]}x
            </div>
            <div>
                ${orderNames[i]}
            </div>
            <div>
                <a title="Delete" href="javascript:deleteCartObject(${i});">X</a>
            </div>
            <div>
                ${orderPrices[i].toFixed(2)}€
            </div>
        </div>
        `;
    }
    renderCartCosts();
}


function renderCartCosts() {
    let cartCosts = document.getElementById('cart-costs-total');
    let total = 0;

    for (let i = 0; i < orderPrices.length; i++) {
        total = total + orderPrices[i];
    }

    cartCosts.innerHTML = total.toFixed(2) + '€';

    let message = document.getElementById('min-order-value');

    if (total < 10 || total == null) {
        message.innerHTML = 'Du hast den Mindestbestellwert von 10,00€ nicht erreicht.';
    }
    else {
        message.innerHTML = 'Du hast den Mindestbestellwert von 10,00€ erreicht und kannst jetzt fortfahren.';
    }
}


function deleteCartObject(i) {
    orderNames.splice(i, 1);
    orderPrices.splice(i, 1);
    orderAmount.splice(i, 1);

    arrayToCart();
}


function clearCart() {
    let resetValue = 0;
    let cartSum = document.getElementById('cart-costs-total').innerHTML;

    if (cartSum == '0.00€') {

    } else {
        document.getElementById('cart-order').innerHTML = '';
        document.getElementById('cart-costs-total').innerHTML = resetValue.toFixed(2) + '€';

        orderNames = [];
        orderPrices = [];
        orderAmount = [];

        alert("Ihre Bestellung wird bearbeitet...");
    }
}


window.addEventListener('scroll', () => shoppingCartPosition());


function shoppingCartPosition() {
    let shoppingCart = document.getElementById('cart');

    if (window.scrollY > 0) {
        shoppingCart.style = 'top: 0px';
    } else if (window.scrollY > 0 && window.scrollY < 100) {
        let height = 100 - window.scrollY;
        shoppingCart.style = `top: ${height}px`;
    } else {
        shoppingCart.style = 'top: 100px';
    }
}