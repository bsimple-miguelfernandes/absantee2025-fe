import { PeriodDate } from "../../../PeriodDate"

export interface AssociationTrainingModuleCollaboratorCreateRequest {
    collaboratorId: string,
    trainingModuleId: string,
    periodDate: PeriodDate
}