import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Technology } from "./technology";
import { TechnologyCreateRequest } from "./technology-create/create-Technology";

@Injectable({
  providedIn: 'root'
})
export class TechnologyDataService {
  private httpClient = inject(HttpClient);

  private readonly getBaseUrl = 'http://localhost:5078/api/technologies';
  private readonly postBaseUrl = 'http://localhost:5087/api/technologies';

  constructor() {}

  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.getBaseUrl);
  }

  getTechnologyById(id: string): Observable<Technology> {
    return this.httpClient.get<Technology>(`${this.getBaseUrl}/${id}`);
  }

  AddTechnology(request: TechnologyCreateRequest): Observable<Technology> {
    return this.httpClient.post<Technology>(this.postBaseUrl, request);
  }
}
