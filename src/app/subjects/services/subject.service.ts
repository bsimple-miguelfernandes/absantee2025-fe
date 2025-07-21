import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, SubjectPageDTO } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(pageIndex: number, pageSize: number): Observable<SubjectPageDTO> {
    return this.http.get<SubjectPageDTO>(`http://localhost:5007/api/subjects/by-page?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getAllSubjects(): Observable<SubjectPageDTO> {
    return this.http.get<SubjectPageDTO>(`http://localhost:5007/api/subjects`);
  }

  addSubject(description: string, details: string): Observable<Subject> {
    return this.http.post<Subject>(`http://localhost:5121/api/subjects`, { description, details });
  }

}
