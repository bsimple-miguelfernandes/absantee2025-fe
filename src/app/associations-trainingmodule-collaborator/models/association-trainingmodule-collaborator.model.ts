import { PeriodDate } from "../../PeriodDate"

export interface AssociationTrainingModuleCollaborators {
    id: string,
    trainingModuleId: string,
    collaboratorId: string,
    collaboratorEmail?: string;
    periodDate: PeriodDate
}

export interface AssociationTrainingModuleCollaboratorsDTO {
    id: string,
    trainingModuleId: string,
    collaboratorId: string,
    periodDate: PeriodDate
}
