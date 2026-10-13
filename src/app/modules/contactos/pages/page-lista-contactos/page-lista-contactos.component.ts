import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-page-lista-contactos',
  imports: [NavbarComponent,HeaderComponent,FooterComponent],
  templateUrl: './page-lista-contactos.component.html',
  styleUrl: './page-lista-contactos.component.css'
})
export class PageListaContactosComponent {

}
