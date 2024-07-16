document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioCredito');
    const resultadoDiv = document.getElementById('resultado');
    const creditosAnterioresDiv = document.getElementById('creditosAnteriores');

    let creditos = JSON.parse(localStorage.getItem('creditos')) || [];

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent default form submission

        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const cuotas = parseInt(document.getElementById('cuotas').value);

        if (isNaN(monto) || isNaN(interes) || isNaN(cuotas) || monto <= 0 || interes <= 0 || cuotas <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese valores válidos.',
            });
            return;
        }

        const credito = calcularCredito(monto, interes, cuotas);
        creditos.push(credito);
        localStorage.setItem('creditos', JSON.stringify(creditos));
        mostrarResultado(credito);
        mostrarCreditosAnteriores();
    });

    function calcularCredito(monto, interes, cuotas) {
        const interesMensual = interes / 100 / 12;
        const cuotaMensual = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -cuotas));
        const totalPagado = cuotaMensual * cuotas;
        const totalIntereses = totalPagado - monto;

        return {
            monto,
            interes,
            cuotas,
            cuotaMensual,
            totalPagado,
            totalIntereses
        };
    }

    function mostrarResultado(credito) {
        const resultado = `
            <h3>Resultado del Crédito</h3>
            <p>Monto del Crédito: $${credito.monto.toFixed(2)}</p>
            <p>Tasa de Interés: ${credito.interes}%</p>
            <p>Cuotas: ${credito.cuotas}</p>
            <p>Cuota Mensual: $${credito.cuotaMensual.toFixed(2)}</p>
            <p>Total Pagado: $${credito.totalPagado.toFixed(2)}</p>
            <p>Total de Intereses: $${credito.totalIntereses.toFixed(2)}</p>
        `;
        resultadoDiv.innerHTML = resultado;
    }

    function mostrarCreditosAnteriores() {
        creditosAnterioresDiv.innerHTML = '<h2>Créditos Anteriores</h2>';
        creditos.forEach((credito, index) => {
            creditosAnterioresDiv.innerHTML += `
                <p>Crédito ${index + 1}: $${credito.monto.toFixed(2)} a ${credito.interes}% en ${credito.cuotas} cuotas. Cuota Mensual: $${credito.cuotaMensual.toFixed(2)}</p>
            `;
        });
    }

    // Mostrar créditos anteriores al cargar la página
    mostrarCreditosAnteriores();
});

