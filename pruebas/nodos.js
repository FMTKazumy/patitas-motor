const Nodo = require('../src/Nodo')

const atencion1 = new Nodo({
    fecha: "02/02",
    motivo: "Vacunación",
    veterinario: "Dra Ríos",
    costo: 85000
}) ;

const atencion2 = new Nodo({
    fecha: "15/03",
    motivo: "Control de peso",
    veterinario: "Dr Gómez",
    costo: 40000
}) ;

const atencion3 = new Nodo({
    fecha: "20/05",
    motivo: "Limpieza dental",
    veterinario: "Dra Ríos",
    costo: 150000
}) ;

atencion1.siguiente = atencion2
atencion2.siguiente = atencion3

const cabeza = atencion1

let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente
    ;
    
    
}
 actual = cabeza
 let  costoTotal = 0;
 
 while (actual !== null) {
    costoTotal = costoTotal + actual.dato.costo
    actual = actual.siguiente 
    
    
 }
 console.log("Costo total:",costoTotal);
