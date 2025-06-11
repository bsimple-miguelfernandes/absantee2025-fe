import { PeriodDate } from "../PeriodDate";

export interface AssociationProjectCollaboratorsViewModel {
    id: string,
    projectId: string,
    projectAcronym: string,
    collaboratorId: string,
    collaboratorEmail: string,
    periodDate: PeriodDate
}
