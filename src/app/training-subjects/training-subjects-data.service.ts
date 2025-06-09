import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { TrainingSubject } from "./training-subject";

@Injectable({
    providedIn: 'root'
})
export class TrainingSubjectDataService {
    private httpClient = inject(HttpClient);
    private readonly baseUrl = environment.apiBaseUrl;

    getTrainingSubjects(): Observable<TrainingSubject[]> {
        return this.httpClient.get<TrainingSubject[]>(`${this.baseUrl}/trainingSubjects`);
    }

    getTrainingSubjectById(id: string): Observable<TrainingSubject> {
        return this.httpClient.get<TrainingSubject>(`${this.baseUrl}/trainingSubjects/${id}`)
    }

    updateTrainingSubject(subject: TrainingSubject) {
        return this.httpClient.put<TrainingSubject>(`${this.baseUrl}/trainingSubjects`, subject);
    }

    addTrainingSubjet(trainingSubject: TrainingSubject) {
        return this.httpClient.post<TrainingSubject>(`${this.baseUrl}/trainingSubjects`, trainingSubject);
    }

}