const Nodo = require ("./Nodo");

class Pila {
    constructor() {
      this.tope = null;  
      this.longitud = 0;  
    }
    tamanio(){
        return this.longitud;
    }
    estaVacia(){
        return this.longitud === 0;
    
    }
    apilar (dato){
        const nuevoNodo = new Nodo (dato);
        nuevoNodo.siguiente = this.tope;
        this.tope = nuevoNodo;
        this.longitud++;
    }
    verTope(){
        if (this.estaVacia()) {
            return null;
            
        }else{
            return this.tope.dato;
        }
        
        
    }
   
    desapilar() {
        if (this.estaVacia()) {
            return null;
        }
        const dato = this.tope.dato;
        this.tope = this.tope.siguiente;
        this.longitud--;
        return dato;
    }
    
}


module.exports = Pila;