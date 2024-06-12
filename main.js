
class Credito {
    constructor(monto, interes, cuotas) {
        this.monto = monto;
        this.interes = interes;
        this.cuotas = cuotas;
        this.cuotaMensual = this.calcularCuotaMensual();
        this.montoTotal = this.calcularMontoTotal();
    }

    calcularCuotaMensual() {
        if (this.interes === 0) {
            return this.monto / this.cuotas;
        } else {
            const interesMensual = this.interes / 100 / 12;
            return (this.monto * interesMensual) / (1 - Math.pow((1 + interesMensual), -this.cuotas));
        }
    }

    calcularMontoTotal() {
        return this.cuotaMensual * this.cuotas;
    }
}

const creditos = [];

function simuladorDeCreditos() {
    const monto = obtenerMonto();
    const interes = obtenerInteres();
    const cuotas = obtenerCuotas();

    if (isNaN(monto) || isNaN(interes) || isNaN(cuotas)) {
        alert("Por favor, ingrese valores numéricos válidos.");
        return;
    }

    const nuevoCredito = new Credito(monto, interes, cuotas);
    creditos.push(nuevoCredito);
    mostrarResultados(nuevoCredito);
    analizarCreditos();
}

function obtenerMonto() {
    return parseFloat(prompt("Ingrese el monto del crédito:"));
}

function obtenerInteres() {
    return parseFloat(prompt("Ingrese la tasa de interés (%):"));
}

function obtenerCuotas() {
    return parseInt(prompt("Ingrese la cantidad de cuotas:"));
}

function mostrarResultados(credito) {
    alert(`
        Monto total a pagar: ${credito.montoTotal.toFixed(2)}
        Cuota mensual: ${credito.cuotaMensual.toFixed(2)}
    `);
}

function analizarCreditos() {
    const totalCreditos = creditos.length;
    const montoPromedio = creditos.reduce((acc, credito) => acc + credito.monto, 0) / totalCreditos;
    const mayorMonto = creditos.reduce((acc, credito) => credito.monto > acc ? credito.monto : acc, 0);
    const menorMonto = creditos.reduce((acc, credito) => credito.monto < acc ? credito.monto : acc, Infinity);

    console.log(`Total de créditos registrados: ${totalCreditos}`);
    console.log(`Monto promedio de los créditos: ${montoPromedio.toFixed(2)}`);
    console.log(`Mayor monto de crédito: ${mayorMonto}`);
    console.log(`Menor monto de crédito: ${menorMonto}`);
}

function filtrarCreditosPorInteres(interesMinimo) {
    const creditosFiltrados = creditos.filter(credito => credito.interes >= interesMinimo);
    creditosFiltrados.forEach(credito => {
        console.log(`Crédito con monto ${credito.monto} e interés ${credito.interes}%`);
    });
}

console.log("Ejemplo de filtrado de créditos:");
filtrarCreditosPorInteres(10);
