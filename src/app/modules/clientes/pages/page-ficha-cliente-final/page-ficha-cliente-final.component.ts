import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { FichaClienteNgformComponent } from '../../components/ficha-cliente-ngform/ficha-cliente-ngform.component';
import { FichaClienteReactformComponent} from "../../components/ficha-cliente-reactform/ficha-cliente-reactform.component";
import { FichaClientePrimengComponent } from '../../components/ficha-cliente-primeng/ficha-cliente-primeng.component';


@Component({
  selector: 'app-page-ficha-cliente-final',
  imports: [    
      NavbarComponent,
      HeaderComponent,
      FooterComponent,
      FichaClienteNgformComponent,
      FichaClienteReactformComponent,
      FichaClientePrimengComponent],
  templateUrl: './page-ficha-cliente-final.component.html',
  styleUrl: './page-ficha-cliente-final.component.css'
})
export class PageFichaClienteFinalComponent implements OnInit {

  private route = inject(ActivatedRoute);

  // variable para determinar que tipo de formulario queremos mostrar
  tipoFormulario: string = '';   // '' | 'ngform' | 'reactform' | 'primeng'   
  titulo: string = 'Ficha Cliente';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipoFormulario = params.get('modo') ?? 'ngform';
      console.log('Tipo de formulario:', this.tipoFormulario);
      this.titulo = 'Ficha Cliente - (Formulario '+this.tipoFormulario+')';
    });
  }  

}
