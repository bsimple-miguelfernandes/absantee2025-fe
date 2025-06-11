import { ResolveFn } from '@angular/router';
import { ProjectsDataService } from '../../projects/projects-data.service';
import { inject } from '@angular/core';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { map } from 'rxjs';
import { AssociationProjectCollaboratorsViewModel } from '../association-project-collaborator.viewmodel';
import { toAssociationProjectCollaboratorViewModel } from '../mappers/association-project-collaborator.mapper';

export const associationProjectCollaboratorResolver: ResolveFn<AssociationProjectCollaboratorsViewModel[]> = (route) => {
  const projectService = inject(ProjectsDataService);
  const collaboratorService = inject(CollaboratorDataService);

  const associations: AssociationProjectCollaboratorsViewModel[] = [];

  if (route.params['projectId']) {
    const associations =
      projectService.getAssociations(route.params['projectId']).pipe(
        map(assocs => assocs.map(toAssociationProjectCollaboratorViewModel)));


  } else {
    const collaborator =
      collaboratorService.getAssociations(route.params['collabId']).pipe(
        map(assocs => assocs.map(toAssociationProjectCollaboratorViewModel)));

  }

  return associations;
};
