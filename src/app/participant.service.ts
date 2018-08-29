import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "../../node_modules/@angular/common/http";
import { Observable, of } from "../../node_modules/rxjs";
import { Participant } from "./Participant";
import { AuthService } from "./auth.service";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ParticipantService {
  private apiUrl = environment.apiBaseUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authService.getAccessToken()}`
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
    participant: Participant,
    recaptchaResponse: string
  ): Observable<Participant> {
    const url = `${this.apiUrl}/event/${participant.event_id}/signup`;
    return this.http.post<Participant>(
      url,
      {
        participantData: participant,
        recaptchaResponse: recaptchaResponse
      },
      this.httpOptions
    );
  }

  public deleteParticipant(participant: Participant | number) {
    const id = typeof participant === "number" ? participant : participant.id;
    const url = `${this.apiUrl}/admin/participant/${id}`;
    return this.http.delete<Participant>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted participant id=${id}`)),
      catchError(this.handleError<Participant>("deleteParticipant"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    if (!environment.production) {
      console.log(`ParticipantService: ${message}`);
    }
  }
}
