# Entrega de examen CORE 2020

Esta entrega sigue un esquema similar al resto de entregas de la asignatura.
La principal diferencia es que cada alumno tendrá un enunciado diferente.
Para ello, el instalador (`npm install`) le pedirá su dirección de correo UPM, y automáticamente generará un enunciado personalizado.

Tras las instalación (ver [](#Preparación)), el enunciado estará disponible en `Enunciado.md`.


## Preparación

Para hacer el examen, el alumno debe clonar el repositorio `Entrega_examen` desde la siquiente URL:

     https://github.com/CORE-2020/Entrega_examen

Este repositorio contiene un autocorector del examen y una versión del proyecto Quiz 2020.


Una vez descargada la entrega, el alumno debe instalar las dependencias necesarias para el autocorector. Para ello debe ejecutar los comandos:

    cd Entrega_examen
    npm install


Al instalar, el comando le pedirá su correo de alumnos UPM.
Si la instalación se completa adecuadamente, se habrá creado un fichero `Enunciado.md` en la carpeta de su práctica.


## Regenerar el enunciado

Si ha habido algún problema con la copia del enunciado o se ha equivocado de dirección de correo, se puede regenerar el enunciado con el siguiente comando:

```
npm run generate
```
