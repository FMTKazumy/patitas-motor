# Guía Práctica: Nodos y Listas Enlazadas en JavaScript

## 1. Conceptos Fundamentales (¿Qué es cada cosa y para qué sirve?)

### Nodo (`class Nodo`)
* **¿Qué es?** Es la unidad básica o "vagón" de la lista. Es una plantilla que guarda información y sabe dónde está el siguiente elemento.
* **¿Para qué sirve?** Para encapsular cualquier dato (un número, un texto o un objeto completo como una consulta médica) junto con una referencia al próximo nodo.
* **Ejemplo:**
  ```javascript
  class Nodo {
    constructor(dato) {
      this.dato = dato;       // Aquí se guarda la información
      this.siguiente = null;  // Aquí se guarda la flecha al próximo nodo
    }
  }
  ```

### Referencia / Puntero (`.siguiente`)
* **¿Qué es?** Una propiedad dentro del nodo que guarda la dirección en memoria del siguiente nodo.
* **¿Para qué sirve?** Para conectar los nodos entre sí sin necesidad de que estén uno al lado del otro en la memoria RAM (a diferencia de los arreglos).
* **Ejemplo:**
  ```javascript
  nodo1.siguiente = nodo2; // El nodo 1 ahora apunta al nodo 2
  ```

### Cabeza (`cabeza` / `head`)
* **¿Qué es?** Una variable que guarda la referencia al **primer nodo** de toda la lista.
* **¿Para qué sirve?** Es la puerta de entrada. Sin la cabeza, no tienes forma de encontrar el inicio de la cadena y pierdes acceso a todos los datos.
* **Ejemplo:**
  ```javascript
  const cabeza = nodo1; // Marcamos cuál es el primer vagón del tren
  ```

### Nulo (`null`)
* **¿Qué es?** Un valor especial en JavaScript que significa "vacío" o "sin referencia".
* **¿Para qué sirve?** Se coloca en el `.siguiente` del último nodo para avisarle al programa que la lista ya terminó y no siga buscando más vagones.
* **Ejemplo:**
  ```javascript
  // Visualmente: [Nodo 1] -> [Nodo 2] -> null
  ```

---

## 2. Herramientas de Recorrido y Lógica

### Operador de desigualdad estricta (`!==`)
* **¿Qué significa?** Significa **"estrictamente diferente de"** (compara tanto el valor como el tipo de dato). Se usa en lugar de `!=` porque es más seguro y evita errores ocultos.
* **¿Cómo leerlo?** `actual !== null` se lee: *"Mientras la variable `actual` **no sea** `null`..."*.

### Puntero Auxiliar (`let actual`)
* **¿Qué es?** Una variable temporal que usamos como "dedo señalador" para ir saltando de nodo en nodo.
* **¿Para qué sirve?** Para recorrer la lista **sin mover la `cabeza`**. Si movieras la `cabeza` directamente, perderías el inicio de la lista para siempre.
* **Ejemplo:**
  ```javascript
  let actual = cabeza; // Ponemos el dedo en el primer nodo
  ```

### Ciclo `while` (El motor de recorrido)
* **¿Qué es?** Una estructura que repite un bloque de código mientras se cumpla una condición.
* **¿Para qué sirve?** Como en una lista enlazada no sabemos cuántos elementos hay ni tenemos índices, el `while` nos permite avanzar paso a paso.
* **Regla de oro de las llaves `{ }`:**
  * **Adentro:** Va lo que se repite en cada nodo (leer datos, sumar) y el paso para avanzar (`actual = actual.siguiente`).
  * **Afuera:** Va lo que se hace una sola vez al terminar todo el viaje (imprimir un total final).
* **Ejemplo base:**
  ```javascript
  let actual = cabeza;
  let total = 0;

  while (actual !== null) {
    console.log(actual.dato.nombre);       // 1. Leemos el dato
    total = total + actual.dato.precio;    // 2. Acumulamos un valor
    actual = actual.siguiente;             // 3. Avanzamos al siguiente (OBLIGATORIO)
  }

  console.log("Total final:", total);      // Se imprime 1 sola vez al terminar
  ```

### Variantes del `while` según lo que necesites hacer
1. **`while (actual !== null)` — Visitar todos los nodos:**
   Se usa para imprimir toda la lista o sumar valores. El ciclo frena cuando `actual` ya salió de la lista y cayó en el vacío (`null`).
2. **`while (actual.siguiente !== null)` — Detenerse en el último nodo:**
   Se usa para quedar parado **encima del último vagón** sin salirse de la lista. Sirve para enganchar un nuevo nodo al final (`actual.siguiente = nuevoNodo`) cuando no tienes referencia a `cola`.
3. **`while (actual !== null && condicion)` — Detenerse antes si encuentras algo:**
   Se usa al **buscar** o **eliminar**. Avanza mientras no se acabe la lista **y** mientras no hayas encontrado lo que buscas. En cuanto lo halla, frena sin recorrer el resto.
4. **`while (actual !== cabeza)` — Para listas circulares:**
   Como en una lista circular el último nodo vuelve al primero y nunca hay `null`, se avanza hasta dar la vuelta completa y regresar a `cabeza`.

---

## 3. Operaciones Clave y Reglas de Supervivencia

### Insertar al inicio — Complejidad O(1)
* **¿Para qué sirve?** Para agregar un elemento nuevo al principio de la lista de forma instantánea.
* **Regla crítica:** **Conecta antes de soltar.** Primero apunta el nuevo nodo hacia la `cabeza` actual, y luego actualiza la `cabeza` hacia el nuevo nodo. Si lo haces al revés, pierdes toda la lista.
* **Ejemplo:**
  ```javascript
  const nuevoNodo = new Nodo("Nuevo dato");
  nuevoNodo.siguiente = cabeza; // 1. Aseguramos el tren actual
  cabeza = nuevoNodo;           // 2. Movemos la cabeza al nuevo inicio
  ```

### Eliminar un nodo — Complejidad O(n)
* **¿Para qué sirve?** Para quitar un elemento intermedio sin romper el resto de la cadena.
* **¿Cómo funciona?** Te paras en el nodo **anterior** al que quieres borrar y haces que su flecha salte directo al nodo que está después del eliminado.
* **¿Qué pasa con el nodo borrado?** Al quedarse sin nadie que lo apunte, el **Recolector de Basura (Garbage Collector)** de JavaScript lo borra automáticamente de la memoria. Si no lo guardaste en una variable antes, no se puede recuperar.
* **Ejemplo:**
  ```javascript
  // Lista original: [A] -> [B] -> [C] -> null
  // Para eliminar [B] estando parados en [A]:
  nodoA.siguiente = nodoA.siguiente.siguiente; 
  // Resultado: [A] -> [C] -> null
  ```

---

## 4. ¿Cuándo usar Lista Enlazada vs. Arreglo (`Array`)?

| Característica | Lista Enlazada | Arreglo (`[ ]`) |
| :--- | :--- | :--- |
| **Tamaño** | Dinámico (crece o baja sin límite fijo). | Fijo o costoso de redimensionar. |
| **Memoria** | Dispersa (los nodos viven en cualquier lado). | Contigua (un elemento pegado al otro). |
| **Buscar por posición** | Lento **O(n)** (hay que recorrer desde el inicio). | Instantáneo **O(1)** (vas directo con `lista[i]`). |
| **Insertar / Borrar** | Rápido **O(1)** al inicio (solo cambias flechas). | Lento **O(n)** (toca correr todos los elementos). |

---

## 5. Módulos en Node.js (Conectar archivos)

* **`module.exports = Nodo;`** -> Va al final del archivo donde creas la clase para permitir que otros archivos la usen.
* **`const Nodo = require('../src/Nodo');`** -> Va al inicio del archivo donde quieres importar y usar esa clase.



--------------------------------------------------
BITACORA 1 ----- 17/11/2026
cabeza -> [02/02 Vacunación | $85.000] -> [15/03 Control de peso | $40.000] -> [20/05 Limpieza dental | $150.000] -> null
