const Cola = require ("../src/Cola.js");
const recepcion = new Cola();

recepcion.encolar({
    mascota: "Lola",
    tutor: "Ana",
    horaLlegada: "08:00",
    motivo: "Vacuna",
});

recepcion.encolar({
    mascota: "Toby",
    tutor: "Christian",
    horaLlegada: "08:05",
    motivo: "Rx de estomago",
});


recepcion.encolar({
    mascota: "Mía",
    tutor: "Rama",
    horaLlegada: "08:15",
    motivo: "Vacuna anual",
});


recepcion.encolar({
    mascota: "Perrito",
    tutor: "Gorgi",
    horaLlegada: "09:00",
    motivo: "Limpieza de oídos",
});

recepcion.encolar({
    mascota: "Pafuera",
    tutor: "Carlos",
    horaLlegada: "10:00",
    motivo: "Peluquería",
});

console.log("Siguiente turno:", recepcion.verFrente());
console.log("Turnos en espera", recepcion.tamanio());

while (! recepcion.estaVacia()) {
    const turnoAtendido = recepcion.desencolar();
    console.log("Macota en consulta", turnoAtendido.mascota, "Motivo", turnoAtendido.motivo);   
}

console.log("Intento en cola vacía", recepcion.desencolar());


const TOTAL_TURNOS = 100000;
console.time("Cola con Nodos");
const colaNodos = new Cola();

for (let i = 0; i < TOTAL_TURNOS; i++){
    colaNodos.encolar(i);

}

for (let i = 0; i < TOTAL_TURNOS; i++){
    colaNodos.desencolar();

}
console.timeEnd("Cola con Nodos");

console.time("Arreglo con push y shift")
const colaArreglo = [];

for (let i = 0; i < TOTAL_TURNOS; i++){
    colaArreglo.push(i);

}

for (let i = 0; i < TOTAL_TURNOS; i++){
    colaArreglo.shift();

}
console.timeEnd("Arreglo con push y shift");
