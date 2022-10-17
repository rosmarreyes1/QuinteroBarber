//Array de los productos a incluir, con los precios incluidos. 
let carritoDeCompras = [];

const stock = document.getElementById('stock');
const contenedorCarrito = document.getElementById('carritoModal');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

fetchData = async () => {
    try {
        const resp = await fetch('../json/productos.json')
        const data = await resp.json()
        Productos(data)
    } catch (error) {
        console.log(error)
    }
}

Productos = (data) => {
    stock.innerHTML = '';
    data.forEach(element => {
        let {
            img,
            nombre,
            id,
            precio,
        } = element
        let article = document.createElement('article');
        article.classList.add('productos');
        article.innerHTML += `
        
        <div class="card m-2" style="width: 18rem;">
        <img src=${img} class="card-img-top" alt="...">
        <div class="card-body">
        <button class="agregarCarrito d-flex ms-auto" id=agregar${id}>
        <img src="../multimedia/ingresocarrito.svg" alt="Carrito de compras">
        </button>
        <h5 class="card-title">${nombre}</h5>
        <p>Precio: $${precio}</p>
        </div>
        </div> 
        `;
        stock.appendChild(article);
        let btnCards = document.getElementById(`agregar${id}`);
        btnCards.addEventListener('click', () => {
            Toastify({
                text: "Agregaste un producto al carrito",
                duration: 1500,
                style: {
                    background: "linear-gradient(to right, #9A0000, #000000)",
                },
            }).showToast()
            Carrito(id)
        });

    });
}
Carrito = (id) => {
    let agregarUnidad = carritoDeCompras.find(element => element.id == id)
    if (agregarUnidad) {
        agregarUnidad.cantidad = agregarUnidad.cantidad + 1;
        document.getElementById(`unidad${id}`).innerHTML = `<p id=unidad${id}>Unidad:${agregarUnidad.cantidad}</p>`;
        actualizarCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    } else {
        let btnCarrito = async () => {
            const resp = await fetch('../json/productos.json')
            const data = await resp.json()
            let carritoFinal = data.find(item => item.id == id);
            carritoFinal.cantidad = 1;
            carritoDeCompras.push(carritoFinal);
            mostrarCarrito(carritoFinal);
            actualizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }
        btnCarrito();
    };
}

mostrarCarrito = (carritoFinal) => {
    let div = document.createElement('div')
    div.className = 'muestraCarrito';
    div.innerHTML = `
                <p>${carritoFinal.nombre} </p>
                <p>Precio: $${carritoFinal.precio} </p>
                <p id="unidad${carritoFinal.id}">Unidad: ${carritoFinal.cantidad} </p>
                <button id="delete${carritoFinal.id}" class="boton-eliminar ms-auto d-flex"><img src="../multimedia/trash3.svg"></button> 
                `;
    contenedorCarrito.appendChild(div);
    let btnDelete = document.getElementById(`delete${carritoFinal.id}`)
    btnDelete.addEventListener('click', () => {
        Toastify({
            text: "Eliminaste un producto del carrito",
            duration: 1500,
            style: {
                background: "linear-gradient(to right, #9A0000, #000000)",
            },
        }).showToast()

        if (carritoFinal.cantidad == 1) {
            btnDelete.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != carritoFinal.id);
            actualizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        } else {
            carritoFinal.cantidad = carritoFinal.cantidad - 1;
            document.getElementById(`unidad${carritoFinal.id}`).innerHTML = `<p id=unidad${carritoFinal.id}>Unidad:${carritoFinal.cantidad}</p>`;
            actualizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }
    })
}

actualizarCarrito = () => {
    contadorCarrito.innerText = carritoDeCompras.reduce((agg, el) => agg + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((agg, el) => agg + (el.precio * el.cantidad), 0);
}

recuperar = () => {
    let recuperarLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    if (recuperarLocalStorage) {
        recuperarLocalStorage.forEach(element => {
            mostrarCarrito(element)
            carritoDeCompras.push(element)
            actualizarCarrito()
        })
    }
}

FinalizarCompra = () => {
    document.querySelector('.btnSweet').addEventListener('click', () => 
        Swal.fire({
            title: 'Estás seguro que finalizaste tu compra?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../paginas/carrito.html'
            }
        })
    )
}

FinalizarCompra();
fetchData();
recuperar();