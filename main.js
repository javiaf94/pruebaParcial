"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    //lista de tipo para filtrar
    var selectFiltro = document.getElementById("selectFiltro");
    //Boton para abrir grilla de alta
    var btnAlta = document.getElementById("btnAlta");
    //lista de filtro (alta vehiculo)
    var selectTipo = document.getElementById("selectTipo");
    //boton aceptar (alta vehiculo)
    var btnGuardar = document.getElementById("btnGuardar");
    //boton cancelar (alta vehiculo)    
    var btnSalir = document.getElementById("btnSalir");
    //boton calcular promedio
    var btnPromedio = document.getElementById("btnPromedio");
    var cboxID = document.getElementById("cboxID");
    var cboxMarca = document.getElementById("cboxMarca");
    var cboxModelo = document.getElementById("cboxModelo");
    var cboxPrecio = document.getElementById("cboxPrecio");
    selectFiltro.addEventListener("change", main);
    btnAlta.addEventListener("click", main);
    selectTipo.addEventListener("change", main);
    btnGuardar.addEventListener("click", main);
    btnSalir.addEventListener("click", main);
    btnPromedio.addEventListener("click", main);
    cboxID.addEventListener("change", main);
    cboxMarca.addEventListener("change", main);
    cboxModelo.addEventListener("change", main);
    cboxPrecio.addEventListener("change", main);
});
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.handleEvent = function (ev) {
        var obj = ev.target;
        if (obj.id == "btnAlta") {
            mostrarAlta();
        }
        else if (obj.id == "btnSalir") {
            ocultarAlta();
        }
        else if (obj.id == "selectTipo") {
            mostrarTipo(obj.value);
        }
        else if (obj.id == "btnGuardar") {
            agregarVehiculo();
            ocultarAlta();
        }
        else if (obj.className == "btnEliminar") {
            eliminarVehiculo(Number(obj.name));
        }
        else if (obj.id == "selectFiltro") {
            if (document.getElementById("selectFiltro").value == "Autos") {
                llenarTabla(listaVehiculos.filter(function (item) { return item instanceof Auto; }));
            }
            else if (document.getElementById("selectFiltro").value == "Camionetas") {
                llenarTabla(listaVehiculos.filter(function (item) { return item instanceof Camioneta; }));
            }
            else {
                llenarTabla(listaVehiculos);
            }
        }
        else if (obj.id == "btnPromedio") {
            if (document.getElementById("selectFiltro").value == "Autos") {
                calculaPromedio(listaVehiculos.filter(function (item) { return item instanceof Auto; }));
            }
            else if (document.getElementById("selectFiltro").value == "Camionetas") {
                calculaPromedio(listaVehiculos.filter(function (item) { return item instanceof Camioneta; }));
            }
            else {
                calculaPromedio(listaVehiculos);
            }
        }
        else if (obj.id == "cboxID" || obj.id == "cboxMarca" || obj.id == "cboxPrecio" || obj.id == "cboxModelo") {
            llenarTabla(listaVehiculos);
        }
        /*else if(obj.className == "btnModificar")
        {
            let vehiculo = listaVehiculos[Number((<HTMLInputElement>obj).name)];
            mostrarAlta(vehiculo);
            agregarVehiculo(vehiculo);

        }*/
    };
    return Main;
}());
var listaVehiculos = new Array();
function mostrarAlta(vehiculo) {
    if (vehiculo) {
        document.getElementById("txtid").value = vehiculo.id.toString();
        document.getElementById("txtModelo").value = vehiculo.modelo;
        document.getElementById("txtMarca").value = vehiculo.marca;
        document.getElementById("numPrecio").value = vehiculo.precio.toString();
        if (vehiculo instanceof Auto) {
            document.getElementById("selectTipo").value = "Auto";
            //(<HTMLInputElement>document.getElementById("selectTipo")).value = vehiculo.cantidadPuertas.toString();
        }
        else if (vehiculo instanceof Camioneta) {
            document.getElementById("selectTipo").value = "Camioneta";
        }
    }
    document.getElementById("divContDatos").hidden = false;
}
function ocultarAlta() {
    document.getElementById("divContDatos").hidden = true;
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("numPrecio").value = "";
    document.getElementById("es4x4").value;
    document.getElementById("numPuertas").value = "";
}
function limpiarTabla() {
    var tCuerpo = document.getElementById("tCuerpo");
    while (tCuerpo.rows.length > 0) {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }
}
function llenarTabla(listaVehiculos) {
    limpiarTabla();
    var marca = "";
    var modelo = "";
    var precio;
    var id;
    var detalle;
    var tipoVehiculo = "";
    var main = new Main();
    var tCuerpo = document.getElementById("tCuerpo");
    for (var _i = 0, listaVehiculos_1 = listaVehiculos; _i < listaVehiculos_1.length; _i++) {
        var item = listaVehiculos_1[_i];
        id = item.id;
        marca = item.marca;
        modelo = item.modelo;
        precio = item.precio;
        if (item instanceof Auto) {
            tipoVehiculo = "Auto";
            detalle = item.cantidadPuertas;
        }
        else if (item instanceof Camioneta) {
            tipoVehiculo = "Camioneta";
            if (item.cuatroXcuatro) {
                detalle = "4X4";
            }
            else {
                detalle = "Otras";
            }
        }
        var btnDel = document.createElement('input');
        btnDel.type = 'button';
        btnDel.className = 'btnEliminar';
        btnDel.value = "Eliminar";
        btnDel.name = String(listaVehiculos.indexOf(item));
        btnDel.addEventListener("click", main);
        var btnModificar = document.createElement('input');
        btnModificar.type = 'button';
        btnModificar.className = 'btnModificar';
        btnModificar.value = "Modificar";
        btnModificar.name = String(listaVehiculos.indexOf(item));
        btnModificar.addEventListener("click", main);
        var tr = document.createElement("tr");
        /*tr.id = String(listaVehiculos.indexOf(item));
        tr.className = "trModificar";
        tr.addEventListener("click", main);*/
        if (document.getElementById("cboxID").checked) {
            var td1 = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            document.getElementById("thID").hidden = false;
        }
        else {
            document.getElementById("thID").hidden = true;
        }
        if (document.getElementById("cboxMarca").checked) {
            var td2 = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            document.getElementById("thMarca").hidden = false;
        }
        else {
            document.getElementById("thMarca").hidden = true;
        }
        if (document.getElementById("cboxModelo").checked) {
            var td3 = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            document.getElementById("thModelo").hidden = false;
        }
        else {
            document.getElementById("thModelo").hidden = true;
        }
        if (document.getElementById("cboxPrecio").checked) {
            var td4 = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            document.getElementById("thPrecio").hidden = false;
        }
        else {
            document.getElementById("thPrecio").hidden = true;
        }
        var td5 = document.createElement("td");
        var nodoTexto = document.createTextNode(tipoVehiculo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);
        var td6 = document.createElement("td");
        var nodoTexto = document.createTextNode(detalle);
        td6.appendChild(nodoTexto);
        tr.appendChild(td6);
        var td7 = document.createElement("td");
        td7.appendChild(btnDel);
        td7.appendChild(btnModificar);
        tr.appendChild(td7);
        tCuerpo.appendChild(tr);
    }
}
function mostrarTipo(tipoVehiculo) {
    if (tipoVehiculo == "Auto") {
        document.getElementById("divOtro").hidden = true;
        document.getElementById("div4x4").hidden = true;
        document.getElementById("divTipos").hidden = true;
        document.getElementById("labelPuertas").hidden = false;
        document.getElementById("divPuertas").hidden = false;
    }
    else if (tipoVehiculo == "Camioneta") {
        document.getElementById("divOtro").hidden = false;
        document.getElementById("div4x4").hidden = false;
        document.getElementById("divTipos").hidden = false;
        document.getElementById("labelPuertas").hidden = true;
        document.getElementById("divPuertas").hidden = true;
    }
}
function agregarVehiculo( /*vehiculo?:Vehiculo*/) {
    /*if(vehiculo)
    {
        vehiculo.marca=  (<HTMLInputElement>document.getElementById("txtMarca")).value;
        vehiculo.modelo= (<HTMLInputElement>document.getElementById("txtModelo")).value;
        vehiculo.precio= Number((<HTMLInputElement>document.getElementById("numPrecio")).value);
        
        if(vehiculo instanceof Auto)
        {
            vehiculo.cantidadPuertas =  Number((<HTMLInputElement>document.getElementById("numPuertas")).value);
        }
        else if (vehiculo instanceof Camioneta)
        {
            if((<HTMLInputElement>document.getElementById("radio4x4")).checked)
            {
                vehiculo.cuatroXcuatro = true;
            }
            else
            {
                vehiculo.cuatroXcuatro = false;
            }
        }
    }*/
    if (true) {
        var id = 1;
        if (listaVehiculos.length != 0) {
            var reduceVehiculos = listaVehiculos;
            id = reduceVehiculos.reduce(function (idMax, item) {
                if (item.id > idMax) {
                    return item.id;
                }
                else {
                    return idMax;
                }
            }, 0) + 1;
            var marca = document.getElementById("txtMarca").value;
            var modelo = document.getElementById("txtModelo").value;
            var precio = document.getElementById("numPrecio").value;
            var tipoVehiculo = document.getElementById("selectTipo").value;
            var es4x4 = void 0;
            if (document.getElementById("radio4x4").checked) {
                es4x4 = document.getElementById("radio4x4").value;
            }
            else {
                es4x4 = document.getElementById("radioOtro").value;
            }
            var cantPuertas = document.getElementById("numPuertas").value;
            if (tipoVehiculo == "Auto") {
                var auto = new Auto(parseInt(cantPuertas), id, marca, modelo, parseInt(precio));
                listaVehiculos.push(auto);
            }
            else if (tipoVehiculo == "Camioneta") {
                var camioneta = new Camioneta((es4x4 == "4X4"), id, marca, modelo, parseInt(precio));
                listaVehiculos.push(camioneta);
            }
        }
    }
    llenarTabla(listaVehiculos);
}
function eliminarVehiculo(indice) {
    listaVehiculos.splice(indice, 1);
    llenarTabla(listaVehiculos);
}
function calculaPromedio(listaVehiculos) {
    var promedio = (listaVehiculos.reduce(function (promedio, item) {
        return promedio + item.precio;
    }, 0)) / listaVehiculos.length;
    document.getElementById("numPromedio").value = promedio.toString();
}
