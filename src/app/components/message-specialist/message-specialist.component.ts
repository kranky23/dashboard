import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from 'src/app/messages';
import { MessageSpecialistService } from 'src/app/services/message-specialist.service';

@Component({
  selector: 'app-message-specialist',
  templateUrl: './message-specialist.component.html',
  styleUrls: ['./message-specialist.component.css']
})
export class MessageSpecialistComponent implements OnInit {
  spec_id : string = ""
  doc_id : string =""
  messages:Messages[] = [];
  messageToBeSent : Messages = new Messages();

  constructor(private route:ActivatedRoute,private messageSpecialistService:MessageSpecialistService) { }

  ngOnInit(): void {
    this.spec_id = this.route.snapshot.params['spec_id']
    this.doc_id = localStorage.getItem('doctorId')||"";



    console.log("doctor id is",this.doc_id);
    console.log("spec id is",this.spec_id);
    this.messageSpecialistService.getMessages(this.doc_id,this.spec_id!).subscribe(
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
    this.messageSpecialistService.sendMessage(messageToBeSent,this.spec_id,this.doc_id).subscribe(
      (data:any) => {
        console.log("Message successfully stored!",data);
        messageToBeSent.message = null!;
        // window.scrollTo(0, document.body.scrollHeight);

        this.ngOnInit();
      },
      (error:any) => {console.log('Could not store message!',error)}
    )
   
  }


  loadNewMessages()
  {

    this.ngOnInit();
  }
}
