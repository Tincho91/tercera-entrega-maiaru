const clickButton = document.querySelectorAll(".button");
const tableBody = document.querySelector(".table-body");
//const filterButton = document.querySelectorAll(".category-item");
let cart = [];



clickButton.forEach(btn => {
    btn.addEventListener("click", addToCart)
});


// Map de item

function addToCart(e) {
    const button = e.target;
    const item = button.closest(".card");
    const itemTitle = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".precio").textContent;
    const itemImg = item.querySelector(".card-img").src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    };

    addItemToCart(newItem);

    Swal.fire ({
        icon: 'success',
        title: 'Agregado al Carro!',
        showConfirmButton: false,
        timer: 1200
    });
};

// Agregar al carrito

function addItemToCart(newItem) {
    const inputElement = tableBody.getElementsByClassName("input-element");

    // For para aumentar cantidad en lugar de duplicar item.

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].title.trim() === newItem.title.trim()) {

            cart[i].cantidad++;
            const inputValue = inputElement[i];
            inputValue.value++;
            cartTotal()
            return null;

        }

    }

    cart.push(newItem);

    renderCart();
}

// Render del carro

function renderCart() {
    tableBody.innerHTML = "";

    cart.map(item => {
        const tr = document.createElement("tr");
        tr.classList.add("cart-item");
        const content = `
                <th scope="row">1</th>
                  <td class="table--producto d-flex">
                    <img src=${item.img} alt="">
                    <h6 class="title">${item.title}</h6>
                  </td>
                  <td class="table--precio">
                    <p>$ ${item.precio}.-</p>
                  </td>
                  <td class="table--cantidad">
                    <input type="number" min="1" value=${item.cantidad} class="me-3 input-element">
                    <button class="delete btn btn-danger"><i class="fas fa-trash"></i></button>
                  </td>
                  `;

        tr.innerHTML = content;
        tableBody.appendChild(tr);

        tr.querySelector(".delete").addEventListener("click", itemRemoveCart);

        //Cambios por imput manual en carrito

        tr.querySelector(".input-element").addEventListener("change", sumaCantidad);
    });

    cartTotal();
}

// Calculo y render del total 

function cartTotal() {
    let total = 0;
    const cartTotal = document.querySelector(".cart-total");

    cart.forEach((item) => {
        const precio = Number(item.precio.replace("$", ""));
        total = total + precio*item.cantidad;
    })

    cartTotal.innerHTML = `Total $ ${total}.-`;
    
    //Actualiza Local Storage
    addLocalStorage();
}


// Boton para remover item

function itemRemoveCart(e) {
    const deleteButton = e.target;
    const tr = deleteButton.closest(".cart-item");
    const title = tr.querySelector(".title").textContent;

    for (let i = 0; i < cart.length; i++) {

        if(cart[i].title.trim() === title.trim()) {
            cart.splice(i, 1);
        }
    }
    
    tr.remove();
    cartTotal();

    Swal.fire ({
        icon: 'error',
        title: 'Prenda eliminada!',
        showConfirmButton: false,
        timer: 1200
    });
}


//Cambios por imput manual en carrito

function sumaCantidad(e) {
    const inputSum = e.target;
    const tr = inputSum.closest(".cart-item");
    const title = tr.querySelector(".title").textContent;

    cart.forEach (item => {
        if (item.title.trim() === title) {
            inputSum.value < 1 ? (inputSum.value = 1) : inputSum.value;
            item.cantidad = inputSum.value;
            cartTotal();
        }
    });
}


// LOCAL STORAGE

function addLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}


window.onload = function() {
    const storage = JSON.parse(localStorage.getItem("cart"));
    if(storage) {
        cart= storage;
        renderCart();
    }
}


/*  FILTRO EN DESARROYO

filterButton.addEventListener("click", filterItems);

function filterItems(value) {
    let items = document.querySelectorAll(".card");

    items.forEach((element) => {
        if (value == "all") {
            element.classList.remove("d-none")
        }
        else {
            if (element.classList.contains(value)) {
                element.classList.remove("d-none");
            }
            else {
                element.classList.add("d-none");
            }
        }
    });
}
*/