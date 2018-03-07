

var comunas= ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia",
			 "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central",
			 "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida",
			 "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea",
			 "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa",
			 "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque",
			 "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta",
			 "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro",
			 "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"];

var cantidadComunas=0;//Mantiene la cantidad de comunas en el div con id="comunas_entrega"

{//Se agregan los event listeners
var formulario= document.getElementById('formulario_editar_datos');
formulario.setAttribute('onsubmit', "return false");

var botonAgregarComuna= document.getElementById('btn_agregar_comuna');
botonAgregarComuna.addEventListener('click', agregarComunaEntrega);

var botonFormulario= document.getElementById('boton_enviar_formulario');
botonFormulario.addEventListener('click', validarFormulario);

var botonConfirmarFormulario= document.getElementById('boton_confirmar_formulario');
botonConfirmarFormulario.addEventListener('click', enviarFormulario);
}

function agregarComunaEntrega(){
	//Agrega un nuevo campo de seleccion al formulario para escoger
	//una nueva comuna de entrega. Ademas elimina el boton para
	//agregar nuevas comunas si ya han sido agregadas todas las
	//comunas.

	var divComunas= document.getElementById('comunas_entrega'); //Div que contiene las comunas
	var row= document.createElement('div'); //Fila para una comuna
	var divSelect= document.createElement('div');
	var label= document.createElement('label');
	var select= document.createElement('select');
	var feedback= document.createElement('div'); //Div que contendra un mensaje para cuando la comuna este repetida
	var divBoton= document.createElement('div')//Div para el boton "Eliminar comuna"
	var boton= document.createElement('button');//Boton "Eliminar comunas"

	divBoton.appendChild(boton);
	divSelect.appendChild(label);
	divSelect.appendChild(select);
	divSelect.appendChild(feedback);
	row.appendChild(divSelect);
	row.appendChild(divBoton);

	//Damos las clases y otros atributos:
	row.setAttribute('class', 'row mt-3');
	divSelect.setAttribute('class', 'form-group col-md-6 col-lg-4 mb-1');
	label.innerHTML='Comuna de entrega '+(cantidadComunas+1);
	select.setAttribute('class', 'container custom-select col');
	select.setAttribute('name', 'comunas_entrega[]');
	select.addEventListener('change', verComunaRepetida);
	feedback.setAttribute('class', 'invalid-feedback');
	feedback.innerHTML= 'La comúna está repetida';
	divBoton.setAttribute('class', 'd-flex flex-row align-items-center pt-md-4 ml-3 ml-md-0');
	boton.setAttribute('class', 'btn_eliminar_comuna col btn btn-sm btn-danger');
	boton.setAttribute('type', 'button');
	boton.innerHTML="Eliminar comuna";
	boton.addEventListener('click', eliminarComunaEntrega);

	//Agregamos las opciones al select:
	var optionDis= document.createElement('option'); //Opcion "Escoje una comuna" (disabled y selected)
	optionDis.disabled= true;
	optionDis.selected= true;
	optionDis.innerHTML= 'Escoje una comúna';
	select.appendChild(optionDis);

	for(var i= 0; i<comunas.length; i++){//Uso de la variable comunas definida al comienzo del archivo
		var option= document.createElement('option');
		option.value= i;
		option.innerHTML= comunas[i];
		select.appendChild(option);
	}

	if(cantidadComunas==0){
		var mensaje= document.getElementById('mensaje_sin_comunas');
		divComunas.removeChild(mensaje);
	}

	//Se agrega la fila al div de las comunas:
	divComunas.appendChild(row);
	cantidadComunas++;

}


function eliminarComunaEntrega(){
	//Elimina la comuna de entrega correspondiente al select junto
	//al boton que fue clickeado.

	//El boton esta dentro de un div que esta dentro de otro div
	//que es el que buscamos eliminar:
	var row= this.parentNode.parentNode;//Fila de la comuna
	var divComunas= document.getElementById('comunas_entrega');
	divComunas.removeChild(row);
	cantidadComunas--;//Actualizamos la cantidad de comunas

	if(cantidadComunas==0){//Mostramos un mensaje si no hay comunas
		var mensaje= document.createElement('p');
		mensaje.innerHTML= 'No tienes comunas de entrega';
		mensaje.id= 'mensaje_sin_comunas';
		mensaje.setAttribute('class', 'text-secondary');
		divComunas.appendChild(mensaje);
	}else{
		//Renombramos las etiquetas de lo contrario
		var labels= divComunas.getElementsByTagName('label');
		for(var i= 0; i<labels.length; i++){
			labels[i].innerHTML= 'Comuna de entrega '+(i+1);
		}

	}

}


function verComunaRepetida(){
	//Alerta al usuario que la comuna que escogio ya
	//esta seleccionada en otro select

	var comuna= this.value;//Valor numerico de la comuna
	var divComunas= document.getElementById('comunas_entrega');
	var selects= divComunas.getElementsByTagName('select');
	var repeticiones= 0;
	for(var i= 0; i<selects.length; i++){
		if(selects[i].value==comuna){
			repeticiones++;
		}
	}
	if(repeticiones>1){//Mostrar mensaje si la comuna esta repetida
		this.setAttribute('class', 'container custom-select col is-invalid');
		//is-invalid es la clase que permite mostrar el mensaje
	}else{
		this.setAttribute('class', 'container custom-select col');
	}
}


function validarFormulario(){
	//Realizar validacion

	$('#formModal').appendTo("body").modal('show');
}


function enviarFormulario(){
	//Enviar formulario usando AJAX
	console.log('El formulario fue enviado');
	$('#formModal').modal('hide');
	
}