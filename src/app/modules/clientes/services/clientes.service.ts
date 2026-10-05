import { Injectable } from '@angular/core';
import { Empresa,EstadoCliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // declaración de la lista de clientes
  // listaClientes: Empresa[] = []; -> Para inicializarla con la lista vacia
  listaEmpresas: Empresa[] = [
        { codigo: 'COD-260001',
          nombre: 'Empresa 1',
          nif: '2678984-A',
          estado: EstadoCliente.Activo,
          direccion: {
            calle: 'los olmos',
            numero: 24,
            provincia: 'Madrid'
          }
        },
        { codigo: 'COD-260002',
          nombre: 'Empresa 2',
          nif: '2678984-B',
          estado: EstadoCliente.Activo,
          direccion: {
            calle: 'Gran via',
            numero: 54,
            provincia: 'Madrid'
          }
        },
        { codigo: 'COD-260003',
          nombre: 'Empresa 3',
          nif: '2678984-C',
          estado: EstadoCliente.Inactivo,
          direccion: {
            calle: 'Serrano',
            numero: 14,
            provincia: 'Madrid'
          }
        },
        { codigo: 'COD-260004',
          nombre: 'Empresa 4',
          nif: '2678984-D',
          estado: EstadoCliente.Baja,
          direccion: {
            calle: 'San Bernardo',
            numero: 84,
            provincia: 'Madrid'
          }
        },
          { codigo: 'COD-ELIMINAR',
            nombre: 'Empresa Eliminar',
            nif: '11111111-D',
            estado: EstadoCliente.Baja,
            direccion: {
              calle: 'Goya',
              numero: 84,
              provincia: 'Madrid'
            }
          }          
    ];
  

  constructor() { }

  obtenerListaClientes():Empresa[] {
    // retornamos la lista de clientes
    return this.listaEmpresas
  }

  obtenerCliente(codigo:string):Empresa | null {
    // retornamos la información de un cliente
    let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == codigo );      
    if (index >=0 ) {
      return this.listaEmpresas[index];
    }    
    return null;
  }
  
  //#region - metodos para la gestión de clientes

  desactivarEmpresa(empresa: Empresa): void {
    // Lógica para cambiar el estado a Baja
    // Posibles controles
    this.cambiarEstado(empresa, EstadoCliente.Inactivo);
  }    

  activarEmpresa(empresa: Empresa): void {
    // Lógica para cambiar el estado a Baja
    // Posibles controles
    this.cambiarEstado(empresa, EstadoCliente.Activo);
  }    

  bajaEmpresa(empresa: Empresa): void {      
    // Lógica para cambiar el estado a Baja
    // Posibles controles
    this.cambiarEstado(empresa, EstadoCliente.Baja);
  }

  // funcion general para cambia el estado de una empresa
  cambiarEstado(empresa:Empresa, newEstado:EstadoCliente): void {  
  // Aquí puedes implementar la lógica para modificar el estado de un cliente en una API o base de datos (POST)         
  // Por ahora modificamos el array
    let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == empresa.codigo );      
    if (index >=0 ) {
      console.log('CAMBIO ESTADO: Estado Anterior:'+this.listaEmpresas[index].estado+' -> Nuevo Estado:'+newEstado);
      this.listaEmpresas[index].estado = newEstado;
    }
  }

  eliminarEmpresa(empresa: Empresa): void { 
    // Aquí puedes implementar la lógica para eliminar un cliente en una API o base de datos (POST/DELETE)              
    // Por ahora modificamos el array    
    let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == empresa.codigo );      
    if (index >=0 ) {        
      this.listaEmpresas.splice(index,1);
      console.log('Empresa Eliminada:', empresa);
    }      
  }    

  insertarCliente(cliente: Empresa) {
    // Aquí puedes implementar la lógica para insertar un cliente en una API o base de datos
    // Por ahora, simplemente agregaremos el cliente al array de ejemplo
    this.listaEmpresas.push(cliente);
    //alert('Cliente insertado: ' + JSON.stringify(cliente));
    console.log('Cliente insertado:', cliente);    
  }
      
  //#endregion

}
''