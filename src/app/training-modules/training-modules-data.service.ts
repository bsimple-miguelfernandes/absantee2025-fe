import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TrainingModule } from "./training-module";
import { TrainingSubject } from "./training-subjects-list/training-subject";

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

    loadTrainingSubjects(){
        this.httpClient.get<TrainingSubject[]>(`${this.baseUrl}/trainingSubjects`).subscribe({
            next: (trainingSubjects) => this.trainingSubjectSubject.next(trainingSubjects),
            error: (err) => console.error('Error trying to load training subjects:' , err)
        })
    }

    getTrainingSubjects(): Observable<TrainingSubject[]>{
        return this.trainingSubject$;
    }

}