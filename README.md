# Entrega de examen CORE 2020

Esta entrega sigue un esquema similar al resto de entregas de la asignatura.
La principal diferencia es que cada alumno tendrá un enunciado diferente.

Siga los siguientes pasos para obtener el enunciado y realizar la entrega.
Si encuentra problemas, consulte la sección de [preguntas y fallos comunes](preguntas-y-fallos-frecuentes) y los canales habilitados para preguntas durante el examen.


## Pre-requisitos

Es necesario tener node.js (v12), npm, y Git instalados, además del paquete autocorector.


## Paso 1

Para hacer el examen, el alumno debe clonar el repositorio `Entrega_examen` desde la siquiente URL:

     https://github.com/CORE-2020/Entrega_examen

Este repositorio contiene un autocorector del examen y una versión del proyecto Quiz 2020.


Para clonar el repositorio, puede utilizar el siguiente comando:

```
git clone https://github.com/CORE-2020/Entrega_examen
```


## Paso 2

Una vez clonado el repositorio, ha de instalar las dependencias necesarias para el autocorector. Para ello debe ejecutar los comandos:

    cd Entrega_examen
    npm install


## Paso 3

Debe lanzar el autocorrector.
La herramienta de autocorrección preguntará por el correo del alumno y su token de entrega en Moodle. 
En el enlace **https://www.npmjs.com/package/autocorector** se proveen instrucciones para encontrar dicho token.
Es muy importante que escriba su dirección de correo correctamente y **elija la opción de almacenar los datos en el fichero `user.json`**.
En caso contrario, no se mostrará el enunciado correcto.

```
npx autocorector
```

Si la instalación se completa adecuadamente, se habrá creado un fichero `Enunciado.pdf` en la carpeta de su práctica.


## Paso 4


El fichero `Enunciado.pdf` describe una serie de modificaciones que deberá hacer sobre la práctica.

**Nota**: **no** hay que cambiarse a ningún subdirectorio (`quiz_2020`), y **no** hay que hacer otro `npm install` adicional.
Todos los ficheros del proyecto ya se han descargado, están en el directorio raíz de la entrega.

## Paso 5

Para comprobar las modificaciones y subir los resultados a moodle, debe ejecutar el autocorector invocando el comando `npx autocorector --upload`.
El autocorector puede ejecutarse **todas la veces que se desee**, incluso aunque las modificaciones no estén acabadas o el servidor no funcione correctamente.

**MUY IMPORTANTE**: Si no se suben los resultados usando el autocorector al menos una vez, la entrega se suspende automáticamente.


## Preguntas y fallos frecuentes

### Me he equivocado al escribir mi dirección. ¿Cómo puedo cambiarla?

Simplemente cierre el fichero `Enunciado.pdf`, borre el fichero `user.json` y vuelva a lanzar el autocorector.


### ¿Qué significa DEBUG=1?, ¿por qué debo hacerlo?

Se trata de una variable de entorno que podemos utilizar para pedirle al autocorector que nos muestre más información en la salida.

En Linux y macOS se puede cambiar su valor así
```
DEBUG=1
```

En Windows:

```
set DEBUG=1
```

Una vez cambiado el valor, vuelva a ejecutar el autocorector.

En cuanto se resuelva su problema, puede volver a poner el valor `DEBUG=0` de la misma forma.
