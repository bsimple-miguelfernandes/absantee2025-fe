import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TrainingSubject } from './training-subject';
import { TrainingSubjectDataService } from './training-subjects-data.service';

export const resolverTrainingSubject: ResolveFn<TrainingSubject> = (route) => {
    const trainingSubjectService = inject(TrainingSubjectDataService);
    return trainingSubjectService.getTrainingSubjectById(route.params['trainingSubjectId']);
};
