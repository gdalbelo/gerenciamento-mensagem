import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { IMensagem } from '../mensagem';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject();

  mesageId: string = '';
  titulo: string = '';
  texto: string = '';
  cargo: string = '';
  dataenvio: string = '';
  dataenvioasstring = '';
  nome: string = '';
  showForm: boolean = false;

  mensagens = [];

  constructor(private apiService: ApiService) {
    this.fncListaMensagens();
  }

  ngOnInit() {
    this.fncListaMensagens();
  }

  fncListaMensagens() {
    this.apiService.listaMensagens()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data) => {
      this.mensagens = data;
      console.log(this.mensagens);
    });
  }

  btnNovaMensagem() {
    this.showForm = !this.showForm;
  }

  fncNovo() {
    this.mesageId = '';
    this.titulo = '';
    this.texto = '';
    this.cargo = '';
    this.dataenvio = '';
    this.dataenvioasstring = '';
    this.nome = '';
  }

  saveMesage() {
    var newMesage = {
      Id: this.mesageId,
      Cargo: this.cargo,
      DataEnvio: this.dataenvio,
      DataEnvioAsString: this.dataenvioasstring,
      Nome: this.nome
    }
    if(this.mesageId != '') {
      this.apiService.editarMesage(newMesage)
      .subscribe((dt) => {
        this.apiService.listaMensagens()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.mensagens = data;
          this.fncNovo();
        });
      });
    } else {
      this.apiService.saveMesage(newMesage)
      .subscribe((dt) => {
        this.apiService.listaMensagens()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.mensagens = data;
          this.fncNovo();
        });
      });
    }
  }

}
