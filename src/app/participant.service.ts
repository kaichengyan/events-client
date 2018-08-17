import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";
import { Participant } from "./Participant";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ParticipantService {
  private apiUrl = "http://127.0.0.1:8080/api";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.authService.getAccessToken()}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  // public getAll(): Observable<Workshop[]> {
  //   const url = `${this.workshopsUrl}/events`;
  //   return this.http.get<Workshop[]>(url);
  // }

  public getParticipantsOfEvent(event_id: number): Observable<Participant[]> {
    const url = `${this.apiUrl}/admin/event/${event_id}/participants`;
    return this.http.get<Participant[]>(url, this.httpOptions);
  }

  public registerParticipant(
    participant: Participant
  ): Observable<Participant> {
    const url = `${this.apiUrl}/event/${participant.event_id}/signup`;
    return this.http.post<Participant>(url, participant, this.httpOptions);
  }
}
