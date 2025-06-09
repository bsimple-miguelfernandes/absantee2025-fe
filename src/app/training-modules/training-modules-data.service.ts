import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TrainingModule } from "./training-module";
import { TrainingSubject } from "./training-subjects-list/training-subject";
import { AssociationTrainingModuleCollaborator } from "./association-training-module-collaborator";

@Injectable({
    providedIn: 'root'
})
export class TrainingModuleDataService {
    private httpClient = inject(HttpClient);
    private readonly baseUrl = environment.apiBaseUrl;

    //subjects
    private trainingModuleSubject = new BehaviorSubject<TrainingModule[]>([]);
    trainingModule$ = this.trainingModuleSubject.asObservable();
    private trainingSubjectSubject = new BehaviorSubject<TrainingSubject[]>([]);
    trainingSubject$ = this.trainingSubjectSubject.asObservable();

    constructor(private http:HttpClient){
        this.loadTrainingModules();
        this.loadTrainingSubjects();
    }

    loadTrainingModules(){
        this.httpClient.get<TrainingModule[]>(`${this.baseUrl}/trainingModules`).subscribe({
            next: (trainingModules) => this.trainingModuleSubject.next(trainingModules),
            error: (err) => console.error('Error trying to load training modules:', err)
        })
    }

    getTrainingModules(): Observable<TrainingModule[]>{
        return this.trainingModule$;
    }

    getTrainingModuleById(id: string): Observable<TrainingModule> {
        return this.httpClient.get<TrainingModule>(`${this.baseUrl}/trainingModules/${id}`)
    }

    loadTrainingSubjects(){
        this.httpClient.get<TrainingSubject[]>(`${this.baseUrl}/trainingSubjects`).subscribe({
            next: (trainingSubjects) => this.trainingSubjectSubject.next(trainingSubjects),
            error: (err) => console.error('Error trying to load training subjects:' , err)
        })
    }

    getTrainingSubjects(): Observable<TrainingSubject[]>{
        return this.trainingSubject$;
    }

    getTrainingSubjectById(id: string): Observable<TrainingSubject>{
        return this.httpClient.get<TrainingSubject>(`${this.baseUrl}/trainingSubjects/${id}`)
    }

    updateTrainingSubject(subject: TrainingSubject) {
  if (!subject.id) throw new Error('TrainingSubject id obrigatório');

  //  ←  URL SEM id
  return this.httpClient.put<TrainingSubject>(
    `${this.baseUrl}/trainingSubjects`,
    subject
  ).pipe(
    tap(() => this.loadTrainingSubjects())
  );
}






    addTrainingSubject(trainingSubject: TrainingSubject) {
        return this.httpClient.post<TrainingSubject>(`${this.baseUrl}/trainingSubjects`, trainingSubject).pipe(
        tap(() => this.loadTrainingSubjects())
  );
}


    getAssociations(id: string): Observable<AssociationTrainingModuleCollaborator[]>{
        return this.httpClient.get<AssociationTrainingModuleCollaborator[]>(`${this.baseUrl}/trainingModules/${id}/associations`);
    }
}