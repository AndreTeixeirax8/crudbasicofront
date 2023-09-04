export class Producto {
    id?: number;
    name: string;
    precio: number;

    constructor(name: string, precio: number) {
        this.name = name;
        this.precio = precio;
    }
}