const Editor = require("../src/Editor");

const editor = new Editor();
const mascota = "Max";

const atencionA = { id: "A", motivo: "Vacuna" };
const atencionB = { id: "B", motivo: "Control" };
const atencionC = { id: "C", motivo: "Desparasitación" };


function obtenerContenidoPila(pila) {
    const items = [];
    let actual = pila.tope;
    while (actual !== null) {
        items.push(`${actual.dato.tipo}(${actual.dato.atencion.id})`);
        actual = actual.siguiente;
    }
    return items.length > 0 ? `[${items.join(" -> ")}]` : "[] (vacía)";
}

function mostrarEstado(paso) {
    const historial = editor.registro.obtenerHistorial(mascota);
    const lista = historial ? historial.aArreglo().map(a => a.id) : [];
    console.log(`=== ${paso} ===`);
    console.log("  Historial:", JSON.stringify(lista));
    console.log("  Pila Deshacer (tope -> base):", obtenerContenidoPila(editor.pilaDeshacer));
    console.log("  Pila Rehacer  (tope -> base):", obtenerContenidoPila(editor.pilaRehacer));
    console.log("");
}


editor.agregar(mascota, atencionA);
mostrarEstado("Paso 1: agregar A");

editor.agregar(mascota, atencionB);
mostrarEstado("Paso 2: agregar B");

editor.eliminar(mascota, a => a.id === "A");
mostrarEstado("Paso 3: eliminar A");

editor.deshacer();
mostrarEstado("Paso 4: deshacer (revierte eliminar A)");

editor.deshacer();
mostrarEstado("Paso 5: deshacer (revierte agregar B)");

editor.rehacer();
mostrarEstado("Paso 6: rehacer (vuelve a agregar B)");

editor.agregar(mascota, atencionC);
mostrarEstado("Paso 7: agregar C (limpia pilaRehacer)");

const res8 = editor.rehacer();
mostrarEstado(`Paso 8: rehacer (no hace nada, retorna: ${res8})`);
