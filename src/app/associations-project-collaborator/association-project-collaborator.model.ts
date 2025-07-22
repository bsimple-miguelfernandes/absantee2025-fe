import { PeriodDate } from "../PeriodDate";

export interface AssociationProjectCollaborators {
    id: string;
    projectId: string;
    projectTitle: string;
    projectAcronym: string;
    collaboratorId: string;
    collaboratorName: string;
    collaboratorEmail: string;
    periodDate: PeriodDate;
}

export interface AssociationProjectCollaboratorsDTO {
    id: string;
    projectId: string;
    projectTitle: string;
    projectAcronym: string;
    collaboratorId: string;
    collaboratorName: string;
    collaboratorEmail: string;
    periodDate: PeriodDate;
}

export function mapToAssociationProjectCollaborators(dto: AssociationProjectCollaboratorsDTO): AssociationProjectCollaborators {
    return {
        id: dto.id,
        projectId: dto.projectId,
        projectTitle: dto.projectTitle,
        projectAcronym: dto.projectAcronym,
        collaboratorId: dto.collaboratorId,
        collaboratorName: dto.collaboratorName,
        collaboratorEmail: dto.collaboratorEmail,
        periodDate: dto.periodDate
    };
}