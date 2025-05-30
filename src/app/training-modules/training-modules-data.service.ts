import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TrainingModule } from "./training-module";

@Injectable({
    providedIn: 'root'
})
export class TrainingModuleDataService {
    private httpClient = inject(HttpClient);
    private readonly baseUrl = environment.apiBaseUrl;

    private trainingModuleSubject = new BehaviorSubject<TrainingModule[]>([]);
    trainingModule$ = this.trainingModuleSubject.asObservable();

    constructor(private http:HttpClient){
        this.loadTrainingModules();
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
    
}