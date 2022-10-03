let reserva = []
fetchData = async () => {
    try {
        const resp = await fetch('../horarios.json')
        const data = await resp.json()
        ingresoUsuario(data)
    } catch (error) {
        console.log(error)
    }
}

// ingreso de usuario y bienvenida //
function ingresoUsuario(data) {

    /* boton de ingreso de nombre */
    let boton = document.getElementById("botonIngresar");

    boton.onclick = () => {
        /* input para recibir nombre de usuario */
        let nombre = document.getElementById("nombreUsuario");
        let bienvenida = document.getElementById("contenedor");

        /* restriccion para que no pueda avanzar sin colocar su nombre */
        if (nombre.value !== "") {
            /* bienvenida de usuario */
            let parrafo = document.createElement("p");
            parrafo.innerText = (`Bienvenido/a a la seccion de Reservas de Quintero Barber,  ${nombre.value}`);
            bienvenida.append(parrafo);

            /* solicitud de info para realizar el filtrado de informacion */
            let opcion = document.createElement("section");
            opcion.innerHTML = (`<p>Indique si desea reservar por DIA o por HORA segun nuestros horarios disponibles</p>
            <input type='text' id='inputFiltro'>
            <button id='botonFiltrado'>Siguiente</button>
            `);
            bienvenida.append(opcion);

            let botonSiguiente = document.getElementById("botonFiltrado");
            let filtro = document.getElementById('inputFiltro');
            botonSiguiente.onclick = () => {
                if (filtro.value.toUpperCase() === "DIA") {
                    let parrafoDia = document.createElement("article");
                    parrafoDia.innerHTML = (`
                    <p>los dias disponibles son: ${data.map(el => el.dia)} indique que dia desea asistir</p>
                    <input type='text' id='inputDia'>
                    <button id='botonFiltradoDia'>Siguiente</button>
                    `);
                    bienvenida.append(parrafoDia);
                    let reservaPorDia = document.getElementById('inputDia')
                    let botonFiltro = document.getElementById('botonFiltradoDia');
                    botonFiltro.onclick = () => {
                        reserva.push([{
                            ...data.find(elemento => elemento.dia === reservaPorDia.value.toLowerCase()),
                            nombreReserva: nombre.value
                        }])
                        const [{
                            dia,
                            hora
                        }] = data
                        Toastify({

                            text: "Reserva agendada con exito",
                            duration: 3000,

                            style: {
                                background: "white",
                                color: "black",
                                fontSize: "1rem",
                            }

                        }).showToast();
                        let reservaFinal = document.createElement("p");
                        reservaFinal.innerHTML = (`${nombre.value}, Hemos agendado su reserva, para el dia ${dia} a las ${hora}`);
                        bienvenida.append(reservaFinal);
                        localStorage.setItem('reserva', JSON.stringify(reserva))
                    }
                }
            }

        } else if (nombre.value == "") {
            let error = document.createElement("p");
            error.innerText = ("Por favor ingrese su nombre para continuar");
            bienvenida.append(error);
        }
    }
}

function Recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('reserva'))
    recuperarLS && recuperarLS.map(element => {
        reserva.push(element)
    })
}
Recuperar()
ingresoUsuario();
fetchData();