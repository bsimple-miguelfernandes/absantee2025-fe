import { AssociationProjectCollaborators } from "../association-project-collaborator.model";
import { AssociationProjectCollaboratorsViewModel } from "../association-project-collaborator.viewmodel";

export function fromAssociationProjectCollaboratorViewModel(vm: AssociationProjectCollaboratorsViewModel): AssociationProjectCollaborators {
    return {
        id: vm.id,
        projectId: vm.projectId,
        projectAcronym: vm.projectAcronym,
        collaboratorId: vm.collaboratorId,
        collaboratorEmail: vm.collaboratorEmail,
        periodDate: vm.periodDate
    }
};

export function toAssociationProjectCollaboratorViewModel(dto: AssociationProjectCollaborators): AssociationProjectCollaboratorsViewModel {
    return {
        id: dto.id,
        projectId: dto.projectId,
        projectAcronym: dto.projectAcronym,
        collaboratorId: dto.collaboratorId,
        collaboratorEmail: dto.collaboratorEmail,
        periodDate: dto.periodDate
    }
};