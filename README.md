

## **_DEPRECATED_** in favor of [@guumaster/rpgen](https://github.com/guumaster/rpgen)

**_WARNING: A lot of Spanish ahead!_**


## Descripción

Este modulo permite generar contenido aleatorio basado en texto formateado. Puedes usar plantillas, tablas con pesos, filtros, y varias utilidades.

## Demo online 

Puedes ver un monton de ejemplos de funcionamiento online aquí: [Roleando - Generadores aleatorios](https://roleando.herokuapp.com/generadores)

## Instalación 

```sh
 npm install @guumaster/rpg-random-generator
```

## Usando el generador en JS

Crea un fichero `test.js` con el siguiente contenido: 

```js
'use strict'

const RandomGenerator = require('@guumaster/rpg-generator-engine')

const myGenerator = new RandomGenerator()

myGenerator.fromRemote('H1JTSHyN')
  .then(() => {
    console.log( myGenerator.generate() )
  })
  .catch(err => console.log(err.stack))

``` 

## Como agregar contenido a un generador

### Uso Básico
---

Un generador aleatorio consta de dos partes. Plantillas y tablas.

**Las plantillas** son texto de una o mas lineas que incluye marcadores que serán reemplazados con textos aleatorios obtenidos de las tablas.

**Las tablas** son las listas que se utilizan para seleccionar los contenidos aleatorios.

Los generadores aleatorios cumplen unas pocas reglas de formato relativamente sencillas. Tantos las plantillas como las tablas tienen una linea de cabecera que indica el inicio y su nombre. 

#### Plantillas
---

Una plantilla comienza con una linea indicadora de plantilla y un nombre. El formato de la linea de cabecera es el siguiente: `;@plantilla|NOMBRE_PLANTILLA`.

Una plantilla de ejemplo: 

```code
;@plantilla|mi_super_generador
Este texto es fijo y no cambia. Solo cambia el texto que esta entre parentesis.
Un ejemplo de contenido variable es: [tabla_ejemplo]
```

#### Tablas
---

Una tabla comienza con una linea indicadora de tabla y un nombre. El formato de la linea de cabecera es el siguiente: `;NOMBRE_DE_TABLA`.

Cada linea de una tabla es una opcion que se escogerá de forma aleatoria al momento de ser reemplazada en una plantilla.

Un generador puede contener todas las tablas necesarias para dar variedad a las plantillas.

Una tabla de ejemplo: 

```code
;tabla_ejemplo
la primera opcion
otra variante de ejemplo
siguiente opcion
ya se entendiendo como va?
seguro? dale otra vez
etc, etc, etc.
```

### Uso Avanzado
---

Los generadores tienen mas opciones de uso avanzado. Por ejemplo se puede incluir filtros y modificadores

#### Modificadores
---

Se puede modificar la cantidad de veces que se selecciona de una tabla añadiendo un multiplicador con el siguiente formato al hacer referencia a una tabla. Los modificadores posibles son:

*   `[x5@una_tabla]`: Selecciona 5 veces de la tabla [una_tabla]
*   `[2d8@una_tabla]`: Selecciona 2d8 veces de la tabla [una_tabla]
*   `[20%@una_tabla]`: Selecciona de la tabla [una_tabla] el 20% de las veces
*   `[1/5@una_tabla]`: Selecciona de la tabla [una_tabla] 1 de cada 5 veces

#### Filtros
---

Los filtros se aplican una vez que la seleccion se ha realizado y sirven para cambiar el texto obtenido de la tabla. Los filtros posibles son:

*   `[una_tabla|may]`: Convierte a mayúscula la linea seleccionada de [una_tabla]. Ej: 'El Rio Anduín' a 'EL RIO ANDUÍN'
*   `[una_tabla|min]`: Convierte a minúscula la linea seleccionada de [una_tabla].Ej: 'LA MONTAÑA SOLITARIA' a 'la montaña solitaria'
*   `[una_tabla|nombre]`: Convierte modo nombre la linea seleccionada de [una_tabla]. Ej: 'gandalf el gris' a 'Gandalf el Gris'
*   `[una_tabla|frase]`: Convierte modo titulo la linea seleccionada de [una_tabla]. Ej: 'ConTenIdo sin FormaTo' a 'Contenido sin formato'
*   `[una_tabla|masc]`: Convierte a su forma masculina un adjetivo seleccionado de [una_tabla]. Ej: 'Destructora' a 'Destructor'
*   `[una_tabla|fem]`: Convierte a su forma femenina un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'Destructora'
*   `[una_tabla|+ar.gen]`: Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'el Destructor'
*   `[una_tabla|+ar.genf]`: Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Valiente' a 'la Valiente'
*   `[una_tabla|+ar.genm]`: Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Constante' a 'el Constante'
*   `[una_tabla|+ar.ind]`: Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'un Destructor'
*   `[una_tabla|+ar.indf]`: Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Valiente' a 'una Valiente'
*   `[una_tabla|+ar.indm]`: Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Constante' a 'un Constante'

#### Pesos
---

La seleccion aleatoria de una tabla puede llevar un peso. El peso indica la chance que tiene una linea de ser seleccionada sobre las demas. 

El peso se indica de forma opcional como primer numero en cada linea, separando del texto con una coma `(,)`. 

Por ejemplo, en la siguiente tabla, la primera linea tendra un 50% de posiblidades de salir sobre las cuatro restantes: 

```code
;tabla_con_peso
5,esta linea saldra 50% de veces
1,linea 2 solo el 10% de las veces
1,linea 3 solo el 10% de las veces
1,linea 4 solo el 10% de las veces
1,linea 5 solo el 10% de las veces
1,linea 6 solo el 10% de las veces
```
