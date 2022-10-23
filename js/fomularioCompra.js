
const formularioCompra = () => {
    document.querySelector('#formularioCompra').addEventListener('click', () => 
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra realizada con exito',
        showConfirmButton: false,
        timer: 1500
    }).then((result) => {
                window.location.href = '../index.html'
        })
    )
}

formularioCompra();