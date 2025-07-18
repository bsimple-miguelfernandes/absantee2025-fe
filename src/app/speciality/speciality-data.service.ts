import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpecialityCreateRequest } from './speciality-form/speciality-create-request';
import { Speciality } from './speciality';
import { specialityDTO } from './specialityDTO';

@Injectable({
    providedIn: 'root'
})
export class SpecialityDataService {
    private http = inject(HttpClient);
      private readonly baseUrl = 'http://localhost:5031/api/specialities';
private readonly baseUrlPost = 'http://localhost:5041/api/speciality';
    getAll(): Observable<Speciality[]> {
  return this.http.get<Speciality[]>(this.baseUrl);
}

    getById(id: string): Observable<specialityDTO> {
        return this.http.get<specialityDTO>(`${this.baseUrl}/${id}`);
    }

    getByCollaboratorId(collaboratorId: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(`${this.baseUrl}/collaborator/${collaboratorId}`);
    }

    getByTechnologyId(technologyId: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(`${this.baseUrl}/technology/${technologyId}`);
    }

    getByDescription(description: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(`${this.baseUrl}/description?description=${description}`);
    }

    getByPeriod(startDate: string, endDate: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(`${this.baseUrl}/period?startDate=${startDate}&endDate=${endDate}`);
    }

    getByCollaboratorAndTechnology(collaboratorId: string, technologyId: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(
        `${this.baseUrl}/collaborator-technology?collaboratorId=${collaboratorId}&technologyId=${technologyId}`
        );
    }

    getByCollaboratorAndPeriod(collaboratorId: string, startDate: string, endDate: string): Observable<specialityDTO[]> {
        return this.http.get<specialityDTO[]>(
        `${this.baseUrl}/collaborator-period?collaboratorId=${collaboratorId}&startDate=${startDate}&endDate=${endDate}`
        );
    }

    createSpeciality(dto: SpecialityCreateRequest): Observable<Speciality> {
        return this.http.post<Speciality>(`${this.baseUrlPost}`, dto);
    }

    updateSpeciality(dto: SpecialityCreateRequest): Observable<Speciality> {
    return this.http.put<Speciality>(`${this.baseUrlPost}`, dto);
}

}