const Nodo = require("./Nodo");

class Cola {
    constructor() {
     this.frente = null;
     this.final = null;
     this.longitud = 0 ;  
    }
    estaVacia(){
        return this.longitud === 0;
    }
    tamanio (){
        return this.longitud;
    }
    encolar(dato){
    const nuevoNodo = new Nodo(dato);
    if (this.estaVacia()) {
        this.frente = nuevoNodo;
        this.final = nuevoNodo;
    } else {
        this.final.siguiente = nuevoNodo;
        this.final = nuevoNodo;
    }
    this.longitud++;
    }
    verFrente(){
    
    if (this.estaVacia()) {
        return null;
        
    }else{
        return this.frente.dato;
    }
    }
    desencolar(){
    
    if (this.estaVacia()) {
        return null;
    }
        const atendido = this.frente.dato;
        this.frente = this.frente.siguiente;
        this.longitud--
    if (this.estaVacia()) {
        this.final = null;
    }
    return atendido;
    }
    
}





module.exports = Cola;