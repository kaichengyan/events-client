import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable } from "rxjs";
import { AuthToken } from "./AuthToken";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  tokenUrl: string = "http://event.micetek.com/api/token";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  isAuthenticated(): boolean {
    return localStorage.getItem("token") && Date.now() < this.expiresAt();
  }

  expiresAt(): number {
    return parseInt(localStorage.getItem("expiresAt"));
  }

  getAccessToken(): string {
    return localStorage.getItem("token");
  }

  login(username: string, password: any): Observable<AuthToken> {
    var token = this.authenticate(username, password);
    token.subscribe(
      response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem(
          'expiresAt',
          (response.expires_in * 1000 + Date.now()).toString()
        );
      },
      error => {
        this.logout();
      }
    );
    return token;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

  authenticate(username: string, password: string): Observable<AuthToken> {
    const body = {
      client_id: "adminclient",
      grant_type: "password",
      username: username,
      password: password
    };
    return this.http.post<AuthToken>(this.tokenUrl, body, httpOptions);
  }
}
