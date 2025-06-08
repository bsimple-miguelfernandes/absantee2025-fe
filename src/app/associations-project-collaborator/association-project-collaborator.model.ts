import { PeriodDate } from "../PeriodDate";

export interface AssociationProjectCollaborators {
    id: string,
    projectId: string,
    projectAcronym: string,
    collaboratorId: string,
    collaboratorEmail: string,
    periodDate: PeriodDate
}

export interface AssociationProjectCollaboratorsDTO {
    id: string,
    projectId: string,
    projectAcronym: string,
    collaboratorId: string,
    collaboratorEmail: string,
    periodDate: PeriodDate
}

export function mapToAssociationProjectCollaborators(dto: AssociationProjectCollaboratorsDTO): AssociationProjectCollaborators {
    return {
        id: dto.id,
        projectId: dto.projectId,
        projectAcronym: dto.projectAcronym,
        collaboratorId: dto.collaboratorId,
        collaboratorEmail: dto.collaboratorEmail,
        periodDate: dto.periodDate
    }
};