"use strict";
var Vehiculo = /** @class */ (function () {
    function Vehiculo(id, marca, modelo, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
    Vehiculo.prototype.toJson = function () {
        var vehiculoJSON = { "id": this.id, "marca": this.marca, "modelo": this.modelo, "precio": this.precio };
        return JSON.stringify(vehiculoJSON);
    };
    return Vehiculo;
}());
