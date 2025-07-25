import { FormControl, FormGroup } from "@angular/forms";
import { PeriodDateTime, PeriodDateTimeForm } from "../PeriodDate";

export interface Collaborator {
    collabId: string,
    userId: string,
    names : string,
    surnames : string,
    email : string,
    userPeriod : PeriodDateTime
    collaboratorPeriod : PeriodDateTime
}

export interface UpdateCollab {
    Id : string
    PeriodDateTime : PeriodDateTime
}

export type CollaboratorDetailsForm = {
    names: FormControl<string | null>,
    surnames: FormControl<string | null>,
    email: FormControl<string | null>,
    userPeriodDateTime: FormGroup<PeriodDateTimeForm>,
    collaboratorPeriodDateTime: FormGroup<PeriodDateTimeForm>
}
