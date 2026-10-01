export interface Empresa {
  codigo: string;
  nombre: string;
  nif: string;
  direccion: Direccion
}

export interface Direccion {
  calle:string;
  numero: number;
  copigoPostal?: string; 
  poblacion?: string;
  provincia:  string;
}