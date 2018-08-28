import { Component, OnInit } from "@angular/core";
import { WorkshopService } from "../../workshop.service";
import { Workshop } from "../../Workshop";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-index",
  templateUrl: "./admin-index.component.html",
  styleUrls: ["./admin-index.component.scss"]
})
export class AdminIndexComponent implements OnInit {
  workshops: Workshop[];

  constructor(
    private workshopService: WorkshopService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getWorkshops();
  }

  getWorkshops(): void {
    this.workshopService
      .getWorkshops()
      .subscribe(workshops => (this.workshops = workshops));
  }

  deleteWorkshop(workshop: Workshop): void {
    if (confirm("Are you sure?")) {
      this.workshops = this.workshops.filter(w => w !== workshop);
      this.workshopService.deleteWorkshop(workshop).subscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
