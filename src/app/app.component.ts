import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supermarkets';

  public dados: any = [];
  public newSuperMarcket = false;
  public edit = false;
  public loader = true;

  editar = false;

  fncCadastra() {
    this.loader = true;
    this.dados = '';
    this.newSuperMarcket = true;
    this.edit = false;
    this.loader = false;
  }
}
