import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Collaborator } from './collaborators/collaborator';
import { CollaboratorDataService } from './collaborators/collaborator-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollaboratorDetailsResolver implements Resolve<Collaborator> {
  constructor(private service: CollaboratorDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Collaborator> {
    return this.service.getCollabById(route.paramMap.get('collabId')!);
  }
}
