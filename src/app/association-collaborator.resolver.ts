import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CollaboratorDataService } from './collaborators/collaborator-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationProjectCollaborators } from './associations-project-collaborator/association-project-collaborator.model';

@Injectable({ providedIn: 'root' })
export class AssociationCollaboratorResolver implements Resolve<AssociationProjectCollaborators[]> {
  constructor(private service: CollaboratorDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<AssociationProjectCollaborators[]> {
    return this.service.getAssociations(route.paramMap.get('id')!);
  }
}
