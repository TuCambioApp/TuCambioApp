let carrito = [];

function mostrarPantalla(id) {
  document.querySelectorAll('.container').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  if (id === 'pantallaCarrito') actualizarCarrito();
  if (id === 'pantallaPago') {
    document.getElementById('totalPago').innerText = carrito.reduce((sum, item) => sum + item.precio, 0);
  }
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  document.getElementById('carritoCantidad').innerText = carrito.length;
  document.getElementById('btnVerCarrito').classList.remove('hidden');
}

function actualizarCarrito() {
  const contenedor = document.getElementById('carritoItems');
  contenedor.innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    carrito.forEach((item, index) => {
      const div = document.createElement('div');
      div.innerText = `${item.nombre} - COP$${item.precio}`;
      contenedor.appendChild(div);
    });
  }
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  document.getElementById('carritoCantidad').innerText = "0";
  document.getElementById('btnVerCarrito').classList.add('hidden');
}

function finalizarCompra() {
  const telefono = document.getElementById('telefono').value;
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  if (document.getElementById('formularioCompra').checkValidity()) {
    document.getElementById('mensajeGracias').classList.remove('hidden');

    const mensaje = `¡Gracias por tu compra en TUCAMBIODEACEITE.SHOP! Total pagado: COP$${total}`;
    const numero = telefono.replace(/\D/g, '');
    window.open(`https://wa.me/57${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
  } else {
    alert("Por favor completa todos los campos.");
  }
}

function resetApp() {
  vaciarCarrito();
  document.getElementById('mensajeGracias').classList.add('hidden');
  mostrarPantalla('pantallaInicio');
  document.getElementById('formularioCompra').reset();
}
