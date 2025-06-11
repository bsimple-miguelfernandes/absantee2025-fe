import { ResolveFn } from '@angular/router';
import { ProjectsDataService } from '../../projects/projects-data.service';
import { inject } from '@angular/core';
import { ProjectViewModel } from '../project/project.viewmodel';

export const projectResolver: ResolveFn<ProjectViewModel> = (route) => {
  const projectService = inject(ProjectsDataService);
  const project =
    projectService.getProjectById(route.params['projectId']);

  return project;
};
