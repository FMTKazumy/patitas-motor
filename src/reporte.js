const RegistroClinico = require('./RegistroClinico');

const registro = new RegistroClinico();

registro.registrarAtencion ("Lola (Gata)", { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });

registro.registrarAtencion ("Lola (Gata)", { fecha: " 15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 });

registro.registrarAtencion ("Lola (Gata)", { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });

registro.registrarAtencion ("Toby (Perro)", { fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 });

registro.registrarAtencion ("Toby (Perro)", { fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000 });

registro.registrarAtencion ("Toby (Perro)", { fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });

registro.registrarAtencion ("Mía (Gata)", { fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 });

registro.registrarAtencion ("Mía (Gata)", { fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 });

console.log("REPORTE CLÍNICO PATITAS");

const mascotas  =   Object.keys(registro.historiales);

for (const mascota of mascotas) {
    const historial = registro.obtenerHistorial(mascota);
    let costoTotal = 0;

    console.log(`Paciente: ${mascota}`);
  console.log(`Número de atenciones: ${historial.obtenerTamanio()}`);
  console.log("Historial cronológico:");

  historial.recorrer((atencion) => {
    console.log(`  - [${atencion.fecha}] ${atencion.motivo} (${atencion.veterinario}): $${atencion.costo}`);
    costoTotal += atencion.costo;
  });
 

  const vacuna = historial.buscar((atencion) => atencion.motivo === "Vacunación anual");
  const infoVacuna = vacuna ? `${vacuna.fecha} (${vacuna.veterinario})` : "sin registro";

  console.log(`Última vacunación: ${infoVacuna}`);
  console.log(`Costo total: $${costoTotal}`);
  console.log("--------------------------------------------------\n");
}


    
    

