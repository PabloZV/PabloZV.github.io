
{//Se agregan las funciones a los botones para agregar productos:
	var botonesAgregarProducto= document.getElementsByClassName('boton_agregar_producto');
	for( var i= 0; i< botonesAgregarProducto.length; i++){
		var boton= botonesAgregarProducto[i];
		boton.addEventListener('click', seleccionarPrducto);
	}
}

{//Se agrega la funcion al boton "Agregar producto" del modal
	var botonModal= document.getElementById('boton_confirmar_formulario');
	botonModal.addEventListener('click', agregarProducto);
}

{//Se agrega la funcion eliminarProducto a los botones para eliminar los productos
	var botones= document.getElementsByClassName('boton_eliminar_producto');
	for(var i= 0; i< botones.length; i++){
		botones[i].addEventListener('click', eliminarProducto);
	}
}

{//Se agregan las funciones a los botones para guardar y confirmar los cambios:
	var botonGuardar= document.getElementById('boton_enviar_formulario');
	botonGuardar.addEventListener('click', guardarCambios);

	var botonConfirmar= document.getElementById('boton_enviar_datos');
	botonConfirmar.addEventListener('click', enviarCambios);
}



var marcaSeleccionada; //Guarda un div con id="gasco", id="abastible" o id="lipigas"

//Guarda los productos para cada marca
var productosPorMarca= {gasco: ['11 kg', '15 kg', '45 kg'],
						abastible: ['11 kg', '15 kg'],
						lipigas: ['11 kg', '15 kg', '45 kg']};

//Guarda los datos de los nuevos productos para cada marca
//(stock inicial, precio de compra y precio de venta)
var nuevosProducto;

//Guarda los productos eliminados para cada marca
var eliminados;


function limpiar(nodoPadre){
	//Elimina todos los elementos contenidos en nodoPadre
	while(nodoPadre.firstChild){
		nodoPadre.removeChild(nodoPadre.firstChild);
	}
}


function seleccionarPrducto(){
	//Guarda en la variable marcaSeleccionada el nodo correspondiente
	//a la marca a la que se quiere agregar un producto (el nodo con
	//id="gasco", id="abastible" o id="lipigas") y abre un modal para
	//preguntar por los datos sobre el producto.

	marcaSeleccionada= this.parentNode;

	//El formulario del modal solo debe dejar elegir productos que la
	//marca seleccionada no tiene.
	var idMarca= marcaSeleccionada.id;
	var productosMarca= productosPorMarca[idMarca]; //Productos en la marca seleccionada
	var productos=['5 kg', '11 kg', '15 kg', '45 kg']
	var selectModal= document.getElementById('productos_modal'); //Select para escojer el producto a agregar
	limpiar(selectModal);

	for(var i= 0; i< productos.length; i++){
		var producto= productos[i];
		if(productosMarca.indexOf(producto)==-1){
			var option= document.createElement('option');
			option.innerHTML=producto;
			selectModal.appendChild(option);
		}
	}

	//Limpiar los inputs:
	document.getElementById('precio_venta').value= '';
	document.getElementById('precio_compra').value= '';
	document.getElementById('stock_inicial').value= '';

	$('#formModalAgregarProducto').appendTo("body").modal('show');


}


function agregarProducto(){
	//Agrega un nuevo producto a la marca seleccionada a partir
	//de los datos en el modal y ademas guarda los datos del modal
	//(stock, precio de compra y precio de venta)

	//Se debe validar el formulario del modal antes de continuar

	var idMarca= marcaSeleccionada.id;
	var formularioModal= document.getElementById('formulario_modal'); //El formulario que se despliega cuando se quiere agregar un producto
	
	//Obtener los datos del formulario y guardarlos temporalmente en un arreglo u objeto.

	divPrecios= marcaSeleccionada.getElementsByClassName('precios_galones')[0];
	//Limpiar divPrecios si no hay productos anteriormente
	if(productosPorMarca[idMarca].length==0){
		limpiar(divPrecios);
	}

	var productoSeleccionado= document.getElementById('productos_modal').value; //Producto del select
	var precio= document.getElementById('precio_venta').value;
	productosPorMarca[idMarca].push(productoSeleccionado);

	//Elemento que contiene el input y el boton eliminar para un producto:
	var nuevoElemento= crearElementoPrecioProducto(productoSeleccionado, precio);
	divPrecios.appendChild(nuevoElemento);

	//Quitar el boton "Agregar producto" si la marca ya tiene todos los productos
	if(productosPorMarca[idMarca].length==4){
		console.log('hola');
		var boton= marcaSeleccionada.getElementsByClassName('boton_agregar_producto')[0];
		marcaSeleccionada.removeChild(boton);
	}

	$('#formModalAgregarProducto').modal('hide');

}


function crearElementoPrecioProducto(producto, precio){
	//Retorna un elemento div que contiene los elementos
	//label, input y button para un producto.

	var contenedorPadre= document.createElement('div');
	contenedorPadre.setAttribute('class', 'row m-0 mt-3');
	var contenedorBoton= document.createElement('div');
	contenedorBoton.setAttribute('class','col-md-4 mt-2 mt-md-0')
	var contenedorInput= document.createElement('div');
	contenedorInput.setAttribute('class','input-group col-md-7 px-md-0');

	var span1= document.createElement('span');
	var span2= document.createElement('span');

	span1.setAttribute('class', 'input-group-addon');
	span1.innerHTML= 'Gas '+producto;

	span2.setAttribute('class', 'input-group-addon');
	span2.innerHTML= '$';

	var input= document.createElement('input');
	input.setAttribute('type', 'number');
	input.setAttribute('class', 'precio_producto form-control');
	input.setAttribute('value', precio);
	input.setAttribute('data-producto', producto)

	contenedorInput.appendChild(span1);
	contenedorInput.appendChild(span2);
	contenedorInput.appendChild(input);

	var boton= document.createElement('button');
	boton.setAttribute('class','boton_eliminar_producto btn btn-sm btn-danger');
	boton.setAttribute('type', 'button');
	boton.innerHTML= 'Eliminar producto'; 
	//Se debe agregar el event listener del boton:
	boton.addEventListener('click', eliminarProducto);
	contenedorBoton.appendChild(boton);

	contenedorPadre.appendChild(contenedorInput);
	contenedorPadre.appendChild(contenedorBoton);

	return contenedorPadre;

}

function eliminarProducto(){
	//Elimina el producto correspondiente al boton seleccionado
	//quitando el input y el boton de la interfaz y quitando el
	//producto de la variable global productosPorMarca

	var botonEliminar= this;
	var divPadre= this.parentNode.parentNode; //Nodo que contiene el boton "Eliminar producto" y el input del precio
	var producto= divPadre.getAttribute('data-producto');

	var divMarca= divPadre.parentNode.parentNode;
	var id= divMarca.id;

	//Eliminar producto
	var cantidad= productosPorMarca[id].length;//cantidad de productos en la marca antes de eliminar
	var indice= productosPorMarca[id].indexOf(producto);
	productosPorMarca[id].splice(indice, 1);
	console.log(productosPorMarca[id]);

	//Eliminar de la interfaz:
	var divPrecios= divPadre.parentNode;
	divPrecios.removeChild(divPadre);

	if(productosPorMarca[id].length==0){
		var mensaje= document.createElement('p');
		mensaje.innerHTML= 'No tienes productos en esta marca'
		mensaje.setAttribute('class', 'text-secondary col-md-11 text-center py-4 mx-0 my-0');
		divPrecios.appendChild(mensaje);
	}
	

	//Crear nuevamente el boton "Agregar producto";
	if(cantidad==4){
		var boton= document.createElement('button');
		boton.setAttribute('class', 'boton_agregar_producto btn btn-secondary mt-3 ml-3 ml-md-0');
		boton.setAttribute('type', 'button');
		boton.addEventListener('click', seleccionarPrducto);
		boton.innerHTML='Agregar producto';
		divMarca.appendChild(boton);
	}	

}


function guardarCambios(){
	//Muestra el modal para confirmar el guardado de los cambios
	//y valida la correctitud de los datos en el formulario.

	//Validar los datos y mostrar solo si todo esta correcto
	$('#modal_confirmacion').appendTo("body").modal('show');

}


function enviarCambios(){
	//Envia los datos al servidor cuando el usuario esta seguro
	//de los cambios que hizo.


	//Usar ajax para enviar los datos de los cambios al sevidor

	$('#modal_confirmacion').modal('hide');

}


