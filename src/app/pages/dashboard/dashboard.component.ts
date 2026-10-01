import { Component } from '@angular/core';
import { NavbarComponent} from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
