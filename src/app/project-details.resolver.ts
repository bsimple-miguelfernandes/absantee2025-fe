import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectsDataService } from './projects/projects-data.service';
import { ProjectViewModel } from './projects/models/project-view-model.model';
import { toProjectViewModel } from './projects/mappers/project.mapper';

@Injectable({ providedIn: 'root' })
export class ProjectDetailsResolver implements Resolve<ProjectViewModel> {
  service = inject(ProjectsDataService);

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectViewModel> {
    return this.service.getProjectById(route.paramMap.get('projectId')!).pipe(map(toProjectViewModel));
  }
}
