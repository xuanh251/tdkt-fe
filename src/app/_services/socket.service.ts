import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.socket = new WebSocket('ws://' + environment.ApiOriginUrl + '/ws');
    this.socket.onopen = event => {
      this.listener.emit({ type: 'open', data: event });
    };
    this.socket.onclose = event => {
      this.listener.emit({ type: 'close', data: event });
    };
    this.socket.onmessage = event => {
      this.listener.emit({ type: 'message', data: JSON.parse(event.data) });
    };
  }
  public send(data: string) {
    this.socket.send(data);
  }

  public close() {
    this.socket.close();
  }

  public getEventListener() {
    return this.listener;
  }
}
