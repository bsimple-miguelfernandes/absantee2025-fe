import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrainingModuleDataService } from './training-modules-data.service';
import { TrainingModule } from './training-module';
import { inject, Inject } from '@angular/core';
export const resolverTrainingModule: ResolveFn<TrainingModule> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const service = inject(TrainingModuleDataService);
  return service.getTrainingModuleById(route.params['trainingModuleId']);
};
