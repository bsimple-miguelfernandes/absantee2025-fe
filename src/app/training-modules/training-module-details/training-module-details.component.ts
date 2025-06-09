import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TrainingModule } from '../training-module';
import { TrainingModuleDataService } from '../training-modules-data.service';

@Component({
  selector: 'app-training-module-details',
  imports: [],
  templateUrl: './training-module-details.component.html',
  styleUrl: './training-module-details.component.css'
})
export class TrainingModuleDetailsComponent {
  private route = inject(ActivatedRoute);

  trainingModule!: TrainingModule;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.trainingModule = data['trainingModule'];
    })
  }


}

export const resolverTrainingModule: ResolveFn<TrainingModule> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const trainingModuleService = inject(TrainingModuleDataService);
  const trainingModule = trainingModuleService.getTrainingModuleById(activatedRoute.params['trainingModuleId'])
  return trainingModule;
}
