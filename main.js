const productos = [
    { nombre: "sorrentinos", precio: 3000 },
    { nombre: "humita", precio: 1500 },
    { nombre: "ravioles", precio: 2500 },
    { nombre: "tallarines", precio: 2000 },
    { nombre: "bologñesa", precio: 1800 },
    { nombre: "scarparo", precio: 2200 }
];


function obtenerPrecio(producto) {
    const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === producto.toLowerCase());
    if (productoEncontrado) {
        return productoEncontrado.precio;
    } else {
        alert("Datos incorrectos");
        return 0;
    }
}


function calcularPrecioTotal(pedidos) {
    let total = 0;
    let totalCantidad = 0;
    pedidos.forEach(({ producto, cantidad }) => {
        const precioUnitario = obtenerPrecio(producto);
        total += precioUnitario * cantidad;
        totalCantidad += cantidad;
    });
    return { total, totalCantidad };
}


function aplicarDescuento(precioTotal, cantidadTotal) {
    if (cantidadTotal > 2) {
        return precioTotal * 0.85; 
    }
    return precioTotal;
}


function mostrarProductosDisponibles() {
    let mensaje = "Productos disponibles:\n";
    productos.forEach(p => {
        mensaje += `${p.nombre}: $${p.precio}\n`;
    });
    return mensaje;
}


function gestionarCompra() {
    let pedidos = [];
    let seguirComprando = true;

    while (seguirComprando) {
        alert(mostrarProductosDisponibles());

        const producto = prompt("Ingrese el nombre del producto:").toLowerCase();
        if (!productos.some(p => p.nombre === producto)) {
            alert("Producto no válido. Inténtelo de nuevo.");
            continue;
        }

        const cantidad = parseInt(prompt("Ingrese la cantidad:"));
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad no válida. Inténtelo de nuevo.");
            continue;
        }

        pedidos.push({ producto, cantidad });

        seguirComprando = confirm("¿Desea seguir comprando?");
    }

    if (pedidos.length > 0) {
        const { total, totalCantidad } = calcularPrecioTotal(pedidos);
        const precioConDescuento = aplicarDescuento(total, totalCantidad);
        alert(`Precio total con descuento: $${precioConDescuento}`);
        console.log(`Precio total con descuento: $${precioConDescuento}`);
    } else {
        alert("No se realizó ninguna compra.");
    }
}


gestionarCompra();
