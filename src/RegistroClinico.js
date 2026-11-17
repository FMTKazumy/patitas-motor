const ListaEnlazada = require('./ListaEnlazada');

class RegistroClinico {
  constructor() {
    this.historiales = {};
  }

  registrarAtencion(mascota, atencion) {
    if (!this.historiales[mascota]) {
      this.historiales[mascota] = new ListaEnlazada();
    }

    this.historiales[mascota].agregarAlFinal(atencion);
  }

  obtenerHistorial(mascota) {
    return this.historiales[mascota] || null;
  }
}

module.exports = RegistroClinico;
