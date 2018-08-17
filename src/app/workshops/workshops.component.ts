import { Component, OnInit } from "@angular/core";
import { WorkshopService } from "../workshop.service";
import { Workshop } from "../Workshop";

@Component({
  selector: "app-workshops",
  templateUrl: "./workshops.component.html",
  styleUrls: ["./workshops.component.scss"]
})
export class WorkshopsComponent implements OnInit {
  private workshops: Workshop[];

  constructor(private workshopService: WorkshopService) {}

  ngOnInit() {
    this.getWorkshops();
  }

  getWorkshops(): void {
    this.workshopService
      .getWorkshops()
      .subscribe(workshops => (this.workshops = workshops));
  }
}
