import { ResolveFn } from '@angular/router';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';
import { inject } from '@angular/core';
import { CollaboratorDataService } from '../collaborator-data.service';

export const resolverCollaborator: ResolveFn<CollaboratorViewModel> = (route) => {
  const collabService = inject(CollaboratorDataService);
  const collab =
    collabService.getCollabById(route.params['collabId'])
  return collab;
};
