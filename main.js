document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioCredito");
    formulario.addEventListener("submit", procesarFormulario);

    const creditos = obtenerCreditosStorage();
    mostrarResultadosAnteriores(creditos);
});

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

function procesarFormulario(event) {
    event.preventDefault();

    const monto = parseFloat(document.getElementById("monto").value);
    const interes = parseFloat(document.getElementById("interes").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);

    if (isNaN(monto) || isNaN(interes) || isNaN(cuotas)) {
        alert("Por favor, ingrese valores numéricos válidos.");
        return;
    }

    const nuevoCredito = new Credito(monto, interes, cuotas);
    almacenarCredito(nuevoCredito);
    mostrarResultado(nuevoCredito);
    mostrarResultadosAnteriores(obtenerCreditosStorage());
}

function mostrarResultado(credito) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p>Monto total a pagar: ${credito.montoTotal.toFixed(2)}</p>
        <p>Cuota mensual: ${credito.cuotaMensual.toFixed(2)}</p>
    `;
}

function almacenarCredito(credito) {
    const creditos = obtenerCreditosStorage();
    creditos.push(credito);
    localStorage.setItem("creditos", JSON.stringify(creditos));
}

function obtenerCreditosStorage() {
    const creditos = localStorage.getItem("creditos");
    return creditos ? JSON.parse(creditos) : [];
}

function mostrarResultadosAnteriores(creditos) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h2>Créditos Anteriores</h2>";
    creditos.forEach(credito => {
        resultadoDiv.innerHTML += `
            <p>Monto: ${credito.monto} | Interés: ${credito.interes}% | Cuotas: ${credito.cuotas}</p>
            <p>Cuota mensual: ${credito.cuotaMensual.toFixed(2)} | Monto total: ${credito.montoTotal.toFixed(2)}</p>
        `;
    });
}