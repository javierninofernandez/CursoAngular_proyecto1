import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { FichaClienteComponent } from '../../components/ficha-cliente/ficha-cliente.component';
import { FooterComponent } from '../../../../components/footer/footer.component';

@Component({
  selector: 'app-page-ficha-cliente',
  imports: [NavbarComponent,HeaderComponent,FooterComponent, FichaClienteComponent],
  templateUrl: './page-ficha-cliente.component.html',
  styleUrl: './page-ficha-cliente.component.css'
})
export class PageFichaClienteComponent {

}
