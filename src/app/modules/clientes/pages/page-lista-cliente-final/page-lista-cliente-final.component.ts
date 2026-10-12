/*
  page-lista-clientes-final : 
  Objetivo:
  - Uso de componente hijo lista-clientes-final con servicios
  - Uso del paso de parametroas al hijo input (:Filtro) y desde el hijo output (empresa seleccionada)
  Se añade gestion de parametros de entrada del router a traves de inject y señales para seleccionar el componente hijo de la lista
*/
import { Component,input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from "@angular/common";
import { FormsModule } from '@angular/forms';  // para usar NgModel
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ListaClienteFinalComponent} from "../../components/lista-cliente-final/lista-cliente-final.component";
import { Empresa,EmpresaAPI,EstadoCliente} from '../../models/cliente.model'
import { NgModel } from '@angular/forms';
import { ListaClienteFinalPrimengComponent 
} from "../../components/lista-cliente-final-primeng/lista-cliente-final-primeng.component";

@Component({
  selector: 'app-page-lista-cliente-final',
  imports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,  // para poder usar ngModel
    UpperCasePipe,
    ListaClienteFinalComponent,
      ListaClienteFinalPrimengComponent
],
  templateUrl: './page-lista-cliente-final.component.html',
  styleUrl: './page-lista-cliente-final.component.css'
})
export class PageListaClienteFinalComponent {

    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML

    // Recibir automáticamente el parámetro :modo del router
    modo = input.required<string>();
    private router = inject(Router);

    //#region - declaracion de variables internas del componente
    filtrarBajas: boolean = false;
    empresaSeleccionada: EmpresaAPI | null = null

    seleccionarEmpresa(empresa:EmpresaAPI){
      this.empresaSeleccionada = empresa;
    }
}
