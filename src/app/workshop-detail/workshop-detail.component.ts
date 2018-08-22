import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Workshop } from "../Workshop";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { WorkshopService } from "../workshop.service";
import { Participant } from "../Participant";
import { ParticipantService } from "../participant.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalMessageComponent } from "../modal-message/modal-message.component";

@Component({
  selector: "app-workshop-detail",
  templateUrl: "./workshop-detail.component.html",
  styleUrls: ["./workshop-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopDetailComponent implements OnInit {
  @Input()
  workshop: Workshop;
  modalRef: BsModalRef;

  submitted: boolean = false;
  registeredMessage: string;

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private participantService: ParticipantService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getWorkshop();
  }

  getWorkshop(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.workshopService
      .getWorkshop(id)
      .subscribe(workshop => (this.workshop = workshop));
  }

  registerParticipant(name: string, email: string) {
    var participant: Participant = new Participant();
    participant.name = name;
    participant.email = email;
    participant.event_id = this.workshop.id;
    this.participantService.registerParticipant(participant).subscribe(
      data => {
        this.registeredMessage = 'Thank you for registering!'
      },
      error => {
        this.registeredMessage = 'Oops, something has gone wrong on our end. Please try again later.'
      }
    );
    // this.openSuccessModal();
    this.submitted = true;
  }

  // openSuccessModal() {
  //   const initialState = {
  //     title: 'Thank you',
  //     message: 'You have registered for ' + this.workshop.title + '!'
  //   };
  //   this.modalRef = this.modalService.show(ModalMessageComponent, {initialState});
  //   this.modalRef.content.closeBtnName = 'Close';
  // }

}
