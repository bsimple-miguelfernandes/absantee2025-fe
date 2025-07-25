import { AssociationTrainingModuleCollaborators, AssociationTrainingModuleCollaboratorsDTO } from "../models/association-trainingmodule-collaborator.model";

export function toAssociationTrainingModuleCollaborator(assoc: AssociationTrainingModuleCollaboratorsDTO): AssociationTrainingModuleCollaborators {
    return {
        id: assoc.id,
        trainingModuleId: assoc.trainingModuleId,
        collaboratorId: assoc.collaboratorId,
        periodDate: assoc.periodDate
    };
}

export function fromAssociationTrainingModuleCollaborator(assoc: AssociationTrainingModuleCollaborators): AssociationTrainingModuleCollaboratorsDTO {
    return {
        id: assoc.id,
        trainingModuleId: assoc.trainingModuleId,
        collaboratorId: assoc.collaboratorId,
        periodDate: assoc.periodDate
    };
}