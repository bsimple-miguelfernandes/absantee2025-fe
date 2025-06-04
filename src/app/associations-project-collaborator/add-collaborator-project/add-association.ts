import { PeriodDate } from "../../PeriodDate";

export interface AssociationProjectCollaboratorCreateRequest {
    collaboratorId: string,
    periodDate: PeriodDate
}

export interface AssociationCollaboratorProjectCreateRequest {
    projectId: string,
    periodDate: PeriodDate
}