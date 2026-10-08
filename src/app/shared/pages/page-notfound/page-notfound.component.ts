import { Component,inject } from '@angular/core';
import { NgTemplateOutlet } from "@angular/common";
import { Location } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-page-notfound',
  imports: [HeaderComponent, FooterComponent, NgTemplateOutlet],
  templateUrl: './page-notfound.component.html',
  styleUrl: './page-notfound.component.css'
})
export class PageNotfoundComponent {

  private location = inject(Location);

  volver(){
    this.location.back();
  }

}
