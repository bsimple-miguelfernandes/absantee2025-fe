import {
    toAssociationTrainingModuleCollaborator,
    fromAssociationTrainingModuleCollaborator
} from './association-trainingmodule-collaborator.mapper';

import { AssociationTrainingModuleCollaborators, AssociationTrainingModuleCollaboratorsDTO } from '../models/association-trainingmodule-collaborator.model';

describe('AssociationTrainingModuleCollaborator Mapper', () => {
    const mockDto: AssociationTrainingModuleCollaboratorsDTO = {
        id: '1',
        trainingModuleId: 'tm1',
        collaboratorId: 'c1',
        periodDate: { initDate: new Date('2023-01-01'), finalDate: new Date('2023-12-31') }
    };

    it('should map DTO to domain model correctly', () => {
        const model = toAssociationTrainingModuleCollaborator(mockDto);
        expect(model).toEqual(mockDto); // shallow copy — no changes
    });

    it('should map domain model to DTO correctly', () => {
        const dto = fromAssociationTrainingModuleCollaborator(mockDto as AssociationTrainingModuleCollaborators);
        expect(dto).toEqual(mockDto);
    });
});