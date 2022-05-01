import { Component, OnInit } from '@angular/core';
import { DoctorNotes } from 'src/app/doctor-notes';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-self-note',
  templateUrl: './self-note.component.html',
  styleUrls: ['./self-note.component.css']
})
export class SelfNoteComponent implements OnInit {

  constructor(private messagesService : MessagesService) { }
  doc_id:string=""

  notes:DoctorNotes[] = [];
  noteToBeSent : DoctorNotes = new DoctorNotes();

  ngOnInit(): void {
    this.doc_id = localStorage.getItem("doctorId")||"";

    this.messagesService.getDoctorNotes(this.doc_id!).subscribe(
      (data:any) => {
        this.notes = data;
        console.log("notes obtaiend are hey",this.notes);
        window.scrollTo(0, document.body.scrollHeight);
        // ('.chat-history')[0].scrollTop = ('.chat-history')[0].scrollHeight
      },
      (error:any) => {console.log('Error fetching notes!',error)}
    )
  }

  public onSendNote(noteToBeSent:DoctorNotes)
  {
    console.log("noteToBeSent is " , noteToBeSent);
    noteToBeSent.postedBy = true;
    this.messagesService.sendDoctorNotes(noteToBeSent,this.doc_id).subscribe(
      (data:any) => {
        console.log("Note successfully stored!",data);
        noteToBeSent.message = null!;
        // window.scrollTo(0, document.body.scrollHeight);

        this.ngOnInit();
      },
      (error:any) => {console.log('Could not store Note!',error)}
    )
   
  }

}
