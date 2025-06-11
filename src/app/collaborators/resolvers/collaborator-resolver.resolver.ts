import { ResolveFn } from '@angular/router';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';
import { inject } from '@angular/core';
import { CollaboratorDataService } from '../collaborator-data.service';
import { map } from 'rxjs';
import { toCollaboratorViewModel } from '../mappers/collaborator.mapper';

export const resolverCollaborator: ResolveFn<CollaboratorViewModel> = (route) => {
  const collabService = inject(CollaboratorDataService);
  const collab =
    collabService.getCollabById(route.params['collabId']).pipe(map(collab => toCollaboratorViewModel(collab)));

  return collab;
};
