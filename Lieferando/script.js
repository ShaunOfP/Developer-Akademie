let pizza = [
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
    }
];


let pasta = [
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
        'name': 'Zeugs',
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

    for (let i = 0; i < pizza.length; i++) {
        const pizzaBox = pizza[i];

        menu.innerHTML += `
        <div class="mbody-product">
            <div>
                <h3>${pizzaBox['name']}</h3>
                <span>${pizzaBox['description']}</span>
                <p>${pizzaBox['price'].toFixed(2)}€</p>
            </div>
            <div class="mbody-btn">
                <button onclick="addPizzaToArray(${i})"><ion-icon name="add-outline"></ion-icon></button>
            </div>
        </div>
        `;
    }

    for (let i = 0; i < pasta.length; i++) {
        const pastaBox = pasta[i];

        menu.innerHTML += `
        <div class="mbody-product">
            <div>
                <h3>${pastaBox['name']}</h3>
                <span>${pastaBox['description']}</span>
                <p>${pastaBox['price'].toFixed(2)}€</p>
            </div>
            <div class="mbody-btn">
                <button onclick="addPastaToArray(${i})"><ion-icon name="add-outline"></ion-icon></button>
            </div>
        </div>
        `;
    }
}


function addPizzaToArray(index) {
    let pizzaName = pizza[index]['name'];
    let pizzaPrice = pizza[index]['price'];
    let pizzaAmount = pizza[index]['amount'];

    if (orderNames.includes(pizzaName)) {
        orderAmount[index]++;
        orderPrices[index] = pizzaPrice * orderAmount[index];
    }
    else {
        let newName = pizzaName;
        let newPrice = +pizzaPrice;
        let newAmount = +pizzaAmount;

        orderNames.push(newName);
        orderPrices.push(newPrice);
        orderAmount.push(newAmount);
    }
    arrayToCart();
}


function addPastaToArray(index) {
    let pastaName = pasta[index]['name'];
    let pastaPrice = pasta[index]['price'];
    let pastaAmount = pasta[index]['amount'];

    if (orderNames.includes(pastaName)) {
        orderAmount[index]++;
        orderPrices[index] = pastaPrice * orderAmount[index];
    }
    else {
        let newName = pastaName;
        let newPrice = +pastaPrice;
        let newAmount = +pastaAmount;

        orderNames.push(newName);
        orderPrices.push(newPrice);
        orderAmount.push(newAmount);
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


function renderCartCosts(){
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


function deleteCartObject(i){
    orderNames.splice(i, 1);
    orderPrices.splice(i, 1);
    orderAmount.splice(i, 1);

    arrayToCart();
}