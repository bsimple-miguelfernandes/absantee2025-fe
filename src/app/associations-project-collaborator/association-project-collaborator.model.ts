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

