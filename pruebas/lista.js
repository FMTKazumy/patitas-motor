const ListaEnlazada = require('../src/ListaEnlazada');

const lista = new ListaEnlazada();
console.log("Está vacía al inicio?", lista.estaVacia());

lista.agregarAlFinal("Control de peso");
lista.agregarAlInicio("Vacunación");
lista.agregarAlFinal("Limpieza dental");

console.log("Lista completa:", lista.aArreglo());
console.log("Cabeza actual:", lista.cabeza.dato);
console.log("Cola actual:", lista.cola.dato);
console.log("Tamaño total:", lista.obtenerTamanio());

lista.recorrer((atencion) => {
  console.log("Recorriendo:", atencion);
});

//-----------------------------------------------------------------------------------------------------------------------------------------------//

//CASOS BORDE MINI RETO 3//

const vacia = new ListaEnlazada();
console.log("1. Eliminar en vacía:", vacia.eliminar(x => x === "A")); 

const unNodo = new ListaEnlazada();
unNodo.agregarAlFinal("Lola");
console.log("2. Eliminar único:", unNodo.eliminar(x => x === "Lola")); 
console.log("   ¿Quedó vacía?:", unNodo.estaVacia(), "Cola:", unNodo.cola); 

const listaBorde = new ListaEnlazada();
listaBorde.agregarAlFinal("Vacunación");
listaBorde.agregarAlFinal("Limpieza");
listaBorde.insertarDespuesDe(x => x === "Vacunación", "Control");
console.log("Lista armada:", listaBorde.aArreglo()); 

console.log("3. Eliminar cabeza:", listaBorde.eliminar(x => x === "Vacunación"));
console.log("   Nueva cabeza:", listaBorde.cabeza.dato); 

listaBorde.agregarAlInicio("Urgencia");
console.log("4. Eliminar medio:", listaBorde.eliminar(x => x === "Control"));
console.log("   Lista actual:", listaBorde.aArreglo()); 

console.log("5. Eliminar cola:", listaBorde.eliminar(x => x === "Limpieza"));
console.log("   Nueva cola:", listaBorde.cola.dato); 

console.log("6. Buscar inexistente:", listaBorde.buscar(x => x === "Cirugía")); 
console.log("   Eliminar inexistente:", listaBorde.eliminar(x => x === "Cirugía"));
