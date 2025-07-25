import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TrainingModule } from "./training-module";
import { TrainingSubject } from "../training-subjects/training-subject";
import { AssociationTrainingModuleCollaborator } from "./association-training-module-collaborator";

@Injectable({
    providedIn: 'root'
})
export class TrainingModuleDataService {
    private httpClient = inject(HttpClient);
    private readonly trainingSujectandModelQueryBaseUrl = environment.trainingSujectandModelQueryBaseUrl;
    private readonly trainingSujectandModelCmdBaseUrl = environment.trainingSujectandModelCmdBaseUrl;


    //subjects
    private trainingModuleSubject = new BehaviorSubject<TrainingModule[]>([]);
    trainingModule$ = this.trainingModuleSubject.asObservable();
    private trainingSubjectSubject = new BehaviorSubject<TrainingSubject[]>([]);
    trainingSubject$ = this.trainingSubjectSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadTrainingModules();
        this.loadTrainingSubjects();
    }

    loadTrainingModules() {
        this.httpClient.get<TrainingModule[]>(`${this.trainingSujectandModelQueryBaseUrl}/trainingModules`).subscribe({
            next: (trainingModules) => this.trainingModuleSubject.next(trainingModules),
            error: (err) => console.error('Error trying to load training modules:', err)
        })
    }

    getTrainingModules(): Observable<TrainingModule[]> {
        return this.trainingModule$;
    }

    getTrainingModuleById(id: string): Observable<TrainingModule> {
        return this.httpClient.get<TrainingModule>(`${this.trainingSujectandModelQueryBaseUrl}/trainingModules/${id}`)
    }

    loadTrainingSubjects() {
        this.httpClient.get<TrainingSubject[]>(`${this.trainingSujectandModelQueryBaseUrl}/trainingSubjects`).subscribe({
            next: (trainingSubjects) => this.trainingSubjectSubject.next(trainingSubjects),
            error: (err) => console.error('Error trying to load training subjects:', err)
        })
    }

    getTrainingSubjects(): Observable<TrainingSubject[]> {
        return this.trainingSubject$;
    }

    getTrainingSubjectById(id: string): Observable<TrainingSubject> {
        return this.httpClient.get<TrainingSubject>(`${this.trainingSujectandModelQueryBaseUrl}/trainingSubjects/${id}`)
    }

    updateTrainingSubject(subject: TrainingSubject) {
        return this.httpClient.put<TrainingSubject>(`${this.trainingSujectandModelCmdBaseUrl}/trainingSubjects`, subject).pipe(tap(() => this.loadTrainingSubjects()));
    }

    addTrainingSubject(trainingSubject: TrainingSubject) {
        return this.httpClient.post<TrainingSubject>(`${this.trainingSujectandModelCmdBaseUrl}/trainingSubjects`, trainingSubject).pipe(
            tap(() => this.loadTrainingSubjects())
        );
    }
    addTrainingModule(trainingModule: TrainingModule) {
        return this.httpClient.post<TrainingModule>(`${this.trainingSujectandModelCmdBaseUrl}/trainingmodules`, trainingModule).pipe(
            tap(() => this.loadTrainingModules())
        );
    }
    updateTrainingModule(module: TrainingModule) {
            return this.httpClient.put<TrainingModule>(`${this.trainingSujectandModelCmdBaseUrl}/trainingmodules`, module).pipe(tap(() => this.loadTrainingModules()));
        }

    getAssociations(id: string): Observable<AssociationTrainingModuleCollaborator[]> {
        return this.httpClient.get<AssociationTrainingModuleCollaborator[]>(`${this.trainingSujectandModelQueryBaseUrl}/trainingModules/${id}/associations`);
    }
}