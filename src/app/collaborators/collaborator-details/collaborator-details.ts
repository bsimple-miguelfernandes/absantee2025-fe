import { PeriodDateTime } from "../../PeriodDate";

export interface CollaboratorDetails {
    id: string,
    names: string,
    surnames: string,
    email: string,
    periodDateTime: PeriodDateTime
}