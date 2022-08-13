let usuario = prompt("Ingrese su nombre");

function bienvenidaUsuario() {
    alert("Bienvenido a Quintero Barber " + usuario + ", " + "acontinuacion le indicaremos los horarios disponibles para realizar su reserva");
}

function reserva() {
    let dia = prompt("En Quintero Barber trabajamos de Lunes a Sabado de 9hs a 19hs, indique el dia de la semana que desea asistir: \n * Lunes \n * Martes \n * Miercoles \n * Jueves \n * Viernes \n * Sabado \n o ingrese ESC para salir").toUpperCase();

    while (dia !== "ESC" ) {
        if (dia ==="LUNES"|| dia ==="MARTES"||dia ==="MIERCOLES"|| dia ==="JUEVES"||dia ==="VIERNES"|| dia ==="SABADO" ) {
                let horario = prompt("los horarios disponibles para el dia " + dia + " son los siguientes: \n 10:00hs \n 13:00hs \n 15:00hs \n 19:00hs \n Ingrese el horario que desea reservar en el formato (00:00hs) o ingrese ATRAS para volver al menu anterior");
                if (horario === "10:00hs"||horario === "13:00hs"||horario === "15:00hs"||horario === "19:00hs"){
                    alert(usuario + "," + " Su reserva ha sido agendada con exito para el dia "+ dia + " a las " + horario);
                    break
                } else if (horario === "ATRAS") {
                    return reserva();
                } else {
                    alert ("ingrese un dato valido");
                }      
        } else if (dia !== (dia ==="LUNES"|| dia ==="MARTES"||dia ==="MIERCOLES"|| dia ==="JUEVES"||dia ==="VIERNES"|| dia ==="SABADO")){
            alert("por favor ingrese un dato valido");
            return reserva();
        }
    }if (dia === ESC) {
        alert("usted ha salido de la seccion de reserva");
    }
}

bienvenidaUsuario();
reserva();