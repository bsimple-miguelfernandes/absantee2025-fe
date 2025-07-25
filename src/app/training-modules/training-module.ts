import { PeriodDateTime } from "../PeriodDate"

export interface TrainingModule{
    id?: string,
    trainingSubjectId: string,
    periods: PeriodDateTime[]
}