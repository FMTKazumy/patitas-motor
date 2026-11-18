# Documentacion de Estudio: Nodos y Listas Enlazadas en JavaScript

## 1. Conceptos Basicos

### Nodo (`class Nodo`)
* **Que es:** Es la pieza minima o "vagon" de la lista. Es un molde que guarda un dato y una flecha hacia el siguiente elemento.
* **Para que sirve:** Para guardar informacion en cualquier lugar de la memoria RAM sin necesitar espacios seguidos (a diferencia de los arreglos).
* **Codigo:**
  ```javascript
  class Nodo {
    constructor(dato) {
      this.dato = dato;       // La informacion que guardamos
      this.siguiente = null;  // La flecha al proximo nodo (empieza vacia)
    }
  }
  module.exports = Nodo;
  ```

### Punteros de la Lista (`cabeza`, `cola` y `null`)
* **Cabeza (`this.cabeza`):** Es la referencia al primer nodo del tren. Es la puerta de entrada obligatoria; si la pierdes o la mueves sin cuidado, pierdes toda la lista.
* **Cola (`this.cola`):** Es la referencia directa al ultimo nodo del tren. Sirve para agregar elementos al final de inmediato sin tener que caminar por toda la lista.
* **Nulo (`null`):** Es un valor vacio que va al final del ultimo nodo para avisarle al programa que el tren se acabo.
* **Caso especial (1 solo nodo):** Si la lista esta vacia y metes un dato, tanto `cabeza` como `cola` apuntan a ese mismo unico nodo (`cabeza -> [A] <- cola`).

---

## 2. El Motor de Recorrido (`while` y `actual`)

### Puntero Auxiliar (`let actual`)
* **Para que sirve:** Es un "dedo viajero" que usamos para caminar por los nodos **sin mover `this.cabeza`**. Si movieras `this.cabeza` directamente dentro de un ciclo, al terminar quedaria en `null` y perderias el inicio de la lista.

### Operador `!==`
* Significa **"estrictamente diferente de"**. `actual !== null` se lee: *"Mientras actual no sea null..."*.

### Regla de oro de las llaves `{ }` en el `while`
* **Adentro del `while`:** Va lo que se repite en cada nodo (leer, sumar, comparar) y la linea obligatoria para avanzar (`actual = actual.siguiente`). Si olvidas avanzar, creas un bucle infinito y se traba la terminal.
* **Afuera del `while`:** Va lo que se hace una sola vez al terminar todo el viaje (imprimir un total final o retornar un arreglo).

### Variantes del `while`
1. `while (actual !== null)` -> Visita todos los nodos hasta salirse de la lista (sirve para imprimir, sumar o buscar).
2. `while (actual.siguiente !== null)` -> Se detiene parado **encima del ultimo nodo** sin salirse (sirve si quieres enganchar algo al final cuando no tienes `cola`).
3. `while (actual !== null && condicion)` -> Avanza mientras no se acabe la lista y no hayas encontrado lo que buscas.

---

## 3. La Clase `ListaEnlazada` (El Jefe de Estacion)

En lugar de conectar nodos a mano uno por uno, encapsulamos toda la logica dentro de una clase que administra `cabeza`, `cola` y `tamanio`:

```javascript
const Nodo = require("./Nodo");

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamanio = 0;
  }

  estaVacia() {
    return this.tamanio === 0;
  }

  obtenerTamanio() {
    return this.tamanio;
  }

  // Insertar al inicio: O(1)
  agregarAlInicio(dato) {
    const nuevo = new Nodo(dato);
    if (this.estaVacia()) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.siguiente = this.cabeza; // 1. Conectar antes de soltar
      this.cabeza = nuevo;           // 2. Mover la cabeza al nuevo inicio
    }
    this.tamanio++;
  }

  // Insertar al final: O(1)
  agregarAlFinal(dato) {
    const nuevo = new Nodo(dato);
    if (this.estaVacia()) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola.siguiente = nuevo;   // 1. Enganchar detras del ultimo
      this.cola = nuevo;             // 2. Mover la cola al nuevo final
    }
    this.tamanio++;
  }

  // Recorrer ejecutando una accion (callback): O(n)
  recorrer(callback) {
    let actual = this.cabeza;
    while (actual !== null) {
      callback(actual.dato);
      actual = actual.siguiente;
    }
  }

  // Convertir la lista a un arreglo normal: O(n)
  aArreglo() {
    const resultado = [];
    let actual = this.cabeza;
    while (actual !== null) {
      resultado.push(actual.dato);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

module.exports = ListaEnlazada;
```

---

## 4. Logica de Insercion en Medio y Eliminacion

### Regla critica al insertar (Al inicio o en medio)
* **Conecta antes de soltar.** Siempre apunta primero la flecha `.siguiente` del nodo nuevo hacia el resto del tren, y **despues** redirige la flecha del nodo anterior (o de `cabeza`) hacia el nodo nuevo. Si lo haces al reves, sueltas el resto de la lista y la pierdes.

### Como funciona la eliminacion y que pasa con el nodo
* **Como se borra:** Te paras en el nodo **anterior** al que quieres eliminar y haces que su flecha `.siguiente` salte directo al nodo que esta despues (`anterior.siguiente = anterior.siguiente.siguiente`).
* **Casos borde a cuidar:**
  * Si borras el unico nodo que habia, tanto `cabeza` como `cola` deben volver a quedar en `null` y `tamanio` en `0`.
  * Si borras el ultimo nodo (`cola`), debes actualizar `this.cola` para que apunte al penultimo nodo.
* **Que pasa con el nodo borrado:** Al quedarse sin nadie que lo apunte, queda huerfano en la memoria. El **Recolector de Basura (Garbage Collector)** de JavaScript lo elimina automaticamente. Si no lo guardaste en una variable antes de desconectarlo, no se puede recuperar.

---

## 5. Eficiencia (Notacion Big O) y Comparacion con Arreglos

* **O(1) - Tiempo constante:** La operacion tarda lo mismo sin importar si hay 5 datos o 5 millones (ej. `agregarAlInicio` y `agregarAlFinal` usando `cola`).
* **O(n) - Tiempo lineal:** El tiempo crece segun la cantidad de datos porque toca recorrer nodo por nodo (ej. `recorrer`, `aArreglo`, `buscar`, `eliminar`).

| Caracteristica | Lista Enlazada | Arreglo (`[ ]`) |
| :--- | :--- | :--- |
| **Tamano** | Dinamico (crece o baja sin limite fijo). | Fijo o costoso de redimensionar. |
| **Memoria** | Dispersa (en cualquier lugar de la RAM). | Contigua (un dato pegado al otro). |
| **Buscar por posicion** | Lento O(n) (hay que caminar desde cabeza). | Rapido O(1) (acceso directo con `lista[i]`). |
| **Insertar al inicio** | Rapido O(1) (solo cambias flechas). | Lento O(n) (toca correr todos los elementos). |

---

## 6. Conexion de Archivos en Node.js y Git

* **Exportar una clase:** `module.exports = NombreClase;` (al final del archivo).
* **Importar una clase:** `const NombreClase = require('./ruta/Archivo');` (al inicio del archivo).

# Apuntes de Estudio - MiniReto 3: Buscar, Insertar en Medio y Eliminar

## 1. Funciones Condicion (Callbacks)
* En los metodos `buscar`, `insertarDespuesDe` y `eliminar`, en vez de pasar un texto fijo, pasamos una **funcion condicion** (ejemplo: `x => x === "Lola"` o `atencion => atencion.motivo === "Control"`).
* Dentro del ciclo `while`, usamos `if (condicion(actual.dato))` para preguntarle a cada nodo si cumple lo que estamos buscando. Si cumple da `true`, si no da `false`.

---

## 2. Metodo `buscar(condicion)` - Complejidad O(n)
* **Para que sirve:** Encontrar un dato dentro de la lista sin importar en que posicion este.
* **Como funciona:** Caminas desde `this.cabeza` con `actual`. Si `condicion(actual.dato)` es verdadero, retornas `actual.dato` de inmediato. Si sales del `while` y llegaste a `null`, retornas `null`.
* **Codigo:**
  ```javascript
  buscar(condicion) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        return actual.dato;
      }
      actual = actual.siguiente;
    }

    return null;
  }
  ```

---

## 3. Metodo `insertarDespuesDe(condicion, dato)` - Complejidad O(n)
* **Para que sirve:** Meter un nodo nuevo en medio de la lista (justo despues de un nodo especifico).
* **Regla critica (Conecta antes de soltar):**
  1. Primero enganchas el nuevo nodo al resto del tren (`nuevo.siguiente = actual.siguiente`).
  2. Despues rediriges la flecha del nodo donde estas parado hacia el nuevo (`actual.siguiente = nuevo`). Si lo haces al reves, sueltas el resto de la lista y la pierdes.
  3. **Caso borde de la cola:** Si insertaste justo despues de `this.cola`, actualizas `this.cola = nuevo`.
* **Codigo:**
  ```javascript
  insertarDespuesDe(condicion, dato) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = actual.siguiente;
        actual.siguiente = nuevo;

        if (actual === this.cola) {
          this.cola = nuevo;
        }

        this.tamanio++;
        return true;
      }
      actual = actual.siguiente;
    }

    return false;
  }
  ```

---

## 4. Metodo `eliminar(condicion)` con Dos Punteros - Complejidad O(n)
* **Por que dos punteros:** Como en una lista simple las flechas solo miran hacia adelante, para borrar un nodo necesitas estar parado en el de atras. Por eso caminas con dos variables: `anterior` (empieza en `null`) y `actual` (empieza en `this.cabeza`).
* **Los casos borde que debes controlar:**
  1. **Lista vacia:** Si `this.estaVacia()`, retornas `null` de una vez.
  2. **Borrar la cabeza (`anterior === null`):** Mueves `this.cabeza = actual.siguiente`. Si era el unico nodo que habia (`this.cabeza === null`), tambien pones `this.cola = null` para que no quede apuntando a un fantasma.
  3. **Borrar en medio:** Haces un puente saltandote el nodo (`anterior.siguiente = actual.siguiente`).
  4. **Borrar la cola (`actual === this.cola`):** Haces el puente hacia `null` y mueves `this.cola = anterior`.
  5. **Tamaño:** Siempre restas `this.tamanio--` antes de retornar `actual.dato`.
* **Que pasa con el nodo borrado:** Al quedarse sin nadie que lo apunte, el **Recolector de Basura (Garbage Collector)** de JavaScript lo limpia solo de la memoria. Si no lo retornas o guardas antes, no se puede recuperar.
* **Codigo:**
  ```javascript
  eliminar(condicion) {
    if (this.estaVacia()) {
      return null;
    }

    let anterior = null;
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        if (anterior === null) {
          this.cabeza = actual.siguiente;
          if (this.cabeza === null) {
            this.cola = null;
          }
        } else {
          anterior.siguiente = actual.siguiente;
          if (actual === this.cola) {
            this.cola = anterior;
          }
        }

        this.tamanio--;
        return actual.dato;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return null;
  }
  ```

---

## 5. Errores comunes que ya aprendiste a evitar
* **Nunca pongas `;` despues de un `if (...)` o `while (...)`:** Corta la instruccion antes de entrar a las llaves `{ }` y hace que el codigo de abajo se ejecute siempre.
* **Verifica siempre que `this.estaVacia()` lleve parentesis `()`:** Sin parentesis estas preguntando si la funcion existe, no ejecutandola.


# Apuntes de Estudio - MiniReto 4: RegistroClinico y Reporte Final

## 1. Como funciona `RegistroClinico` (El Archivador de Carpetas)
* **Que es:** Es la clase que conecta tu estructura de datos (`ListaEnlazada`) con el problema real de la veterinaria.
* **Como guarda los datos (`this.historiales = {}`):** Usamos un objeto de JavaScript como un archivador. La clave (etiqueta de la carpeta) es el nombre de la mascota (`"Lola (Gata)"`) y el valor guardado adentro es una `ListaEnlazada` completa con todas sus consultas.
* **Como agrega una atencion (`registrarAtencion`):**
  1. Primero revisa si la mascota **no** tiene carpeta todavia usando `if (!this.historiales[mascota])`. El signo `!` significa "no".
  2. Si no existe, le fabrica una carpeta nueva con una lista vacia (`this.historiales[mascota] = new ListaEnlazada()`).
  3. Luego mete la consulta al final de su lista (`this.historiales[mascota].agregarAlFinal(atencion)`).
* **Codigo:**
  ```javascript
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
  ```

---

## 2. Herramientas de JavaScript que usaste en `reporte.js`

### `Object.keys(objeto)`
* **Para que sirve:** Toma un objeto y te devuelve un arreglo normal con los nombres de todas sus claves (las etiquetas de las carpetas).
* **Ejemplo:** `Object.keys(registro.historiales)` devuelve `["Lola (Gata)", "Toby (Perro)", "Mía (Gata)"]`.

### Ciclo `for (const elemento of arreglo)`
* **Para que sirve:** Sirve para recorrer un arreglo elemento por elemento de forma limpia sin tener que usar contadores (`i = 0`). En tu reporte, repite todo el bloque una vez por cada mascota.

### Comillas invertidas (`` ` ``) y `${ }` (Template Literals)
* **Diferencia entre comillas:**
  * Las comillas normales (`"..."` y `'...'`) sirven solo para texto fijo.
  * Las comillas invertidas (`` `...` ``) permiten meter variables o calculos adentro del texto.
* **Para que sirve `${ }`:** Es el hueco donde metes una variable adentro de unas comillas invertidas para que JavaScript imprima su valor.
* **Por que viste dos `$` (`$${costoTotal}`):** El primer `$` esta afuera y es solo el simbolo de pesos en texto normal; el segundo viene pegado a `{costoTotal}` para insertar el numero.

### Operador Ternario (`condicion ? valorSiVerdadero : valorSiFalso`)
* **Para que sirve:** Es una forma corta de escribir un `if / else` en una sola linea para asignar un valor.
* **Como leerlo en tu codigo:**
  ```javascript
  const infoVacuna = vacuna ? `${vacuna.fecha} (${vacuna.veterinario})` : "sin registro";
  ```
  Se lee: *"¿La variable `vacuna` tiene datos? Si si tiene, arma el texto con la fecha y el doctor; si es `null` (como paso con Mia), pon el texto 'sin registro'"*.

---

## 3. Como se conectaron todas las piezas en el Reporte
1. `registro.obtenerHistorial(mascota)` saca la `ListaEnlazada` de esa mascota.
2. `historial.obtenerTamanio()` entrega cuantas citas tuvo en total (tiempo O(1)).
3. `historial.recorrer(...)` camina por todas las citas en orden cronologico para imprimirlas e ir sumando `costoTotal += atencion.costo` (tiempo O(n)).
4. `historial.buscar(...)` busca especificamente la cita cuyo motivo sea `"Vacunación anual"` y devuelve el objeto de la cita o `null` si nunca se la pusieron (tiempo O(n)).

---

## 4. Errores de sintaxis que aprendiste a detectar
* **Comas vs. Puntos:** Un punto (`.`) conecta un objeto con sus metodos o rutas (`./RegistroClinico`, `lista.agregarAlFinal`). Si pones una coma (`,`), JavaScript se confunde.
* **Mayusculas y minusculas:** En Linux y Node.js los nombres de archivos y clases distinguen estrictamente entre mayusculas y minusculas (`ListaEnlazada` no es lo mismo que `listaEnlazada`).
* **Texto exacto en busquedas:** Si buscas `"Vacunación anual"` con tilde, el dato guardado tambien debe tener la tilde o la comparacion (`===`) dara falso.



# Documentacion de Estudio: Colas, Prioridades y Simulación en JavaScript

## 1. Estructura de Datos: Cola (`class Cola`)

### Cola FIFO (`First In, First Out`)
* **Que es:** Una estructura de datos lineal donde el primer elemento en entrar es el primero en salir (como una fila en la recepcion).
* **Para que sirve:** Para gestionar turnos, pedidos o procesos respetando estrictamente su orden de llegada en tiempo constante **O(1)**.
* **Codigo:**
  ```javascript
  class Cola {
      constructor() {
          this.frente = null;   // Puntero al primero en ser atendido
          this.final = null;    // Puntero al ultimo que llego a la fila
          this.longitud = 0;    // Contador para saber el tamaño en O(1)
      }
  }
  ```

### Punteros y Operaciones de la Cola (`encolar` y `desencolar`)
* **Frente (`this.frente`):** Apunta al nodo mas antiguo de la fila. Al llamar a `desencolar()`, solo movemos este puntero hacia `this.frente.siguiente` sin mover los demas elementos en memoria (**O(1)**).
* **Final (`this.final`):** Apunta al ultimo nodo. Permite enganchar turnos nuevos (`this.final.siguiente = nuevoNodo`) sin recorrer toda la fila. Si al desencolar la cola queda vacia, `this.final` debe volver a `null`.
* **Complejidad vs Arreglo:** Usar `shift()` en un arreglo tarda **O(n)** porque obliga a reindexar y correr todos los elementos hacia la izquierda cada vez que sale el primero.

---

## 2. Gestion de Prioridades (`class Recepcion`)

### Doble Cola con Prioridad
* **Que es:** Una clase administradora que contiene dos instancias independientes de `Cola` (`this.urgencias` y `this.generales`).
* **Para que sirve:** Para atender casos criticos antes que consultas normales, manteniendo el orden de llegada interno (**FIFO**) dentro de cada categoria.
* **Codigo:**
  ```javascript
  llamarSiguiente() {
      if (!this.urgencias.estaVacia()) {
          return this.urgencias.desencolar();   // Prioridad absoluta a urgencias
      } else if (!this.generales.estaVacia()) {
          return this.generales.desencolar();   // Si no hay urgencias, pasan generales
      }
      return null;
  }
  ```

---

## 3. Herramientas de Simulacion y Metodos de JavaScript

### Calculo del Reloj (`Math.floor` y `%`)
* **Que es:** Operaciones matematicas para convertir minutos acumulados (ej. `85`) a formato de hora reloj (`"09:25"`).
* **Para que sirve:** Evita errores al sumar horas y minutos como texto durante una simulacion minuto a minuto.
* **Codigo:**
  ```javascript
  function formatearHora(minutos) {
      const horas = 8 + Math.floor(minutos / 60); // Division entera: saca las horas completas
      const mins = minutos % 60;                  // Modulo (%): saca los minutos que sobran
      return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  ```

### Formateo de Texto (`.toString()` y `.padStart()`)
* **`.toString()`:** Convierte un numero en cadena de texto para poder manipular sus caracteres.
* **`.padStart(2, '0')`:** Rellena el texto por la izquierda con ceros hasta completar 2 caracteres (convierte `"5"` en `"05"`).

### Arreglos y Funciones Flecha (`.reduce()`, `=>` y `.toFixed()`)
* **Funcion Flecha (`=>`):** Forma corta de escribir funciones en JavaScript.
* **`.reduce((acum, val) => acum + val, 0)`:** Recorre un arreglo de numeros y los suma todos en una sola variable acumuladora (`acum`) que inicia en `0`.
* **`.toFixed(2)`:** Corta y redondea un numero decimal a exactamente 2 decimales (ej. `8.3333` pasa a `"8.33"`).
* **Codigo:**
  ```javascript
  // Suma todos los tiempos de espera y los divide entre la cantidad de pacientes
  const calcularPromedio = (lista) => lista.reduce((acum, val) => acum + val, 0) / lista.length;
  console.log(calcularPromedio(esperasUrgencias).toFixed(2));
  ```

### Medicion de Rendimiento (`console.time` y `console.timeEnd`)
* **Que es:** Un cronometro nativo de Node.js para medir cuanto tarda en ejecutarse un bloque de codigo en milisegundos.
* **Para que sirve:** Para comprobar en la practica la diferencia de velocidad entre una estructura **O(1)** (Cola con nodos) y una **O(n)** (Arreglo con `shift()`).









--------------------------------------------------






BITACORA Mini reto 1 |Semana 2| día 1 | 17/11/2026
cabeza -> [02/02 Vacunación | $85.000] -> [15/03 Control de peso | $40.000] -> [20/05 Limpieza dental | $150.000] -> null

BITACORA Mini reto 2 |Semana 2| día 1 | 17/11/2026
• Lista vacía (cabeza: null, cola: null): Al agregar el nodo A, tanto cabeza como cola pasan a apuntar a A (cabeza -> [A] <- cola).
• Lista con un nodo ([A]):
	• Al inicio (B): B.siguiente apunta a A, y cabeza se mueve a B (cola se queda en A).
	• Al final (B): cola.siguiente (que es A.siguiente) apunta a B, y cola se mueve a B (cabeza se queda en A).
• Lista con varios nodos ([A] -> [B]): Funciona exactamente igual que con un nodo: solo tocas un extremo sin recorrer nada.


Como se mueven cabeza y cola al insertar:

Al inicio (agregarAlInicio):
- Lista vacia: cabeza -> [A] <- cola (los dos apuntan al mismo porque es el unico)
- Con 1 nodo: cabeza -> [B] -> [A] <- cola (B apunta a A y cabeza pasa a ser B, la cola no se mueve)
- Con varios: cabeza -> [C] -> [B] -> [A] <- cola (C se engancha antes de B y cabeza sube a C)

Al final (agregarAlFinal):
- Lista vacia: cabeza -> [A] <- cola (igual, los dos apuntan al unico nodo)
- Con 1 nodo: cabeza -> [A] -> [B] <- cola (el siguiente de la cola apunta a B y cola pasa a ser B)
- Con varios: cabeza -> [A] -> [B] -> [C] <- cola (se engancha detras de la cola actual y cola baja a C)

Complejidad (Big O):
- agregarAlInicio y agregarAlFinal: O(1) porque van directo a la cabeza o a la cola sin recorrer nada.
- estaVacia y obtenerTamanio: O(1) porque solo miran las variables que ya tenemos guardadas.
- recorrer y aArreglo: O(n) porque les toca caminar por toda la lista desde la cabeza hasta null.

BITACORA Mini reto 1 |Semana 2| día 1 | 17/11/2026

1. buscar:
Voy pasando nodo por nodo desde la cabeza con un while. Si encuentro lo que busco lo devuelvo de una, y si llego a null sin encontrar nada devuelvo null.

2. insertarDespuesDe:
Busco el nodo donde quiero meter el dato nuevo. Cuando lo encuentro, primero conecto el nodo nuevo al que seguia para no soltar el resto de la lista, y ya despues si conecto el actual al nuevo. Si lo meti despues de la cola, actualizo la cola.

3. eliminar (con anterior y actual):
Como las flechas solo van para adelante, me toca caminar con dos variables: actual que va mirando el nodo y anterior que viene un paso atras.
- Si la lista esta vacia devuelve null.
- Si solo habia un nodo, borro la cabeza y tambien dejo la cola en null para que no quede apuntando a nada.
- Si borro la cabeza (cuando anterior es null), solo muevo la cabeza al siguiente.
- Si borro uno del medio, salto el nodo conectando el anterior con el que sigue (anterior.siguiente = actual.siguiente) y el nodo suelto se borra solo de la memoria.
- Si borro la cola, hago lo mismo y muevo la cola al anterior.
- Si no existe el dato, llega a null y devuelve null.

**Big O:**
Los tres metodos son O(n) porque en el peor caso toca recorrer toda la lista para encontrar el nodo.

BITACORA Mini reto 4 |Semana 2| día 1 | 17/11/2026

**Por que use una lista enlazada y un objeto para las mascotas:**
- Use un objeto normal para guardar cada mascota con su nombre y encontrar su carpeta al instante.
- Adentro de cada mascota use una lista enlazada porque las consultas medicas van aumentando sin un limite fijo y se van leyendo en orden desde la primera hasta la ultima.

**Que pasaria si tuviera que buscar entre 10.000 citas:**
- Encontrar la carpeta de la mascota por su nombre seguiria siendo inmediato (O(1)).
- Pero buscar una cita especifica dentro de un historial tan largo se pondria lento (O(n)), porque tocaria ir revisando cita por cita desde la primera hasta dar con ella.

BITACORA Mini reto 5 |Semana 2| día 2 | 18/11/2026

Me piden antes de tocar el código, dibujar el estado de una cola con referencias "frente" y "final" despues de encolar a Lola, Toby y Mía y desencolar de una vez.

Bajo el principio de FIFO:

frente --> [Lola] --> [Toby] --> [Mía] --> null

                                   ^
                                  final 

como sale Lola, el puntero frente apunta a Toby y el final sigue igual a Mía.
frente --> [Toby] --> [Mía] --> null

                        ^
                      final 

PRUEBAS DE TIEMPO

Cola con Nodos:  9.34 ms
Arreglo tradicional (push/shift): 673.05 ms

En cola con nodos tardó menos tiempo porque el codigo va directo a la dirreción de memoria que necesita (O(1)).

Por el contrario, el arreglo con shift lo que hace es recorrer todo el codigo, es decir, si sale alguno de la lista lo que sucede es que todos los demás se corren un espacio a la izquierda, lo que sería O(n), esto le toma más tiempo al programa y por lo tanto tarda más en ejecutarse.

BITACORA Mini reto 6 |Semana 2| día 2 | 18/11/2026

08:00 Toby -- General

1. El consultorio está libre, Toby entra de inmediato a las 08:00 y termina a las 08:20

2. 08:20 Toby -- Sale de consulta
    2.1 Mientras Toby consultaba, llegaron dos mascotas: Max a las 08:05 (general), Luna 08:10 URGENCIA y Simón 08:20 (General)
    2.2 Como Luna es ugencia, se salta a Max e ingresa inmediatamente a consulta 08:20 y términa 8:40
    2.3 Espera de luna: 10 min (08:10-08:20)

3. 08:40 Luna -- Sale de consulta
    3.1 Mientras se atendía la urgencia de Luna, llegaron: Kira 08:25 URGENCIA y Nala 08:40 general
    3.2 En sala de espera tenemos: Max general 08:05, Simón general 08:20, Kira URGENCIA 08:25 y Nala general 08:40
        3.3 Como Kira es URGENCIA, se salta a Max, Simón y Nala, e ingresa a consulta a las 08:40 y termina a las 09:00
    3.4 Espera de Kira: 15 min (08:25-08:40)

4. 09:00 Kira -- Sale de consulta
    4.1 Justo a las 09:00 llega Rocky URGENCIA
    4.2 En sala de espera tenemos: Max general 08:05, Simón general 08:20, Nala general 08:40 y Rocky URGENCIA 09:00
    4.3 Como Rocky es URGENCIA, tiene prioridad e ingresa inmediatamente a las 09:00 y termina a las 09:20
    4.4 Espera de Rocky: 0 min (09:00-09:00)

5. 09:20 Rocky -- Sale de consulta
    5.1 Ya no quedan urgencias en espera, así que se atienden las generales en orden de llegada (FIFO)
    5.2 Ingresa Max general (llegó 08:05) a las 09:20 y termina a las 09:40
    5.3 Espera de Max: 75 min (08:05-09:20)

6. 09:40 Max -- Sale de consulta
    6.1 Ingresa Simón general (llegó 08:20) a las 09:40 y termina a las 10:00
    6.2 Espera de Simón: 80 min (08:20-09:40)

7. 10:00 Simón -- Sale de consulta
    7.1 Ingresa la última paciente, Nala general (llegó 08:40) a las 10:00 y termina a las 10:20
    7.2 Espera de Nala: 80 min (08:40-10:00)

--- RESUMEN DE PROMEDIOS ---
- Promedio espera Urgencias: (10 + 15 + 0) / 3 = 8.33 min
- Promedio espera Generales: (0 + 75 + 80 + 80) / 4 = 58.75 min


8. Verificación contra la simulación (node src/simulacion.js)
    8.1 Al ejecutar el código, el orden de atención coincidió exactamente con el cálculo manual: Toby -> Luna -> Kira -> Rocky -> Max -> Simón -> Nala
    8.2 Los promedios reales fueron: 8.33 min para Urgencias y 58.75 min para Generales (100% iguales a la traza a mano)
    8.3 Conclusión: El uso de dos colas FIFO independientes prioriza las urgencias sin alterar el orden de llegada interno de cada fila
