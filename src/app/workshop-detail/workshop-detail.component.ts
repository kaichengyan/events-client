import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Workshop } from "../Workshop";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { WorkshopService } from "../workshop.service";

@Component({
  selector: "app-workshop-detail",
  templateUrl: "./workshop-detail.component.html",
  styleUrls: ["./workshop-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopDetailComponent implements OnInit {
  @Input()
  workshop: Workshop;

  submitted: boolean = false;
  registeredMessage: string;

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
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

}
