const Cola = require ('./Cola');

class Recepcion {
    constructor() {
        this.urgencias = new Cola();
        this.generales = new Cola();
    }
    registrarLlegada(turno){
        if (turno.tipo === "Urgencia") {
            this.urgencias.encolar(turno);
        }else{
            this.generales.encolar(turno);
        }
    }
        hayPacientes(){
            return !this.urgencias.estaVacia() || !this.generales.estaVacia(); 
        }
        llamarSiguiente(){
            if (! this.urgencias.estaVacia()) {
               return this.urgencias.desencolar();
            }else if(!this.generales.estaVacia()){
               return this.generales.desencolar();
            }else{
                return null;
            }
        }
    }




module.exports = Recepcion;