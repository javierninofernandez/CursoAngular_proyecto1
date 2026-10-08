import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-page-default',
  imports: [NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './page-default.component.html',
  styleUrl: './page-default.component.css'
})
export class PageDefaultComponent {

}
