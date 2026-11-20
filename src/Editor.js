const Pila = require("./Pila");
const RegistroClinico = require("./RegistroClinico");

class Editor {
    constructor(registro) {
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
        this.registro = registro || new RegistroClinico();
    }

    agregar(mascota, atencion) {
        this.registro.registrarAtencion(mascota, atencion);
        this.pilaDeshacer.apilar({ tipo: "agregar", mascota, atencion });
        this.pilaRehacer = new Pila();
    }

    eliminar(mascota, condicion) {
        const historial = this.registro.obtenerHistorial(mascota);
        if (!historial) {
            return null;
        }

        const eliminada = historial.eliminar(condicion);
        if (eliminada) {
            this.pilaDeshacer.apilar({ tipo: "eliminar", mascota, atencion: eliminada });
            this.pilaRehacer = new Pila();
        }

        return eliminada;
    }

    deshacer() {
        if (this.pilaDeshacer.estaVacia()) {
            return null;
        }

        const accion = this.pilaDeshacer.desapilar();

        if (accion.tipo === "agregar") {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            if (historial) {
                historial.eliminar(item => item === accion.atencion);
            }
        } else if (accion.tipo === "eliminar") {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        }

        this.pilaRehacer.apilar(accion);
        return accion;
    }

    rehacer() {
        if (this.pilaRehacer.estaVacia()) {
            return null;
        }

        const accion = this.pilaRehacer.desapilar();

        if (accion.tipo === "agregar") {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        } else if (accion.tipo === "eliminar") {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            if (historial) {
                historial.eliminar(item => item === accion.atencion);
            }
        }

        this.pilaDeshacer.apilar(accion);
        return accion;
    }
}

module.exports = Editor;
