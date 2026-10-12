import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { FichaClienteNgformComponent } from '../../components/ficha-cliente-ngform/ficha-cliente-ngform.component';

@Component({
  selector: 'app-page-ficha-cliente',
  imports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    FichaClienteNgformComponent
  ],
  templateUrl: './page-ficha-cliente.component.html',
  styleUrl: './page-ficha-cliente.component.css'
})
export class PageFichaClienteComponent {
  
}
