import { Component, OnInit } from '@angular/core';
import {DataServices} from "../../services/data.services";
import {ActivatedRoute, Router} from "@angular/router";
import {Messages} from "../../messages";
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-patient-message',
  templateUrl: './patient-message.component.html',
  styleUrls: ['./patient-message.component.css']
})
export class PatientMessageComponent implements OnInit {

  constructor(private data: DataServices,
              private route:ActivatedRoute, private router: Router,
              private messageService:MessagesService) { }

  pat_id = this.route.snapshot.params['pid']
  messages:Messages[] = [];
  fname: string = localStorage.getItem("fname")!;

  messageToBeSent : Messages = new Messages();

  async ngOnInit(): Promise<any>
  {
    const data : any = await this.messageService.updateReadReceipt(this.pat_id).toPromise();
    this.messageService.getMessages((this.pat_id)!).subscribe(
      (data:any) => {
        this.messages = data;
        console.log("Messages obtaiend are hey",this.messages);
        window.scrollTo(0, document.body.scrollHeight);
        // ('.chat-history')[0].scrollTop = ('.chat-history')[0].scrollHeight
      },
      (error:any) => {console.log('Error fetching questions!',error)}
    )


  }


  public onSendMessage(messageToBeSent:Messages)
  {
    console.log("messageToBeSent is " , messageToBeSent);
    messageToBeSent.postedBy = false;
    this.messageService.sendMessage(messageToBeSent,this.pat_id).subscribe(
      (data:any) => {
        console.log("Message successfully stored!",data);
        messageToBeSent.message = "";
        // window.scrollTo(0, document.body.scrollHeight);

        this.ngOnInit();
      },
      (error:any) => {console.log('Could not store message!',error)}
    )

  }

  loadNewMessages() {
    this.ngOnInit();
  }
}
