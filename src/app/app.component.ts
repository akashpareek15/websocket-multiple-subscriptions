import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service'
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {

	constructor(private chatService: ChatService) {
		
		chatService.ws.getDataStream().subscribe(
			(msg)=> {
					console.log("message on app component", msg.data);
								},
			(msg)=> {
					console.log("error", msg);
			},
			()=> {
					console.log("complete");
			}
	);
	}

  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
	}

  sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		
		this.chatService.ws.send(this.message).publish().connect();
	}

}
