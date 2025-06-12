import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { ProjectsDataService } from '../projects/projects-data.service';

@Injectable({ providedIn: 'root' })
export class AssociationProjectResolver implements Resolve<AssociationProjectCollaborators[]> {
  constructor(private service: ProjectsDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<AssociationProjectCollaborators[]> {
    return this.service.getAssociations(route.paramMap.get('selectedId')!);
  }
}
