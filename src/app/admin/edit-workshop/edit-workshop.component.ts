import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Workshop } from "../../Workshop";
import { WorkshopService } from "../../workshop.service";

@Component({
  selector: "app-edit-workshop",
  templateUrl: "./edit-workshop.component.html",
  styleUrls: ["./edit-workshop.component.scss"]
})
export class EditWorkshopComponent implements OnInit {
  @Input()
  model: Workshop;

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getWorkshop();
  }

  getWorkshop(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.workshopService
      .getWorkshop(id)
      .subscribe(workshop => (this.model = workshop));
  }

  onSubmit(): void {
    this.workshopService.updateWorkshop(this.model).subscribe(_ => {
      this.router.navigate([`/admin/workshop/${this.model.id}`]);
    });
  }
}
