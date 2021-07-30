class Camioneta extends Vehiculo{
    public cuatroXcuatro:boolean;

    public constructor(cuatro:boolean,id:number, marca:string, modelo:string, precio:number){
        super(id,marca,modelo,precio);
        this.cuatroXcuatro=cuatro;
    }
    
}