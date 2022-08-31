function ingresoUsuario(){
    let nombre = document.getElementById("nombreUsuario"); 
    let bienvenida = document.getElementById("contenedor");

    if (nombre.value !== ""){
        console.log (nombre.value);
        let parrafo = document.createElement("p");  
        parrafo.innerText = ("Bienvenido/a a la seccion de Reservas de Quintero Barber " + nombre.value);
        bienvenida.append(parrafo);

        let opcion = document.createElement("p");  
        opcion.innerText = ("Indique si desea reservar por DIA o por HORA segun nuestros turnos disponibles");
        bienvenida.append(opcion);

        let botonDia= document.createElement("button");
        botonDia.innerHTML = "<button onclick='ingresoPorDia()'>RESERVAR POR DIA</button>"; 
        bienvenida.append(botonDia);

        let botonHora= document.createElement("button");
        botonHora.innerHTML = "<button onclick='ingresoPorHora()'>RESERVAR POR HORA</button>"; 
        bienvenida.append(botonHora);
    } else if (nombre.value == ""){
        let error = document.createElement("p");  
        error.innerText = ("Por favor ingrese su nombre para continuar");
        bienvenida.append(error);
    }
}

function ingresoPorDia(){
    let bienvenida = document.getElementById("contenedor");

    let horarioDia = document.createElement("p");  
    horarioDia.innerText = ("Los dias con turnos disponibles son los siguientes: Lunes, Martes, Miercoles, Jueves y viernes. Indique que dia desea asistir");
    bienvenida.append(horarioDia);

    let detalleDia= document.createElement("input");
    detalleDia.innerHTML = "<input type='text'>"; 
    bienvenida.append(detalleDia); 

}