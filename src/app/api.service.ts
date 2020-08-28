import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMensagem } from './mensagem';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  querys = [];

  server = 'http://opex-app-api.kinghost.net';

  listaMensagens(): Observable<any[]> {
    return this.http.get<any[]>(this.server + '/api/Avisos?predioId=1');
  }

  saveMesage(mensagem): Observable<IMensagem>  {
    return this.http.post<IMensagem>(this.server + '/api/mensagens', mensagem);
  }

  editarMesage(mensagem): any {
    return this.http.post<IMensagem[]>(this.server + '/update/mensagem', mensagem);
  }

  deleteMesage(mensagem: IMensagem): any {
    return this.http.delete<any>(this.server + '/api/mensagens/' + mensagem._id);
  }

}
