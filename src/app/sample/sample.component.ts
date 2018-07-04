import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { OrderPipe } from '../order.pipe';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  sortedCollection: any[];
  order: string = 'info.name';
  reverse: boolean = false;
  collection: any[] = [
    {
      id: 1,
      info: {
        name: 'john',
        number: '555-1212',
        age: 10
      }
    }, {
      id: 5,
      info: {
        name: 'Mary',
        number: '555-9876',
        age: 19
      }
    }, {
      id: 2,
      info: {
        name: 'Mike',
        number: '555-4321',
        age: 21
      }
    }, {
      id: 3,
      info: {
        name: 'Julie',
        number: '555-8765',
        age: 29
      }
    }, {
      id: 4,
      info: {
        name: 'Adam',
        number: '555-5678',
        age: 35
      }
    },
  ];

  constructor(private chatService: ChatService, private orderPipe: OrderPipe, private http: HttpClient) {
  //  this.sortedCollection = orderPipe.transform(this.collection, 'name');
this.order='name'

chatService.ws.getDataStream().subscribe(
  (msg)=> {
      console.log("message on sample component", msg.data);
            },
  (msg)=> {
      console.log("error", msg);
  },
  ()=> {
      console.log("complete");
  }
);
  }

  ngOnInit() {
    this.http.get('../../assets/data.json').subscribe((r: any) => { 
      this.collection = r.directory.map((x=> {
      x.isActiveCall =0 
      return x;
      } ));

     })
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
