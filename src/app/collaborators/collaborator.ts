import { PeriodDate, PeriodDateTime } from "../PeriodDate";

export interface Collaborator {
    id: string,
    userId: string,
    periodDateTime : PeriodDateTime
}