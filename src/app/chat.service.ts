import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
const CHAT_URL = 'ws://echo.websocket.org/';

export interface Message {
	author: string,
	message: string
}

@Injectable()
export class ChatService {


	public ws;
	constructor() {


		this.ws = new $WebSocket(CHAT_URL);
		// set received message callback
		this.ws.onMessage(
			(msg: MessageEvent) => {
				//  console.log("onMessage ", msg.data);
			},
			{ autoApply: false }
		);
	}
}