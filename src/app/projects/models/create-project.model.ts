import { PeriodDateString } from "../../PeriodDate";

export interface ProjectCreateRequest {
    title: string,
    acronym: string,
    periodDate: PeriodDateString
}