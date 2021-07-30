window.addEventListener("load", ()=>{
    
   
    let main: EventListenerObject = new Main();
    
    //lista de tipo para filtrar
    let selectFiltro = <HTMLElement> document.getElementById("selectFiltro");
    
    //Boton para abrir grilla de alta
    let btnAlta = <HTMLElement> document.getElementById("btnAlta");
    
    //lista de filtro (alta vehiculo)
    let selectTipo = <HTMLElement> document.getElementById("selectTipo");

    //boton aceptar (alta vehiculo)
    let btnGuardar = <HTMLElement> document.getElementById("btnGuardar");
    
    //boton cancelar (alta vehiculo)    
    let btnSalir = <HTMLElement> document.getElementById("btnSalir");

    //boton calcular promedio
    let btnPromedio = <HTMLElement> document.getElementById("btnPromedio");

    let cboxID = <HTMLElement> document.getElementById("cboxID");
    let cboxMarca = <HTMLElement> document.getElementById("cboxMarca");
    let cboxModelo = <HTMLElement> document.getElementById("cboxModelo");
    let cboxPrecio = <HTMLElement> document.getElementById("cboxPrecio");

    selectFiltro.addEventListener("change", main);
    btnAlta.addEventListener("click", main);
    selectTipo.addEventListener("change", main);
    btnGuardar.addEventListener("click", main);    
    btnSalir.addEventListener("click", main);
    btnPromedio.addEventListener("click", main);
    cboxID.addEventListener("change",main);
    cboxMarca.addEventListener("change",main);
    cboxModelo.addEventListener("change",main);
    cboxPrecio.addEventListener("change",main);


})

class Main implements EventListenerObject
{

    public handleEvent(ev:Event)
    {
        let obj:HTMLElement = <HTMLElement> ev.target;
        
        if(obj.id == "btnAlta")
        {

            mostrarAlta();
        }
        else if(obj.id == "btnSalir")
        {
            ocultarAlta();
        }
        else if(obj.id == "selectTipo")
        {
            mostrarTipo((<HTMLInputElement>obj).value);
        }
        else if(obj.id == "btnGuardar")
        {
            agregarVehiculo();
            ocultarAlta();
        }
        else if(obj.className == "btnEliminar")
        {
            eliminarVehiculo(Number((<HTMLInputElement>obj).name));
        }
        else if(obj.id == "selectFiltro")
        {            
            if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Autos")
            {                
                llenarTabla(listaVehiculos.filter(item => item instanceof Auto));
            }
            else if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Camionetas")
            {                
                llenarTabla(listaVehiculos.filter(item => item instanceof Camioneta));
            }
            else
            {                
                llenarTabla(listaVehiculos);
            }
        }
        else if(obj.id == "btnPromedio")
        {
            if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Autos")
            {                
                calculaPromedio(listaVehiculos.filter(item => item instanceof Auto));
            }
            else if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Camionetas")
            {                
                calculaPromedio(listaVehiculos.filter(item => item instanceof Camioneta));
            }
            else
            {                
                calculaPromedio(listaVehiculos);
            }
        }
        else if(obj.id == "cboxID" || obj.id == "cboxMarca" || obj.id == "cboxPrecio" || obj.id == "cboxModelo")
        {
            llenarTabla(listaVehiculos);
        }
        
        /*else if(obj.className == "btnModificar")
        {
            let vehiculo = listaVehiculos[Number((<HTMLInputElement>obj).name)];
            mostrarAlta(vehiculo);
            agregarVehiculo(vehiculo);

        }*/
    }
        
}
        
                        
        

var listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();

function mostrarAlta(vehiculo?:Vehiculo)
{
    if(vehiculo)
    {
        (<HTMLInputElement>document.getElementById("txtid")).value= vehiculo.id.toString();
        (<HTMLInputElement>document.getElementById("txtModelo")).value= vehiculo.modelo;
        (<HTMLInputElement>document.getElementById("txtMarca")).value= vehiculo.marca;
        (<HTMLInputElement>document.getElementById("numPrecio")).value= vehiculo.precio.toString();
        if(vehiculo instanceof Auto)
        {
            (<HTMLInputElement>document.getElementById("selectTipo")).value = "Auto";
            //(<HTMLInputElement>document.getElementById("selectTipo")).value = vehiculo.cantidadPuertas.toString();
        }
        else if(vehiculo instanceof Camioneta)
        {
            (<HTMLInputElement>document.getElementById("selectTipo")).value = "Camioneta";
        }
    }
    (<HTMLElement>document.getElementById("divContDatos")).hidden = false;
}

function ocultarAlta()
{    
    (<HTMLElement>document.getElementById("divContDatos")).hidden = true;
    (<HTMLInputElement>document.getElementById("txtMarca")).value = "";
    (<HTMLInputElement>document.getElementById("txtModelo")).value = "" ;
    (<HTMLInputElement>document.getElementById("numPrecio")).value = "";    
    (<HTMLInputElement>document.getElementById("es4x4")).value;
    (<HTMLInputElement>document.getElementById("numPuertas")).value = "";

}

function limpiarTabla():void
{
    let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

    while (tCuerpo.rows.length > 0)
    {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }
}

function llenarTabla(listaVehiculos:Array<Vehiculo>):void
{
    limpiarTabla();
    let marca: string = "";
    let modelo: string = "";
    let precio: any;
    let id: any;
    let detalle: any;
    let tipoVehiculo: string = "";
    let main: EventListenerObject = new Main();

    let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

    for (const item of listaVehiculos)
    {

        id = item.id;
        marca = item.marca;
        modelo = item.modelo;
        precio = item.precio;

        if (item instanceof Auto)
        {
            tipoVehiculo = "Auto"
            detalle = item.cantidadPuertas;

        }

        else if (item instanceof Camioneta)
        {
            tipoVehiculo = "Camioneta"

            if (item.cuatroXcuatro)
            {

                detalle = "4X4";
            }
            else 
            {
                detalle = "Otras";
            }
        }
        
        let btnDel:HTMLInputElement = document.createElement('input');
        btnDel.type = 'button';
        btnDel.className = 'btnEliminar';
        btnDel.value = "Eliminar";
        btnDel.name = String(listaVehiculos.indexOf(item));
        btnDel.addEventListener("click", main);

        let btnModificar:HTMLInputElement = document.createElement('input');
        btnModificar.type = 'button';
        btnModificar.className = 'btnModificar';
        btnModificar.value = "Modificar";
        btnModificar.name = String(listaVehiculos.indexOf(item));
        btnModificar.addEventListener("click", main);
        
        let tr: HTMLTableRowElement = <HTMLTableRowElement> document.createElement("tr");
        /*tr.id = String(listaVehiculos.indexOf(item));
        tr.className = "trModificar";
        tr.addEventListener("click", main);*/
        
        if((<HTMLInputElement>document.getElementById("cboxID")).checked)
        {
            let td1: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            (<HTMLInputElement>document.getElementById("thID")).hidden= false;                            
        }
        else
        {
            (<HTMLInputElement>document.getElementById("thID")).hidden= true;                    
        }

        if((<HTMLInputElement>document.getElementById("cboxMarca")).checked)
        {
            let td2: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            (<HTMLInputElement>document.getElementById("thMarca")).hidden= false;                           
        }
        else
        {            
            (<HTMLInputElement>document.getElementById("thMarca")).hidden= true;                          
        }

        if((<HTMLInputElement>document.getElementById("cboxModelo")).checked)
        {
            let td3: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            (<HTMLInputElement>document.getElementById("thModelo")).hidden= false;                           

        }
        else
        {
            (<HTMLInputElement>document.getElementById("thModelo")).hidden= true;                          
        }


        if((<HTMLInputElement>document.getElementById("cboxPrecio")).checked)
        {
            let td4: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            (<HTMLInputElement>document.getElementById("thPrecio")).hidden= false;                           

        }
        else
        {
            (<HTMLInputElement>document.getElementById("thPrecio")).hidden= true;                          
        }


        let td5: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(tipoVehiculo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);

        let td6: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(detalle);
        td6.appendChild(nodoTexto);
        tr.appendChild(td6);

        let td7: HTMLTableDataCellElement = document.createElement("td");
        td7.appendChild(btnDel);
        td7.appendChild(btnModificar);
        tr.appendChild(td7);

        tCuerpo.appendChild(tr);
    }
}

function mostrarTipo(tipoVehiculo:string):void
{
    if(tipoVehiculo=="Auto")
    {
        (<HTMLElement>document.getElementById("divOtro")).hidden = true;
        (<HTMLElement>document.getElementById("div4x4")).hidden = true;
        (<HTMLElement>document.getElementById("divTipos")).hidden = true;
        (<HTMLElement>document.getElementById("labelPuertas")).hidden = false;
        (<HTMLElement>document.getElementById("divPuertas")).hidden = false;
    }
    else if(tipoVehiculo=="Camioneta")
    {
        (<HTMLElement>document.getElementById("divOtro")).hidden = false;
        (<HTMLElement>document.getElementById("div4x4")).hidden = false;
        (<HTMLElement>document.getElementById("divTipos")).hidden = false;
        (<HTMLElement>document.getElementById("labelPuertas")).hidden = true;
        (<HTMLElement>document.getElementById("divPuertas")).hidden = true;
    }
}


function agregarVehiculo(/*vehiculo?:Vehiculo*/):void{

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
    if(true)
    {        
        let id = 1;        
        if(listaVehiculos.length != 0)
        {
                let reduceVehiculos = listaVehiculos;
                id = reduceVehiculos.reduce((idMax, item) =>
                {   
                    if(item.id > idMax)
                    {
                        return item.id;
                    }
                    else
                    {
                        return idMax;
                    }
                },0) + 1;

                let marca:string = (<HTMLInputElement>document.getElementById("txtMarca")).value;
                let modelo:string = (<HTMLInputElement>document.getElementById("txtModelo")).value;
                let precio:string = (<HTMLInputElement>document.getElementById("numPrecio")).value;
                let tipoVehiculo:string = (<HTMLInputElement>document.getElementById("selectTipo")).value;
                let es4x4:string;
                if((<HTMLInputElement>document.getElementById("radio4x4")).checked)
                {
                    es4x4 = (<HTMLInputElement>document.getElementById("radio4x4")).value;
                }
                else
                {
                    es4x4 = (<HTMLInputElement>document.getElementById("radioOtro")).value;
                }
                
                let cantPuertas = (<HTMLInputElement>document.getElementById("numPuertas")).value;
            
                if(tipoVehiculo == "Auto")
                {
                    let auto: Auto = new Auto(parseInt(cantPuertas), id, marca, modelo, parseInt(precio));
                    listaVehiculos.push(auto);
                }
                else if(tipoVehiculo == "Camioneta")
                {
                    let camioneta: Camioneta = new Camioneta((es4x4 == "4X4"), id, marca, modelo, parseInt(precio));
                    listaVehiculos.push(camioneta);
                }
        }
    }    
    llenarTabla(listaVehiculos);
}    
    
    
        


function eliminarVehiculo(indice: number)
{
    listaVehiculos.splice(indice , 1);
    llenarTabla(listaVehiculos);
}

function calculaPromedio(listaVehiculos:Array<Vehiculo>)
{
    let promedio = (listaVehiculos.reduce((promedio, item) =>
    {
        return promedio+item.precio;
    },0) ) / listaVehiculos.length;

    (<HTMLInputElement>document.getElementById("numPromedio")).value = promedio.toString();
}