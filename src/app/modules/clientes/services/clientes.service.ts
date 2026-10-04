import { Injectable } from '@angular/core';
import { Empresa,EstadoCliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // declaración de la lista de clientes
  // listaClientes: Empresa[] = []; -> Para inicializarla con la lista vacia
  listaClientes: Empresa[] = [
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
        }
    ];
  

  constructor() { }

  obtenerClientes() {
    // Aquí puedes implementar la lógica para obtener los clientes desde una API o base de datos
    // Por ahora, devolveremos un array de ejemplo
    console.log(this.listaClientes);      // Muestra la informacion de la lista de clientes en la consola
    console.table(this.listaClientes);    // Muestra la lista clientes en la consola en formato de tabla
    console.table(this.listaClientes, ['codigo','nombre']);   // Filtrar: Muestra solo las columnas 'codigo','nombre' de la tabla
    return this.listaClientes
  }
  
  insertarCliente(cliente: any) {
    // Aquí puedes implementar la lógica para insertar un cliente en una API o base de datos
    // Por ahora, simplemente agregaremos el cliente al array de ejemplo
    this.listaClientes.push(cliente);
    console.log('Cliente insertado:', cliente);
    alert('Cliente insertado: ' + JSON.stringify(cliente));
  }

  eliminarCliente(clienteId: number) {
    // Aquí puedes implementar la lógica para eliminar un cliente en una API o base de datos
    // Por ahora, simplemente eliminaremos el cliente del array de ejemplo
    this.listaClientes = this.listaClientes.filter(cliente => cliente.codigo !== clienteId.toString());
    console.log('Cliente eliminado con ID:', clienteId);
    alert('Cliente eliminado con ID: ' + clienteId);
  }

  darDeBajaCliente(clienteId: number) {
    // Aquí puedes implementar la lógica para dar de baja un cliente en una API o base de datos
    // Por ahora, simplemente marcamos como baja el cliente del array de ejemplo
    this.listaClientes = this.listaClientes.filter(cliente => cliente.codigo !== clienteId.toString());
    console.log('Cliente dado de baja con ID:', clienteId);
    alert('Cliente dado de baja con ID: ' + clienteId);
  }



}
''