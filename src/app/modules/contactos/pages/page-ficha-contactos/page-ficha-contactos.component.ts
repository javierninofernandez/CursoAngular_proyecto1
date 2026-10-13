import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-page-ficha-contactos',
  imports: [NavbarComponent,HeaderComponent,FooterComponent],
  templateUrl: './page-ficha-contactos.component.html',
  styleUrl: './page-ficha-contactos.component.css'
})
export class PageFichaContactosComponent {

}
