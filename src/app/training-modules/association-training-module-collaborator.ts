import { PeriodDateTime } from "../PeriodDate";

export interface AssociationTrainingModuleCollaborator{
    id: string,
    collaboratorId: string,
    collaboratorEmail: string,
    trainingModuleId: string,
    trainingSubject: string,
    periods: PeriodDateTime[],
}