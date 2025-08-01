/* Simulador de Conversión de Dinero */

// Simulamos una tasa de cambio fija.
const TASA_DE_CAMBIO_DOLAR = 1350.50;

/**
 Solicita y valida la cantidad en pesos a convertir
 @returns {number|null} - El monto validado como número, o null si el usuario cancela.
 */
function obtenerMontoARS() {
    let montoValido = false;

    // Ciclo para asegurar que el usuario ingrese un dato válido.
    while (!montoValido) {
        const montoStr = prompt("Por favor, ingrese el monto en Pesos Argentinos (ARS) que desea convertir:");

        // Si el usuario presiona "Cancelar", prompt devuelve null. Terminamos la función
        if (montoStr === null) {
            return null;
        }

        const monto = parseFloat(montoStr);

        // Condicional para validar que el input sea un número y sea positivo
        if (!isNaN(monto) && monto > 0) {
            return monto; // Si es válido, lo retornamos
        } else {
            alert("❌ Error: Por favor, ingrese un número válido y mayor a cero.");
        }
    }
}

/**
 Realizamos el cálculo de conversión.
 @param {number} montoARS - Cantidad de pesos argentinos.
 @returns {number} - Cantidad equivalente en dólares.
 */
function convertirADolares(montoARS) {
    return montoARS / TASA_DE_CAMBIO_DOLAR;
}

/**
 Muestra el resultado de la conversión al usuario
 @param {number} montoARS - cantidad de dinero original en pesos
 @param {number} montoUSD - cantidad de dinero a dólares
 */
function mostrarResultado(montoARS, montoUSD) {
    const resultadoFormateado = `Resumen de la Conversión:\n
Monto ingresado: $${montoARS.toFixed(2)} ARS
Tasa de cambio: $${TASA_DE_CAMBIO_DOLAR.toFixed(2)} ARS por USD
Monto convertido: $${montoUSD.toFixed(2)} USD`;

    alert(resultadoFormateado);
}

/**
 Muestra el historial completo de conversiones en la consola
 @param {Array<Object>} historial - en el array quedaria con todos los objetos de conversión
 */
function mostrarHistorialEnConsola(historial) {
    console.clear();
    console.log("--- Historial Completo de Conversiones ---");

    if (historial.length === 0) {
        console.log("No se realizó ninguna conversión en esta sesión.");
    } else {
        // Recorremos el array de historial y mostramos cada objeto de conversión
        historial.forEach((conversion, index) => {
            console.log(`\n - Operación #${index + 1}:`);
            console.log(`    - Fecha: ${conversion.fecha}`);
            console.log(`    - Usuario: ${conversion.usuario}`); // Añadido
            console.log(`    - Convertido: $${conversion.montoARS.toFixed(2)} ARS a $${conversion.montoUSD.toFixed(2)} USD`);
            console.log(`    - Tasa aplicada: ${conversion.tasaDeCambio.toFixed(2)} ARS/USD`);
        });
        alert("El historial detallado de todas sus conversiones se ha mostrado en la consola del navegador (Presione F12 para verlo).");
    }

    console.log("\n----------------------------------------------");
}

/**
 Preguntamos el nombre del usuario y lo valida.
 @returns {string|null} - nombre del usuario o null si cancela.
 */
function obtenerNombreUsuario() {
    let nombre = null;
    while (!nombre) {
        nombre = prompt("Por favor, ingrese su nombre para iniciar el simulador:");
        if (nombre === null) {
            return null; // Si cancela, retornamos null
        }
        if (nombre.trim() === "") {
            alert("El nombre no puede estar vacío.");
            nombre = null;
        }
    }
    return nombre;
}

/**
 Esta es la Función Principal del Simulador
 */
function iniciarSimulador() {
    alert("¡Bienvenido al Simulador de Conversión de Moneda!");

    const historialConversiones = [];
    const usuarios = []; // aca se almacenarán los nombres de los usuarios

    let continuarSimulador = true;

    while (continuarSimulador) {
        // Obtenemos el nombre del usuario al inicio de cada sesión
        const nombreUsuario = obtenerNombreUsuario();
        if (nombreUsuario === null) {
            break; // Si el usuario cancela, salimos
        }
        
        usuarios.push(nombreUsuario); // Registramos al nuevo usuario
        let operacionesUsuario = 0;

        let continuarUsuario = true;
        while (continuarUsuario) {
            // Entrada de datos
            const montoIngresado = obtenerMontoARS();

            if (montoIngresado !== null) {
                // Procesamiento de datos
                const montoConvertido = convertirADolares(montoIngresado);

                // Salida de datos
                mostrarResultado(montoIngresado, montoConvertido);
                
                operacionesUsuario++; // Incrementamos el contador de operaciones

                // Objeto con los datos de la operación actual
                const conversionActual = {
                    fecha: new Date().toLocaleString(),
                    usuario: nombreUsuario, // Guardamos el nombre del usuario en el historial
                    montoARS: montoIngresado,
                    montoUSD: montoConvertido,
                    tasaDeCambio: TASA_DE_CAMBIO_DOLAR
                };

                // Ponemos el objeto en el array del historial.
                historialConversiones.push(conversionActual);

            } else {
                // Si el usuario canceló en el primer prompt, salimos
                break;
            }

            // Preguntamos si desea hacer otra operación
            continuarUsuario = confirm(`Hola ${nombreUsuario}, ¿Desea realizar otra conversión?`);
        }

        // Preguntamos si otro usuario desea usar el simulador
        continuarSimulador = confirm("¿Desea que otro usuario realice conversiones?");
    }

    // Al salir, mostramos el historial completo
    mostrarHistorialEnConsola(historialConversiones);

    // Muestra el resumen de usuarios y operaciones en la consola
    console.log(`--- Resumen de la Sesión ---`);
    console.log(`Total de usuarios registrados: ${usuarios.length}`);
    console.log(`Total de operaciones realizadas: ${historialConversiones.length}`);
    console.log("----------------------------");

    alert("Gracias por usar nuestro conversor. ¡Hasta pronto!");
}

// Llamo a la función principal para que comience el programa
iniciarSimulador();