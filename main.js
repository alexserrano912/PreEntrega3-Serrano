document.addEventListener('DOMContentLoaded', cargarCreditos);

function cargarCreditos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Créditos cargados:', data);
        })
        .catch(error => console.error('Error al cargar los créditos:', error));
}

document.getElementById('creditoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const interes = parseFloat(document.getElementById('interes').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);

    const totalInteres = (monto * (interes / 100));
    const totalAPagar = monto + totalInteres;
    const cuota = totalAPagar / cuotas;

    mostrarResultado(totalAPagar, cuota);
});

function mostrarResultado(total, cuota) {
    swal({
        title: "Resultado del Crédito",
        text: `El monto total a pagar es: $${total.toFixed(2)}\nMonto por cuota: $${cuota.toFixed(2)}`,
        icon: "success",
        button: "Aceptar",
    });
}
