import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"]
})
export class AdminLoginComponent implements OnInit {
  private returnUrl: string;
  private errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/workshops';
  }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      response => {
        this.router.navigate(['/admin/workshops']);
      },
      error => {
        this.errorMessage = 'Failed to log in. Check your credentials.'
      }
    );
    this.router.navigateByUrl(this.returnUrl);
  }
}
