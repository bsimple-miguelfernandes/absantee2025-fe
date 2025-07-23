import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AssociationTrainingModuleCollaborators, AssociationTrainingModuleCollaboratorsDTO } from '../models/association-trainingmodule-collaborator.model';
import { toAssociationTrainingModuleCollaborator } from '../mappers/association-trainingmodule-collaborator.mapper';
import { AssociationTrainingmoduleCollaboratorService } from '../services/association-trainingmodule-collaborator.service';

@Injectable({ providedIn: 'root' })
export class AssociationCollaboratorTrainingModuleResolver implements Resolve<AssociationTrainingModuleCollaborators[]> {
    constructor(private service: AssociationTrainingmoduleCollaboratorService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AssociationTrainingModuleCollaboratorsDTO[]> {
        return this.service.getAssociationsByCollabTMC(route.paramMap.get('selectedId')!)
            .pipe(map(dtos => dtos.map(dto => toAssociationTrainingModuleCollaborator(dto))));
    }
}
