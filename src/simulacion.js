const Recepcion = require("./Recepcion");

const llegadas = [
  { mascota: "Toby", 
    tipo: "General", 
    horaLlegada: "08:00", 
    minutoLlegada: 0, 
    motivo: "Control de vacunas" },

  { mascota: "Max", 
    tipo: "General", 
    horaLlegada: "08:05", 
    minutoLlegada: 5, 
    motivo: "Revisión de piel" },

    { mascota: "Luna", 
    tipo: "Urgencia", 
    horaLlegada: "08:10", 
    minutoLlegada: 10, 
    motivo: "Intoxicación" },

    { mascota: "Simón", 
    tipo: "General", 
    horaLlegada: "08:20", 
    minutoLlegada: 20, 
    motivo: "Corte de uñas" },


    { mascota: "Kira", 
    tipo: "Urgencia", 
    horaLlegada: "08:25", 
    minutoLlegada: 25, 
    motivo: "Herida en pata" },


    { mascota: "Nala", 
    tipo: "General", 
    horaLlegada: "08:40", 
    minutoLlegada: 40, 
    motivo: "Desparacitación" },


    { mascota: "Rocky", 
    tipo: "Urgencia", 
    horaLlegada: "09:00", 
    minutoLlegada: 60, 
    motivo: "Dificultad para respirar" },
]
function formatearHora(minutos) {
    const horas = 8 +  Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

const recepcion = new Recepcion();
let minutoActual = 0;
let consultorioLibreEn = 0;
let indiceLlegadas = 0;
const esperasUrgencias = [];
const esperasGenerales = [];

while (indiceLlegadas < llegadas.length || recepcion.hayPacientes()) {


while (indiceLlegadas < llegadas.length && llegadas[indiceLlegadas].minutoLlegada === minutoActual) {

  const paciente = llegadas[indiceLlegadas];
  recepcion.registrarLlegada(paciente);
  console.log(`[${formatearHora(minutoActual)}] Llega: ${paciente.mascota} (${paciente.tipo})`);
  indiceLlegadas++;
}


if (minutoActual >= consultorioLibreEn && recepcion.hayPacientes()) {
  const atendido = recepcion.llamarSiguiente();
  const espera = minutoActual - atendido.minutoLlegada;
  const horaFin = minutoActual + 20;

  if (atendido.tipo === "Urgencia") {
    esperasUrgencias.push(espera);
  } else {
    esperasGenerales.push(espera);
  }

  console.log(`[${formatearHora(minutoActual)}] Entra a consulta: ${atendido.mascota} (${atendido.tipo}) | Espera: ${espera} min | Sale: ${formatearHora(horaFin)}`);
  consultorioLibreEn = horaFin;
}
minutoActual++;
}
const calcularPromedio = (lista) => lista.reduce((acum, val) => acum + val, 0) / lista.length;

console.log("\n--- RESUMEN DE TIEMPOS DE ESPERA ---");
console.log(`Promedio Urgencias: ${calcularPromedio(esperasUrgencias).toFixed(2)} min`);
console.log(`Promedio Generales: ${calcularPromedio(esperasGenerales).toFixed(2)} min`);
