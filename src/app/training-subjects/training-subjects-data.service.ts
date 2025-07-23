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
    private readonly trainingSujectandModelCmdBaseUrl = environment.trainingSujectandModelCmdBaseUrl;
    private readonly trainingSujectandModelQueryBaseUrl = environment.trainingSujectandModelQueryBaseUrl;


    getTrainingSubjects(): Observable<TrainingSubject[]> {
        return this.httpClient.get<TrainingSubject[]>(`${this.trainingSujectandModelQueryBaseUrl}/trainingSubjects`);
    }

    getTrainingSubjectById(id: string): Observable<TrainingSubject> {
        return this.httpClient.get<TrainingSubject>(`${this.trainingSujectandModelQueryBaseUrl}/trainingSubjects/${id}`)
    }

    updateTrainingSubject(subject: TrainingSubject) {
        return this.httpClient.put<TrainingSubject>(`${this.trainingSujectandModelCmdBaseUrl}/trainingSubjects`, subject);
    }

    addTrainingSubject(trainingSubject: TrainingSubject) {
        return this.httpClient.post<TrainingSubject>(`${this.trainingSujectandModelCmdBaseUrl}/trainingSubjects`, trainingSubject);
    }

}