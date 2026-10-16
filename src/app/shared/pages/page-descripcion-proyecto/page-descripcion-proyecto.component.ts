import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-page-descripcion-proyecto',
  imports: [NavbarComponent,HeaderComponent,FooterComponent],
  templateUrl: './page-descripcion-proyecto.component.html',
  styleUrl: './page-descripcion-proyecto.component.css'
})
export class PageDescripcionProyectoComponent {

}
