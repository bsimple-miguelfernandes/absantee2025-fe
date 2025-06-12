import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectViewModel } from '../models/project-view-model.model';
import { ProjectsDataService } from '../projects-data.service';
import { toProjectViewModel } from '../mappers/project.mapper';

@Injectable({ providedIn: 'root' })
export class ProjectDetailsResolver implements Resolve<ProjectViewModel> {
  service = inject(ProjectsDataService);

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectViewModel> {
    return this.service.getProjectById(route.paramMap.get('projectId')!).pipe(map(toProjectViewModel));
  }
}
