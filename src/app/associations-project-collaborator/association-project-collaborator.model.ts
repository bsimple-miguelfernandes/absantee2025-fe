import { PeriodDate } from "../PeriodDate";

export interface AssociationProjectCollaborators {
    projectId: string,
    projectAcronym: string,
    collabId: string,
    collabEmail: string,
    periodDate: PeriodDate
}