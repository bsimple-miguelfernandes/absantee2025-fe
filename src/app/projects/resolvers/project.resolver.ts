import { ResolveFn } from '@angular/router';
import { ProjectsDataService } from '../services/projects-data.service';
import { inject } from '@angular/core';
import { ProjectViewModel } from '../project/project.viewmodel';
import { map } from 'rxjs';
import { toProjectViewModel } from '../mappers/project.mapper';

export const projectResolver: ResolveFn<ProjectViewModel> = (route) => {
  const projectService = inject(ProjectsDataService);
  const project =
    projectService.getProjectById(route.params['projectId']).pipe(map(proj => toProjectViewModel(proj)));

  return project;
};
