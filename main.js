class Credito {
    constructor(monto, interes, cuotas) {
        this.monto = monto;
        this.interes = interes;
        this.cuotas = cuotas;
        this.cuotaMensual = 0;
        this.totalPagado = 0;
        this.totalIntereses = 0;
    }

    calcularCuota() {
        const tasaMensual = this.interes / 100 / 12;
        const divisor = Math.pow(1 + tasaMensual, this.cuotas) - 1;
        this.cuotaMensual = (this.monto * tasaMensual * Math.pow(1 + tasaMensual, this.cuotas)) / divisor;
        this.totalPagado = this.cuotaMensual * this.cuotas;
        this.totalIntereses = this.totalPagado - this.monto;
    }
}

document.getElementById('calcular').addEventListener('click', () => {
    const monto = parseFloat(document.getElementById('monto').value);
    const interes = parseFloat(document.getElementById('interes').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);

    if (isNaN(monto) || isNaN(interes) || isNaN(cuotas) || cuotas <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    const credito = new Credito(monto, interes, cuotas);
    credito.calcularCuota();

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Resultado del Crédito</h3>
        <p>Monto del Crédito: $${credito.monto.toFixed(2)}</p>
        <p>Tasa de Interés: ${credito.interes}%</p>
        <p>Cuotas: ${credito.cuotas}</p>
        <p>Cuota Mensual: $${credito.cuotaMensual.toFixed(2)}</p>
        <p>Total Pagado: $${credito.totalPagado.toFixed(2)}</p>
        <p>Total de Intereses: $${credito.totalIntereses.toFixed(2)}</p>
    `;

    localStorage.setItem('credito', JSON.stringify(credito));
});

window.onload = () => {
    const creditoGuardado = localStorage.getItem('credito');
    if (creditoGuardado) {
        const credito = JSON.parse(creditoGuardado);
        document.getElementById('resultado').innerHTML += `
            <h3>Último Crédito Guardado</h3>
            <p>Monto del Crédito: $${credito.monto}</p>
            <p>Tasa de Interés: ${credito.interes}%</p>
            <p>Cuotas: ${credito.cuotas}</p>
        `;
    }
};

fetch('data.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error al cargar los créditos:', error));
