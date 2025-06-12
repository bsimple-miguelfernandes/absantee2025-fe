import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TrainingModule } from '../training-module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingModuleDataService } from '../training-modules-data.service';
@Injectable({ providedIn: 'root' })
export class resolverTrainingModule implements Resolve<TrainingModule> {
    constructor(private service: TrainingModuleDataService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<TrainingModule> {
        return this.service.getTrainingModuleById(route.params['trainingModuleId']);
}
}