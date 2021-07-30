class Auto extends Vehiculo{

    public cantidadPuertas:number;

    public constructor(puertas:number,id:number, marca:string, modelo:string, precio:number){
        super(id,marca,modelo,precio);
        this.cantidadPuertas = puertas;   
    }


}