import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { SocketService } from './_services/socket.service';
import { AlertifyService } from './_services/ultisService/alertify.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // @HostListener('window:unload', [ '$event' ])
  // unloadHandler(event) {
  //   alert('dasdsd');
  // }
  // @HostListener('window:beforeunload', [ '$event' ])
  // beforeUnloadHander(event) {
  //   alert('dasdsdsss');
  // }
  constructor(
    // private socket: SocketService,
    // private alertify: AlertifyService
    ) {
    }
    ngOnInit() {
      // this.socket.getEventListener().subscribe(event => {
      //   if (event.type === 'message') {
      //     const data = event.data.content;
      //     if (data !== 'Connected' && data !== 'Disconnected') {
      //       this.alertify.success(data);
      //     }
      //   }
      // });
    }
    public ngOnDestroy() {
      // this.socket.close();
    }
}

