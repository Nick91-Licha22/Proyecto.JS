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
 Mostramos el historial completo de conversiones en la consola
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
            console.log(`   - Fecha: ${conversion.fecha}`);
            console.log(`   - Convertido: $${conversion.montoARS.toFixed(2)} ARS a $${conversion.montoUSD.toFixed(2)} USD`);
            console.log(`   - Tasa aplicada: ${conversion.tasaDeCambio.toFixed(2)} ARS/USD`);
        });
        alert("El historial detallado de todas sus conversiones se ha mostrado en la consola del navegador (Presione F12 para verlo).");
    }

    console.log("\n----------------------------------------------");
}


/**
 Función Principal del Simulador
 */
function iniciarSimulador() {
    alert("¡Bienvenido al Simulador de Conversión de Moneda!");

    //ARRAY: Aca almacenaremos los objetos de cada conversión
    const historialConversiones = [];
    let continuar = true;

    //esto es para que el usuario pueda realizar varias conversiones
    while (continuar) {
        // Entrada de datos
        const montoIngresado = obtenerMontoARS();

        // Si el usuario no canceló, procedemos
        if (montoIngresado !== null) {
            // Procesamiento de datos
            const montoConvertido = convertirADolares(montoIngresado);

            // Salida de datos
            mostrarResultado(montoIngresado, montoConvertido);

            //objeto con los datos de la operación actual
            const conversionActual = {
                fecha: new Date().toLocaleString(), // le agregamos fecha y hora para que quede más completo
                montoARS: montoIngresado,
                montoUSD: montoConvertido,
                tasaDeCambio: TASA_DE_CAMBIO_DOLAR
            };

            //ponemos el objeto en el array para la conversión al historial.
            historialConversiones.push(conversionActual);

        } else {
            // Si el usuario canceló en el primer prompt, salimos
            break;
        }

        // le Preguntamos si desea hacer otra operación
        continuar = confirm("¿Desea realizar otra conversión?");
    }

    //Al salir, le mostramos el historial completo
    mostrarHistorialEnConsola(historialConversiones);

    alert("Gracias por usar nuestro conversor. ¡Hasta pronto!");
}

//llamo a la función principal para que comience el programa
iniciarSimulador();