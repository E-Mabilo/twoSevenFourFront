import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortestPathService {
  private apiUrl = '/shortest-path';

  constructor(private http: HttpClient) { }

  findShortestPath(source: string, destination: string): Observable<any> {
    const payload = { start: source, end: destination };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
