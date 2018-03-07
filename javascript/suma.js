
{
    var botonEliminar= document.getElementsByClassName("eliminar");
    var atributos;
    for (var i = botonEliminar.length - 1; i >= 0; i--) {
        botonEliminar[i].addEventListener("click", guardarBoton);
        atributos=botonEliminar[i].parentNode.parentNode.getElementsByTagName("input");
        for (var j = atributos.length - 1; j >= 0; j--) {
            atributos[j].addEventListener("keyup",CalcularNuevoStock);

        }
    }

}

{
    document.getElementById("boton_confirmar_formulario").addEventListener("click",crearInputs);

}
{
    document.getElementById("boton_confirmar_eliminar").addEventListener("click",Eliminar);
}
{
    var botonAgregar= document.getElementsByClassName("agregar-producto");
    for (var i = botonAgregar.length - 1; i >= 0; i--) {
        //botonEliminar[i].addEventListener("click", crearInputs);
        botonAgregar[i].addEventListener("click", GuardarBotonAgregar);
    }
}
var Marca;
var BotonEliminar;
var tablaActual;
var list;
var letraActual="A";
var numeroActual="1";
var a,b,c; //variables de bdebuggeo
var d,e,f;
var g,h,i;

function GuardarBotonAgregar(){
    Marca=this;

}

function CalcularNuevoStock() {
    
    var tr= this.parentNode.parentNode.getElementsByTagName("td");

    var SActual=tr[0];

    var input=this.parentNode.parentNode.getElementsByTagName("input");
    var comprada= input[0].value;
    var vendido= input[2].value;
    var Display=tr[3];
    if (isNaN(parseInt(comprada))){
        comprada=0;
    }
    if (isNaN(parseInt(vendido))){
        vendido=0;
    }
    total=parseInt(SActual.innerHTML)+parseInt(comprada)-parseInt(vendido);
    console.log(total);
    if (!isNaN(total)){
    Display.innerHTML = total;}
}




function crearInputs(){
    //tablaActual=this.parentNode.getElementsByTagName("table")[0];

    var tr=document.createElement("tr");
    var th=document.createElement("th");
   


    var stockActual=document.createElement("td");
    var comprada= document.createElement("td");
    var vendida= document.createElement("td");
    var nuevoStock= document.createElement("td");
    var eliminar= document.createElement("td");
  
    var form= this.parentNode.parentNode.getElementById("formulario_modal");
    var producto= form.getElementById("productos_modal").value;
    var sInicial= parseInt(form.getElementById("stock_inicial").value);
    var pCompra= parseInt(form.getElementById("precio_compra").value);
    var pVenta= parseInt(form.getElementById("precio_venta").value);

    th.innerHTML=producto;
    th.setAttribute("scope","row");
    tr.appendChild(th);


    stockActual.innerHTML=sInicial;

    var i1= document.createElement("input");
    i1.setAttribute("type", "number");
    i1.setAttribute("class","form-control form-control-sm suma");
    i1.setAttribute("placeholder","Cantidad");
    i1.addEventListener("keyup",CalcularNuevoStock);

    var i2= document.createElement("input");
    i2.setAttribute("type", "number");
    i2.setAttribute("type", "number");
    i2.setAttribute("class","form-control form-control-sm");
    i2.setAttribute("placeholder","Precio de venta");

    comprada.appendChild(i1);
    comprada.appendChild(i2);
    

    var i3= document.createElement("input");
    i3.setAttribute("type", "number");
    i3.setAttribute("type", "number");
    i3.setAttribute("class","form-control form-control-sm suma");
    i3.setAttribute("placeholder","Cantidad");
    i3.addEventListener("keyup",CalcularNuevoStock);

    var i4= document.createElement("input");
    i4.setAttribute("type", "number");
    i4.setAttribute("type", "number");
    i4.setAttribute("type", "number");
    i4.setAttribute("class","form-control form-control-sm");
    i4.setAttribute("placeholder","Precio de venta");

    vendida.appendChild(i3);
    vendida.appendChild(i4);


    nuevoStock.setAttribute("id","Display");
    nuevoStock.innerHTML=SActual;

    var boton = document.createElement("button");
    boton.innerHTML="Eliminar"
    boton.setAttribute("class","btn btn-outline-danger eliminar");
    boton.setAttribute("type","button");
    boton.setAttribute("data-toggle","modal");
    boton.setAttribute("data-target","#formModal");
    boton.addEventListener("click", guardarBoton);

    eliminar.appendChild(boton);


    tr.appendChild(stockActual);
    tr.appendChild(comprada);
    tr.appendChild(vendida);
    tr.appendChild(nuevoStock);
    tr.appendChild(eliminar);



    tablaActual.appendChild(tr);


}
function AgregarProducto(){
    tablaActual=this.parentNode.getElementsByTagName("table")[0];
    var table = tablaActual;
    var row = table.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell0.innerHTML = "NEW CELL1";
    cell1.innerHTML = "NEW CELL2";
    var inputs=crearInputs();
    cell2.appendChild(inputs[0]);
    cell2.appendChild(inputs[1]);
}

function guardarBoton(){
    BotonEliminar=this;
}

function myCreateFunction() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

function Eliminar() {
    var boton=BotonEliminar;
    var fila=boton.parentNode.parentNode;
    var tbody=fila.parentNode; 
    var div=tbody.parentNode.parentNode;
    fila.parentElement.removeChild(fila);
    var len=tbody.getElementsByTagName("tr").length;
    console.log(len);
    if(len==0){
        parrafo=div.getElementsByClassName("parrafo")[0];
        parrafo.innerHTML="No Tienes productos de esta marca";
    }
}


function AddInputs(letra, numero)
{
    //alert('Hello, world!');
    var total = 0;
    var coll = document.getElementsByClassName("suma"+letra+numero);
    var Display = document.getElementById("Display"+letra+numero);
    var t = document.getElementById("tabla"+letra), 
    d = t.getElementsByTagName("tr")[numero],
    SActual = d.getElementsByTagName("td")[0],
    Comprada=coll[0].value,
    Vendida=coll[1].value;
    if (isNaN(parseInt(Comprada))){
        Comprada=0;
    }
    if (isNaN(parseInt(Vendida))){
        Vendida=0;
    }
    total=parseInt(SActual.innerHTML)+parseInt(Comprada)-parseInt(Vendida);

    if (!isNaN(total)){
    Display.innerHTML = total;}
}
