export class Producto {
    id:string;
    timestamp: number;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
    
    constructor(nuevoId: string ,nuevoNombre: string, nuevoDescripcion: string,nuevoCodigo: number,nuevoFoto: string,nuevoPrecio: number,nuevoStock: number) {
        this.id = nuevoId;
        this.timestamp = Date.now();
        this.nombre = nuevoNombre;
        this.descripcion = nuevoDescripcion;
        this.codigo = nuevoCodigo;
        this.foto = nuevoFoto;
        this.precio = nuevoPrecio;
        this.stock = nuevoStock;
    }
}

export class Productos {

    private productos: Array<Producto>;

    constructor() {
        this.productos = []
    }

    listar () {
        return this.productos
    }

    buscar (id:string) {
        return this.productos.find( produ => produ.id === id)
    }

    agregar (nuevoProducto: Producto) {
        return this.productos.push(nuevoProducto)
    }

    actualizar(productoActualizar:Producto){
        this.productos.map(produ => {
            if(produ.id === productoActualizar.id) {
                (productoActualizar.nombre !== undefined) ? produ.nombre = productoActualizar.nombre : produ.nombre = produ.nombre;
                (productoActualizar.descripcion !== undefined) ? produ.descripcion = productoActualizar.descripcion : produ.descripcion = produ.descripcion;
                (productoActualizar.codigo !== undefined) ? produ.codigo = productoActualizar.codigo : produ.codigo = produ.codigo;
                (productoActualizar.foto !== undefined) ? produ.foto = productoActualizar.foto : produ.foto = produ.foto;
                (productoActualizar.stock !== undefined) ? produ.stock = productoActualizar.stock : produ.stock = produ.stock;
            }
        })
        return productoActualizar
    }

    eliminar (id: string) {
        this.productos = this.productos.filter( produ => produ.id !== id)
        return this.productos
    }

}

export class Carrito {
    private id: string;
    private timestap: number;
    private productos: Productos;

    constructor(nuevoId: string, nuevoProductos: Productos){
        this.id = nuevoId;
        this.timestap = Date.now();
        this.productos = nuevoProductos;
    }

    listar_productos () {
        return this.productos
    }

    agregar_producto (nuevoProducto: Producto) {
        return this.productos.agregar(nuevoProducto)
    }

    eliminar_producto (id: string) {
        return this.productos.eliminar(id)
    }
}

export class Errores {
    error: string;
    descripcion: string;

    constructor(error: string ,descripcion: string){
        this.error = error;
        this.descripcion = descripcion;
    }
}

export class Mensaje{

    mail:string;
    nombre:string;
    apellido:string;
    edad:number;
    alias:string;
    avatar:string;
    dateandhour:string;
    message:string;

    constructor(
        nuevoMail: string , 
        nuevoNombre: string , 
        nuevoApellido: string , 
        nuevoEdad: number , 
        nuevoAlias: string , 
        nuevoAvatar: string , 
        nuevoDateandhour: string , 
        nuevoMessage: string
        ) {
        this.mail = nuevoMail;
        this.nombre = nuevoNombre;
        this.apellido = nuevoApellido;
        this.edad = nuevoEdad;
        this.alias = nuevoAlias;
        this.avatar = nuevoAvatar;
        this.dateandhour = nuevoDateandhour;
        this.message = nuevoMessage;
    }
}

export interface MensajeJSON {
    id: any;
    author: {
      id: any;
      nombre: string;
      apellido: string;
      edad: number;
      alias: string;
      avatar: string;
    };
    text: string;
  }

export class Usuario {
    administrador: boolean;

    constructor(valor: boolean) {
        this.administrador = valor
    }
}