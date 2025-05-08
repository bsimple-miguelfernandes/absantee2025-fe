import { PeriodDate, PeriodDateString } from "../../PeriodDate";

export interface Project {
    id : string,
    title: string,
    acronym: string,
    periodDate : PeriodDate
}

export interface AddAssociationProjectCollaborator {
    collaboratorId : string,
    periodDate : PeriodDateString
}