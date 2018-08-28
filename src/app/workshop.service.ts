import { Injectable } from "@angular/core";
import { Workshop } from "./Workshop";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { environment } from "../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class WorkshopService {
  private apiUrl = environment.apiBaseUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authService.getAccessToken()}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getWorkshops(): Observable<Workshop[]> {
    const url = `${this.apiUrl}/events`;
    return this.http.get<Workshop[]>(url).pipe(
      tap(_ => this.log("fetched workshops")),
      catchError(this.handleError("getWorkshops", []))
    );
  }

  public getWorkshop(id: number): Observable<Workshop> {
    const url = `${this.apiUrl}/event/${id}`;
    return this.http.get<Workshop>(url).pipe(
      tap(_ => this.log(`fetched workshop id=${id}`)),
      catchError(this.handleError<Workshop>(`getWorkshop id=${id}`))
    );
  }

  public deleteWorkshop(workshop: Workshop | number): Observable<Workshop> {
    const id = typeof workshop === "number" ? workshop : workshop.id;
    const url = `${this.apiUrl}/admin/event/${id}`;
    return this.http.delete<Workshop>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted workshop id=${id}`)),
      catchError(this.handleError<Workshop>("deleteWorkshop"))
    );
  }

  public addWorkshop(workshop: Workshop): Observable<Workshop> {
    const url = `${this.apiUrl}/admin/event/create`;
    return this.http.post<Workshop>(url, workshop, this.httpOptions).pipe(
      tap((workshop: Workshop) =>
        this.log(`added workshop w/ id=${workshop.id}`)
      ),
      catchError(this.handleError<Workshop>("addWorkshop"))
    );
  }

  public updateWorkshop(workshop: Workshop): Observable<any> {
    const url = `${this.apiUrl}/admin/event/${workshop.id}`;
    return this.http.put(url, workshop, this.httpOptions).pipe(
      tap(_ => this.log(`updated workshop id=${workshop.id}`)),
      catchError(this.handleError<Workshop>("updateWorkshop"))
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
      console.log(`HeroService: ${message}`);
    }
  }
}
