import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TrainingSubject } from './training-subject';
import { TrainingSubjectDataService } from './training-subjects-data.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainingSubjectDetailsResolver implements Resolve<TrainingSubject> {
    constructor(private service: TrainingSubjectDataService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TrainingSubject> {
        const subjectId = route.paramMap.get('trainingSubjectId')!;
        return this.service.getTrainingSubjectById(subjectId);
    }
}
