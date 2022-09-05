let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");
let UsuariosQueIngresaron =[];

class BienvenidaUsuarios {
    constructor (nombre, apellido){
        this.nombre= nombre;
        this.apellido= apellido;
    };
    
    bienvenida() { 
        alert("Bienvenido a Quintero Barber " + UsuariosQueIngresaron + ", " + "acontinuacion le indicaremos los horarios disponibles para realizar su reserva");
        UsuariosQueIngresaron.push(this.nombre, this.apellido);
        console.log(UsuariosQueIngresaron);
    }
}; 
let usuario= new BienvenidaUsuarios (nombre, apellido);


let horarios= [
    {dia:'lunes', hora: "15:00hs"},
    {dia:'martes', hora: "9:00hs"},
    {dia:'miercoles', hora: "13:00hs"},
    {dia:'jueves', hora: "10:00hs"},
    {dia:'viernes', hora: "11:00hs"},
    {dia:'sabado', hora: "18:00hs"},
];
function reserva() {
    let dia = prompt("En Quintero Barber podemos reservar por Dia o por Hora,\nIngrese 'Dia', para ingresar \nIngrese 'Hora' para ingresar \nO ingreses ESC para salir").toUpperCase();
    
    while (dia !== "ESC" ) {
        if (dia === "DIA" ) {
            let reservaPorDia = prompt("los dias disponibles son: LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, y SABADO ");
            let diaReservado = horarios.find(elemento => (elemento.dia === reservaPorDia))
            alert("Hemos agendado su reserva, para el dia " + diaReservado.dia + " a las " + diaReservado.hora)
            break
        } else if(dia === "HORA"){
            let reservaPorHora = prompt("Los horarios disponibles son: 15:00hs, 9:00hs, 13:00hs, 10:00hs, 11:00hs, 18:00s")
            let horarioReservado = horarios.find(elemento => (elemento.hora === reservaPorHora))
            alert("Hemos agendado su reserva, para el dia " + horarioReservado.dia + " a las " + horarioReservado.hora)
            break
        }else if(dia !== "HORA" || dia !== "DIA"){
            alert("por favor ingrese un dato valido");
            return reserva();
        }
    if (dia === "ESC") {
        alert("usted ha salido de la seccion de reserva");
    } 
}
}

usuario.bienvenida();
reserva();