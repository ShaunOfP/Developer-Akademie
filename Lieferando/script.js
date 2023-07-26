let pizza = [
    {
        'name': 'Cheeseburger',
        'description': 'mit 100g saftigem Rindfleischpatty, Käse, Hambrgersauce und Ketchup',
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
        'description': 'mit 100g saftigem Rindfleischpatty, Käse, Hambrgersauce und Ketchup',
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
                <button onclick="addPizza(${i})"><ion-icon name="add-outline"></ion-icon></button>
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
                <button onclick="addPasta(${i})"><ion-icon name="add-outline"></ion-icon></button>
            </div>
        </div>
        `;
    }
}


function addPizza(index) {
    let newCartItem = document.getElementById('cart-order');

    let searchValue = pizza[index]['name'];
    let price = pizza[index]['price'];

    
    if (newCartItem.innerHTML.includes(searchValue)) {
        pizza[index]['amount']++;
        price = price * pizza[index]['amount'];

        let content = `
        <div class="cart-order-layout">
            <div>
                ${pizza[index]['amount']}
            </div>
            <div>
                ${pizza[index]['name']}
            </div>
            <div>
                ${price.toFixed(2)}€
            </div>
        </div>
        `;
    }

    else {
        newCartItem.innerHTML += `
        <div class="cart-order-layout">
            <div>
                ${pizza[index]['amount']}
            </div>

            <div>
                ${pizza[index]['name']}
            </div>
            <div>
                ${pizza[index]['price'].toFixed(2)}€
            </div>
        </div>
        `;
    }
}


function addPasta(index) {
    let newCartItem = document.getElementById('cart-order');

    let searchValue = pasta[index]['name'];

    if (newCartItem.innerHTML.includes(searchValue)) {
        pasta[index]['amount']++;
        price = price * pasta[index]['amount'];

        newCartItem.innerHTML = `
        <div class="cart-order-layout">
            <div>
                ${pasta[index]['amount']}
            </div>

            <div>
                ${pasta[index]['name']}
            </div>

            <div>
                
            </div>

            <div>
                ${price.toFixed(2)}€
            </div>
        </div>
        `;
    }

    else {
        newCartItem.innerHTML += `
    <div class="cart-order-layout">
        <div>
            ${pasta[index]['amount']}
        </div>

        <div>
            ${pasta[index]['name']}
        </div>

        <div>
            
        </div>

        <div>
            ${pasta[index]['price'].toFixed(2)}€
        </div>
    </div>
    `;
    }
}