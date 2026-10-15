import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ListaDiplomasComponent } from '../../components/lista-diplomas/lista-diplomas.component';

@Component({
  selector: 'app-page-diplomas',
  imports: [NavbarComponent, HeaderComponent, FooterComponent, ListaDiplomasComponent],
  templateUrl: './page-diplomas.component.html',
  styleUrl: './page-diplomas.component.css'
})
export class PageDiplomasComponent {

}
