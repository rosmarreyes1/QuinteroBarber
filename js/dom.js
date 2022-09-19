// array de objetos con horarios disponibles
let horarios = [{
        dia: 'lunes',
        hora: "15:00hs"
    },
    {
        dia: 'martes',
        hora: "9:00hs"
    },
    {
        dia: 'miercoles',
        hora: "13:00hs"
    },
    {
        dia: 'jueves',
        hora: "10:00hs"
    },
    {
        dia: 'viernes',
        hora: "11:00hs"
    },
    {
        dia: 'sabado',
        hora: "18:00hs"
    },
];
let reserva = []
// ingreso de usuario y bienvenida //
function ingresoUsuario() {

    /* boton de ingreso de nombre */
    let boton = document.getElementById("botonIngresar");

    boton.onclick = () => {
        /* input para recibir nombre de usuario */
        let nombre = document.getElementById("nombreUsuario");
        let bienvenida = document.getElementById("contenedor");

        /* restriccion para que no pueda avanzar sin colocar su nombre */
        if (nombre.value !== "") {
            console.log(nombre.value);

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
                console.log(filtro.value)
                if (inputFiltro.value.toUpperCase() === "DIA") {
                    let parrafoDia = document.createElement("article");
                    parrafoDia.innerHTML = (`
                    <p>los dias disponibles son: ${horarios.map(el => el.dia)} indique que dia desea asistir</p>
                    <input type='text' id='inputDia'>
                    <button id='botonFiltradoDia'>Siguiente</button>
                    `);
                    bienvenida.append(parrafoDia);
                    let reservaPorDia = document.getElementById('inputDia')
                    let botonFiltro = document.getElementById('botonFiltradoDia');
                    botonFiltro.onclick = () => {
                        reserva.push([{
                            ...horarios.find(elemento => elemento.dia === reservaPorDia.value.toLowerCase()),
                            nombreReserva: nombre.value
                        }])
                        const [{
                            dia,
                            hora
                        }] = horarios
                        Toastify({

                            text: "Reserva agendada con exito",
                            duration: 3000,

                            style:{
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