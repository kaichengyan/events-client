import { Component, OnInit, Input } from "@angular/core";
import { Workshop } from "../../Workshop";
import { Participant } from "../../Participant";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { WorkshopService } from "../../workshop.service";
import { ParticipantService } from "../../participant.service";

@Component({
  selector: "app-admin-detail",
  templateUrl: "./admin-detail.component.html",
  styleUrls: ["./admin-detail.component.scss"]
})
export class AdminDetailComponent implements OnInit {
  @Input()
  workshop: Workshop;

  @Input()
  participants: Participant[];

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private participantService: ParticipantService
  ) {}

  ngOnInit() {
    this.getWorkshop();
  }

  getWorkshop(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.workshopService
      .getWorkshop(id)
      .subscribe(workshop => (this.workshop = workshop));
    this.participantService
      .getParticipantsOfEvent(id)
      .subscribe(participants => (this.participants = participants));
  }

  deleteParticipant(participant: Participant) {
    if (confirm("Are you sure?")) {
      this.participants = this.participants.filter(p => p !== participant);
      this.participantService.deleteParticipant(participant).subscribe();
    }
  }
}
