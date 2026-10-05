
// definicion de enumerado para el estado del cliente
// permiten definir un conjunto de constantes con nombre para hacer el código más legible y fácil de mantener
export enum EstadoCliente {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
  Baja = 'Baja'
}


// definicion de interfaces para la estructura de datos de un cliente y su direccion

//#region Definicion de interfaces
export interface Empresa {
  codigo: string;
  nombre: string;
  nif: string;
  estado: EstadoCliente;
  direccion: Direccion
}

export interface Direccion {
  calle:string;
  numero: number;
  copigoPostal?: string; 
  poblacion?: string;
  provincia:  string;
}

//endregion

// definicion alternativa de clientes para el uso de la API -> Añadimos un id

export interface ClienteAPI {
  id: number;
  codigo: string;
  nombre: string;
  nif: string;
  estado: EstadoCliente;
  direccion: Direccion
}
