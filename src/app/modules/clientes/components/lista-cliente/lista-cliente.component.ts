import { Component, output } from '@angular/core';
import { Empresa } from '../../models/cliente.model';

@Component({
  selector: 'app-lista-cliente',
  imports: [],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent {
    
    // Gestion de comunicacion con el padre -> 
    // @Output() empresaSeleccionada: Empresa | null = null;  // version tradicional
    empresaSeleccionada = output<Empresa>();
    
    
    // tradicional
    //constructor(public clienteService: ClienteService) {}
  
    // recomendada en las ultimas versiones
    //public servicioCientes = inject(ClienteService);
  
    //empresaSeleccionada: Empresa | null = null;

    listaEmpresas: Empresa[] = [
          { codigo: 'COD-260001',
            nombre: 'Empresa 1',
            nif: '2678984-A',
            direccion: {
              calle: 'los olmos',
              numero: 24,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260002',
            nombre: 'Empresa 2',
            nif: '2678984-B',
            direccion: {
              calle: 'Gran via',
              numero: 54,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260003',
            nombre: 'Empresa 3',
            nif: '2678984-C',
            direccion: {
              calle: 'Serrano',
              numero: 14,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260004',
            nombre: 'Empresa 4',
            nif: '2678984-D',
            direccion: {
              calle: 'San Bernardo',
              numero: 84,
              provincia: 'Madrid'
            }
          }
      ];
  
    ngOnInit(): void {
      //this.getListaEmpresas();
      //this.empresaSeleccionada = this.listaEmpresas[0]; // Selecciona la primera empresa por defecto;
      if (this.listaEmpresas.length > 0) { 
         this.seleccionarEmpresa(this.listaEmpresas[0]); // Selecciona la primera empresa por defecto 
      }
    }
  
    // getListaEmpresas(){
    //   this.listaEmpresas = this.servicioCientes.getListaEmpresas();
    // }

    seleccionarEmpresa(empresa: Empresa) {
      console.log('Empresa seleccionada:', empresa);
      //this.empresaSeleccionada = empresa;
      this.empresaSeleccionada.emit(empresa);
    }

}
