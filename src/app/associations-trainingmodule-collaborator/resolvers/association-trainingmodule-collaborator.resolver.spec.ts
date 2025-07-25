
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AssociationCollaboratorTrainingModuleResolver } from './association-collaborator-trainingmodule.resolver';
import { AssociationTrainingModuleCollaboratorResolver } from './association-trainingmodule-collaborator.resolver';

import { AssociationTrainingmoduleCollaboratorService } from '../services/association-trainingmodule-collaborator.service';
import { AssociationTrainingModuleCollaboratorsDTO } from '../models/association-trainingmodule-collaborator.model';

describe('AssociationsTrainingModuleCollaboratorResolvers', () => {
    let mockService: jasmine.SpyObj<AssociationTrainingmoduleCollaboratorService>;
    let collaboratorResolver: AssociationCollaboratorTrainingModuleResolver;
    let trainingModuleResolver: AssociationTrainingModuleCollaboratorResolver;

    const mockDTO: AssociationTrainingModuleCollaboratorsDTO = {
        id: '1',
        trainingModuleId: 'tm1',
        collaboratorId: 'c1',
        periodDate: { initDate: new Date('2023-01-01'), finalDate: new Date('2023-12-31') }
    };

    const expectedModel = {
        id: '1',
        trainingModuleId: 'tm1',
        collaboratorId: 'c1',
        periodDate: { initDate: new Date('2023-01-01'), finalDate: new Date('2023-12-31') }
    };

    const mockRouteSnapshot = {
        paramMap: {
            get: () => 'mockId'
        }
    } as unknown as ActivatedRouteSnapshot;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('AssociationTrainingmoduleCollaboratorService', [
            'getAssociationsByCollabTMC',
            'getAssociationsByTrainingModuleTMC'
        ]);

        TestBed.configureTestingModule({
            providers: [
                { provide: AssociationTrainingmoduleCollaboratorService, useValue: mockService },
                AssociationCollaboratorTrainingModuleResolver,
                AssociationTrainingModuleCollaboratorResolver
            ]
        });

        collaboratorResolver = TestBed.inject(AssociationCollaboratorTrainingModuleResolver);
        trainingModuleResolver = TestBed.inject(AssociationTrainingModuleCollaboratorResolver);
    });

    describe('AssociationCollaboratorTrainingModuleResolver', () => {
        it('should resolve and map associations by collaborator', (done) => {
            mockService.getAssociationsByCollabTMC.and.returnValue(of([mockDTO]));

            collaboratorResolver.resolve(mockRouteSnapshot).subscribe(result => {
                expect(result.length).toBe(1);
                expect(result[0]).toEqual(expectedModel);
                done();
            });
        });
    });

    describe('AssociationTrainingModuleCollaboratorResolver', () => {
        it('should resolve and map associations by training module', (done) => {
            mockService.getAssociationsByTrainingModuleTMC.and.returnValue(of([mockDTO]));

            trainingModuleResolver.resolve(mockRouteSnapshot).subscribe(result => {
                expect(result.length).toBe(1);
                expect(result[0]).toEqual(expectedModel);
                done();
            });
        });
    });
});
