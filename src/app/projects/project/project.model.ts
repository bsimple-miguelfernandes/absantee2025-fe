import { FormControl, FormGroup } from "@angular/forms";
import { PeriodDate, PeriodDateForm, PeriodDateString } from "../../PeriodDate";

export interface Project {
    id?: string,
    title: string,
    acronym: string,
    periodDate : PeriodDate
}

export interface AddAssociationProjectCollaborator {
    collaboratorId : string,
    periodDate : PeriodDateString
}

export type ProjectForm = {
    title: FormControl<string | null>,
    acronym: FormControl<string | null>,
    periodDate: FormGroup<PeriodDateForm>
}