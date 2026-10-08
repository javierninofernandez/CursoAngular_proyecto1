/*
  page-lista-clientes-final : 
  Objetivo:
  - Uso de componente hijo lista-clientes-final con servicios
  - Uso del paso de parametroas al hijo input (:Filtro) y desde el hijo output (empresa seleccionada)
*/
import { Component,output } from '@angular/core';
import { UpperCasePipe } from "@angular/common";
import { FormsModule } from '@angular/forms';  // para usar NgModel
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ListaClienteFinalComponent} from "../../components/lista-cliente-final/lista-cliente-final.component";
import { Empresa,EstadoCliente} from '../../models/cliente.model'
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-page-lista-cliente-final',
  imports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ListaClienteFinalComponent,
    FormsModule,  // para poder usar ngModel
    UpperCasePipe
  ],
  templateUrl: './page-lista-cliente-final.component.html',
  styleUrl: './page-lista-cliente-final.component.css'
})
export class PageListaClienteFinalComponent {

    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML

    // Gestion de comunicacion con el padre -> 
    // @Output() empresaSeleccionada: Empresa | null = null;  // version tradicional
    //outEmpresaSeleccionada = output<Empresa>();

    //#region - declaracion de variables internas del componente
    filtrarBajas: boolean = false;
    empresaSeleccionada: Empresa | null = null

    seleccionarEmpresa(empresa:Empresa){
      this.empresaSeleccionada = empresa;
    }
}
